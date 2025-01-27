import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';
import logo from "../assets/images/logo.png";

const Footer = () => {
  return (
    <footer className="w-full text-slate-500 pt-10  text-sm border">
      {/* Main Footer */}
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Logo and Brand Name */}
          <div className="col-span-1 flex flex-col items-start">
            <a
              href="/"
              className="flex items-center gap-2 w-12 font-medium text-2xl"
            >
              {/* Simple Logo, replace with your logo */}
              <img src={logo} alt="logo" />
              fitStat
            </a>
            <p className="mt-4 text-gray-400">
              Track your fitness goals and get the stats you need to stay on track.
            </p>
          </div>

          {/* Useful Links */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <h3 className="font-medium mb-4">Quick Links</h3>
            <ul>
            <li className="mb-2">
                <a
                  href="https://google.com"
                  className="transition-colors duration-300 hover:text-emerald-500"
                >
                  Google
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="https://youtube.com"
                  className="transition-colors duration-300 hover:text-emerald-500"
                >
                  Youtube
                </a>
              </li>
             
              <li className="mb-2">
                <a
                  href="https://wikipedia.com"
                  className="transition-colors duration-300 hover:text-emerald-500"
                >
                  Wikipedia
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="col-span-1">
            <h3 className=" font-medium mb-4">Contact</h3>
            <ul>
              <li className="mb-2">
                <p>support@fitstat.com</p>
              </li>
              <li className="mb-2">
                <p>+1 234 567 890</p>
              </li>
              <li className="mb-2">
                <p>123 FitStat St, Fitness City, FC 56789</p>
              </li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div className="col-span-1">
            <h3 className=" font-medium mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                className="text-orange-500 hover:text-emerald-300 transition-colors duration-300"
              >
                <FaFacebook size={24} />
              </a>
              <a
                href="https://instagram.com"
                className="text-orange-500 hover:text-emerald-300 transition-colors duration-300"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="https://twitter.com"
                className="text-orange-500 hover:text-emerald-300 transition-colors duration-300"
              >
                <FaTwitter size={24} />
              </a>
              <a
                href="https://linkedin.com"
                className="text-orange-500 hover:text-emerald-300 transition-colors duration-300"
              >
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="bg-slate-600 text-center text-gray-400 py-4 mt-10">
        <p>&copy; {new Date().getFullYear()} FitStat. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
