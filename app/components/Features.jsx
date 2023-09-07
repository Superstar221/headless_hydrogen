import i1 from '../styles/Export/icons/1.svg'
import i2 from '../styles/Export/icons/2.svg'
import i3 from '../styles/Export/icons/5.svg'
import i4 from '../styles/Export/icons/6.svg'
import i5 from '../styles/Export/icons/3.svg'
import i6 from '../styles/Export/icons/4.svg'
import i7 from '../styles/Export/icons/7.svg'
import i8 from '../styles/Export/icons/8.svg'
import i9 from '../styles/Export/icons/9.svg'
import i10 from '../styles/Export/icons/10.svg'

import i11 from '../styles/Export/icons/switzerland.svg'
import { useLocation } from "react-router-dom"

export function Features({variant}){
    if(variant=="1"){
        return <Variant1/>
    }
    else{
        return <Variant2/>
    }
}

function Variant1(){
    return(
        <div className="font md:text-lg sm:text-base text-sm font-light grid md:grid-cols-3 grid-cols-2 gap-y-3 p-4 py-0">
            <div className='flex gap-1'>
                <img src={i10} className='md:h-8 sm:h-7 h-6'/>
                <h4>Vegan</h4>
            </div>
            <div className='flex gap-1'>
                <img src={i9} className='md:h-8 sm:h-7 h-6'/>
                <h4>Cruelty-free</h4>
            </div>
            <div className='md:flex hidden gap-2'>
                <img src={i8} className='md:h-8 sm:h-7 h-6'/>
                <h4>Fragrance-free</h4>
            </div>
            <div className='gap-2 md:flex md:col-span-2 hidden'>
                <img src={i7} className='md:h-8 sm:h-7 h-6'/>
                <h4>Recommended monthly use: 30 ml / 1 fl oz.</h4>
            </div>
            <div className='md:hidden flex gap-2'>
                <img src={i8} className='md:h-8 sm:h-7 h-6'/>
                <h4>Fragrance-free</h4>
            </div>
            <div className='flex gap-1'>
                <img src={i11} className='md:h-8 sm:h-7 h-6'/>
                <h4>Made in Switzerland</h4>
            </div>
        </div>
    )
}

function Variant2(){
    return(
        <>
            <div className='grid grid-cols-10 md:gap-y-2 align-middle md:text-lg sm:text-base text-sm font-light gap-y-3 p-4 pr-0 md:pr-4 py-0'>
                <div className='flex gap-1 md:col-span-4 col-span-6'>
                    <img src={i6} className='md:h-8 sm:h-6 h-5'/>
                    <h4>Boost serums & creams</h4>
                </div>
                <div className='flex gap-1 md:col-span-3 col-span-4'>
                    <img src={i2} className='md:h-8 sm:h-6 h-5'/>
                    <h4>Fade Blemishes</h4>
                </div>
                <div className='flex gap-1 md:col-span-3 col-span-6'>
                    <img src={i1} className='md:h-8 sm:h-6 h-5'/>
                    <h4>Glowing skin</h4>
                </div>
                <div className='md:flex hidden gap-1 md:col-span-4 col-span-6'>
                    <img src={i3} className='md:h-8 sm:h-6 h-5'/>
                    <h4>Lifted & Toned Appearance</h4>
                </div>
                <div className='flex gap-1 md:col-span-3 col-span-4'>
                    <img src={i5} className='md:h-8 sm:h-6 h-5'/>
                    <h4>Smooth fine lines</h4>
                </div>
                <div className='flex md:hidden gap-1 md:col-span-4 col-span-6'>
                    <img src={i3} className='md:h-8 sm:h-6 h-5'/>
                    <h4>Lifted & Toned Appearance</h4>
                </div>
                <div className='flex gap-1 md:col-span-3 col-span-4'>
                    <img src={i4} className='md:h-8 sm:h-6 h-5'/>
                    <h4>De-Puff</h4>
                </div>
                
                
            </div>
        </>
    )
}