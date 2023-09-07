import num1 from '../styles/Export/icons/leafWhite.png'
import num2 from '../styles/Export/icons/dropsWhite.png'
import num3 from '../styles/Export/icons/aloeWhite.png'
import num4 from '../styles/Export/icons/atomWhite.png'

import {Link} from '~/components'

export function Ingredients() {
  return (
    <div className="md:mt-4 py-4 md:pb-0">
      <div className="w-full justify-center px-4 md:px-0 ">
        <div className='md:text-4xl sm:text-3xl text-2xl md:flex text-black font-light justify-center gap-2 text-center'>
          <h2 className="">Nourish your skin with </h2>
          <h2 className="font-semibold"> super ingredients</h2>
        </div>
        <div className="w-full md:mb-6 mt-3 mb-2">
          <p className="md:text-xl text-lg font-light text-center ">A light all-natural priming serum designed to boost your Wand's therapeutic effects.</p>
        </div>
      </div>
      <div className="bg-beige grid md:grid-cols-2 grid-cols-1 ">
        <div className=' bg-[url("../styles/Export/ingredientsImage.jpg")] w-full aspect-square bg-cover bg-center md:aspect-auto'>
        </div>
        <div className="max-w-3xl md:px-10 text-background md:text-xl sm:text-lg text-base align-middle md:py-16 p-4">
          <div className="space-y-3 text-lg">
            <div className='font-light flex'>
              <div className='md:min-w-[40px] min-w-[40px]'>
                  <img src={num1} className=""/>
              </div>
              <div className="ml-4">
                <h4 className='md:text-2xl sm:text-xl text-lg font-medium'>Hyaluronic Acid</h4>
                <p className="text-background md:text-xl sm:text-lg text-base">A water-based formula combining low, medium, and high molecular weight of Hyaluronic Acid molecules with a crosspolymer. The molecules' ability to hold 1000x their water weight result in intense hydration to multiple skin layers whilst targeting the appearance of fine lines and wrinkles.</p>
              </div>
            </div>
            <div className='font-light flex'>
              <div className='md:max-w-[40px] min-w-[40px]'>
                <img src={num2} className="" />
              </div>
              <div className="ml-4">
                <h4 className='md:text-2xl sm:text-xl text-lg font-medium'>Vitamin B5</h4>
                <p className="text-background md:text-xl sm:text-lg text-base">Provitamin B5 works in conjunction with the Hyaluronic Acid to enhance hydration to the outer skin layers. The deep nourishment along with the ability to revive the skin results in smoother, plumper skin with a youthful radiance.</p>
              </div>
            </div>
            <div className='font-light flex'>
              <div className='md:max-w-[40px] min-w-[40px]'>
                <img src={num3} className="" />
              </div>
              <div className="ml-4">
                <h4 className='md:text-2xl sm:text-xl text-lg font-medium'>Aloe Vera</h4>
                <p className="text-background md:text-xl sm:text-lg text-base">Aloe Barbadensis Leaf Juice has the ability to not only boost skin hydration, but also reduce the look of skin redness caused by irritation. It serves an important role of strengthening and maintaining skin barrier function leaving your skin luminous and replenished.</p>
              </div>
            </div>
            <div className='font-light flex'>
              <div className='md:max-w-[40px] min-w-[40px]'>
                <img src={num4} className="" />
              </div>
              <div className="ml-4">
                <h4 className='md:text-2xl sm:text-xl text-lg font-medium'>Tripeptide-1</h4>
                <p className="text-background md:text-xl sm:text-lg text-base">A three amino acid peptide known for its stimulation of collagen, fibronectin and elastin. This collagen-fragment peptide signals the skin to create new collagen when it naturally breaks down, resulting in skin firmness and a renewed complexion.</p>
              </div>
            </div>
          </div>
          <Link to="/science" prefetch="intent">
            <button className="bg-background font-light rounded-full py-2 px-6 mt-6 text-xl tracking-wider text-white">LEARN MORE</button>
          </Link>
        </div>
      </div>
    </div>
  )
}