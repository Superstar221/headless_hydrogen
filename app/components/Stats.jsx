import stat1 from '../styles/Export/stats/s1.svg'
import stat2 from '../styles/Export/stats/s2.svg'
import stat3 from '../styles/Export/stats/s3.svg'
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, CarouselContext, Dot, DotGroup} from "pure-react-carousel";

import React, { useContext, useEffect } from "react";

import {Image} from '@shopify/hydrogen';
import {useState} from "react";
import "pure-react-carousel/dist/react-carousel.es.css";
import circle from '../styles/Export/icons/circle1.svg'
import arrowLeft from '../styles/Export/icons/arrow-left.svg';
import arrowRight from '../styles/Export/icons/arrow-right.svg';

import { SliderButtons } from './SliderButtons';


export function Stats(){
    const images= [stat1, stat2, stat3, stat1, stat2, stat3]
    return(
        <div className="bg-secondary flex flex-col items-center md:p-16 p-6 text-white ">
            <div className="flex gap-1 text-4xl md:mb-8 -mb-14">
                <h2 className="font-light">Did you know?</h2>
            </div>
            <div className="columns-3 w-full max-w-[90em] md:columns-1 gap-5 font-neue align-middle text-center md:flex flex-row hidden">
                <div className='w-full rounded-2xl border justify-center bg-taupe p-8'>
                    <div>
                        <h3 className="text-5xl font-semibold -mb-5">89%</h3>
                        <h6 className="text-2xl font-light "><br></br>Noticed a decrease in wrinkles and/or unhealthy looking skin*</h6>
                    </div>
                </div>
                <div className='w-full rounded-2xl border justify-center bg-taupe p-8'>
                    <div>
                        <h3 className="text-5xl font-semibold -mb-5">94%</h3>
                        <h6 className="text-2xl font-light "><br></br>Reported their skin looked overall healthier*</h6>
                    </div>
                </div>
                <div className='w-full rounded-2xl border justify-center bg-taupe p-8'>
                    <div>
                        <h3 className="text-5xl font-semibold -mb-5">89%</h3>
                        <h6 className="text-2xl font-light "><br></br>felt their skin was more rejuvenated, radiant, and had a youthful glow.*</h6>
                    </div>
                </div>
           </div>
           <div className=" md:hidden">
            <SliderButtons
              media={images}
              className="w-full"
            />
           </div>
           <div className="uppercase font-light md:text-lg text-sm tracking-wider md:mt-12 -mt-8 md:text-left text-center mb-3 md:mb-0">
           * *Based on a 35-subject consumer perception study after 12-weeks of use
           </div>
        </div>
    )
}

