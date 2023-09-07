import wand from '../styles/Export/white-pink-red.png'

export function SkincareWand(){
    return(
            <div className='bg-white md:p-6 md:pb-0 md:pt-8 sm:p-4 p-2 pt-2 pb-0 '>        
                <div className='md:text-4xl md:flex sm:text-3xl text-2xl hidden text-black font-light justify-center md:gap-2 gap-0'>
                    <h2 className=""> The Worlds </h2>
                    <h2 className="font-semibold"> Best </h2>
                    <h2 className=""> Skincare Wand.</h2>
                </div>

                {/* Responsive */}
                <div className="md:hidden md:mb-0 mb-6">
                    <div className='md:text-4xl sm:text-3xl text-2xl flex text-black font-light justify-center gap-2'>
                        <h2 className=""> The Worlds </h2>
                        <h2 className="font-semibold"> Best </h2>
                    </div>
                    <div className='md:text-4xl sm:text-3xl text-2xl flex text-black font-light justify-center gap-2'>
                        <h2 className=""> Skincare Wand.</h2>
                    </div>
                </div>

                <div className=' flex justify-center font-light md:p-4 p-0 md:pt-0 md:pb-0'>
                    <div className="grid md:grid-cols-3 grid-cols-5 gap-4 text-black text-center max-w-[350px] sm:max-w-full">
                        <div className='grid-rows-3 md:col-span-1 col-span-2 content-around self-center'>
                            <div className='md:mb-8 mb-5 sm:mr-0 -mr-2'>
                                <h2 className='bg-accent md:text-2xl sm:text-sm text-xs md:px-4 md:py-3 py-1 px-1 md:rounded-2xl rounded-full font-medium drop-shadow-md border border-taupe md:mb-1 mb-1'>Red Light Therapy</h2>
                                <h2 className='md:text-2xl md:block hidden'>Reduces fine lines & wrinkles</h2>
                                <h2 className='md:hidden text-xs'>Reduces fine lines <br/>& wrinkles.</h2>
                            </div>
                            <div className='md:mb-8 mb-5 sm:mr-0 -mr-2'>
                                <h2 className='bg-accent md:text-2xl sm:text-sm text-xs md:px-4 md:py-3 py-1 px-1 md:rounded-2xl rounded-full font-medium drop-shadow-md border border-taupe md:mb-1 mb-1'>Therapeutic Warmth</h2>
                                <h2 className='md:text-2xl hidden md:block'>Improves blood flow & boosts <br/>skin radiance</h2>
                                <h2 className='md:hidden text-xs'>Improves blood flow &  <br/>boosts skin radiance.</h2>
                            </div>
                            <div className='md:mb-8 mb-5 sm:mr-0 -mr-2'>
                                <h2 className='bg-accent md:text-2xl sm:text-sm text-xs md:px-4 md:py-3 py-1 px-1 md:rounded-2xl rounded-full font-medium drop-shadow-md border border-taupe md:mb-1 mb-1'>Facial Massage</h2>
                                <h2 className='md:text-2xl hidden md:block'>Decreases swelling & puffiness</h2>
                                <h2 className='md:hidden text-xs'>Decreases swelling & <br/>puffiness.</h2>
                            </div>
                        </div>
                        <div className='flex justify-center -mx-8 sm:-mt-0 sm:-mb-0 -mt-4 col-span-1'>
                            <img className="object-contain md:max-h-[42em]" src={wand}/>
                        </div>
                        <div className='grid-rows-3 content-around self-center md:col-span-1 col-span-2'>
                            <div className='md:mb-8 mb-5 sm:mr-0 -ml-2'>
                                <h2 className='bg-accent md:text-2xl sm:text-sm text-xs md:px-4 md:py-3 py-1 px-2 md:rounded-2xl rounded-full font-medium drop-shadow-md border border-taupe md:mb-1 mb-1'>Blue Light Therapy</h2>
                                <h2 className='md:text-2xl sm:text-sm text-xs'>Kills bacteria & reduces acne/breakouts.</h2>
                            </div>
                            <div className='md:mb-8 mb-5 sm:mr-0 -ml-2'>
                                <h2 className='bg-accent md:text-2xl sm:text-sm text-xs md:px-4 md:py-3 py-1 px-2 md:rounded-2xl rounded-full font-medium drop-shadow-md border border-taupe md:mb-1 mb-0'>Microcurrent</h2>
                                <h2 className='md:text-2xl sm:text-sm text-xs'>Stimulates facial muscles<br/>& tones skin.</h2>
                            </div>
                            <div className='md:mb-8 mb-5 sm:mr-0 -ml-2'>
                                <h2 className='hidden md:flex bg-accent md:text-2xl justify-center text-sm md:px-4 md:py-3 py-1 px-2 md:rounded-2xl rounded-full font-medium drop-shadow-md border border-taupe md:mb-1 mb-1'>Automatic 5- Minute Timer</h2>
                                <h2 className='flex md:hidden justify-center bg-accent md:text-2xl sm:text-sm text-xs md:px-4 md:py-3 py-1 px-2 md:rounded-2xl rounded-full font-medium drop-shadow-md border border-taupe md:mb-1 mb-1'>Auto 5-Min Timer</h2>
                                <h2 className='md:text-2xl sm:text-sm text-xs'>Ensures precise & accurate treatment.</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>        
    )
}
