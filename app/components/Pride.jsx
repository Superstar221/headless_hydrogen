import i1 from '../styles/Export/Icons-04.png'
import i2 from '../styles/Export/Icons-06.png'
import i3 from '../styles/Export/Icons-10.png'
import i4 from '../styles/Export/Icons-12.png'
import React, { useContext, useEffect } from "react";
import {Image} from '@shopify/hydrogen';
import {useState} from "react";
import "pure-react-carousel/dist/react-carousel.es.css";
import circle from '../styles/Export/icons/circle1.svg'
import arrowLeft from '../styles/Export/icons/arrow-left.svg';
import arrowRight from '../styles/Export/icons/arrow-right.svg';

import { useRef } from "react";

import { register } from 'swiper/element/bundle';

register();

export function Pride(){
    return(
        <div>
            <div className="bg-white flex flex-col items-center md:p-5 p-2">
                <div className="flex gap-1 text-3xl md:my-5 mt-5 text-black">
                    <h2 className="font-light">We</h2>
                    <h2 className="font-semibold">Pride</h2>
                    <h2 className="font-light hidden md:block">Ourselves.</h2>
                </div>
                <div className="flex gap-1 text-3xl mt-0 text-black">
                  <h2 className="font-light md:hidden">Ourselves.</h2>
                </div>
                {/* <h2 className="font-light text-2xl text-black md:hidden mb-5">Ourselves</h2> */}
                
                <div className="grid grid-cols-2 md:grid-cols-4 md:gap-8 gap-y-1 p-4 bg-white md:w-[40%] w-full">
                    <div className="slide px-3">
                        <img src={i1} alt="" />
                    </div>
                    <div className="slide px-3">
                        <img src={i2} alt="" />
                    </div>
                    <div className="slide px-3">
                        <img src={i3} alt="" />
                    </div>
                    <div className="slide px-3">
                        <img src={i4} alt="" />
                    </div>
                </div>
            </div>

        </div>
    )
}