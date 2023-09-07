import React, { useContext, useEffect } from "react";
import {Image} from '@shopify/hydrogen';
import {useState} from "react";
import "pure-react-carousel/dist/react-carousel.es.css";
import circle from '../styles/Export/icons/circle1.svg'
import arrowLeft from '../styles/Export/icons/arrow-left.svg';
import arrowRight from '../styles/Export/icons/arrow-right.svg';

import Carousel from "react-simply-carousel";

import { useRef } from "react";

import { register } from 'swiper/element/bundle';

register();

export function SliderButtons({media, variant}) {
  if (!media.length) {
    return null;
  }
  
  if(variant == "1"){
    return(
      <CarouselDotsMobile media={media}/>
    )
  }
  
  if(variant == "2"){
    return(
      <CarouselButtonsDesktop media={media}/>
    )
  }

  // const swiperRef = useRef(null);


  // useEffect(() => {
  //   const swiperContainer = swiperRef.current;
  //   const params = {
  //     navigation: true,
  //     pagination: true,
  //     //add this
  //     injectStyles: [
  //       `
  //         .swiper-button-next,
  //         .swiper-button-prev {
  //           min-width: 50%;
  //         }
  //         .swiper-slide-active{
  //           transition-property: all; 
  //           --transform-scale-x: .9;
  //           --transform-scale-y: .9; 
  //         }

  //     `,
  //     ],
  //   };

  //   Object.assign(swiperContainer, params);
  //   swiperContainer.initialize();
  // }, []);

  return (
    <>
      <CarouselButtonsMobile media={media}/>
    </>
  );
}


export function CarouselDotsMobile({media, className}) {
  if (!media.length) {
    return null;
  }

  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <>
      <div className="md:hidden block">
        <Carousel
          containerProps={{
            style: {
              width: "100vw",
              justifyContent: "center",
              userSelect: "none",
              position:"relative"
            }
          }}
          autoplay={true}
          delay={600}
          swipeTreshold={60}
          activeSlideIndex={activeSlide}
          onRequestChange={setActiveSlide}
          dotsNav={{
            show: false,
            itemBtnProps: {
              style: {
                margin:2,
                height: 10,
                width: 10,
                borderRadius: "50%",
                border: 0,
                background: "grey"
              }
            },
            activeItemBtnProps: {
              style: {
                margin:2,
                height: 10,
                width: 10,
                borderRadius: "50%",
                border: 0,
                background: "black"
              }
            }
          }}
          itemsToShow={3}
          speed={400}
          centerMode
        >
          {media.map((med, i) => {
            return (
              <div
                className="min-w-[150px] p-3 flex flex-col justify-center pt-4"
                key={i}
              >
                <div className="lg:mr-7 w-full ">
                  <div className="flex justify-center w-full h-full ">
                    <img src={media[i]} className=''/>
                  </div>
                </div>
              </div>
            );
          } ) }

        </Carousel>
      </div>
      

    </>
  );
}
export function CarouselButtonsMobile({media, className}) {
  if (!media.length) {
    return null;
  }

  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <>
      <div className="md:hidden block">
        <Carousel
          containerProps={{
            style: {
              width: "100vw",
              justifyContent: "center",
              userSelect: "none",
              position:"relative"
            }
          }}
          showSlidesBeforeInit={true}
          centerMode
          preventScrollOnSwipe={false}
          swipeTreshold={60}
          activeSlideIndex={activeSlide}
          activeSlideProps={{
            style: {
              transform: "scale(1.1)",
              transition: "width 0.5s ease, height 0.5s ease, transform 0.5s ease",
            }
          }}
          onRequestChange={setActiveSlide}
          forwardBtnProps={{
            children: <img src={arrowRight} className=" w-8 h-8 p-2 mr-2 bg-white rounded-full absolute right-0 self-center"/>,
          }}
          backwardBtnProps={{
            children: <img src={arrowLeft} className=" w-8 h-8 p-2 ml-2 bg-white rounded-full absolute left-0 self-center z-10"/>,
          }}
          itemsToShow={2}
          speed={400}
          centerMode
        >
          {media.map((med, i) => {
            return (
              <div
                className="min-w-[300px] aspect-square p-3 flex flex-col justify-center pt-12"
                key={i}
              >
                <div className="lg:mr-7 w-full ">
                  <div className="flex justify-center w-full h-full ">
                    <img src={media[i]} className=''/>
                  </div>
                </div>
              </div>
            );
          } ) }

        </Carousel>
      </div>
      

    </>
  );
}


export function CarouselButtonsDesktop({media, className}) {
  if (!media.length) {
    return null;
  }

  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <>
      <div className="hidden md:block">
        <Carousel
          containerProps={{
            style: {
              width: "100%",
              justifyContent: "center",
              userSelect: "none",
              position:"relative"
            }
          }}
          preventScrollOnSwipe
          centerMode 
          swipeTreshold={60}
          showSlidesBeforeInit={true}
          activeSlideIndex={activeSlide}
          activeSlideProps={{
            style: {
              opacity:"1",
              transform: "scale(1.1)",
              transition: "width 0.5s ease, height 0.5s ease, opacity 0.5s ease, transform 0.5s ease",
            }
          }}
          onRequestChange={setActiveSlide}
          forwardBtnProps={{
            children: <img src={arrowRight} className=" w-8 h-8 mr-2 rounded-full self-center z-10"/>,
          }}
          backwardBtnProps={{
            children: <img src={arrowLeft} className=" w-8 h-8 ml-2 rounded-full self-center z-10"/>,
          }}
          itemsToShow={3}
          speed={400}
          centerMode
        >
          {media.map((med, i) => {
            return (
              <div
                className="2xl:min-w-[420px] xl:min-w-[370px] lg:min-w-[270px] md:min-w-[200px] aspect-square p-3 flex flex-col justify-center opacity-85"
                key={i}
              >
                <div className="w-full mr-3">
                  <div className="flex justify-center w-full h-full ">
                    <img src={media[i]} className='p-2'/>
                  </div>
                </div>
              </div>
            );
          } ) }

        </Carousel>
      </div>

    </>
  );
}