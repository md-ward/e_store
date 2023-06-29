import { data } from 'autoprefixer';
import axios from 'axios';
import { useEffect, useState } from 'react';

function useAdminOrdersController() {

  const [sortBy, setSortBy] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/order/get').then((data) => {
      setOrders(data.data);


    }
    ).catch(() => {
      setOrders([])

    });



  }, [])






  const handleSortByDate = () => {
    setSortBy('date');
  };


  const handleSortByPrice = () => {
    setSortBy('price');
  };





  const handleFulfillOrder = async (orderId) => {
    const orderFulfilled = fulfillOrder(orderId);
    if (orderFulfilled) {
      // Mark the order as slideOut
      setOrders((prevOrders) =>
        prevOrders.map((order) => {
          if (order.id === orderId) {
            return { ...order, slideOut: true };
          } else {
            return order;
          }
        })
      );
      // Wait for 500ms before removing the item
      await new Promise((resolve) => setTimeout(resolve, 500));
      // Remove the fulfilled order from the list
      const ordersRemoved = removeFulfilledOrders();
      if (ordersRemoved > 0) {
        setOrders((prevOrders) => [...prevOrders]);
      }
    }
  };

  const sortedOrders = [...orders]
    .filter((order) => !order.slideOut)
    .sort((a, b) => {
      if (sortBy === 'date') {
        return a.date - b.date;
      } else if (sortBy === 'price') {
        return a.total - b.total;
      } else {
        return 0;
      }
    });

  return {
    orders: sortedOrders,
    sortBy,
    handleSortByDate,
    handleSortByPrice,
    handleFulfillOrder,
  };
}

export default useAdminOrdersController;