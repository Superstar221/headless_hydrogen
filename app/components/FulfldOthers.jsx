import i1 from '../styles/Export/fulfldvsothers.png'
import i2 from '../styles/Export/fulfldvsothers.svg'
import i3 from '../styles/Export/fulfldvsothersMobile.svg'
import {Link} from '~/components'

export function FulfldOthers (){
    return(
        <div className="bg-beige flex md:grid-cols-2 grid-cols-1 md:p-4 md:pr-8 p-2 py-8 lg:p-16 justify-center">   
            <div className="gap-8 p-4 md:flex justify-center hidden">
                <img src={i1} alt="" className="max-w-3xl w-full object-contain" />
            </div>

            <div className="text-3xl text-black md:p-16 md:pl-8 max-w-xl flex flex-col justify-center">
                <div className="flex justify-center md:justify-start">
                    <img src={i2} className="md:max-w-[18rem] max-w-[14rem]  text-center" alt="" />
                </div>
                <div className='flex flex-col justify-center'>
                    <div className="font-light md:text-xl text-lg tracking-wider mt-6  text-center md:text-left">
                        Here's how the first <span className='font-semibold'>5-in-1 wand</span> compares to other brands in the market.
                    </div>
                    <div className="flex justify-center md:hidden">
                        <img src={i3} alt="" className="" />
                    </div>
                </div>
                <div className='flex justify-center md:justify-normal'>
                    <Link
                        to='/products/lumin-kit'
                        prefetch="intent"
                    >
                        <button className="bg-background text-white font-light rounded-full py-4 px-8 mt-6 text-xl tracking-wider hover:bg-black hover:text-beige transition-all">SHOP LUMIN KIT</button>
                    </Link>
                </div>
                
            </div>

        </div>
    )
}