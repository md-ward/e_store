import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaTelegram } from 'react-icons/fa';
import { useSnackbar } from '../../Dashboard/store/showSnackBar';
import Snackbar from '../../Dashboard/widgets/snackBar';
import { useRef } from 'react';
const products = [
    { name: 'Watches', link: '/watches' },
    { name: 'Glasses', link: '/glasses' },
    { name: 'Shoes', link: '/shoes' },
];

const infoLinks = [
    { name: 'Home', link: '/' },
    { name: 'About Us', link: '/about' },
    { name: 'Our Locations', link: '/locations' },
    { name: 'Contact Us', link: '/contacts' },
];

const socials = [
    { id: 0, icon: <FaFacebook size={23} />, link: 'https://www.facebook.com/', color: '#3b5998' },
    { id: 1, icon: <FaTwitter size={23} />, link: 'https://www.twitter.com/', color: '#1da1f2' },
    { id: 2, icon: <FaInstagram size={23} />, link: 'https://www.instagram.com/', color: '#c13584' },
    { id: 3, icon: <FaTelegram size={23} />, link: 'https://www.Telegram.com/', color: '#0088cc' }
];




const Footer = () => {
    const showSnackBar = useSnackbar(state => state.showSnackbar);
    const hideSnackBar = useSnackbar(state => state.hideSnackbar);
    const emailInputRef = useRef(null);

    function handleEmailSub() {
        // Check if the email input value is valid
        if (!emailInputRef.current.value || !/\S+@\S+\.\S+/.test(emailInputRef.current.value)) {
            showSnackBar('Please enter a valid email address.');


            hideSnackBar(1500);
            emailInputRef.current.value = ""
            return;
        }

        // Send the email input value to the server
        // ...

        showSnackBar('Email subscribed successfully.');
        hideSnackBar(1500);
        emailInputRef.current.value = ""
    }





    return (
        <footer className=" bg-dark-blue sm:h-5/6 grid grid-cols-1 sm:grid-cols-3 sm:grid-rows-1">
            {/* left side */}
            <div className="inline-grid sm:grid-rows-3 grid-cols-1 place-content-start p-4 gap-2">
                <img src={('assets/site icon.png')} alt="site logo" className="h-28" />
                <span className="w-1/2 bg-gray-600 h-0.5"></span>
                <span className="flex flex-col gap-3 justify-starth-full">
                    <a href="tel:123-456-7890" className="text-white font-medium hover:underline">
                        123-456-7890
                    </a>
                    <a href="mailto:shop@example.com" className="text-white font-medium hover:underline">
                        shop@example.com
                    </a>
                </span>
            </div>

            {/* middle side */}
            <div className="grid sm:grid-rows-4 grid-cols-1 p-4 gap-2">
                <h1 className="place-self-center justify-self-start font-sans text-white uppercase pl-1 pt-4 text-lg">Our Products</h1>
                <span className="w-1/2bg-gray-600 h-0.5"></span>

                <span className="inline-grid grid-cols-1 grid-rows-3 gap-3 row-span-2 text-white uppercase touch-pan-down">
                    {products.map((product) => (
                        <span className="group w-36" key={product.name}>
                            <span className="hidden sm:block absolute w-0 group-hover:w-36 h-6 rounded-lg transition-all duration-700 bg-cyan-400 cursor-pointer"></span>
                            <p className="sm:absolute z-10 bg-transparent bg-clip-content cursor-pointer">{product.name}</p>
                        </span>
                    ))}
                </span>
            </div>

            {/* right side */}
            <div className="grid sm:grid-rows-4 grid-cols-1 p-4 gap-2">
                <h1 className="place-self-center justify-self-start font-sans text-white uppercase pl-1 pt-4 text-lg">Further Info</h1>
                <span className="w-1/2 bg-gray-600 h-0.5"></span>

                <span className="inline-grid grid-cols-1 grid-rows-4 gap-3 row-span-2 text-white uppercase ">
                    {infoLinks.map((link) => (
                        <span className="group w-36" key={link.name} >
                            <span className="hidden sm:block absolute w-0 group-hover:w-36 h-6 rounded-lg transition-all duration-700 bg-cyan-400 cursor-pointer"></span>
                            <Link to={link.link} onClick={() => window.scrollTo({
                                top: 0,
                                behavior: 'smooth'
                            })} className="sm:absolute z-10 bg-transparent bg-clip-content cursor-pointer">{link.name}</Link>
                        </span>
                    ))}
                </span>
            </div>


            {/* bottom section */}
            <div className="grid  max-sm:grid-rows-2  max-sm:h-full  max-sm:gap-6 sm:grid-cols-2 sm:col-span-3 h-20 items-baseline w-full bg-gray-900  text-white p-4">
                {/* Social media icons */}
                <div className="flex flex-row gap-9 h-fit">
                    {socials.map(({ id, icon, link, color }) => (
                        <a
                            key={id}
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ring-1 rounded-full ring-gray-50 p-1 transition-all duration-500 filter hover:-rotate-12 hover:scale-125"
                            style={{ backgroundColor: color }}
                        >
                            {icon}
                        </a>
                    ))}
                </div>

                {/* Email subscribe */}
                <div className="flex    justify-evenly sm:pl-5 sm:pr-5 gap-7 ">
                    <input ref={emailInputRef} type="email" name="" id="" className="w-full py-1 px-2 rounded-md bg-white text-black" placeholder="Subscribe to our newsletter" />

                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md" onClick={() => handleEmailSub()}>
                        Subscribe
                    </button>
                </div>
            </div>

            <p className='pt-1 h-10 bg-gray-900 border-t-2 border-gray-700 text-white w-full sm:col-span-3'>&copy; Programmed By Eng: Mohamad Ward</p>


            <Snackbar></Snackbar>

        </footer>
    );
};

export default Footer;