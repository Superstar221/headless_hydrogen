import {Link} from '~/components'

export function FeelFulfilled() {
    return (
      <>
        <div className="bg-background flex flex-col justify-center md:p-16 p-5 py-8">
            <div className="flex gap-1 md:text-4xl text-3xl mb-5 self-center">
              <h2 className="font-light">Best</h2>
              <h2 className="font-semibold">Sellers</h2>
            </div>
            <div className="grid md:grid-cols-3 grid-cols-1 gap-5 font-neue align-middle text-center self-center max-w-screen-xl w-full">
              <Link
              to='/products/lumin-kit'
              prefetch="intent"
              >
                <div className='aspect-square flex-col rounded-2xl flex border border-accent justify-between bg-[url("../styles/Export/icons/ReadyDiffDimensions.png")] bg-opacity-70 bg-cover p-3 pb-5 bg-center relative hover:border-white hover:border-2 transition-all'>
                  <div className="absolute top-0 right-0 z-10 aspect-square bg-white rounded-full m-4">
                    <div className="z-1 flex flex-col gap-[2px] md:text-lg text-base p-2 pb-0 px-3 text-center font-neue text-black">
                      <h3>Best</h3>
                      <h3 className="-mt-2">Offer!</h3>
                    </div>
                  </div>
                  <div>
                    <h3 className="md:text-4xl text-2xl font-medium">Lumin Kit</h3>
                    <h6 className="text-sm capitalize font-light">THE PERFECT BUNDLE</h6>
                  </div>
                  <div>
                    <button className="bg-white text-black rounded-full py-2 px-5 hover:bg-background hover:text-white transition-all">SHOP NOW</button>
                  </div>
                </div>
              </Link>
              <Link
              to='/products/lumin-glow'
              prefetch="intent"
              >
                <div className='w-full  aspect-square flex-col border rounded-2xl pb-5 border-taupe bg-[url("../styles/Export/wand2.png")] bg-cover flex justify-between bg-center p-3 hover:border-white hover:border-2 transition-all'>
                      
                    <div>
                      <h3 className="md:text-4xl text-2xl font-medium">Lumin Glow</h3>
                      <h6 className="text-sm capitalize font-light">5 IN 1 SKINCARE WAND</h6>
                    </div>
                    <div>
                      <button className="bg-white text-black rounded-full py-2 px-5 hover:bg-background hover:text-white transition-all">SHOP NOW</button>
                    </div>
                </div>
              </Link>
              <Link
                to='/products/lumin-elixir'
                prefetch="intent"
                >
                <div className='w-full  aspect-square flex-col rounded-2xl pb-5 border border-taupe flex justify-between bg-[url("../styles/Export/serum2.png")] bg-cover bg-center p-3 hover:border-white hover:border-2 transition-all'>
                    <div>
                        <h3 className="md:text-4xl text-2xl font-medium">Lumin Elixir</h3>
                        <h6 className="text-sm capitalize font-light">HYALURONIC ACID 2% + B5</h6>
                    </div>
                    <div>
                            <button className="bg-white text-black rounded-full py-2 px-5 hover:bg-background hover:text-white transition-all">SHOP NOW</button>
                    </div>
                </div>
              </Link>
            </div>            
        </div>
      </>
    );
}