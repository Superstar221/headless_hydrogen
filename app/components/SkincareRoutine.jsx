import p1 from '../styles/Export/Steps/1.png'
import p2 from '../styles/Export/Steps/2.png'
import p3 from '../styles/Export/Steps/3.png'
import p4 from '../styles/Export/Steps/4.png'

export function SkincareRoutine(){
    return(
        <div className="py-4 md:py-16 sm:px-6 px-4 md:px-16">
            <div className="flex md:text-4xl sm:text-3xl text-2xl justify-center md:mb-8">
                <h2 className="font-semibold md:flex hidden">Simplify</h2>
                <h2 className="font-light ml-2 md:flex hidden">Your Skincare Routine</h2>
                <h2 className="font-semibold flex md:hidden">Simplify</h2>
                <h2 className="font-light ml-2 flex md:hidden">Your </h2>
            </div>
            <div className="flex md:text-4xl sm:text-3xl text-2xl justify-center mb-5">
                <h2 className="font-light ml-2 inline md:hidden">Skincare Routine</h2>
            </div>
            <div className="md:flex justify-center hidden">
                <div className="grid md:grid-cols-4 grid-cols-1 gap-6 justify-center max-w-screen-xl">
                    <div className="font-light space-y-2">
                        <img src={p1} className="mb-4"/>
                        <h4 className="px-3 py-2 tracking-widest uppercase md:text-xl text-base bg-black text-white inline rounded-md">Step 1</h4>
                        <h3 className="md:font-semibold font-medium md:text-2xl sm:text-xl text-lg">Cleanse</h3>
                        <p className='text-lg'>Gently cleanse with a balancing cleanser and lukewarm water, then pat dry for best results. </p>
                    </div>
                    <div className="font-light space-y-2">
                        <img src={p2} className="mb-4"/>
                        <h4 className="px-3 py-2 tracking-widest uppercase md:text-xl text-base bg-black text-white inline rounded-md">Step 2</h4>
                        <h3 className="md:font-semibold font-medium md:text-2xl sm:text-xl text-lg">Apply Serum</h3>
                        <p className='text-lg'>Boost your results with our Lumin Elixir Activating Serum, expertly formulated to enhance the Wand's efficacy and glide on your skin.</p>
                    </div>
                    <div className="font-light space-y-2">
                        <img src={p3} className="mb-4"/>
                        <h4 className="px-3 py-2 tracking-widest uppercase md:text-xl text-base bg-black text-white inline rounded-md">Step 3</h4>
                        <h3 className="md:font-semibold font-medium md:text-2xl sm:text-xl text-lg">Lumin Glow</h3>
                        <p className='text-lg'>Glide the Lumin Glow Wand on moist skin in upward, outward motions. Use for 3 mins per skin area.</p>
                    </div>
                    <div className="font-light space-y-2">
                        <img src={p4} className="mb-4"/>
                        <h4 className="px-3 py-2 tracking-widest uppercase md:text-xl text-base bg-black text-white inline rounded-md">Step 4</h4>
                        <h3 className="md:font-semibold font-medium md:text-2xl sm:text-xl text-lg">Moisturize</h3>
                        <p className='text-lg'>Apply your favorite moisturizer or cream generously over your face, neck, and décolleté to lock in hydration.</p>
                    </div>
                </div>
            </div>
            <div className="flex justify-center md:hidden">
                <div className="grid grid-cols-1 gap-3 justify-center max-w-screen-xl">
                    <div className="grid grid-cols-2 font-light gap-3">
                        <img src={p1} className="mb-4 "/>
                        <div className="justify-center flex flex-col gap-2">
                            <div>
                                <h4 className="px-3 py-2 tracking-widest uppercase md:text-xl text-base bg-black text-white inline rounded-md">Step 1</h4>
                            </div>
                            <h3 className="md:font-semibold font-medium md:text-2xl sm:text-xl text-lg">Cleanse</h3>
                            <p className='md:text-base text-sm'>Gently cleanse with a balancing cleanser and lukewarm water, then pat dry for best results. </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 font-light gap-3">
                        <img src={p2} className="mb-4 "/>
                        <div className="justify-center flex flex-col gap-2">
                            <div>
                                <h4 className="px-3 py-2 tracking-widest uppercase md:text-xl text-base bg-black text-white inline rounded-md">Step 2</h4>
                            </div>
                            <h3 className ="md:font-semibold font-medium md:text-2xl sm:text-xl text-lg">Apply Serum</h3>
                            <p className='md:text-base text-sm'>Boost your results with our Lumin Elixir Activating Serum, expertly formulated to enhance the Wand's efficacy and glide on your skin.</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 font-light gap-3">
                        <img src={p3} className="mb-4 "/>
                        <div className="justify-center flex flex-col gap-2">
                            <div>
                                <h4 className="px-3 py-2 tracking-widest uppercase md:text-xl text-base bg-black text-white inline rounded-md">Step 3</h4>
                            </div>
                            <h3 className ="md:font-semibold font-medium md:text-2xl sm:text-xl text-lg">Lumin Glow</h3>
                            <p className='md:text-base text-sm'>Glide the Lumin Glow Wand on moist skin in upward, outward motions. Use for 3 mins per skin area.</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 font-light gap-3">
                        <img src={p4} className="mb-4"/>
                        <div className="justify-center flex flex-col gap-2">
                            <div>
                                <h4 className="px-3 py-2 tracking-widest uppercase md:text-xl text-base bg-black text-white inline rounded-md">Step 4</h4>
                            </div>
                            <h3 className="md:font-semibold font-medium md:text-2xl sm:text-xl text-lg">Moisturize</h3>
                            <p className='md:text-base text-sm'>Apply your favorite moisturizer or cream generously over your face, neck, and décolleté to lock in hydration.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}