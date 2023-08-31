import React, { useEffect, useState } from 'react';

import { FaEye, FaShoppingCart, FaComments } from "react-icons/fa";
import ViewContactusMessages from "../widgets/view_contactus_messages";
import { Slide } from 'react-awesome-reveal';
import axios from 'axios';

const GeneralInfo = () => {

  const [messagesCount, setmessagesCount] = useState(null);

  const dailyVisits = 100; // replace with actual number of daily visits
  const sales = 50; // replace with actual number of sales
  const monthlyVisits = 3000; // replace with actual number of monthly visits

  axios.get('http://localhost:3000/contactUs/count')
    .then((response) => {
      setmessagesCount(response.data.count);
    })
    .catch((error) => {
      console.log(error);
    });





  const [ChangePage, setChangePage] = useState(false);

  return (


    (ChangePage == true ? <ViewContactusMessages
      setChangePage={setChangePage}
    ></ViewContactusMessages> :
      <GeneralInfoMenue
        setChangePage={setChangePage}
        dailyVisits={dailyVisits}
        sales={sales}
        messagesCount={messagesCount}
        monthlyVisits={monthlyVisits}
      />
    )
  );
};

const GeneralInfoMenue = ({ dailyVisits, sales, messagesCount, monthlyVisits, setChangePage }) => {
  return (
    <div className="h-full grid sm:grid-cols-2 gap-8 p-8">
      <Slide direction='right'  >

        {/* Daily Visits */}
        <div className="bg-white h-full rounded-md shadow-md hover:bg-red-400 transition-all duration-500 ease-in-out hover:drop-shadow-lg p-4">
          <div className="flex items-center mb-4">
            <FaEye className="text-gray-700 text-3xl mr-2" />
            <h2 className="text-gray-800 text-xl font-bold">Daily Visits</h2>
          </div>
          <p className="text-gray-700 text-lg font-medium">{dailyVisits}</p>
        </div>

        {/* Sales */}
        <div className="h-full bg-white rounded-md shadow-md hover:bg-blue-400 transition-all duration-500 ease-in-out hover:drop-shadow-lg p-4">
          <div className="flex items-center mb-4">
            <FaShoppingCart className="text-gray-700 text-3xl mr-2" />
            <h2 className="text-gray-800 text-xl font-bold">Sales</h2>
          </div>
          <p className="text-gray-700 text-lg font-medium">{sales}</p>
        </div>

        {/* Comments */}
        <div onClick={() => setChangePage(true)}
          className="h-full bg-white rounded-md shadow-md hover:bg-green-400 transition-all duration-500 ease-in-out hover:drop-shadow-lg p-4 cursor-pointer">
          <div className="flex items-center mb-4">
            <FaComments className="text-gray-700 text-3xl mr-2" />
            <h2 className="text-gray-800 text-xl font-bold">ContactUs Messages</h2>
          </div>
          <p className="text-gray-700 text-lg font-medium">{messagesCount}</p>
        </div>

        {/* Monthly Visits */}
        <div className="h-full bg-white rounded-md shadow-md hover:bg-yellow-400 transition-all duration-500 ease-in-out hover:drop-shadow-lg p-4">
          <div className="flex items-center mb-4">
            <FaEye className="text-gray-700 text-3xl mr-2" />
            <h2 className="text-gray-800 text-xl font-bold">Monthly Visits</h2>
          </div>
          <p className="text-gray-700 text-lg font-medium">{monthlyVisits}</p>
        </div></Slide>
    </div>
  );
};

export default GeneralInfo;