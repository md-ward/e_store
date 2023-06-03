import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const FeaturedCategories = ({ products }) => {
    return (
        <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {products.map((product, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <img className="w-full h-48 object-cover" src={product.image} alt={product.title} />
                    <div className="p-4">
                        <h3 className="text-lg font-medium mb-2">{product.title}</h3>
                        <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                        <div className="flex items-center">
                            <div className="flex mr-2">
                                {[...Array(5)].map((_, i) => (
                                    <FontAwesomeIcon
                                        key={i}
                                        icon={faStar}
                                        className={`h-4 w-4 ${i < product.rating ? 'text-yellow-500' : 'text-gray-400'}`}
                                    />
                                ))}
                            </div>
                            <span className="text-gray-600 text-sm">{product.reviews} reviews</span>
                        </div>
                        <div className="flex justify-between items-center mt-4">
                            <span className="text-gray-700 font-medium">${product.price.toFixed(2) }</span>
                            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none">Add to cart</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FeaturedCategories;