import {
  Grid,
  Heading,
  PageHeader,
  Section,
  Link,
  Pagination,
  getPaginationVariables,
  Stats,
  Slider,
  LuminKit,
  Faqs,
  Instagram,
  Button,
} from '~/components';
import { Image } from '@shopify/hydrogen';
import i2 from '../styles/Export/Shamara-bondaroff.png'
import p1 from '../styles/Export/Science/1.jpg'
import p2 from '../styles/Export/Science/6.jpg'
import p3 from '../styles/Export/Science/3.jpg'
import p4 from '../styles/Export/Science/4.jpg'
import p5 from '../styles/Export/Science/5.png'
import blueLight from '../styles/Export/blueLightGuy.jpg'
import wand from '../styles/Export/wand.png'



export default function Science() {
  return (
    <div className='md:mt-28 font-light'>
      <div className="bg-white md:grid md:grid-cols-2 flex flex-col align-middle lg:h-[65vh]">
        <div className='bg-cover bg-center bg-[url("../styles/Export/scienceImage.jpg")] md:aspect-auto aspect-square'>
          <div className="slide">
            {/* <img src={i1} height="35" alt=""/> */}
          </div>
        </div>
        <div className="px-[3vw] text-neue flex flex-col justify-center md:py-16 pt-8 lg:pr-56 md:pb-20 pb-10 max-w-4xl">
          <div className="md:text-5xl text-4xl leading-none pb-6">
            <h2 className='font-light'>Enhance your skincare routine from the comfort of your home.</h2>
          </div>
          <div className="space-y-3 text-xl">
            <div className='font-light'>
              <h3>We've coupled the power of dermatologist office technologies with esthetician recommended techniques into a portable and easy-to-use 5 in 1 device- the Lumin Glow.</h3>
            </div>
          </div>
          <Link to="collections/frontpage" prefetch="intent">
            <div className="flex justify-center md:justify-start">
              <button className="bg-background text-white font-light rounded-full py-3 px-6 md:mt-12 mt-6 text-xl tracking-wider">EXPLORE OUR PRODUCTS</button>
            </div>
          </Link>
        </div>
      </div>
      <Slider />
      <div>
        <Details />
      </div>
      <Stats />
      <div className="flex justify-center bg-accent">
        <div className="md:grid md:grid-cols-2 flex flex-col-reverse justify-center
                 align-middle gap-2  p-0">
          <div className="flex justify-center ">
            <div className="md:text-4xl sm:text-3xl text-2xl text-neue md:p-20 md:pr-24 p-4 max-w-[48em]">
              <div className="slide flex justify-start">
                <h1 className="font-neue">Esthetician-</h1>
                <h1 className="font-semibold">Approved</h1>
              </div>
              <div className='justify-end'>
                <div className="font-neue md:text-lg text-base md:mt-12 mt-3">
                  “I use electricity to stimulate the facial muscles, basically giving your face a workout. Reeducating those muscles to actually lift, tighten, and stay where you want them. By stimulating collagen, it makes your face look bright and healthy, plus there's cell turnover, so it heals the skin. It's really good for acne; I treat a lot of young people because it speeds up the whole recovery process.”
                </div>
                <div className='md:p-4 p-0 mt-6 flex'>
                  <div className="slide md:w-[16%] w-[25%] pr-3">
                    <img src={i2} height="" alt="" />
                  </div>
                  <div>
                    <div className='text-2xl font-semibold'>
                      Shamara Bondaroff
                    </div>
                    <div className="font-neue text-base">
                      Esthetician and founder of SB Skin
                    </div>
                    <div className="font-neue text-sm">
                      FEATURED IN VOGUE, ELLE, & INO THE GLOSS
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='bg-[url("../styles/Export/blueLightGuy.jpg")] bg-cover'>
          </div>
        </div>
      </div>
      <LuminKit />
      <Faqs />
      <div className="bg-accent">
        <Instagram />
      </div>
    </div>
  )
}

function Details() {
  return (
    <div className="flex justify-center">
      <div className="font-light px-0 md:px-[3vw] py-10 space-y-3 md:space-y-0 md:pt-6 max-w-screen-2xl">
        <h2 className="text-4xl text-center mb-10 mt-4 md:mt-0">Details</h2>

        <div className='md:grid md:grid-cols-2 flex flex-col gap-4 '>
          <div className="flex justify-end">
            <img src={p1} className=" aspect-square object-cover md:aspect-auto md:object-contain md:rounded-xl" />
          </div>
          <div className="md:gap-3 gap-2 flex flex-col justify-center align-middle p-3">
            <h4 className="md:text-4xl text-2xl font-semibold mb-2">Red Light Therapy</h4>
            <div className=' gap-2 hidden'>
              <p className='md:text-base sm:text-sm text-[11px] font-neue bg-accent rounded-md md:px-3 px-1 py-1.5'>Smooth Fine Lines</p>
            </div>
            <div className='flex gap-1'>
              <p className='md:text-base sm:text-sm text-[11px] font-neue bg-accent rounded-md md:px-3 px-1.5 py-1.5 '>Smooth Fine Lines</p>
              <p className='md:text-base sm:text-sm text-[11px] font-neue bg-accent rounded-md md:px-3 px-1 py-1.5'>Decreases puffiness</p>
              <p className='md:text-base sm:text-sm text-[11px] font-neue bg-accent rounded-md md:px-3 px-1 py-1.5'>Promotes Collagen</p>
            </div>
            <div className='flex gap-1'>
              <p className='md:text-base sm:text-sm text-[11px] font-neue bg-accent rounded-md md:px-3 px-1 py-1.5'>Reduces Dark circles</p>
              <p className='md:text-base sm:text-sm text-[11px] font-neue bg-accent rounded-md md:px-3 px-1 py-1.5'>Reduces Dark Spots</p>
            </div>
            <p className='md:text-xl text-lg font-neue md:pr-[2vw]'>
              Red Light Therapy helps improve circulation and promote collagen and fibroblast production. It works by delivering low-level red light wavelengths at 620-630nm. It is a safe, painless and non-invasive treatment which initiates a healthy inflammatory response. <br /><br />Red Light Therapy maximizes your skin's health naturally without exposure to harmful UV rays and heat from the sun.
            </p>
          </div>
        </div>

        <div className='md:grid md:grid-cols-2 flex flex-col-reverse gap-4 '>
          <div className="md:gap-3 gap-2 flex flex-col justify-center align-middle p-3">
            <h4 className="md:text-4xl text-2xl font-semibold mb-2">Blue Light Therapy</h4>
            <div className='flex gap-2'>
              <p className='md:text-base sm:text-sm text-[11px] font-neue bg-accent rounded-md md:px-3 px-1 py-1.5'>Prevents breakouts</p>
              <p className='md:text-base sm:text-sm text-[11px] font-neue bg-accent rounded-md md:px-3 px-1 py-1.5'>Reduces acne</p>
              <p className='md:text-base sm:text-sm text-[11px] font-neue bg-accent rounded-md md:px-3 px-1 py-1.5'>Kills bacteria</p>
            </div>
            <p className='md:text-xl text-lg font-neue md:pr-[2vw]'>
              Blue Light Therapy helps destroy any bacteria responsible for acne. It works by delivering low-level blue light wavelengths at 420-430nm. It is a safe, painless and non-invasive treatment which reduces sebum production and prevents breakouts.<br /><br />Blue Light Therapy enhances your skin's health naturally without any side effects.
            </p>
          </div>
          <div className="flex justify-end">
            <img src={p2} className=" aspect-square object-cover md:aspect-auto md:object-contain md:rounded-xl" />
          </div>
        </div>

        <div className='md:grid md:grid-cols-2 flex flex-col gap-4 '>
          <div className="flex justify-end">
            <img src={p3} className=" aspect-square object-cover md:aspect-auto md:object-contain md:rounded-xl" />
          </div>
          <div className="md:gap-3 gap-2 flex flex-col justify-center align-middle p-3">
            <h4 className="md:text-4xl text-2xl font-semibold mb-2">Microcurrent</h4>
            <div className='flex gap-2'>
              <p className='md:text-base sm:text-sm text-[11px] font-neue bg-accent rounded-md md:px-3 px-1 py-1.5'>Stimulates Collagen</p>
              <p className='md:text-base sm:text-sm text-[11px] font-neue bg-accent rounded-md md:px-3 px-1 py-1.5'>Exfoliates & Repairs Skin</p>
              <p className='md:text-base sm:text-sm text-[11px] font-neue bg-accent rounded-md md:px-3 px-1 py-1.5  md:block hidden'>Promotes Lymphatic Drainage</p>
            </div>
            <div className='flex gap-2'>
              <p className='md:text-base sm:text-sm text-[11px] font-neue bg-accent rounded-md md:px-3 px-1 py-1.5 md:hidden block'>Promotes Lymphatic Drainage</p>
            </div>
            <p className='md:text-xl text-lg font-neue md:pr-[2vw]'>
              Microcurrent Therapy helps stimulate skin and facial muscles. It works by delivering low-voltage electrical waves at 270 microamps. It is a safe and clinically-proven treatment which promotes blood flow,  collagen production, and lymphatic drainage resulting in a toned and contoured appearance of your facial muscles. <br /><br />Microcurrent Therapy gives your face the workout it needs without any side effects.
            </p>
          </div>
        </div>

        <div className='md:grid md:grid-cols-2 flex flex-col-reverse gap-4 '>
          <div className="md:gap-3 gap-2 flex flex-col justify-center align-middle p-3">
            <h4 className="md:text-4xl text-2xl font-semibold mb-2">Therapeutic Warmth</h4>
            <div className='flex gap-2'>
              <p className='md:text-base sm:text-sm text-[11px] font-neue bg-accent rounded-md md:px-3 px-1.5 py-1.5'>Increases blood flow</p>
              <p className='md:text-base sm:text-sm text-[11px] font-neue bg-accent rounded-md md:px-3 px-1 py-1.5'>Boosts skin radiance</p>
              <p className='md:text-base sm:text-sm text-[11px] font-neue bg-accent rounded-md md:px-3 px-1 py-1.5 md:block hidden'>Increases tightness</p>
            </div>
            <div className='flex gap-2'>
              <p className='md:text-base sm:text-sm text-[11px] font-neue bg-accent rounded-md md:px-3 px-1 py-1.5 md:hidden block'>Increases tightness</p>
            </div>

            <p className='md:text-xl text-lg font-neue md:pr-[2vw]'>
              Therapeutic Warmth helps rejuvenate and promote healthy skin. It works by delivering heat waves at 100-113°F (38-45°C). It is a safe, painless, and relaxing treatment which increases blood flow to the skin while improving absorption of serums. <br /><br />Therapeutic Warmth allows oxygen and nutrients to move through the blood vessels, which is essential for the regrowth of damaged tissue and stimulation of fibroblasts.
            </p>
          </div>
          <div className="flex justify-end">
            <img src={p4} className=" aspect-square object-cover md:aspect-auto md:object-contain md:rounded-xl" />
          </div>
        </div>

        <div className='md:grid md:grid-cols-2 flex flex-col gap-4 '>
          <div className="flex justify-end">
            <img src={p5} className=" aspect-square object-cover md:aspect-auto md:object-contain" />
          </div>
          <div className="md:gap-3 gap-2 flex flex-col justify-center align-middle p-3">
            <h4 className="md:text-4xl text-2xl font-semibold mb-2">Facial Massage</h4>
            <div className='flex gap-2'>
              <p className='md:text-base sm:text-sm text-[11px] font-neue bg-accent rounded-md md:px-3 px-1 py-1.5'>Pushes toxins out </p>
              <p className='md:text-base sm:text-sm text-[11px] font-neue bg-accent rounded-md md:px-3 px-1 py-1.5'>Boosts skin radiance</p>
              <p className='md:text-base sm:text-sm text-[11px] font-neue bg-accent rounded-md md:px-3 px-1 py-1.5 md:block hidden'>Decreases swelling & puffiness</p>
            </div>
            <div className='flex gap-2'>
              <p className='md:text-base sm:text-sm text-[11px] font-neue bg-accent rounded-md md:px-3 px-1 py-1.5 md:hidden block '>Decreases swelling & puffiness</p>
            </div>
            <p className='md:text-xl text-lg font-neue md:pr-[2vw]'>
              Facial Massage is a rejuvenating treatment which helps improve the appearance of skin. It works by stimulating blood circulation and promoting relaxation which results in a more youthful and glowing complexion.  <br /><br />Facial Massage stimulates lymphatic drainage which pushes toxins out of cells leading to less puffiness and more elasticity.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
