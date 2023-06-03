import { useState } from 'react';

function ImageCarousel({ images }) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const [animatOnTime, setanimatOnTime] = useState(true);

    const handleImageClick = (index) => {
        setCurrentImageIndex(index);
        setTimeout(() => {
            setanimatOnTime(true)
        }, 10);
        setanimatOnTime(false)



    };

    return (
        <div className={`bg-slate-50 rounded-xl  shadow-md flex flex-col justify-center items-center h-full  p-8  ${images.length > 0 ? '' : 'hidden'}  `}>             {/*  //! big image......  */}
            {images.length > 0 && (
                <div className={`${animatOnTime ? ' transition-all duration-700 scale-125 opacity-100 ' : 'opacity-75'}  w-1/2 h-5/6 flex justify-center items-center pb-10`}>
                    <img src={images[currentImageIndex]} alt="Product" className=' w-full h-full object-scale-down' />
                </div>
            )}

            <div className=' flex flex-row justify-center items-center gap-4'>
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt="Product"

                        className={`z-10 w-20 h-20   ${currentImageIndex === index ? 'transition-all duration-700 ease-in-out border-dark-pink border-solid border-2 scale-125 rounded-md' : null
                            }  `}
                        onClick={() => handleImageClick(index)}
                    />
                ))}
            </div>
        </div>
    );
}

export default ImageCarousel;