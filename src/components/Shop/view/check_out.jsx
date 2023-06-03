import {  faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
  const navigate=useNavigate()
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: '',
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });

  const handleShippingInfoChange = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  const handlePaymentInfoChange = (e) => {
    setPaymentInfo({ ...paymentInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO: Process payment and generate order confirmation
  };


  return (
    <div className="stagger min-h-screen bg-gray-100 p-8">
      <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto bg-white rounded-md shadow-md p-8">
        <h1 className="text-2xl font-semibold mb-4">Checkout</h1>

        {/* Shipping information */}
        <h2 className="text-lg font-medium mb-2">Shipping Information</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={shippingInfo.name}
              onChange={handleShippingInfoChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="address" className="block text-gray-700 font-medium mb-2">
              Address
            </label>
            <input
              type="text"
              name="address"
              id="address"
              value={shippingInfo.address}
              onChange={handleShippingInfoChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="city" className="block text-gray-700 font-medium mb-2">
              City
            </label>
            <input
              type="text"
              name="city"
              id="city"
              value={shippingInfo.city}
              onChange={handleShippingInfoChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="state" className="block text-gray-700 font-medium mb-2">
              State
            </label>
            <input
              type="text"
              name="state"
              id="state"
              value={shippingInfo.state}
              onChange={handleShippingInfoChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="zip" className="block text-gray-700 font-medium mb-2">
              ZIP Code
            </label>
            <input
              type="text"
              name="zip"
              id="zip"
              value={shippingInfo.zip}
              onChange={handleShippingInfoChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="country" className="block text-gray-700 font-medium mb-2">
              Country
            </label>
            <input
              type="text"
              name="country"
              id="country"
              value={shippingInfo.country}
              onChange={handleShippingInfoChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        {/* Payment information */}
        <h2 className="text-lg font-medium mb-2 mt-8">Payment Information</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="cardNumber" className="block text-gray-700 font-medium mb-2">
              Card Number
            </label>
            <input
              inputMode='numeric'
              type="text"
              name="cardNumber"
              id="cardNumber"
              value={paymentInfo.cardNumber}
              onChange={handlePaymentInfoChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              pattern='/d+'
            />
          </div>
          <div>
            <label htmlFor="cardName" className="block text-gray-700 font-medium mb-2">
              Cardholder Name
            </label>
            <input
              type="text"
              name="cardName"
              id="cardName"
              value={paymentInfo.cardName}
              onChange={handlePaymentInfoChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="expiryDate" className="block text-gray-700 font-medium mb-2">
              Expiry Date
            </label>
            <input
              inputMode='numeric'
              type='date'
              name="expiryDate"
              id="expiryDate"
              lang='English'
              value={paymentInfo.expiryDate}
              onChange={handlePaymentInfoChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="cvv" className="block text-gray-700 font-medium mb-2">
              CVV
            </label>
            <input
              inputMode='numeric'
              pattern='\d+'
              type="text"
              name="cvv"
              id="cvv"
              value={paymentInfo.cvv}
              onChange={handlePaymentInfoChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        {/* Submit button */}
        <span className='flex justify-between'>
          <button type="submit" className="bg-dark-blue hover:opacity-95 shadow-lg shadow-slate-300 text-white font-medium py-2 px-4 rounded-md">
            Place Order
          </button>


          <button onClick={()=>navigate('/shop')}
          type='button' className='gap-1 flex items-center justify-center bg-slate-100 p-1 text-lg text-dark-blue shadow-md  hover:bg-slate-200 rounded-md text-center'>
            Back To shop &nbsp; <FontAwesomeIcon icon={faArrowRight} className='animate-pulse' />
          </button>
        </span>

      </form>
    </div>
  );
};

export default CheckoutPage;