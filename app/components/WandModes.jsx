
import tick from '../styles/Export/icons/tick.svg'
import antiAging from '../styles/Export/antiAging.jpg'
import antiBreakout from '../styles/Export/antiBreakout.jpg'
import antiAgingMobile from '../styles/Export/antiAgingMobile.jpg'
import antiBreakoutMobile from '../styles/Export/antiBreakoutMobile.jpg'

export function WandModes(){
    return(
        <div className="md:p-32 p-0">
        
            <div className='md:grid md:grid-cols-2 flex flex-col gap-4 '>
                <h4 className="md:text-4xl text-2xl font-semibold text-center mt-3 md:hidden">Anti Aging Mode</h4>
                <div className="md:flex hidden justify-end">
                    <img src={antiAging} className="aspect-square object-cover md:aspect-auto md:object-contain rounded-xl border border-accent"/>
                </div>
                <div className="flex md:hidden justify-end">
                    <img src={antiAgingMobile} className="object-cover md:aspect-auto md:object-contain"/>
                </div>
                <div className="gap-5 flex flex-col justify-center align-middle md:p-10 p-4">
                    <h4 className="md:text-4xl text-2xl font-semibold hidden md:block">Anti Aging Mode</h4>
                    <p className='md:text-2xl text-xl font-neue pr-[2vw]'>
                        Youthful-looking you is waiting!
                    </p>
                    <div className="flex font-neue md:text-xl sm:text-lg text-base gap-2 -mt-2"><img src={tick} className="h-7"/>Improves circulation and stimulates collagen production</div>
                    <div className="flex font-neue md:text-xl sm:text-lg text-base gap-2 -mt-2"><img src={tick} className="h-7"/>Initiates natural healthy inflammatory response</div>
                    <div className="flex font-neue md:text-xl sm:text-lg text-base gap-2 -mt-2"><img src={tick} className="h-7"/>Reduces signs of fine lines and aging</div>
                    <div className="flex font-neue md:text-xl sm:text-lg text-base gap-2 -mt-2"><img src={tick} className="h-7"/>Evens skin tone and eliminates dark spots & under eye bags</div>
                </div>
            </div>

            <div className='md:grid md:grid-cols-2 flex flex-col-reverse gap-4 '>
                
                <div className="gap-5 flex flex-col justify-center align-middle md:p-10 p-4">
                    <h4 className="md:text-4xl text-2xl hidden md:block font-semibold">Anti-Breakout Mode</h4>
                    <p className='md:text-2xl text-xl font-neue pr-[2vw]'>
                        Say goodbye to skin blemishes.
                    </p>
                    <div className="flex font-neue md:text-xl sm:text-lg text-base gap-2 -mt-2"><img src={tick} className="h-7"/>Destroys acne-causing bacteria and prevents future breakouts</div>
                    <div className="flex font-neue md:text-xl sm:text-lg text-base gap-2 -mt-2"><img src={tick} className="h-7"/>Reduces sebum and oil production</div>
                    <div className="flex font-neue md:text-xl sm:text-lg text-base gap-2 -mt-2"><img src={tick} className="h-7"/>Evens skin tone and reduces shiny glare</div>
                    <div className="flex font-neue md:text-xl sm:text-lg text-base gap-2 -mt-2"><img src={tick} className="h-7"/>Reduces inflammation and soothes irritated skin</div>
                </div>
                <div className="md:flex hidden justify-end">
                    <img src={antiBreakout} className="aspect-square object-cover md:aspect-auto md:object-contain rounded-xl border border-accent"/>
                </div>
                <div className="flex md:hidden justify-end">
                    <img src={antiBreakoutMobile} className="object-cover md:aspect-auto md:object-contain"/>
                </div>
                <h4 className="md:text-4xl text-2xl font-semibold text-center mt-3 md:hidden">Anti Breakout Mode</h4>
            </div>
        </div>
    )
}