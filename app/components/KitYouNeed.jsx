import circle from '../styles/Export/icons/circle.svg'
import { Link } from '~/components'

export function KitYouNeed() {
  return (
    <div className="bg-background grid lg:grid-cols-2 md:grid-cols-2">
      <div className="bg-background md:col-span-1  lg:py-32 md:py-32 sm: py-8">
        <div className="md:px-[8vw] px-4 text-white md:py-24 py-4">
          <div className="md:text-[56px] text-2xl leading-none pb-6">
            <h2 className="font-medium mb-6">The Kit You Need.</h2>
          </div>
          <div className="space-y-3 text-lg">
          <div className='font-light flex'>
                        <div className=''>
                            <img src={circle} className="md:w-auto md:h-auto w-10 h-10 min-w-[12px] min-h-[12px] md:min-w-[16px] md:min-h-[16px] md:mt-2"/>
                        </div>
                        <div className="ml-4">
                            <p className="text-white text-lg">Hyaluronic Acid 2% + B5 is a water-based formula combining low, medium, and high molecular weight hyaluronic acid molecules with Pro-Vitamin B5.</p>
                        </div>
                    </div>
                    <div className='font-light flex'>
                        <div className=''>
                            <img src={circle} className="md:w-auto md:h-auto w-10 h-10 min-w-[12px] min-h-[12px] md:min-w-[16px] md:min-h-[16px] md:mt-2"/>
                        </div>
                        <div className="ml-4">
                            <p className="text-white text-lg">The Hyaluronic Acid promotes deep hydration to multiple layers of skin while targeting wrinkles and any irregularities.</p>
                        </div>
                    </div>
                    <div className='font-light flex'>
                        <div className=''>
                            <img src={circle} className="md:w-auto md:h-auto w-10 h-10 min-w-[12px] min-h-[12px] md:min-w-[16px] md:min-h-[16px] md:mt-2"/>
                        </div>
                        <div className="ml-4">
                            <p className="text-white text-lg">The Pro-Vitamin B5 enhances hydration of the outer skin layers, resulting in smoother, more radiant glowing skin. 
                            pH 6.00-7.50</p>
                        </div>
                    </div>
                </div>          
          <Link to="/products/lumin-kit" prefetch="intent">
            <button className="bg-white text-black font-light rounded-full py-2 px-6 mt-8 mb-10 text-xl tracking-wider">LEARN MORE</button>
          </Link>
        </div>
      </div>
      <div className="bg-[url('../styles/Export/icons/oldReady.png')] w-full aspect-square bg-cover bg-center md:aspect-auto"></div>
    </div>
  )
}
