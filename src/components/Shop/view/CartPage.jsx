import React, { useState, useMemo, useLayoutEffect } from 'react';
// import { products } from '../model/ShopPageModel';
import { useNavigate } from 'react-router-dom';


const CartPage = () => {

  const [productsPerPage] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);

  const [productCounter, setproductCounter] = useState({});

  const [totalPrice, setTotalPrice] = useState(0);

  const navigate = useNavigate()

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  let products = sessionStorage.getItem('cartItems')
  products = JSON.parse(products)??[]

  const currentProducts = useMemo(() => {
    return products.slice(indexOfFirstProduct, indexOfLastProduct).map(product => ({
      ...product,
      count: productCounter[product.id] || 0,
    }));
  }, [products, productCounter, indexOfFirstProduct, indexOfLastProduct]);

  const pageNumbers = useMemo(() => {
    const totalPageNumbers = Math.ceil(products.length / productsPerPage);
    const pageNumbersArray = [];
    for (let i = 1; i <= totalPageNumbers; i++) {
      pageNumbersArray.push(i);
    }
    return pageNumbersArray;
  }, [products, productsPerPage]);

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handleCounterChange = (productId, value) => {
    setproductCounter({ ...productCounter, [productId]: parseInt(value) });
    // const updatedTotalPrice = calculateTotalPrice();
    // setTotalPrice(updatedTotalPrice);
  };
  const handleDeleteProduct = (productId) => {
    setproductCounter({ ...productCounter, [productId]: 0 });
    // const updatedTotalPrice = calculateTotalPrice();
    // setTotalPrice(updatedTotalPrice);
  };

  useLayoutEffect(() => {
    var total = 0;
    for (let i = 0; i < currentProducts.length; i++) {
      const product = currentProducts[i];
      const count = productCounter[product.id] || 0;
      total += product.price * count;
    }
    setTotalPrice(total);
  }, [currentProducts, productCounter]);


  function handleCheckout() {


    navigate('/checkOut', { replace: true })


  }


  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="stagger grid grid-cols-6   gap-8 p-8 bg-white rounded-md shadow-md">

        <div className=" col-span-6   lg:col-span-1 flex flex-col h-48 w-full justify-around bg-slate-200 shadow-md rounded-md p-4">
          <div className="flex flex-col justify-between">
            <h1 className="text-2xl font-semibold text-dark-blue">Summary</h1>
            <div className="bg-dark-blue  w-full mt-2 h-px"></div>
            <h1 className=" text-xl font-semibold text-slate-700"> Items: {Object.values(productCounter).reduce((acc, curr) => acc + curr, 0)} </h1>
          </div>

          <h2 className="text-xl font-medium">Total Price: {totalPrice} $</h2>
          <button

            onClick={handleCheckout}
            className="w-full bg-dark-blue text-white rounded-md hover:opacity-95 mt-8 font-medium py-2">
            Check Out
          </button>
        </div>

        <div className="col-span-6 lg:col-span-5 p-4 bg-gray-200 rounded-md">
          {/* Products section */}
          {currentProducts.map((product) => (
            <div key={product._id} className="grid md:grid-cols-5 grid-cols-1  items-center gap-4 border-b-2 pb-2 border-gray-300">
              {/* product image  */}
              <img src={product.image} alt="" className="rounded-md object-contain max-sm:mx-auto h-24" />

              {/* product title / name  */}
              <h1 className="text-lg text-center  font-medium">{product.product_name}</h1>

              {/* counter button  */}
              <div className="flex items-center justify-center space-x-2">
                <button className="bg-blue-500 text-white rounded-md w-16 h-7 hover:bg-blue-600 transition-colors duration-200" onClick={() => {
                  handleCounterChange(product.id, (productCounter[product.id] || 0) + 1)


                }

                }>
                  +
                </button>
                <input
                  type="text"
                  name="counter"
                  id="counter"
                  value={productCounter[product.id] || 0}
                  className="w-16 text-center text-lg font-medium rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => { handleCounterChange(product.id, e.target.value) }}
                />
                <button className="bg-blue-500 text-white rounded-md w-16 h-7 hover:bg-blue-600 transition-colors duration-200" onClick={() => handleCounterChange(product.id, (productCounter[product.id] || 0) - 1)}>
                  -
                </button>
              </div>

              {/* price */}
              <h2 className="text-lg  text-center font-medium">${product.price}</h2>

              {/* drop product from cart  */}
              <button className="mx-auto bg-red-500 text-white rounded-md w-8 h-8 hover:bg-red-600 transition-colors duration-200" onClick={() => handleDeleteProduct(product.id)}>
                X
              </button>
            </div>
          ))}
          {/* Pagination section */}
          <div className="flex justify-center mt-4">
            {pageNumbers.map((pageNumber) => (
              <button
                key={pageNumber}
                className={`px-3 py-2 rounded-md mx-1 font-medium ${currentPage === pageNumber
                  ? 'bg-blue-500 text-white hover:bg-blue-600'
                  : 'bg-white text-gray-600 hover:bg-gray-200'
                  }`}
                onClick={() => handlePageClick(pageNumber)}
              >
                {pageNumber}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;