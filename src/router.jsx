import Dashboard from './components/Dashboard/view/mainDashboard'
import Home from './components/Shop/view/home_page'
import { Routes, Route, NavLink } from 'react-router-dom';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import ShopPage from './components/Shop/view/shop_page';
import LogInPage from './components/Login_and_signup/view/loginPage';
import CartPage from './components/Shop/view/CartPage';
import ContactUs from './components/Shop/view/contact_us';
import AboutUs from './components/Shop/view/about_us';
import CheckoutPage from './components/Shop/view/check_out'

const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path='/register' element={<LogInPage />}></Route>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/contacts" element={<ContactUs />} />

        <Route path="/about" element={<AboutUs />} />
        <Route path="/checkOut" element={< CheckoutPage />} />


        <Route path="/*" element={<NoMatch />} />

      </Routes>
    </>
  );

}

export default AppRouter;


const NoMatch = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen p-7">
        <h1 className="text-5xl font-bold text-dark-blue duration-500 transition-transform jump-and-shake">
          <FontAwesomeIcon icon={faExclamationTriangle} className="mr-4" />
          Error 404
        </h1>
        <p className="text-xl mt-4 ">Sorry, the page you requested could not be found.</p>
        <NavLink to="/" className="mt-4 p-2 bg-dark-blue-2 text-white rounded-md hover:bg-gray-700">
          Go back to Home
        </NavLink>
      </div>
    </>
  );
};




