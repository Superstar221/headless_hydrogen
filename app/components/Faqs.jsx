import {Disclosure, Listbox, Transition} from '@headlessui/react';

import {AnalyticsPageType, Money, ShopPayButton} from '@shopify/hydrogen';
import {
  IconClose,
  Text,
  Link,
} from '~/components';
import clsx from 'clsx';

export function Faqs (){
    return(
        <div className='bg-accent md:p-12 p-2 gap-3 text-2xl text-black flex justify-center'>
            <div className='w-[1400px] md:p-0 p-4'>
              <div className='font-light text-center md:text-4xl text-2xl p-4'>
                <h2>Frequently Asked</h2>
                <div className="flex gap-2 justify-center">
                  <h2>Questions,</h2>
                  <h2 className='font-semibold'>Answered</h2>
                </div>
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
              <div className="flex justify-center">
                <Link to='/faqs' prefetch="intent">
                  <button className="bg-background text-white font-light rounded-full md:py-4 py-2 md:px-8 px-4 mt-6 text-xl tracking-wider hover:bg-white hover:text-background transition-all uppercase">Learn More</button>
                </Link>
              </div>
            </div>
        </div>
    )
}

function ProductDetail({title, content, learnMore}) {
    return (
      <Disclosure key={title} as="div" className="grid w-full gap-2 border border-t-black border-b-0 border-x-0 md:p-4 p-2">
        {({open}) => (
          <>
            <Disclosure.Button className="text-left font-neue w-full ">
              <div className="grid grid-cols-7 md:flex justify-between">
                <div className=" col-span-6">
                  <Text size="lead" as="h4">
                    {title}
                  </Text>
                </div>
                <div className="col-span-1 flex justify-end">
                  <IconClose
                    className={clsx(
                      'transition-transform transform-gpu duration-200',
                      !open && 'rotate-[45deg] ',
                    )}
                  />
                </div>
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
              <Disclosure.Panel className={'pb-4 pt-2 grid gap-2 font-neue text-lg w-full'}>
                <div
                  className="text-background w-full"
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
  