import { FaFacebook, FaTwitter, FaInstagram, FaTelegram } from 'react-icons/fa';

const TopBanner = () => {
  const socials = [
    { id: 0, icon: <FaFacebook size={23} />, link: 'https://www.facebook.com/', color: '#3b5998' },
    { id: 1, icon: <FaTwitter size={23} />, link: 'https://www.twitter.com/', color: '#1da1f2' },
    { id: 2, icon: <FaInstagram size={23} />, link: 'https://www.instagram.com/', color: '#c13584' },
    { id: 3, icon: <FaTelegram size={23} />, link: 'https://www.Telegram.com/', color: '#0088cc' }
  ];

  return (
    <nav className="hidden  md:grid grid-cols-1 md:grid-cols-3 bg-dark-blue text-white gap-10 p-2">
      <div className="sm:pl-12 sm:place-content-start md:col-span-2 flex gap-10 ">
        <a href="tel:123-456-7890" className="text-white font-medium hover:underline">
          123-456-7890
        </a>
        <a href="mailto:shop@example.com" className="text-white font-medium hover:underline">
          shop@example.com
        </a>
      </div>
      <div className="place-self-center md:col-span-1 flex gap-10 group justify-end pr-6">
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
    </nav>
  );
};

export default TopBanner;