import { Button } from "./Button"
import { Slider } from "./Slider"
import stars from "../styles/Export/icons/stars.svg"
import {Video} from '@shopify/hydrogen-react';
import {
    Link} from '~/components'

import React from 'react'
import ReactPlayer from 'react-player'

import heroVideo from "../styles/Export/FS_Main_Header.mp4"
import heroVideoWebm from "../styles/Export/FS_Main_Header.webm"
import heroPoster from "../styles/Export/heroPoster.png"

export function HeroBanner(){
  return(
    <>
      <div className="lg:grid content-between lg:grid-cols-2 flex flex-col-reverse bg-white text-black lg:mt-20 mt-0">
        <div className="flex justify-center">
          <div className="md:p-5 md:py-6 px-3 py-3 lg:max-w-[36em] md:max-w-md space-y-2 align-middle flex flex-col justify-center max-w-[20em]">
              <div className="flex gap-2 md:justify-start justify-center align-middle -mb-2">
                <img src={stars} className='sm:h-6 h-5'/>
                <p className="sm:text-lg text-base font-light">(320+) Reviews</p>
              </div>
              <span className="flex lg:flex-row flex-col md:gap-2 gap-0 sm:text-4xl text-3xl">
                <h1 className="font-semibold md:text-left text-center tracking-wider lg:flex hidden">
                    Love your skin
                </h1>
                <h1 className="font-light md:text-left text-center lg:flex hidden">
                    in 2 Weeks!
                </h1>
                <h1 className="font-semibold leading-none tracking-tight md:text-left text-center lg:hidden w-full text-[32px]">
                  Love your<br/>skin in 2 weeks!
                </h1>
              </span>
              <p className="lg:text-2xl sm:text-xl text-base font-neue text-center md:text-left leading-5">
                Reduce the appearance of <b>fine lines</b>, <b>wrinkles</b>, <b>blemishes, puffiness, acne </b>and experience a spa-like facial <b>at home!</b>
              </p>
              <Link
              to='/collections/frontpage'
              prefetch="intent"
              >
                <Button className="text-xl font-light rounded-full bg-background text-white hover:opacity-90 transition-all px-8 py-2 w-full uppercase" >
                    Shop Now
                </Button>
              </Link>
              <div className='flex w-full md:text-base lg:text-lg sm:text-base text-sm self-center justify-center md:gap-4 gap-1 font-neue'>
                <span>30 Day Trial  •  1 Year Warranty  •  Free Shipping</span>
              </div>
          </div>
        </div>
        <div className="object-cover player-wrapper align-top ">
          <div className=" object-cover">
            <video className="object-cover w-full h-full lg:max-h-[45em] md:max-h-[30em] max-h-[16em]" preload="none" poster={heroPoster} loop autoPlay muted playsInline>
              <source src={heroVideo} type="video/mp4"/>
              <source src={heroVideoWebm} type="video/webm"/>
            </video>
          </div>
        </div>
      </div>

      <div>
        <Slider/>
      </div>
    </>
  )
}