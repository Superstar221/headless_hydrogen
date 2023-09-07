import React, {useContext, useEffect} from 'react';

import {Image, Video, MediaFile} from '@shopify/hydrogen';
import {useState} from "react";
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, CarouselContext, Dot, DotGroup} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import circle from '../styles/Export/icons/circle1.svg'
import bestSeller from '../styles/Export/icons/bestSeller.svg'
import gradient from '../styles/Export/gradientSquare.png'
import {
  useLocation,
} from '@remix-run/react';


export function ProductGallery({media, className, save}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const location = useLocation();
  function findIndexWithAltText(array, text) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].alt === text) {
        return i;
      }
    }
    return -1;
  }
  useEffect(() => {
    const locationSearch = location.search.split('&')[0]

    if (locationSearch.split('=')[1]) {
      if (locationSearch.split('=')[1] === 'Pink') {
        setCurrentIndex(findIndexWithAltText(media, 'pink'));
      } else if (locationSearch.split('=')[1] === 'Black') {
        setCurrentIndex(findIndexWithAltText(media, 'black'));
      }
    }
    
    if (location.search.split('=')[1]) {
      if (location.search.split('=')[1] === 'Pink') {
        setCurrentIndex(findIndexWithAltText(media, 'pink'));
      } else if (location.search.split('=')[1] === 'Black') {
        setCurrentIndex(findIndexWithAltText(media, 'black'));
      }
    }
  }, [location.search]);

  const carouselContext = useContext(CarouselContext);
  const updateCarouselSlide = (slideToBeVisible) => {
    const {currentSlide, totalSlides, visibleSlides} = carouselContext.state;
  };

  return (
    <>
      <CarouselProvider
        className="relative block w-[100vw] md:w-auto"
        naturalSlideWidth={100}
        isIntrinsicHeight={true}
        totalSlides={media.length}
        visibleSlides={1}
        step={1}
        infinite={true}
        currentSlide={currentIndex}
      >
        <div className="js-flickity flex md:grid flex-col-reverse md:justify-start justify-center items-start w-full md:grid-cols-5 ">
          <div className="-mt-6 mb-4 z-30 md:mt-0 md:mb-0 md:z-auto all-dots flex flex-row justify-center md:hidden md:grid-cols-1 md:col-span-1 gap-2 w-full">
            {media.map((med, i) => {
              const data = {
                ...med,
                image: {
                  // @ts-ignore
                  ...med.image,
                  altText: med.alt || 'Product image',
                },
              };
              return (
                <Dot slide={i} key={med.id || med.image.id}>
                  <img src={circle} className="w-2" />
                </Dot>
              );
            })}
          </div> 
          <div className='-mt-6 mb-4 z-30 md:mt-0 md:mb-0 md:z-auto all-dots flex-row justify-center md:grid md:grid-cols-1 md:col-span-1 gap-2  2xl:max-h-[690px] xl:max-h-[440px] overflow-y-scroll no-scrollbar hidden pb-20'>
            <img src={gradient} className="absolute left-0 bottom-0 z-50 w-[20%] "/>
            {media.map((med, i) => {
              const data = {
                ...med,
                image: {
                  // @ts-ignore
                  ...med.image,
                  altText: med.alt || 'Product image',
                },
              };
              return (
                <Dot
                  slide={i}
                  key={med.id || med.image.id}
                  className="aspect-square"
                  onClick={() => setCurrentIndex(i)} //change index
                >
                  {med.image ? (
                    <Image
                      className="object-cover w-full h-full min-w-[100vw] md:min-w-0 aspect-square fadeIn rounded-xl border border-taupe"
                      data={data.image}
                      aspectRatio={undefined}
                      sizes={'min-width-[60px], 60vw, 90vw'}
                    />
                    ) :
                    <img className="object-cover w-full h-full min-w-[100vw] md:min-w-0 aspect-square fadeIn rounded-xl border border-taupe" src={med.previewImage.url}/>
                  }
                </Dot>
              );
            })}
          </div>

          <div className="md:col-span-4 md:ml-2 relative">
            {save && (
              <div className="absolute top-0 right-0 z-10 aspect-square bg-white opacity-80 rounded-full m-4 text-background">

                  {save == 59 ?
                    <div>
                      <img src={bestSeller} className="md:w-20 w-14"/>
                    </div>
                    :
                    <div className="z-1 lg:text-xl md:text-lg text-base p-3 px-5 text-center font-light">
                      <h3>SAVE</h3>
                      <h3 className="font-semibold">${save}</h3>
                    </div>
                  }
              </div>
            )}
            <Slider className='md:rounded-2xl md:border md:border-taupe '>
              <div className={`w-full `}>
                {media.map((med, i) => {
                  const data = {
                    ...med,
                    image: {
                      // @ts-ignore
                      ...med.image,
                      altText: med.alt || 'Product image',
                    },
                  };

                  const style = ['inline'].join(' ');

                  return (
                    <div
                      className={style}
                      // @ts-ignore
                      key={med.id || med.image.id}
                      onClick={() => setCurrentIndex(i)}
                    >
                      <Slide index={currentIndex}>
                        <div className="lg:mr-7 min-w-full h-full md:h-auto">
                          <div className="relative w-full aspect-square lg:block hidden">
                            <MediaFile
                              loading={currentIndex === 0 ? 'eager' : 'lazy'}
                              data={med}
                              sizes={'min-width-[60px], 60vw, 90vw'}
                              className="object-center object-cover h-full"
                            />
                          </div>
                          <div className="relative w-full h-full aspect-square lg:hidden">
                            <MediaFile
                              loading={currentIndex === 0 ? 'eager' : 'lazy'}
                              data={med}
                              sizes={'min-width-[60px], 60vw, 90vw'}
                              className="object-center object-cover min-w-[100vw] md:min-w-auto h-full "
                            />
                          </div>
                        </div>
                      </Slide>
                    </div>
                  );
                })}
              </div>
            </Slider>
          </div>
        </div>
      </CarouselProvider>
    </>
  );
}
