import { faChartColumn, faInfo, faListDots, faShop } from '@fortawesome/free-solid-svg-icons';
import { useChangePage } from '../store/storeState';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Sidebar = () => {
  const menuItems = [
    { icon: faInfo, label: "General info", link: "/admin/generalInfo" },
    { icon: faShop, label: "Orders", link: "/admin/orders" },
    { icon: faChartColumn, label: "Analytics", link: "/admin/salesReport" },
    { icon: faListDots, label: "Products", link: "/admin/products" },
  ];

  const changeToNewPage = useChangePage((state) => state.changeToNewPage);
  const currentPage = useChangePage((state) => state.currentPage);

  const handleClick = (link) => {
    if (link !== currentPage) {
      changeToNewPage(link);
      // setIsMenuOpen(false); // If setIsMenuOpen function is defined elsewhere, uncomment this line
    }
  };

  return (
    <div className="md:col-span-1 h-full w-full flex flex-col p-10 text-white md:justify-between items-start">
      <div id="logo" className="mb-10 w-full flex justify-between max-md:hidden">
        <img src={'assets/site icon.png'} alt="Site Logo" className="object-contain bg-slate-200 rounded-full h-1/2 w-full" />
      </div>

      <ul className="md:block py-9 flex flex-row justify-between w-full transition-all duration-700">
        {menuItems.map((item) => (
          <li
            key={item.link}
            onClick={() => handleClick(item.link)}
            className={`${currentPage === item.link
              ? "bg-white text-dark-blue border-2 border-dark-blue rounded-full w-32"
              : "text-white hover:text-slate-200 w-16"
            } h-16 flex flex-row items-center justify-center rounded-full transition-all duration-500 cursor-pointer shadow-md shadow-slate-300 mb-4`}
          >
            <FontAwesomeIcon icon={item.icon} />
            <span className={`${currentPage === item.link ? "ml-2 block" : "hidden"}`}>
              {item.label}
            </span>
          </li>
        ))}
      </ul>

      <div id="admin_img" className="flex flex-row mt-10">
        <img
          className="rounded-full w-12 h-12 object-cover mr-4"
          src={("assets/photo-1438761681033-6461ffad8d80.avif")}
          alt="img"
        />
        <div id="name_and_email">
          <h4>Sara Colins</h4>
          <h5 className="text-slate-400">{localStorage.getItem("Email")}</h5>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;