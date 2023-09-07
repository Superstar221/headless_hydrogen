import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, CarouselContext } from "pure-react-carousel";
import React, { useContext, useEffect, useState } from 'react';
import result1 from '../styles/Export/result1.png';
import result2 from '../styles/Export/result2.png';
import result3 from '../styles/Export/result3.png';
import result4 from '../styles/Export/results/1.png'
import result5 from '../styles/Export/results/2.png'
import result6 from '../styles/Export/results/3.png'
import result7 from '../styles/Export/results/4.png'
import result8 from '../styles/Export/results/5.png'
import result9 from '../styles/Export/results/6.png'
import result10 from '../styles/Export/results/7.png'
import result11 from '../styles/Export/results/8.png'
import result12 from '../styles/Export/results/9.png'
import result13 from '../styles/Export/results/10.png'
import result14 from '../styles/Export/results/11.png'
import result15 from '../styles/Export/results/12.png'
import result16 from '../styles/Export/results/13.png'
import result17 from '../styles/Export/results/14.png'
import result18 from '../styles/Export/results/15.png'
import result19 from '../styles/Export/results/16.png'
import result20 from '../styles/Export/results/17.png'
import result21 from '../styles/Export/results/18.png'
import result22 from '../styles/Export/results/19.png'
import arrowLeft from '../styles/Export/icons/arrow-left.svg';
import arrowRight from '../styles/Export/icons/arrow-right.svg';
import { SliderButtons } from '~/components'

import Carousel from "react-simply-carousel";

export function Results() {
  const images = [result17,result13, result1, result2, result3, result4, result5, result6, result7, result8, result9, result10, result12,  result14, result15, result16, result18, result19, result20,result22, result21,result11 ]
  return (
    <div className='bg-accent flex flex-col items-center md:py-12 py-4 md:pb-16'>
      <div className='font-medium text-black flex gap-1 md:text-4xl text-2xl -mb-10 md:mb-0'>
        Fulfilling Results.
      </div>
      <div className=" flex justify-center w-full">
        <div className="md:px-20 md:py-8 py-0 w-full lg:w-full">
          {/* Carousel for Small-Sized Screen */}
          <SliderButtons
            media={images}
          /> 
          <div className="md:-my-12 ">
            <SliderButtons
              media={images}
              variant="2"
            />
          </div>
        </div>
      </div>
    </div>
  )
}