const images = [
    {
        src:
            'assets/category_img_03.jpg', alt: 'hh',
    },
    {
        src:
        'assets/category_img_02.jpg' ,        alt: 'hh',
    },
    {
        src: 'assets/category_img_01.jpg',
        alt: '',
    },
];

const product = {
    title: 'Product Name',
    description: 'A brief description of the product.',
};

const Categories = [
    { title: 'Glasses', img: 'assets/category_img_03.jpg' },
    { title: 'Shoes', img: 'assets/category_img_02.jpg' },
    { title: 'Watch', img: 'assets/category_img_01.jpg' },
];

const products = [
    {
        price: 240.21,
        title: 'Flash Light',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt in culpa qui officia deserunt.',
        reviews: 24,
        rating: 1,
        image: 'assets/feature_prod_01.jpg'
    },
    {
        price: 480.5555,
        title: 'Smart Watch ',
        description: 'Aenean gravida dignissim finibus. Nullam ipsum diam, posuere vitae pharetra sed, commodo ullamcorper.',
        reviews: 48,
        rating: 4,
        image: 'assets/feature_prod_02.jpg'
    },
    {
        price: 360.321,
        title: 'Nikon Camera one step',
        description: 'Curabitur ac mi sit amet diam luctus porta. Phasellus pulvinar sagittis diam, et scelerisque ipsum lobortis nec.',
        reviews: 74,
        rating: 3,
        image: 'assets/feature_prod_03.jpg'
    },
];

export default {
    images,
    product,
    Categories,
    products
};