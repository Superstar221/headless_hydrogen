import p1 from '../styles/Export/ElixirOverview/1.png'
import p2 from '../styles/Export/ElixirOverview/2.png'
import p3 from '../styles/Export/ElixirOverview/3.png'
import {Disclosure, Listbox, Transition} from '@headlessui/react';
import {Text, 
        Heading,
        IconCaret,
        IconCheck,
        IconClose,} from '../components';
import clsx from 'clsx';

export function ElixirOverview(){
    return(
      <div className="flex justify-center">
        <div className="max-w-screen-2xl">
            <div className='text-4xl flex text-black font-light justify-center gap-2'>
                <h2 className="mb-4">Overview</h2>
            </div>
            <div className='grid md:grid-cols-2 grid-cols-1 md:gap-4 gap-2 '>
                <div className="flex justify-end">
                    <img src={p1} className=" aspect-square object-cover md:aspect-auto md:object-contain"/>
                </div>
                <div className="md:gap-4 gap-2 flex flex-col justify-center align-middle md:p-10 sm:p-6 p-4">
                    <h4 className="md:text-3xl text-2xl font-semibold md:text-left text-center">Description</h4>
                    <p className='md:text-xl sm:text-lg text-base font-neue md:pr-[2vw]'>
                        Hyaluronic Acid 2% + B5 is a water-based formula combining low, medium, and high molecular weight hyaluronic acid molecules with Pro-Vitamin B5. <br/><br/>The Hyaluronic Acid promotes deep hydration to multiple layers of skin while targeting wrinkles and any irregularities.<br/><br/>The Pro-Vitamin B5 enhances hydration of the outer skin layers, resulting in smoother, more radiant glowing skin. 
                        pH 6.00-7.50
                    </p>
                </div>
            </div>

            <div className='md:grid md:grid-cols-2 flex flex-col-reverse md:gap-4 gap-2 '>
                <div className="md:gap-4 gap-2 flex flex-col justify-center align-middle md:p-10 sm:p-6 p-4">
                    <h4 className="md:text-3xl text-2xl font-semibold md:text-left text-center">Clinical Results</h4>
                    <p className='md:text-xl sm:text-lg text-base font-neue pr-[2vw]'>
                    Short-term and long-term clinical results. 
                    </p><p className='md:text-xl sm:text-lg text-base font-neue pr-[2vw]'>
                    1 week: Boosts skin hydration
                    </p><p className='md:text-xl sm:text-lg text-base font-neue pr-[2vw]'>
                    2-3 weeks: helped with skin blemishes, acne, wrinkles, fine lines, puffiness, inflammation, radiance and tightness*
                    </p><p className='md:text-xl sm:text-lg text-base font-neue pr-[2vw]'>
                    4 weeks: Strengthens skin barrier and reduces fine lines and wrinkles**
                    </p><p className='md:text-xl sm:text-lg text-base font-neue pr-[2vw]'>
                    * When used in combination with Red and Blue Light Therapy and Microcurrent 
                    </p><p className='md:text-xl sm:text-lg text-base font-neue pr-[2vw]'>
                    ** In a clinical study of 34 subjects applying product twice daily for 4 weeks.
                    </p>
                </div>
                <div className="flex justify-end">
                    <img src={p2} className=" aspect-square object-cover md:aspect-auto md:object-contain"/>
                </div>
            </div>

            <div className='grid md:grid-cols-2 grid-cols-1 md:gap-4 gap-2 '>
                <div className="flex justify-end">
                    <img src={p3} className=" aspect-square object-cover md:aspect-auto md:object-contain"/>
                </div>
                <div className="flex flex-col justify-center align-middle md:p-10 sm:p-6 p-4">
                    <h4 className="md:text-3xl text-2xl font-semibold mb-6 md:text-left text-center">Usage Instructions</h4>
                    <p className='md:text-xl sm:text-lg text-base font-neue pr-[2vw] mb-6'>
                        Hyaluronic Acid 2% + B5 is a water-based formula combining low, medium, and high molecular weight hyaluronic acid molecules with Pro-Vitamin B5.
                    </p>
                    <ProductDetail
                        title="How To Use"
                        content="Apply a few drops directly to the face. 
                        <br/>Use only as directed on unbroken skin. 
                        <br/>When using with our Lumin Glow Wand, be sure to avoid high risk areas <a href='/faqs'><u>(see FAQs).</u></a>
                        <br/>If irritation occurs, rinse off immediately and monitor. 
                        <br/>If irritation and/or inflammation becomes persistent, consult a physician. 
                        <br/>Keep out of reach of children.
                        <br/>Store at room temperature.
                        "
                    />
                    <ProductDetail
                        title="When To Use"
                        content="Best results when used twice daily in AM and PM
                        <br/>Serum is good for use for 12 months after opening. 
                        <br/>When using with Lumin Glow Wand, apply prior to use. 
                        "
                    />
                    <ProductDetail
                        title="The Ingredients We Use"
                        content="Water, Propylene Glycol, Sodium Hyaluronate (2% Hyaluronic Acid), Panthenol (Vitamin B5), Aloe Barbadensis Leaf Juice (Aloe Vera), Tripeptide-1, Butylene Glycol, Phenoxyethanol, Potassium Sorbate, Sodium Benzoate, Dextran, Citric Acid"
                    />
                </div>
            </div>
        </div>
      </div>
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
  