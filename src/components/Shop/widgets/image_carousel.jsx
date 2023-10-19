import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import PropTypes from 'prop-types';

const ImageCarousel = ({ images, productInfo }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const imageRef = useRef(null);
  const intervalRef = useRef(null);

  const handleChangeImage = (arrowDirection) => {
    const tl = gsap.timeline();
    tl.to(imageRef.current, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        switch (arrowDirection) {
          case 'left':
            setCurrentImageIndex((currentImageIndex - 1 + images.length) % images.length);
            break;
          case 'right':
            setCurrentImageIndex((currentImageIndex + 1) % images.length);
            break;
          default:
            break;
        }
        tl.to(imageRef.current, { opacity: 1, duration: 0.3 });
      },
    });
  };

  const handleNext = () => {
    handleChangeImage('right');
  };

  const handlePrev = () => {
    handleChangeImage('left');
  };

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      handleNext();
    }, 4000);

    return () => {
      clearInterval(intervalRef.current);
    };
  },);

  return (
    <div className="relative h-full w-full flex flex-row-reverse">
      <div className="relative h-full w-full">
        <div
          ref={imageRef}
          className="rounded-lg ring-4 ring-dark-blue ring-offset-1 p-1 bg-gray-600 absolute top-0 grid grid-cols-1 sm:grid-cols-2 grid-rows-1 max-sm:grid-rows-2 left-0 w-full h-full transition-opacity duration-500"
          style={{
            opacity: 1,
            backgroundImage: `url(${images[currentImageIndex].src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="h-full col-span-1 place-self-center sm:place-self-start">
            <div className="p-4 text-dark-blue sm:place-self-start">
              <h2 className="text-3xl font-bold">{productInfo.title}</h2>
              <p className="text-lg">{productInfo.description}</p>
            </div>
          </div>
        </div>
      </div>
      <span className='flex items-center'>
        <button className="absolute" onClick={handlePrev}>
          <img src="/assets/arrow-up.svg" alt="arrow left" className="-rotate-90 h-12" />
        </button>
        <button className="absolute right-0" onClick={handleNext}>
          <img src="/assets/arrow-up.svg" alt="arrow right" className="rotate-90 h-12" />
        </button>
      </span>
    </div>
  );
};
ImageCarousel.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string.isRequired,
    })
  ).isRequired,
  productInfo: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};


export default ImageCarousel;