import result1 from '../styles/Export/test1.svg';
import result2 from '../styles/Export/test2.svg';
import result3 from '../styles/Export/test3.svg';
import arrowLeft from '../styles/Export/icons/arrow-left.svg';
import arrowRight from '../styles/Export/icons/arrow-right.svg';
import {SliderButtons} from '~/components'

import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, CarouselContext, Dot, DotGroup} from "pure-react-carousel";
import React, { useContext, useEffect } from "react";
import {Image} from '@shopify/hydrogen';
import {useState} from "react";
import "pure-react-carousel/dist/react-carousel.es.css";
import circle from '../styles/Export/icons/circle1.svg'

export function Testimonials (){
    const images = [result1, result2, result3,result1, result2, result3]
    return(
        <div className='bg-taupe flex flex-col items-center md:py-12 py-6'>
            <div className='font-semibold text-black flex gap-1 md:text-4xl text-2xl -mb-12 md:mb-0'>
                <div className="font-light">
                    Glow like 
                </div>
                <div className="">
                    Never Before At Home. 
                </div>
            </div>
            <div className=" flex justify-center w-full md:-my-8">
                <div className="md:px-20 py-4 w-full lg:w-full">
                    {/* Carousel for Small-Sized Screen */}
                    <SliderButtons
                      media={images}
                      className="lg:col-span-1 md:hidden block"
                    />

                    {/* Carousel for Medium and Large-Sized Screen */}
                    <SliderButtons
                      media={images}
                      variant="2"
                    />
                </div>
            </div>
        </div>
    )
}