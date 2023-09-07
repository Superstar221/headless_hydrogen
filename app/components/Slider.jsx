import i1 from '../styles/Export/icon1.png'
import i2 from '../styles/Export/icon2.png'
import i3 from '../styles/Export/icon3.png'
import i4 from '../styles/Export/icon4.png'

export function Slider(){
    return(

        <div className="w-full bg-white border border-white align-middle -mr-96 overflow-hidden">
            <div className="mt-4 overflow-hidden relative w-full mb-4">
                <ul className="flex md:w-[calc(300px*15)] w-[calc(250px*15)] animate-scroll gap-4">
                    <li><img className="lg:h-[50px] h-[40px]" src={i1}/></li>
                    <li><img className="lg:h-[50px] h-[40px]" src={i2}/></li>
                    <li><img className="lg:h-[50px] h-[40px]" src={i3}/></li>
                    <li><img className="lg:h-[50px] h-[40px]" src={i4}/></li>
                    <li><img className="lg:h-[50px] h-[40px]" src={i1}/></li>
                    <li><img className="lg:h-[50px] h-[40px]" src={i2}/></li>
                    <li><img className="lg:h-[50px] h-[40px]" src={i3}/></li>
                    <li><img className="lg:h-[50px] h-[40px]" src={i4}/></li>
                    <li><img className="lg:h-[50px] h-[40px]" src={i1}/></li>
                    <li><img className="lg:h-[50px] h-[40px]" src={i2}/></li>
                    <li><img className="lg:h-[50px] h-[40px]" src={i3}/></li>
                    <li><img className="lg:h-[50px] h-[40px]" src={i4}/></li>
                    <li><img className="lg:h-[50px] h-[40px]" src={i1}/></li>
                    <li><img className="lg:h-[50px] h-[40px]" src={i2}/></li>
                    <li><img className="lg:h-[50px] h-[40px]" src={i3}/></li>
                    <li><img className="lg:h-[50px] h-[40px]" src={i4}/></li>
                </ul>
            </div>
        </div>
    )
}