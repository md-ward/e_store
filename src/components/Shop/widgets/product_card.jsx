import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faHeart, faStar, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Dialog, Transition } from '@headlessui/react';

const ProductCard = ({ product }) => {
  const [hoverIcons, setHoverIcons] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  const buttons = [
    { id: 'view', icon: faEye, text: 'View' },
    { id: 'save', icon: faHeart, text: 'Save' },
    { id: 'add', icon: faShoppingCart, text: 'Add to Cart' },
  ];

  const handleMouseEnter = (id) => {
    setHoverIcons((prevState) => ({ ...prevState, [id]: true }));
  };

  const handleMouseLeave = (id) => {
    setHoverIcons((prevState) => ({ ...prevState, [id]: false }));
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Product Card */}
      <div className="flex flex-col bg-white rounded-md shadow-dark-blue shadow-sm">
        {/* top part image + icons... */}
        <div className="h-2/3 group relative">
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 absolute z-20 flex flex-col justify-center items-center w-full h-full gap-10">
            {buttons.map((button) => (
              <button key={button.id} className='text-white' onClick={button.id === 'view' ? openModal : null}>
                <FontAwesomeIcon icon={button.icon} onMouseEnter={() => handleMouseEnter(button.id)} onMouseLeave={() => handleMouseLeave(button.id)} />
                <span className={`ml-2 absolute text-white transition-all duration-500 ease-out  ${hoverIcons[button.id] ? 'opacity-100 ' : 'opacity-0'}`} style={{ visibility: hoverIcons[button.id] ? 'visible' : 'hidden' }}>{button.text}</span>
              </button>
            ))}
          </span>
          <img
            className="relative group-hover:blur-sm h-full w-full object-cover rounded-lg hover:blur-sm"
            src={product.image}
            alt="image"
          />
        </div>

        {/* description... */}
        <div className="flex flex-col p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-light text-dark-blue font-serif">{product.title}</h3>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faStar} color="gold" />
              <p className="ml-1 text-sm font-medium text-gray-700">{product.rating}</p>
            </div>
          </div>
          {/* <p className="text-sm text-dark-blue mb-4">{product.description}</p> */}
          <p className="text-lg font-bold text-dark-blue">{product.price} $</p>
        </div>
      </div>

      {/* Modal */}
      <Transition appear show={isOpen} as={React.Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
            </Transition.Child>

            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <Transition.Child
              as={React.Fragment}
             enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4"
              enterTo="opacity-100 translate-y-0"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-4"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  {product.title}
                </Dialog.Title>
                <div className="mt-2">
                  <img
                    className="h-80 w-full object-cover rounded-md"
                    src={product.image}
                    alt={product.title}
                  />
                </div>
                <div className="mt-4 p-1">
                  <p className="text-base  h-56  overflow-y-auto">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in risus nec quam hendrerit vestibulum. Ut auctor libero quis dapibus gravida. Nunc vel quam eu leo suscipit elementum sit amet a ex. Nam aliquet nibh enim, vitae auctor nibh varius sed. Maecenas ac nisl vel mi bibendum ullamcorper. Donec sed quam eget velit egestas vestibulum. Sed auctor, ipsum vel bibendum imperdiet, nulla tellus pulvinar turpis, id venenatis velit lectus et dolor. Integer ac magna libero. Suspendisse potenti. Nunc vehicula cursus quam vel porta. Nam euismod mauris ac nulla vehicula, sed bibendum diam rutrum. Sed pharetra, lorem sit amet dictum sodales, nulla lorem congue nunc, vel iaculis nulla tellus vel enim. Donec suscipit, enim a interdum ornare, ipsum nulla fringilla sapien, in faucibus nulla libero quis massa.</p>
                  <p className="mt-2 text-lg font-bold text-dark-blue">{product.price} $</p>
                </div>

                <div className="mt-4 flex justify-end">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={() => {
                      // Add to cart logic here
                      closeModal();
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ProductCard;