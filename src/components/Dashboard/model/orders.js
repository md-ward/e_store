const orders = [
  {
    id: 1,
    customerName: 'John Doe',
    date: new Date('2023-04-22'),
    items: [
      {
        id: 1,
        name: 'Product 1',
        price: 10.99,
        quantity: 2,
      },
      {
        id: 2,
        name: 'Product 2',
        price: 5.99,
        quantity: 1,
      },
    ],
    total: 27.97,
    fulfilled: false,
  },
  {
    id: 2,
    customerName: 'Jane Smith',
    date: new Date('2023-04-23'),
    items: [
      {
        id: 3,
        name: 'Product 3',
        price: 7.99,
        quantity: 3,
      },
      {
        id: 4,
        name: 'Product 4',
        price: 12.99,
        quantity: 1,
      },
    ],
    total: 41.96,
    fulfilled: false,
  },
  {
    id: 3,
    customerName: 'Bob Johnson',
    date: new Date('2023-04-24'),
    items: [
      {
        id: 5,
        name: 'Product 5',
        price: 8.99,
        quantity: 2,
      },
      {
        id: 6,
        name: 'Product 6',
        price: 9.99,
        quantity: 1,
      },
    ],
    total: 27.97,
    fulfilled: false,
  },
  {
    id: 4,
    customerName: 'Alice Williams',
    date: new Date('2023-04-25'),
    items: [
      {
        id: 7,
        name: 'Product 7',
        price: 15.99,
        quantity: 1,
      },
      {
        id: 8,
        name: 'Product 8',
        price: 11.99,
        quantity: 2,
      },
    ],
    total: 39.97,
    fulfilled: false,
  },
  // more orders...
];
  
  function getOrders() {
    return orders;
  }
  
  function fulfillOrder(orderId) {
    const orderIndex = orders.findIndex(order => order.id === orderId);
    if (orderIndex >= 0) {
      orders[orderIndex].fulfilled = true;
      return true;
    }
    return false;
  }
  
  function removeFulfilledOrders() {
    const initialLength = orders.length;
    orders = orders.filter(order => !order.fulfilled);
    return initialLength - orders.length;
  }
  
  export { getOrders, fulfillOrder, removeFulfilledOrders };