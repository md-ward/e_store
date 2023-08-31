import React, { useState, useMemo, useEffect } from 'react';
import axios from 'axios';

import ProductCard from '../widgets/product_card';
import Loader from '../../../loader';

const ShopPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setcategories] = useState([]);
  // ! to fitch available categories from Api
  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:3000/category/all_categories');
      const data = await response.json();
      console.warn(data.allCategories)

      setcategories(data.allCategories);

    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/products/get'); // replace with the actual API endpoint for fetching products
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        // setLoading(false);
      }
    };

    fetchProducts();
  }, []);
  useEffect(() => {
    fetchCategories()



  }, [])

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
    <div className=" grid grid-cols-1 md:grid-cols-5 gap-4 w-full ">
      {/* Select category */}

      <div className='col-span-5 md:col-span-1 col-start-1 row-span-2 p-5 rounded-md shadow-gray-400 drop-shadow-md shadow-sm'>
        <h1 className="text-xl font-light text-dark-blue mb-4 font-serif">Categories</h1>
        <div className="grid grid-rows-3 pt-3 pb-3 gap-4 md:gap-14">
          <select id="category" value={selectedCategory} >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.product_Category}
              </option>
            ))

            }

          </select>
        </div>
      </div>
      {/* select category end ... */}

      <div className="min-h-screen col-span-5 sm:col-span-4 p-4 gap-4 grid grid-cols-1 md:grid-cols-3 grid-rows-2 ">
        {loading ? (
          <span className='absolute place-self-center rotate-180 flex justify-center items-center'>
            <Loader />
          </span>
        ) : (
          currentProducts.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))
        )}
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