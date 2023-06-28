import React, { useState, useMemo, useEffect } from 'react';
import axios from 'axios';

import ProductCard from '../widgets/product_card';
import { categories } from '../model/ShopPageModel';

const ShopPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/products'); // replace with the actual API endpoint for fetching products
       console.log(response.data)
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const filteredProducts = useMemo(() => {
    if (!selectedCategory) return products;
    return products.filter(product => product.category === selectedCategory);
  }, [products, selectedCategory]);

  const currentProducts = useMemo(() => {
    return filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  }, [filteredProducts, indexOfFirstProduct, indexOfLastProduct]);

  const pageNumbers = useMemo(() => {
    const totalPageNumbers = Math.ceil(filteredProducts.length / productsPerPage);
    const pageNumbersArray = [];
    for (let i = 1; i <= totalPageNumbers; i++) {
      pageNumbersArray.push(i);
    }
    return pageNumbersArray;
  }, [filteredProducts, productsPerPage]);

  const handlePageClick = (event, pageNumber) => {
    event.preventDefault();
    setCurrentPage(pageNumber);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category === selectedCategory ? null : category);
    setCurrentPage(1);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 w-full ">

      <div className='col-span-5 md:col-span-1 col-start-1 row-span-2 p-5 rounded-md shadow-gray-400 drop-shadow-md shadow-sm'>
        <h1 className="text-xl font-light text-dark-blue mb-4 font-serif">Categories</h1>
        <div className="grid grid-rows-3 pt-3 pb-3 gap-4 md:gap-14">
          {categories.map((category, index) => (
            <div
              key={index}
              className={`bg-slate-200 hover:bg-slate-300 text-center rounded-xl p-1 ${selectedCategory === category.category ? 'bg-slate-300' : ''}`}
              onClick={() => handleCategorySelect(category.category)}
            >
              <div className="text-dark-blue cursor-pointer text-lg">{category.category}</div>
            </div>
          ))}
        </div>
      </div>


      <div className="col-span-5 sm:col-span-4 p-4 gap-4 grid grid-cols-1 md:grid-cols-3 grid-rows-2 ">
        {currentProducts.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>

      <div className="md:col-start-2 sm:col-span-4 col-span-5 w-full place-self-center p-4 flex justify-center">
        <ul className="flex gap-2">
          {pageNumbers.map((pageNumber) => (
            <li key={pageNumber}>
              <button
                className={`py-2 px-4 rounded-full font-bold text-dark-blue ${currentPage === pageNumber ? 'bg-slate-400' : 'bg-slate-200 hover:bg-slate-300'}`}
                onClick={(event) => handlePageClick(event, pageNumber)}
              >
                {pageNumber}
              </button>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
};

export default ShopPage;