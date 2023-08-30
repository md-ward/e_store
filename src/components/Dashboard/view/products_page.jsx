import { useState, useEffect } from 'react';
import ImageCarousel from '../widgets/imageCarousel';
import Snackbar from '../widgets/snackBar';
import { useSnackbar } from '../store/showSnackBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd, faBox } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

function AddProductPage() {

    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productImage, setProductImage] = useState([]);
    const [productCategory, setProductCategory] = useState('');
    const [showImageDialog, setShowImageDialog] = useState(false);
    const [newCategory, setnewCategory] = useState(true);

    // !global widget..........
    const showSnackBar = useSnackbar(state => state.showSnackbar);
    const hideSnackBar = useSnackbar(state => state.hideSnackbar);

    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        // Fetch categories from API
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await fetch('http://localhost:3000/category/all_categories');
            const data = await response.json();
            console.warn(data.allCategories)

            setCategories(data.allCategories);

        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };


    // ? functions 

    function handleNameChange(event) {
        setProductName(event.target.value);
    }

    function handleDescriptionChange(event) {
        setProductDescription(event.target.value);
    }

    function handlePriceChange(event) {
        setProductPrice(event.target.value);
    }
    function handleImageChange(event) {
        const newImages = Array.from(event.target.files);
        if (productImage.length <= 4) {
            const newImageUrls = newImages.splice(0, 4).map((image) => URL.createObjectURL(image)

            );
            setProductImage([...productImage, ...newImageUrls]);
            setShowImageDialog(false);
        } else {
            setShowImageDialog(true);
        }
    }
    function handleCategoryChange(event) {
        const selectedValue = event.target.value;
        setProductCategory(selectedValue);
        setSelectedCategory(selectedValue);

        if (selectedValue === 'new') {
            setnewCategory(false);
            setProductCategory('');
        }
    }

    function handleSubmit(event) {
        event.preventDefault();

        console.log(`images : ${productImage}`);
        fetch('http://localhost:3000/products/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                product_name: productName,
                description: productDescription,
                price: productPrice,
                product_type: selectedCategory,
                images: productImage
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log('New product added:', data);
                showSnackBar('Product added Successfully ');
                hideSnackBar(1500);
                setTimeout(() => {
                    setProductName('');
                    setProductDescription('');
                    setProductPrice('');
                    setProductImage([]);
                    setProductCategory('');
                }, 1650);
            })
            .catch(error => {
                console.error('Error adding product:', error);
                showSnackBar('Error adding product. Please try again later.');
                hideSnackBar(1500);
            });
    }



    function handleImageClick() {
        document.getElementById('product-image').click();
    }

    async function handleAddingNewCategory() {
        if (productCategory.trim() === '') {
            // If the product category is empty, show an error message
            alert('Please enter a category name');
            return;
        }

        try {
            await axios.post('http://localhost:3000/category/new_category', {
                product_category: productCategory.trim()
            }).then(() => [
                fetchCategories()

            ]);

            setnewCategory(true);
        } catch (error) {
            console.error('Error adding new category:', error);
            alert('Error adding new category. Please try again later.');
        }
    }



    return (
        <div className=" transition-transform duration-700 ease-in-out w-full h-full  md:grid   sm:grid-cols-2">
            <div className="flex-1 overflow-y-auto px-4 py-8 sm:px-8 ">
                <h1 className="text-2xl font-bold text-dark-blue  mb-4">Add New Product</h1>
                <form onSubmit={handleSubmit} className="text-dark-blue  flex flex-col space-y-4">
                    <label htmlFor="product-name" className="font-medium">
                        Product Name
                    </label>
                    <input
                        type="text"
                        id="product-name"
                        name="product-name"
                        value={productName}
                        onChange={handleNameChange}
                        className="px-4 py-2 rounded-lg shadow-lg"
                        required
                    />

                    <label htmlFor="product-description" className="font-medium">
                        Product Description
                    </label>
                    <textarea
                        id="product-description"
                        name="product-description"
                        value={productDescription}

                        onChange={handleDescriptionChange}
                        className="px-4 py-2 rounded-lg shadow-lg resize-none"
                        required
                        rows={7}
                    />

                    <label htmlFor="product-price" className="font-medium">
                        Product Price
                    </label>
                    <input
                        type="number"
                        id="product-price"
                        name="product-price"
                        value={productPrice}
                        onChange={handlePriceChange}
                        className="px-4 py-2 rounded-lg shadow-lg"
                        required
                    />


                    {/* products category */}
                    <label htmlFor="product-category" className="font-medium">
                        Product Category
                    </label>
                    {newCategory ? <select id="category" value={selectedCategory} onChange={handleCategoryChange}>
                        <option value="">Select a category</option>
                        {categories.map((category) => (
                            <option key={category._id} value={category._id}>
                                {category.product_Category}
                            </option>
                        ))}
                        <option value="new">new category </option>

                    </select>
                        : <span className='w-full flex flex-row  '>
                            <input
                                className="px-4 py-2 rounded-lg shadow-lg w-3/4"

                                placeholder='add new category'
                                value={productCategory}
                                onChange={handleCategoryChange}

                            />

                            <span
                                onClick={handleAddingNewCategory}
                                className='bg-slate-100 w-10 h-10 flex justify-center shadow-2xl  items-center   ring-1  mx-9  cursor-pointer hover:shadow-inner rounded-full    '>
                                <FontAwesomeIcon className='  text-blue-600 ' icon={faAdd} size='lg' />
                            </span>
                        </span>
                    }



                    <button
                        type="button"
                        onClick={productImage.length === 4 ? () => { showSnackBar('you cant add more than 4 images for a single product'); hideSnackBar(1500) } : () => setShowImageDialog(true)}
                        className="px-4 py-2 rounded-lg shadow-lg bg-blue-500 text-white"
                    >
                        Add Product Image
                    </button>


                    <button
                        type="submit"
                        className="px-4 py-2 rounded-lg shadow-lg bg-green-500 text-white"
                    >
                        Add Product
                    </button>
                </form>
            </div>

            {showImageDialog && (
                <div className=" fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className=" p-8 bg-white  rounded-lg shadow-lg flex flex-col ">
                        <label htmlFor="product-image" className="font-medium pb-10">
                            Choose an image from your gallery:
                        </label>
                        <input
                            type="file"
                            id="product-image"
                            name="product-image"
                            onChange={handleImageChange}
                            multiple
                            draggable
                            accept="image/*"
                            className="hidden"
                        />

                        <section className='inline-flex justify-between'>
                            <button
                                type="button"
                                onClick={() => handleImageClick()}
                                className="px-4 py-2 rounded-lg shadow-lg bg-dark-blue-2 text-white"
                            >
                                add images
                            </button>

                            <button
                                type="button"
                                onClick={() => setShowImageDialog(false)}
                                className="px-4 py-2 rounded-lg shadow-lg bg-dark-blue text-white"
                            >
                                Cancel
                            </button>
                        </section>
                    </div>
                </div>
            )}


            <div className=' sm:col-span-1  p-2' >
                {productImage && (



                    <ImageCarousel images={productImage}></ImageCarousel>

                )}


            </div>

            <Snackbar></Snackbar>
        </div>
    );
}

export default AddProductPage;