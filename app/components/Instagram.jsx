import o1 from '../styles/Export/Insta/1.png'
import o2 from '../styles/Export/Insta/2.png'
import o3 from '../styles/Export/Insta/3.png'
import o4 from '../styles/Export/Insta/4.png'
import o5 from '../styles/Export/Insta/5.png'
import o6 from '../styles/Export/Insta/6.png'
import o7 from '../styles/Export/Insta/7.png'
import o8 from '../styles/Export/Insta/8.png'
import o9 from '../styles/Export/Insta/9.png'
import { Link } from "react-router-dom";

export function Instagram(){
    return(
        <>
            <div className='md:w-half w-full md:text-4xl sm:text-3xl text-2xl text-background flex md:justify-start justify-center gap-2 md:pl-16 pl-0 pt-8 pb-4 z-0'>
                <h2 className="font-light">Follow us on our </h2>
                <h2 className="font-semibold">
                    <Link to="https://www.instagram.com/fulfldskin/">
                    Instagram
                    </Link>
                </h2>
            </div>
            <div className="w-full z-0">
                <div className="h-auto m-auto overflow-hidden relative w-auto " onClick="https://www.instagram.com/fulfldskin/">
                    <Link to="https://www.instagram.com/fulfldskin/">
                    <ul className="flex lg:w-[calc(300px*12)] 2xl:[calc(500px*12)]  md:w-[calc(300px*12)] w-[calc(200px*12)] animate-scroll cursor-pointer">
                        <li className="md:w-[300px] w-[200px] m-2"><img className='md:w-[300px] w-[200px] rounded-lg object-cover aspect-square' src={o1}/></li>
                        <li className="md:w-[300px] w-[200px] m-2"><img className='md:w-[300px] w-[200px] rounded-lg object-cover aspect-square' src={o2}/></li>
                        <li className="md:w-[300px] w-[200px] m-2"><img className='md:w-[300px] w-[200px] rounded-lg object-cover aspect-square' src={o3}/></li>
                        <li className="md:w-[300px] w-[200px] m-2"><img className='md:w-[300px] w-[200px] rounded-lg object-cover aspect-square' src={o4}/></li>
                        <li className="md:w-[300px] w-[200px] m-2"><img className='md:w-[300px] w-[200px] rounded-lg object-cover aspect-square' src={o5}/></li>
                        <li className="md:w-[300px] w-[200px] m-2"><img className='md:w-[300px] w-[200px] rounded-lg object-cover aspect-square' src={o6}/></li>
                        <li className="md:w-[300px] w-[200px] m-2"><img className='md:w-[300px] w-[200px] rounded-lg object-cover aspect-square' src={o7}/></li>
                        <li className="md:w-[300px] w-[200px] m-2"><img className='md:w-[300px] w-[200px] rounded-lg object-cover aspect-square' src={o8}/></li>
                        <li className="md:w-[300px] w-[200px] m-2"><img className='md:w-[300px] w-[200px] rounded-lg object-cover aspect-square' src={o9}/></li>
                        <li className="md:w-[300px] w-[200px] m-2"><img className='md:w-[300px] w-[200px] rounded-lg object-cover aspect-square' src={o1}/></li>
                        <li className="md:w-[300px] w-[200px] m-2"><img className='md:w-[300px] w-[200px] rounded-lg object-cover aspect-square' src={o2}/></li>
                        <li className="md:w-[300px] w-[200px] m-2"><img className='md:w-[300px] w-[200px] rounded-lg object-cover aspect-square' src={o3}/></li>
                        <li className="md:w-[300px] w-[200px] m-2"><img className='md:w-[300px] w-[200px] rounded-lg object-cover aspect-square' src={o4}/></li>
                    </ul>
                    </Link>
                </div>
            </div>

        </>
    )
}