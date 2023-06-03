import React, { useState, useEffect } from 'react';
import ImageCarousel from '../widgets/image_carousel';
import CategoriesOfTheMonth from '../widgets/monthly_categories';
import FeaturedCategories from '../widgets/featured_categories';
import HomePageModel from '../model/homePageModel';


const HomePageView = () => {


    return (
        <>
        
            <div className="grid h-full grid-cols-1 sm:grid-rows-3 items-center ">
                {/* Image Slider  */}
                <div className="h-96 sm:h-3/5 m-4 sm:row-span-1">
                    <ImageCarousel images={HomePageModel.images} productInfo={HomePageModel.product} />
                </div>

                {/* Categories of the month  */}
                <div className="sm:row-span-1">
                    <h1 className="mx-auto w-full bg-gradient-to-r from-dark-blue to-gray-400 text-2xl text-transparent bg-clip-text flex justify-center uppercase font-semibold">
                        Categories of the Month
                    </h1>
                    <CategoriesOfTheMonth Categories={HomePageModel.Categories} />

                </div>

                <div className='sm:row-span-1 bg-gray-100 h-full place-self-center p-5 space-y-5'>
                    <h1 className="mx-auto w-full bg-gradient-to-r from-dark-blue to-gray-400 text-2xl text-transparent bg-clip-text flex justify-center uppercase font-semibold">
                        Featured Products of the month
                    </h1>
                    <FeaturedCategories products={HomePageModel.products} />

                </div>
            </div>
        </>
    );
};

export default HomePageView;