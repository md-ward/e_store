const CategoriesOfTheMonth = ({ Categories }) => {
  return (
    <div className="grid grid-cols-1 gap-6 p-9 sm:grid-cols-3 ">
      {Categories.map((item, index) => (
        <div key={index} className="group flex flex-col items-center justify-center text-center p-4 transition-transform duration-300 transform hover:-translate-y-2">
          <img
            className="max-sm:h-2/3 md:h-3/4 rounded-full shadow-md bg-blue-600 text-white hover:bg-blue-700"
            src={item.img}
            alt={item.title}
          />
          <h3 className="text-lg mt-2 font-sans font-semibold text-gray-700 group-hover:text-blue-700">
            {item.title}
          </h3>
          <button className="p-3 mt-3 rounded-full shadow-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-50">
            Shop Now
          </button>
        </div>
      ))}
    </div>
  );
};

export default CategoriesOfTheMonth;