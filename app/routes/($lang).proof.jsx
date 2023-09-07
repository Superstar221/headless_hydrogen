import {Testimonials, Instagram, Faqs, Results, Newsletter, LuminKit} from '~/components'

export default function Proof(){
    return(
        <div className="md:mt-24 mt-0">
            <Testimonials/>
            <Results/>
            <LuminKit/>
            <div className='bg-white text-white flex justify-center'><Newsletter/></div>
            <Faqs/>
            <div className="bg-accent"><Instagram /></div>
        </div>
    )
}