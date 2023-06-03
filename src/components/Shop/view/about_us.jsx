import React, { useState, useEffect } from 'react';

const AboutUs = () => {
  const [showMore, setShowMore] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640);
    }
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <div className="grid grid-cols-2 gap-4 items-center justify-center min-h-screen bg-gray-100 p-8">
      <div className="bg-slate-400 p-8 rounded-lg col-span-2 md:col-span-1 shadow-lg font-sans duration-300 ease-out transition-all">
        <h1 className="text-4xl font-bold mb-4 text-dark-blue">About Us</h1>
        <p className="text-white text-lg">
          Welcome to our online store! We are a team of passionate individuals who love to provide our customers withthe best products and shopping experience possible. Our store offers a wide range of high-quality products at affordable prices, including fashion, beauty, electronics, home and garden, and more.
        </p>

        {isMobile ? (
          showMore ? (
            <>
              <p className="text-white text-lg mt-4">
                At our store, we believe that shopping should be easy, convenient, and enjoyable. That's why we strive to provide our customers with a hassle-free shopping experience, from browsing our products to checking out. We are committed to providing excellent customer service, and our friendly and knowledgeable team is always here to help you with any questions or concerns you may have.
              </p>
              <p className="text-white text-lg mt-4">
                We are also committed to sustainability and ethical practices. We carefully select our suppliers and products to ensure that they meet our standards for environmental and social responsibility. We believe that it's possible to make a positive impact on the world while still providing our customers with high-quality products and excellent service.
              </p>
              <p className="text-white text-lg mt-4">
                Thank you for choosing our store. We appreciate your business and look forward to serving you. If you have any feedback or suggestions for us, please don't hesitate to get in touch.
              </p>
              <button className="text-white text-lg mt-4" onClick={toggleShowMore}>Read less</button>
            </>
          ): (
            <button className="text-white text-lg mt-4" onClick={toggleShowMore}>Read more</button>
          )
        ) : (
          <>
            <p className="text-white text-lg mt-4">
              At our store, we believe that shopping should be easy, convenient, and enjoyable. That's why we strive to provide our customers with a hassle-free shopping experience, from browsing our products to checking out. We are committed to providing excellent customer service, and our friendly and knowledgeable team is always here to help you with any questions or concerns you may have.
            </p>
            <p className="text-white text-lg mt-4">
              We are also committed to sustainability and ethical practices. We carefully select our suppliers and products to ensure that they meet our standards for environmental and social responsibility. We believe that it's possible to make a positive impact on the world while still providing our customers with high-quality products and excellent service.
            </p>
            <p className="text-white text-lg mt-4">
              Thank you for choosing our store. We appreciate your business and look forward to serving you. If you have any feedback or suggestions for us, please don't hesitate to get in touch.
            </p>
          </>
        )}

      </div>

      <img src="assets/aboutUs.svg" alt="icon" className="w-full col-span-2 md:col-span-1" />
    </div>
  );
};

export default AboutUs;