import { useState } from 'react';
import ImageCarousel from '../widgets/imageCarousel';
import Snackbar from '../widgets/snackBar';
import { useSnackbar } from '../store/showSnackBar';

function AddProductPage() {
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productImage, setProductImage] = useState([]);
    const [productCategory, setProductCategory] = useState('');
    const [showImageDialog, setShowImageDialog] = useState(false);
    const showSnackBar = useSnackbar(state => state.showSnackbar);
    const hideSnackBar = useSnackbar(state => state.hideSnackbar);

    const handleNameChange = (event) => {
        setProductName(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setProductDescription(event.target.value);
    };

    const handlePriceChange = (event) => {
        setProductPrice(event.target.value);
    };
    const handleImageChange = (event) => {
        const newImages = Array.from(event.target.files);
        if (productImage.length <= 4) {
            const newImageUrls = newImages.splice(0, 4).map((image) =>
                URL.createObjectURL(image)
            );
            setProductImage([...productImage, ...newImageUrls]);
            setShowImageDialog(false)
        } else {
            setShowImageDialog(true);
        }
    };

    const handleCategoryChange = (event) => {
        setProductCategory(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission here
        showSnackBar('Product added Successfully ');


        hideSnackBar(1500);
        setTimeout(() => {

            setProductName('');
            setProductDescription('');
            setProductPrice('');
            setProductImage([]);
            setProductCategory('');
        }, 1650);
    };
    function handleImageClick() {
        document.getElementById('product-image').click();
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

                    <label htmlFor="product-category" className="font-medium">
                        Product Category
                    </label>
                    <select
                        id="product-category"
                        name="product-category"
                        value={productCategory}
                        onChange={handleCategoryChange}
                        className="px-4 py-2 rounded-lg shadow-lg"
                        required
                    >
                        <option value="">Please select a category</option>
                        <option value="electronics">Electronics</option>
                        <option value="clothing">Clothing</option>
                        <option value="home-goods">Home Goods</option>
                        <option value="health-beauty">Health &amp; Beauty</option>
                    </select>

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
                    <div className= " p-8 bg-white  rounded-lg shadow-lg flex flex-col ">
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