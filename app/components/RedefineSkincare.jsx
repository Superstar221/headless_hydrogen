import i1 from '../styles/Export/icons-3.png'
import i2 from '../styles/Export/icons-2.png'
import i3 from '../styles/Export/icons-1.png'


export function RedefineSkincare(){
    return(
        <div className="bg-white flex flex-col items-center p-5">
            <div className="my-5 md:block hidden">
                <div className="flex gap-1 text-3xl text-black justify-center">
                    <h2 className="font-semibold">FULFLD</h2>
                    <h2 className="font-light">redefines skincare with medical-grade </h2>
                </div>
                <div className='flex gap-1 text-3xl text-black justify-center'>
                    <h2 className="font-light">LED light therapy proven to enhance your natural skin.</h2>
                </div>
            </div>
            
            <div className="mt-5 mb-3 md:hidden">
                <div className="flex gap-1 text-xl text-black justify-center">
                    <h2 className="font-semibold">FULFLD</h2>
                    <h2 className="font-light">redefines skincare with</h2>
                </div>
                <div className='flex gap-1 text-xl text-black justify-center'>
                    <h2 className="font-light">medical-grade LED light therapy</h2>
                </div>
                <div className='flex gap-1 text-xl text-black justify-center'>
                    <h2 className="font-light">proven to enhance your natural skin.</h2>
                </div>
            </div>
            
            <div className="grid md:grid-cols-3 grid-cols-3 md:gap-8 gap-y-1 gap-2 p-4 bg-white md:w-[35%] w-full">
                <div className="slide flex justify-center">
                    <img src={i1} height="40" alt="" />
                </div>
                <div className="slide flex justify-center">
                    <img src={i2} height="40" alt="" />
                </div>
                <div className="slide flex justify-center">
                    <img src={i3} height="40" alt="" />
                </div>
            </div>
        </div>
    )
}