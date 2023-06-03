import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faUser, faSearch, faBars } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useRef, useEffect } from "react";
import { NavLink, Link, useResolvedPath } from "react-router-dom";

const NavItems = [
  { link: "/", title: "Home" },
  { link: "/shop", title: "Shop" },
  { link: "/contacts", title: "Contacts" },
  { link: "/about", title: "About" },
];

const IconButtons = [
  { icon: faShoppingCart, title: "Cart", link: '/cart' },
  { icon: faUser, title: "Account", link: '/account' },
];

const NavMenu = ({ openMenu, closeMenu }) => {
  const path = useResolvedPath()

  const handleLinkClick = () => {
    if (openMenu && window.innerWidth < 760) {
      closeMenu();
    }
  };

  return (
    <ul
      className={` md:pl-9 lg:pl-0 place-self-center w-full transition-all duration-300 md:transition-none ${openMenu ? "h-32 opacity-100" : "h-0 opacity-0"
        } col-span-2 lg:col-span-1 flex flex-col md:flex-row justify-between items-center font-sans uppercase font-bold text-black`}
    >
      {NavItems.map((nav) => (
        <span className="group w-36" key={nav.link}>
          <li
            key={nav.title}
            className={`transition-all duration-300 ${openMenu ? "opacity-100" : "opacity-0"
              }`}
          >

            <NavLink to={nav.link} onClick={handleLinkClick}>{nav.title}</NavLink>
          </li>
          <span className={`hidden  ${path.pathname == nav.link ? 'sm:block w-20 bg-cyan-800 transition-none' : ''} sm:block absolute w-0 group-hover:w-24 h-1 rounded-lg transition-all duration-700 bg-cyan-400 cursor-pointer`}
          >
          </span>
        </span>
      ))}
    </ul>
  );
};

const NavIcons = () => {
  const [openSearch, setOpenSearch] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setOpenSearch(false);
      }
    };
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, [searchRef]);

  return (
    <div className=" place-self-stretch ring-2 ring-offset-4 ring-offset-gray-50 ring-gray-400 rounded-full col-span-1 flex gap-6 items-center">
      <div ref={searchRef}>
        <button onClick={() => setOpenSearch(!openSearch)} title="search">
          <FontAwesomeIcon icon={faSearch} />
        </button>
        <input
          type="search"

          className={`transition-all duration-500 ${openSearch ? "w-40 pl-2" : "w-0 pl-0"
            }`}
        />
      </div>

      <div className="flex gap-2">
        {IconButtons.map(({ icon, title, link }) => (
          <Link key={title} className="mx-2 relative" title={title} to={link}>
            <FontAwesomeIcon icon={icon} />

          </Link>


        ))}
      </div>
    </div>
  );
};

const NavBar = () => {
  const [openMenu, setOpenMenu] = useState(window.innerWidth > 670);

  useEffect(() => {
    const handleResize = () => {
      setOpenMenu(window.innerWidth > 760);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  const closeMenu = () => {
    setOpenMenu(false);
  };

  return (
    <nav className="   shadow-lg flex flex-col-reverse pt-6 gap-7 md:grid grid-cols-3 grid-rows-1 md:h-24 bg-slate-50">
      <div className="hidden lg:flex justify-center items-center">
        <img src={'assets/site icon.png'} className="object-fill h-full scale-150" alt="logo" />
      </div>

      <NavMenu openMenu={openMenu} closeMenu={closeMenu} />

      <div className="md:place-self-center items-center flex flex-row md:inline-grid justify-between p-4 md:pl-0">
        <span className="md:hidden" onClick={() => setOpenMenu(!openMenu)}>
          <FontAwesomeIcon icon={faBars} />
        </span>

        <NavIcons />
      </div>
    </nav>
  );
};

export default NavBar;