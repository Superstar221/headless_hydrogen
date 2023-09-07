import {Disclosure, Listbox, Transition} from '@headlessui/react';

import {AnalyticsPageType, Money, ShopPayButton} from '@shopify/hydrogen';
import {
  IconClose,
  Text,
  Link,
  Testimonials,
  Newsletter,
  Instagram
} from '~/components';
import clsx from 'clsx';

export default function Faqs (){
    return(
        <>
            <div className='bg-white md:p-12 sm:p-6 p-4 gap-semibold md:text-3xl text-2xl text-black flex justify-center md:mt-24 mt-6 w-full'>
                <div className='max-w-[30em]'>
                {/* <div className='font-light text-4xl p-4'>
                    <div className="flex gap-2 justify-center md:text-4xl text-2xl">
                    <h2 className='font-semibold'>FULFLD Skin</h2>
                    <h2>FAQs</h2>
                    </div>
                </div> */}
                <div className="bg-white">
                    <div className="flex gap-2 justify-center md:text-4xl text-2xl">
                    <h2 className='font-semibold'>Product</h2>
                    <h2>FAQs</h2>
                    </div>
                    <div className="">
                        <h2 className='font-semibold md:text-3xl text-xl pb-7 pt-10'>General</h2>
                    </div>
                    <ProductDetail
                    title="What guarantees do you offer?"
                    content="FULFLD Skin offers a 30-day, money-back, no questions asked guarantee. All returns include free shipping. We want to ensure that all customers are satisfied with their results. For further information or questions about your purchase, please contact our Customer Support team." 
                    />
                <ProductDetail
                    title="Can I use the Lumin Glow 5-in-1 Wand with my own skin care products?"
                    content="Yes, our Wand can be used with multiple products to enhance their effects. We recommend applying an oil-free serum to clean, make-up free skin prior to using the Wand. 
                    <br/><br/>The ingredients in our Lumin Elixir have been carefully selected to provide best results. Applying the serum directly to the skin prior to using the Wand helps conduct microcurrents leading to reduction of blemishes, skin hydration, toning facial muscles, etc. Alternatively, you can use other hydrating topical serums but be sure they include conductive ingredients such as hyaluronic acid and/or aloe vera for best results. 
                    " 
                />
                <ProductDetail
                    title="Are FULFLD Skin products travel friendly? "
                    content="Yes, we were mindful when designing our products in order for them to be your travel companions.  We recommend storage of the Lumin Glow 5-in-1 Wand in your personal bag/carry-on as some airlines prohibit products with lithium ion batteries in checked baggage. The Lumin Elixir can also be stored in your personal bag/carry-on as it is under the 100mL limit. Some airlines limit the number of bottles in your carry-on. Always check your airline/travel policy prior to departure. " 
                />
                <ProductDetail
                    title="Do I have to pair the Lumin Elixir with the Lumin Glow 5-in-1 Wand? "
                    content="No, the Lumin Elixir can be used without the Lumin Glow 5-in-1 Wand, however, the combination of the Elixir and the Wand can enhance its effectiveness up to 3x. Our Lumin Elixir is a conductive serum infused with Hyaluronic Acid which activates upon use with the Wand. This process yields best results achieving glowing, tight skin without blemishes, acne and fine lines. " 
                />

                    <div className="">
                        <h2 className='font-semibold md:text-3xl text-xl pb-7 pt-10'>Results </h2>
                    </div>

                <ProductDetail
                    title="What type of results should I expect to see with the Lumin Glow 5-in-1 Wand?"
                    content="The Lumin 5-in-1 Wand is a powerful, yet non-invasive, clinically-proven skincare tool with a multitude of features. The Wand offers many benefits including fading blemishes, decreasing puffiness, smoothing fine lines, killing bacteria, reducing acne and treating sun spots. Users noticed dramatic results in as little as 14-days.<br/><br/>
                    Shortly after use, you'll notice smoother, more plump skin and relaxed facial muscles. Under-eye dark circles and puffiness also begin to become less noticeable. After several weeks of consistent use, you will notice visibly more refreshed and rejuvenated skin lacking papules and inflammatory lesions. Continued use will help the skin maintain a radiant glow while remaining brighter and more toned. 
                    " 
                />
                <ProductDetail
                    title="How do you use the Lumin Glow 5-in-1 Wand?"
                    content="The Lumin 5-in-1 Wand was created to be effortlessly used. Simply glide the Wand over your face and enjoy the relaxing warmth and facial massage it provides. The Wand is recommended to be used 5 minutes a day, 3-5 days a week. It is travel-friendly, light, and can easily alternate between Red and Blue Light modes.
                    For best results, apply our Lumin Elixir to the face prior to using the Wand. The combined use of the Wand and Elixir increases absorption, blood circulation, and collagen stimulation providing the best therapeutic outcome. The facial massage has 3 intensity modes which can easily be alternated with the press of a button. As your skin acclimates to the Wand, the intensity, frequency and length of treatments can be increased."
                />
                    <div className="">
                        <h2 className='font-semibold md:text-3xl text-xl pb-7 pt-10'>Science </h2>
                    </div>

                <ProductDetail
                    title="How does Red Light Therapy Work? "
                    content="Red Light Therapy helps improve circulation and promote collagen and fibroblast production. It works by delivering low-level red light wavelengths at 620-630nm. It is a safe, painless and non-invasive treatment which initiates a healthy inflammatory response. Red Light Therapy maximizes your skin's health naturally without exposure to harmful UV rays and heat from the sun. 
                    " 
                />
                <ProductDetail
                    title="How Does Blue Light Therapy Work?"
                    content="Blue Light Therapy helps destroy any bacteria responsible for acne. It works by delivering low-level blue light wavelengths at 420-430nm. It is a safe, painless and non-invasive treatment which reduces sebum production and prevents breakouts. Blue Light Therapy enhances your skin's health naturally without any side effects."
                />
                <ProductDetail
                    title="What does Microcurrent Therapy do?"
                    content="Microcurrent Therapy helps stimulate skin and facial muscles. It works by delivering low-voltage electrical waves at 270 microamps. It is a safe and clinically-proven treatment which promotes blood flow,  collagen production, and lymphatic drainage resulting in a toned and contoured appearance of your facial muscles. Microcurrent Therapy gives your face the workout it needs without any side effects. 
                    " 
                />
                <ProductDetail
                    title="What makes Therapeutic Warmth essential?"
                    content="Therapeutic Warmth helps rejuvenate and promote healthy skin. It works by delivering heat waves at 100-113°F (38-45°C). It is a safe, painless, and relaxing treatment which increases blood flow to the skin while improving absorption of serums. Therapeutic Warmth allows oxygen and nutrients to move through the blood vessels, which is essential for the regrowth of damaged tissue and stimulation of fibroblasts."
                />
                <ProductDetail
                    title="What effect(s) does Facial Massage have?"
                    content="Facial Massage is a rejuvenating treatment which helps improve the appearance of skin. It works by stimulating blood circulation and promoting relaxation which results in a more youthful and glowing complexion. Facial Massage stimulates lymphatic drainage which pushes toxins out of cells leading to less puffiness and more elasticity."
                />
                    
                </div>
                <div className="bg-white">
                <div className="md:mt-0 mt-4flex gap-2 justify-center md:text-4xl text-2xl">
                    <h2 className='font-semibold'>Company</h2>
                    <h2>FAQs</h2>
                    </div>
                    <div className="">
                        <h2 className='font-semibold md:text-3xl text-xl pb-7 pt-10'>Contraindications</h2>
                    </div>
                    <ProductDetail
                        title="Do not use Lumin Glow 5-in-1 Wand in the following areas:"
                        content="Chest & Breast region
                        <br/>⋅ Throat & Larynx
                        <br/>⋅ Groin and surrounding areas 
                        <br/>⋅ Eyelids (upper & lower)
                        " 
                    />
                <ProductDetail
                    title="Do not use Lumin Glow 5-in-1 Wand if you:"
                    content="Are pregnant 
                    <br/>⋅ Are under 18 years of age
                    <br/>⋅ Are epileptic/ subject to seizures 
                    <br/>⋅ Have cancer/tumors
                    <br/>⋅ Have a pacemaker 
                    <br/>⋅ Have any implanted devices ie. defibrillators/stimulators/electrical                    
                    " 
                />
                    <p className="font-light md:text-lg text-base font-secondary w-full md:text-center text-left md:p-8 md:px-12 p-3">
                        The Lumin Glow 5-in-1 Wand should only be used over healthy and intact skin.  Keep out of reach of children.
                        Potential side effects may include skin irritation or redness. If you experience a persistent headache, painful sensations, involuntary muscle movements and/or any irregular adverse effects, stop using the device and consult your physician. 
                        <br/>
                        Please contact your physician before using Lumin Glow 5-in-1 Wand if you have any medical conditions/illnesses/concerns, or have recently had any type of facial surgery. 
                        <br/>
                        Electronic monitoring equipment (ie. ECG monitor/alarms) may not operate properly when Lumin Glow 5-in-1 Wand is used. 
                        Avoid use of the Wand over, or in close proximity to, cancerous lesions and swollen, infected, or inflamed skin including, but not limited to, thrombophlebitis, phlebitis, broken capillaries, and varicose veins.
                        Avoid use of the Wand over the chest/breast area as the electrical currents can cause heart arrhythmias (irregular heartbeats) which can be fatal. 
                        <br/>The Lumin Glow 5-in-1 Wand is designed to activate only on direct contact with skin. Facial hair may interfere when using the Wand, resulting in no treatment to the desired area(s). 
                    </p>
                    <div className="">
                        <h2 className='font-semibold md:text-3xl text-xl pb-7 pt-10'>Precautions</h2>
                    </div>
                    <ProductDetail
                    title="Use The Lumin Glow 5-in-1 Wand with Caution if:"
                    content="You have any suspected or diagnosed heart condition(s).
                    <br/>⋅ You have suspected or diagnosed epilepsy.
                    <br/>⋅ You have a tendency to hemorrhage following acute trauma.
                    <br/>⋅ You underwent a recent surgical procedure.                   
                    " 
                    />
                    <p className="font-light md:text-lg text-base font-secondary w-full  md:p-8 md:px-12 p-3 md:text-center text-left">
                    The Lumin Glow 5-in-1 Wand is designed for cosmetic use only for individuals in good health. Please review the user manual prior to use. 
                    <br/>It is normal to feel a slight tingling sensation when using the Wand. Due to its stimulation of the optic nerve, seeing flashing lights may occur. If this occurs without the use of the Lumin Glow 5-in-1 Wand, consult your physician. 
                    If you have any suspected or diagnosed heart condition(s) and would like to use the Lumin Glow 5-in-1 Wand, please consult your physician beforehand and follow their recommendations. 
                    <br/>Avoid use of the Lumin Glow 5-in-1 Wand while driving, operating machinery, or while performing any activity which may enhance involuntary muscle contractions. 
                    <br/>**The Lumin Glow 5-in-1 Wand is designed for cosmetic use on the face and neck. Any misuse or application to other body areas is not recommended as it may cause harm. Improper connection to voltage sources, dirty conductive solutions, and/or improper application may cause further harm and is neither the responsibility of FULFLD Skin nor its affiliates. 

                    </p>
                    <div className="">
                        <h2 className='font-semibold md:text-3xl text-xl pb-7 pt-10'>Shipping & returns</h2>
                    </div>
                    <ProductDetail
                    title="Do you offer free shipping?"
                    content="Yes! We offer free domestic expedited 2-3 day shipping on orders over $29.99 anywhere within the United States. Anything under that amount costs $5.99.                 
                    " 
                    />
                    <ProductDetail
                    title="How quickly do you ship?"
                    content="We ship Monday through Friday, excluding holidays. Most orders are shipped within 1-2 days, but we aim to ship orders within 1 business day.                 
                    " 
                    />
                    <ProductDetail
                    title="Do you ship internationally?"
                    content="Absolutely! On international orders, tax and custom duties will be charged during checkout with most customers paying a flat $11.99 inclusive of tax, duties, shipping, etc. You will not be charged additional fees upon delivery. During checkout you'll see the full breakdown of the rate under 'Shipping Method.' It will list the tax and customs fee separately.

                    If shipping to the UK: to get your order to you, we've partnered with Passport Shipping and they will be the Seller for all orders to the UK for orders under €135.
                    
                    Unfortunately, we do not ship to the following countries: Afghanistan, Belarus, Bhutan, British Indian Ocean Territory, Brunei, Chad, Christmas Island, Cocos (Keeling) Islands, Congo - Kinshasa, Cook Islands, Curaçao, Falkland Islands, French Southern Territories, Laos, Libya, Mayotte, Mongolia, Nauru, Niue, Norfolk Island, Pakistan, Palestinian Territories, Papua New Guinea, Pitcairn Islands, Russia, Samoa, Solomon Islands, Somalia, South Africa (1 of 9 provinces), South Georgia & South Sandwich Islands, South Sudan, St. Helena, St. Pierre & Miquelon, Taiwan, Timor-Leste, Tokelau, Turkey, Turkmenistan, Tuvalu, U.S. Outlying Islands, Ukraine, Vatican City, Venezuela, Western Sahara, Yemen.
                    
                    Bear in mind, due to limited processing lanes and reduced air freight availability for shipments leaving the US border, sometimes international packages experience delays. If your tracking number hasn't updated in more than 2 weeks, please reach out to us so we can investigate the issue for you.                 
                    "
                    />
                    <ProductDetail
                    title="Do you offer a warranty?"
                    content="Absolutely! We make it easy to try our products risk-free. For all devices, we offer a 1-year limited warranty from the date of your original purchase. If your device does not work properly due to a manufacturer's defect, we will replace the wand free of charge. We also offer free 30-Day Returns for all orders, so you can easily return your order for a full refund for any reason within 30 days of delivery.

                    The 1-year warranty does not cover devices damaged by:
                    
                    <br/>⋅ Accident, misuse, abuse, or alteration
                    <br/>⋅ Use with unauthorized accessories or use other than as instructed
                    <br/>⋅ Connecting to incorrect current and voltage
                    This warranty extends only to the original retail purchase with original proof of purchase (such as retail store receipt or FULFLD order number) and only when purchased from an authorized retailer or reseller. FULFLD is the only authorized seller on Amazon, and there are no authorized sellers on eBay. Warranty replacements are processed after returned defective items are received, when applicable.
                    
                    This warranty only extends if the device is used in conjunction with authorized device accessories (such as the charging cable). The FULFLD warranty does not extend to FULFLD Skincare products, which are solely subject to the FULFLD Return Policy.
                    
                    FULFLD will not be responsible for any incidental, special or consequential damages resulting from the use of this device. All implied warranties, including but not limited to implied warranties of fitness and merchantability are limited in duration to one year from date of original purchase.                 
                    " 
                    />
                    <ProductDetail
                    title="What is your return policy?"
                    content="All returns must be initiated within 30 days of receiving your order (*see note below). Returns must be shipped back and in transit to our warehouse within 14 days of the return request confirmation in order to process a refund. 

                    Please note that refunds are processed after your return has been received. Once your returned order is received and processed, you can expect a refund within 5 to 10 business days to your original method of payment. The returned items must be in working condition with no wear and tear. 
                    
                    Topicals are eligible for physical return if they are unopened and in their original packaging. Items marked as final sale are not eligible for returns or refunds. We can only process returns for products sold on FULFLD Skin.
                    
                    For international orders: Orders with unpaid customs fees are not eligible for return. Additionally, we can not provide free return labels for international clients. International return shipping fees are not covered by FULFLD Skin.
                    " 
                    />
                    <div className="">
                    <h2 className='font-semibold md:text-3xl text-xl pb-7 pt-10'>Other</h2>
                    </div>
                    <ProductDetail
                    title="Do you offer wholesale?"
                    content="Thank you so much for your interest in partnering with Solawave. We're revising our wholesale program so please stay tuned for updates. Reach out to our support team with questions."
                    />
                    <ProductDetail
                    title="Do you offer a student discount?"
                    content="Yes! We offer students a 20% discount. For instant access to this discount, click here to simply register and verify your student status with Student Beans. It's free!" 
                    />
                    </div>
                    
                </div>
            </div>
            
            <Testimonials/>
            <div className='bg-accent md:p-16 sm:p-4 p-0 flex justify-center text-white'><Newsletter/></div>
            <div className='bg-accent'>
            <Instagram/>
            </div>
        </>
    )
}
function ProductDetail({title, content, learnMore}) {
  return (
    <Disclosure key={title} as="div" className="grid w-full gap-2 py-3 border-t-2 border-accent ">
      {({open}) => (
        <>
          <Disclosure.Button className="text-left font-neue w-full ">
            <div className="flex justify-between">
              <Text size="lead" as="h4">
                {title}
              </Text>
              <IconClose
                className={clsx(
                  'transition-transform transform-gpu duration-200',
                  !open && 'rotate-[45deg]',
                )}
              />
            </div>
          </Disclosure.Button>

          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-y-90 opacity-0"
            enterTo="transform scale-y-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-y-100 opacity-100"
            leaveTo="transform scale-y-90 opacity-0"
          >
            <Disclosure.Panel className={'pb-4 pt-2 grid gap-2 font-neue sm:text-lg text-base'}>
              <div
                className="text-secondary w-full"
                dangerouslySetInnerHTML={{__html: content}}
              />
              {learnMore && (
                <div className="">
                  <Link
                    className="pb-px border-b border-primary/30 text-accent"
                    to={learnMore}
                  >
                    Learn more
                  </Link>
                </div>
              )}
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  );
}
