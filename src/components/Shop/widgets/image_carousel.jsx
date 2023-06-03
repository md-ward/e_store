import React, { useState, useMemo, useEffect } from 'react';

const ImageCarousel = ({ images, productInfo }) => {
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNext = () => {
    setCurrentImageIndex((currentImageIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentImageIndex((currentImageIndex - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const renderedImages = useMemo(
    () =>
      images.map((image, index) => (
        <div
          key={index}
          className={`rounded-lg   ring-4 ring-dark-blue ring-offset-1 p-1  bg-gray-600 absolute top-0 grid grid-cols-1 sm:grid-cols-2  grid-rows-1 max-sm:grid-rows-2   left-0 w-full h-full transition-opacity duration-500 ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
        >
          <div className='  h-full col-span-1 place-self-center sm:place-self-start'>
            <div className='p-4 text-white    sm:place-self-start'>
              <h2 className='text-3xl font-bold'>{productInfo.title}</h2>
              <p className='text-lg'>{productInfo.description}</p>
            </div>
          </div>
          <div className='  w-full h-full p-4 '>
            <img src={image.src}   alt={`Image ${index}`} className='object-contain w-full h-full    shadow-white  rounded-lg   ' />
          </div>
        </div>
      )),
    [images, currentImageIndex, productInfo]
  );

  const dots = useMemo(
    () =>
      images.map((_, index) => (
        <button
          key={index}
          className={`inline-block w-2 h-2 rounded-full mx-2 ${index === currentImageIndex ? 'bg-white' : 'bg-gray-400'
            }`}
          onClick={() => setCurrentImageIndex(index)}
        />
      )),
    [images, currentImageIndex]
  );

  return (
    <div className='relative h-full w-full flex flex-row-reverse  '>
      <div className='relative h-full w-full'>{renderedImages}</div>
      <div className='absolute bottom-2 left-0 w-full flex justify-center  '>
        {dots}
      </div>
    </div>
  );
};

export default ImageCarousel;