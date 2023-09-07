import allure from '../styles/Export/Featured/allure.png'
import cosmopolitan from '../styles/Export/Featured/cosmopolitan.png'
import huffpost from '../styles/Export/Featured/huffpost.png'
import marieclaire from '../styles/Export/Featured/marieclaire.png'
import self from '../styles/Export/Featured/self.png'
import whowhatwear from '../styles/Export/Featured/whowhatwear.png'
import womenshealth from '../styles/Export/Featured/womenshealth.png'
import allure1 from '../styles/Export/Featured/Mobile/1.png'
import cosmopolitan1 from '../styles/Export/Featured/Mobile/2.png'
import huffpost1 from '../styles/Export/Featured/Mobile/3.png'
import marieclaire1 from '../styles/Export/Featured/Mobile/4.png'
import self1 from '../styles/Export/Featured/Mobile/5.png'
import whowhatwear1 from '../styles/Export/Featured/Mobile/6.png'
import womenshealth1 from '../styles/Export/Featured/Mobile/7.png'
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, CarouselContext, Dot, DotGroup} from "pure-react-carousel";

import React, { useContext, useEffect } from "react";

import {Image} from '@shopify/hydrogen';
import {useState} from "react";
import "pure-react-carousel/dist/react-carousel.es.css";
import circle from '../styles/Export/icons/circle1.svg'

import {SliderButtons} from '~/components'

export function FeaturedIn() {
  const images = [allure1, cosmopolitan1, huffpost1, marieclaire1, self1, whowhatwear1, womenshealth1];
    return (
        <div className='items-center bg-white p-8 '>
            <div className="flex justify-center">
                <div className="max-w-[150em] flex flex-col">
                    <div className="flex gap-1 md:text-4xl text-2xl md:my-8 my-4 text-black place-content-center">
                        <h2 className="font-light">FULFLD</h2>
                        <h2 className="font-semibold">Featured In</h2>
                    </div>
                    <div className='md:flex gap-8 p-4 border-t-taupe border-b-taupe place-content-around hidden'>
                        <div className="slide">
                            <img src={allure} className="h-10" alt="" />
                        </div>
                        <div className="slide">
                            <img src={cosmopolitan} className="h-10" alt="" />
                        </div>
                        <div className="slide">
                            <img src={huffpost} className="h-8" alt="" />
                        </div>
                        <div className="slide">
                            <img src={marieclaire} className="h-10" alt="" />
                        </div>
                        <div className="slide">
                            <img src={self} className="h-10" alt="" />
                        </div>
                        <div className="slide">
                            <img src={whowhatwear} className="h-12" alt="" />
                        </div>
                        <div className="slide">
                            <img src={womenshealth} className="h-10" alt="" />
                        </div>
                    </div>
                    <SliderButtons
                      media={images}
                      variant="1"
                      className="lg:col-span-1 md:hidden block"
                    />
                </div>
            </div>
        </div>
    )
}

export function ProductGallery({media, className, save}) {
  if (!media.length) {
    return null;
  }

  const [currentIndex, setCurrentIndex] = useState(0);

  function setIndex(index){
    setCurrentIndex(index);
  }

  const carouselContext = useContext(CarouselContext);
  const updateCarouselSlide = (slideToBeVisible) => {
    const {
      currentSlide,
      totalSlides,
      visibleSlides
    } = carouselContext.state;}

  return (
    <>
      <CarouselProvider className="relative block w-[160vw] -mx-[30vw] md:w-auto md:hidden overflow-hidden" naturalSlideWidth={100} isIntrinsicHeight={true} totalSlides={media.length} visibleSlides={3} step={1} infinite={true}>
        <div className="js-flickity flex md:grid flex-col-reverse md:justify-start justify-center items-start w-full md:grid-cols-6 ">
          <div className='mt-6 mb-4 z-30 md:mt-0 md:mb-0 md:z-auto all-dots flex flex-row justify-center md:hidden md:grid-cols-1 md:col-span-1 gap-2 w-full'>
            {media.map((med, i) => {
              return (
                <Dot slide={i} key={i}>
                  <img src={circle} className='sm:w-2 w-1.5'/>
                </Dot>
              );
            })}
          </div> 

          <div className="md:col-span-5 md:rounded-xl md:border md:border-taupe md:ml-2 relative w-full">
            <Slider>
              <div
                className={`w-full align-middle`}
              >
              {media.map((med, i) => {
                const style = [
                  'inline ',
                ].join(' ');
                
                return (
                  <div
                    className={style}
                    // @ts-ignore
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                  >
                    <Slide index={i}>
                      <div className="lg:mr-7 w-full ">
                        
                        <div className="relative w-full h-full lg:block hidden p-2">
                          <img src={media[i]} className='w-[90%] max-h-[20em]'/>
                        </div>

                        <div className="flex justify-center w-full h-full lg:hidden p-2">
                          <img src={media[i]} className='w-[90%] max-h-[20em]'/>
                        </div>
                      
                      </div>
                    </Slide>
                  </div>
                );
              } ) }
            </div>
            </Slider>
          </div>
        </div>
      </CarouselProvider>
    </>
  );
}