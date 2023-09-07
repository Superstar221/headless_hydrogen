import { useState } from "react";
import {ContactContent} from '../components/ContactContent';

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [subject, setSubject] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("city", city);
    formData.append("subject", subject);
    formData.append("comment", comment);

    fetch("https://fulfld-skin.myshopify.com/contact", {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log("Form submitted successfully");
          setName("");
          setEmail("");
          setCity("");
          setSubject("");
          setComment("");
          setPronouns("");
        } else {
          console.log("Form submission failed");
        }
      })
      .catch((error) => {
        console.error("Error submitting the form", error);
      });
  };

  return (
    <div className="py-10">
    <div className="bg-white p-6 md:p-12 flex justify-center mt-26">
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Contact Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="city" className="block font-medium mb-2">
              City
            </label>
            <input
              type="text"
              id="city"
              placeholder="Enter your city"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="subject" className="block font-medium mb-2">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              placeholder="Enter the subject"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="comment" className="block font-medium mb-2">
              Comment
            </label>
            <textarea
              id="comment"
              placeholder="Enter your comment"
              className="w-full px-4 py-2 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            ></textarea>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="px-16 py-2 bg-gray-900 text-white rounded-lg mt-4 hover:bg-gray-800 focus:outline-none focus:bg-gray-800"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      
    </div>
    
    <ContactContent t1="Partnerships" p1="For those interested in forming partnerships or exploring collaboration opportunities, we welcome you to connect with our Partnership team. Please submit the form above."/>
    <ContactContent t1="Press & Media" p1="If you're a member of the press or media and wish to discuss press releases, interviews, or other media-related inquiries, we invite you to reach out to our Media Relations team. Please submit the form above."/>
    </div>
  );
};

export default ContactForm;
