import wand from '../styles/Export/wand3.png'
import {useIsHomePath} from '~/lib/utils';
import i1 from '../styles/Export/icons/1.svg'
import i2 from '../styles/Export/icons/2.svg'
import i3 from '../styles/Export/icons/5.svg'
import i4 from '../styles/Export/icons/6.svg'
import i5 from '../styles/Export/icons/3.svg'
import i6 from '../styles/Export/icons/4.svg'
import save from '../styles/Export/icons/save.svg'
import bestSeller from '../styles/Export/icons/bestSeller.svg'
import limitedOffer from '../styles/Export/icons/limitedofferfull.svg'
import limitedOfferMobile from '../styles/Export/icons/limitedoffermobile.svg'

import {Link, AddToCartButton} from '~/components';

export function LuminKit(){
    const isHome = useIsHomePath();
    const preOrder = false;
    const comparePrice=299;
    const actualPrice=199;

    const firstVariant="gid://shopify/ProductVariant/45047889821993"

    const save = (comparePrice - actualPrice);

    const savePercent = (comparePrice - actualPrice) / comparePrice * 100;

    const productAnalytics = {
        productGid: "gid://shopify/Product/8277727805737",
        variantGid: "gid://shopify/ProductVariant/45047889821993",
        name: "Lumin Glow Wand & Lumin Elixir Activating Serum Kit",
        price: 199.0,
        quantity: 1,
    };
    return(
        <div className="bg-white flex justify-center">
            <div className="bg-white grid lg:grid-cols-2 grid-cols-1 gap-2 font-light md:p-20 md:pt-6w p-3 justify-center max-w-screen-3xl pt-3">
                <h3 className='md:hidden font-medium md:text-3xl text-2xl text-center text-black py-2'>Achieve your BEST<br/> glow with the Lumin Kit!</h3>
                
                <Link to="/products/lumin-kit">
                  <div className='col-span-1 bg-[url("../styles/Export/icons/pinkKit.png")] bg-cover bg-center aspect-square md:aspect-[5/4] rounded-lg md:p-4 p-1 flex-row justify-end relative'>
                    <div className="absolute top-0 right-0 z-10 aspect-square md:aspect-[5/4] bg-white rounded-full m-4 text-background">
                      <div className="z-1 md:w-20 w-16">
                        <img src={bestSeller}/>
                      </div>
                    </div>
                  </div>
                </Link>
                <div className="col-span-1 mr-0 text-black lg:ml-12 m-0 md:gap-4 lg:gap-6 max-w-[44rem] justify-end self-center">
                  <img src={limitedOffer} className="w-full md:block hidden "/>
                  <img src={limitedOfferMobile} className="w-full md:hidden "/> 
                  <h3 className='text-secondary  uppercase md:text-lg sm:text-base text-sm my-3 tracking-widest text-center'>Limited Time Offer. No Code Needed</h3>
                  <h3 className='md:block hidden font-medium text-[44px] '>Achieve your BEST glow with</h3>
                  <h3 className='md:block hidden font-medium text-[44px] -mt-3'>the Lumin Kit!</h3>
                  <p className=' md:text-xl sm:text-lg text-sm mt-0 mb-2'>The Lumin Glow 5-in-1 Wand features Red Light Therapy, Blue Light Therapy, Microcurrent, Therapeutic Warmth, and a 3 Intensity Mode Facial Massage.</p>
                  <p className=' md:text-xl sm:text-lg text-sm mb-3'>Feel Fulfilled in just 5 minutes a day.</p>
                  <div className='grid-cols-10 gap-y-2 md:text-lg text-base font-light md:grid hidden'>
                      <div className='flex gap-2 md:col-span-3 col-span-5'>
                          <img src={i1} className='h-6'/>
                          <h2>Glowing skin</h2>
                      </div>
                      <div className='flex gap-2 md:col-span-3 col-span-5'>
                          <img src={i2} className='h-6'/>
                          <h2>Fade Blemishes</h2>
                      </div>
                      <div className='flex gap-2 md:col-span-4 col-span-5'>
                          <img src={i3} className='h-6'/>
                          <h2 className="md:block hidden ">Lifted & Toned Appearance</h2>
                          <h2 className="md:hidden">Lifted Appearance</h2>
                      </div>
                      <div className='flex gap-2 md:col-span-3 col-span-5'>
                          <img src={i4} className='h-6'/>
                          <h2>De-Puff</h2>
                      </div>
                      <div className='flex gap-2 md:col-span-3 col-span-5'>
                          <img src={i5} className='h-6'/>
                          <h2>Smooth fine lines</h2>
                      </div>
                      <div className='flex gap-2 md:col-span-4 col-span-5'>
                          <img src={i6} className='h-6'/>
                          <h2>Boost serums & creams</h2>
                      </div>
                      
                  </div>
                  {/* <AddToCartButton
                      lines={[
                      {
                          quantity: 1,
                          merchandiseId: firstVariant,
                      },
                      ]}
                      className="bg-background w-full text-white font-light rounded-full md:py-4 py-3 md:px-6 px-4 my-3 md:text-2xl sm:text-lg text-base flex justify-between align-middle"
                      analytics={{
                      products: [productAnalytics],
                      totalValue: parseFloat(productAnalytics.price),
                      }}
                  > */}
                  <Link to="/products/lumin-kit" className="bg-background w-full text-white font-light rounded-full md:py-4 py-3 md:px-6 px-4 my-3 md:text-2xl sm:text-lg text-base flex justify-between align-middle">

                      <h4 className="hidden md:block text-xl">{preOrder ? "ORDER NOW! DELIVERY IN 4 WEEKS" : "SHOP LUMIN KIT"}</h4>
                      <h4 className="md:hidden">{preOrder ? "SHOP LUMIN KIT!" : "SHOP LUMIN KIT"}</h4>
                      <div className="flex md:gap-2 gap-1">
                          <h4 className="bg-accent text-background text-md md:px-2 px-1 rounded-full md:text-lg sm:text-base text-sm">(Save {Math.round(savePercent)}%)</h4>
                          <h4 className='text-accent line-through md:text-2xl sm:text-lg text-base'>${comparePrice}</h4>
                          <h4 className='md:text-2xl sm:text-lg text-base font-semibold'>${actualPrice}</h4>
                      </div>
                  </Link>
                  {/* </AddToCartButton> */}
                  <div className='grid grid-cols-10 gap-y-2 md:text-lg sm:text-base text-sm font-light md:hidden mb-2'>
                      <div className='flex gap-2 md:col-span-3 col-span-5'>
                          <img src={i1} className='h-6'/>
                          <h2>Glowing skin</h2>
                      </div>
                      <div className='flex gap-2 md:col-span-3 col-span-5'>
                          <img src={i2} className='h-6'/>
                          <h2>Fade Blemishes</h2>
                      </div>
                      <div className='flex gap-2 md:col-span-4 col-span-5'>
                          <img src={i3} className='h-6'/>
                          <h2 className="md:block hidden ">Lifted & Toned Appearance</h2>
                          <h2 className="md:hidden">Lifted Appearance</h2>
                      </div>
                      <div className='flex gap-2 md:col-span-3 col-span-5'>
                          <img src={i4} className='h-6'/>
                          <h2>De-Puff</h2>
                      </div>
                      <div className='flex gap-2 md:col-span-3 col-span-5'>
                          <img src={i5} className='h-6'/>
                          <h2>Smooth fine lines</h2>
                      </div>
                      <div className='flex gap-2 md:col-span-4 col-span-5'>
                          <img src={i6} className='h-6'/>
                          <h2>Boost serums & creams</h2>
                      </div>
                      
                  </div>
                  {preOrder && <PreOrderPopup/>}

                    <div className="uppercase text-base flex justify-center gap-0 pt-2 my-1">
                        <p className="p-2 py-0.5 rounded-l-md bg-black text-white flex"> Reserve Yours Now</p>
                        <p className="p-2 py-0.5 rounded-r-md bg-accent text-black flex"> 1928 / 2000 LEFT</p>
                    </div>

                  <div className='flex w-full md:text-base lg:text-lg sm:text-base text-sm self-center justify-center md:gap-4 gap-1 font-neue'>
                      <span>30 Day Trial</span>
                      <span>•</span>
                      <span>1 Year Warranty</span>
                      <span>•</span>
                      <span>Free Shipping</span>
                  </div>
                </div>
            </div>
        </div>
    )
} 

function PreOrderPopup(){
  return(
    <>
      <div className="p-4 py-1 md:py-3 border-2 border-accent rounded-xl text-center">
        <h3 className=" font-medium text-xl"> We Are Sold Out </h3>
        <p> Back In Stock August 2023. Reserve Now & Save $100! Limited Time Offer.</p>
      </div>
    </>
  )
}
