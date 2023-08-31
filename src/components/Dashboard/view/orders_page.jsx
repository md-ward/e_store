import { useEffect } from 'react';
import useAdminOrdersController from '../controller/AdminOrdersController';

function AdminOrdersPage() {
    const {
        orders,
        sortBy,
        handleSortByDate,
        handleSortByPrice,
        handleFulfillOrder,
    } = useAdminOrdersController();

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB') + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    };

    //! Buttons for sorting orders
    const SortingButtons = (
        <div className="flex flex-row justify-center mb-4 sm:mb-0">
            <button
                className={`whitespace-nowrap py-2 px-4 rounded-lg ${sortBy === 'date'
                    ? 'bg-dark-blue text-white'
                    : 'bg-gray-200 text-gray-700'
                    }`}
                onClick={handleSortByDate}
            >
                Sort by Date
            </button>
            <button
                className={`ml-4 py-2 px-4 rounded-lg ${sortBy === 'price'
                    ? 'bg-dark-blue text-white'
                    : 'bg-gray-200 text-gray-700'
                    }`}
                onClick={handleSortByPrice}
            >
                Sort by Price
            </button>
        </div>
    );

    return (
        <div className="overflow-hidden sm:col-span-4 transition-transform duration-700 ease-in-out w-full h-full p-2">
            {/* Header */}
            <h1 className="flex flex-col sm:flex-row items-center justify-between sm:p-4 sm:pl-10 sm:pr-10 sm:text-lg font-bold text-dark-blue mb-2 bg-white rounded-lg shadow-lg sm:w-full text-center h-fit">
                Orders {SortingButtons}
            </h1>
            {/* List of orders */}
            <div className="pb-20 overflow-y-auto h-full">
                {orders.map((order) => (
                    <div
                        key={order._id}
                        className={`p-4 mb-4 bg-white rounded-lg shadow-lg ${order.fulfilled
                            ? 'opacity-50 transition-opacity duration-500 ease-in-out '
                            : 'transform transition-transform duration-500 ease-in-out hover:-translate-y-1 hover:shadow-xl'
                            } ${order.slideOut ? 'transition-all duration-700 translate-x-full' : ''}`}
                    >
                        {/* Order header */}
                        <div className="flex flex-row justify-between">
                            <h2 className="text-lg font-bold text-dark-blue">
                                Order ID:  {order._id}
                            </h2>
                            <p className="text-gray-600"  >
                                {formatDate(order.date)}
                            </p>
                        </div>

                        {/* customer info */}

                        <div className='bg-slate-200 text-dark-blue text-lg p-1 rounded-md pl-2 flex  flex-col gap-2 shadow-md mb-3 mt-2'>
                            <h1>Customer : {order.customer.fname + ' ' + order.customer.lname}</h1>
                            <h1>Email : {order.customer.email}</h1>
                            <h1>Payment Method : {order.paymentMethod}</h1>

                            <h1>Payment Status : {order.paymentStatus}</h1>


                        </div>


                        {/* Order items */}
                        {order.products.map((item) => (
                            <div key={item.product._id} className="flex flex-row justify-between mb-2 p-1  pl-2">
                                <p>{item.product.product_name}</p>
                                <p>{`${item.quantity} x $${item.product.price}`}</p>
                            </div>
                        ))}
                        {/* Order total */}
                        <div className="flex flex-row justify-between">
                            <p className="text-lg font-bold">Total:</p>
                            <p className="text-lg font-bold">{`$${order.totalPrice}`}</p>
                        </div>
                        {/* Fulfill button */}
                        {!order.fulfilled && (
                            <button
                                className="whitespace-nowrap py-2 px-4 rounded-lg bg-dark-blue text-white mt-2"
                                onClick={() => handleFulfillOrder(order.id)}
                            >
                                Fulfill Order
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AdminOrdersPage;