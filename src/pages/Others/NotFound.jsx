import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import gif404 from '../../assets/images/giphy.gif'
import { Helmet } from 'react-helmet-async';
const NotFound = () => {
  return (
    <>
    <Helmet>
      <title>404 - Page Not Found</title>
      <meta name="description" content="Oops! The page you are looking for does not exist." />
    </Helmet>
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-800 via-gray-900 to-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >

      {/* Content */}
      <motion.div
        className="text-center px-6 py-8 bg-white rounded-lg shadow max-w-md w-11/12 sm:w-3/4 lg:w-1/2"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100 }}
      >
        <motion.h1
          className="text-5xl sm:text-6xl font-bold text-gray-800 leading-tight"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 100, delay: 0.2 }}
        >
          404
        </motion.h1>
        <motion.p
          className="text-md md:text-lg text-gray-600 mt-4 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Oops! The page you're looking for doesn't exist.
        </motion.p>
        <motion.img
        src={gif404} // Replace with your preferred GIF or JPG
        alt="404 Animation"
        className="w-40 max-w-xs rounded-lg mx-auto shadow-lg mb-8"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 100 }}
      />

        {/* Return to Home Button */}
        <motion.div
          className="relative inline-block"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        >
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-600 text-white rounded-lg text-lg font-medium shadow-md hover:from-teal-500 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 ease-in-out"
          >
            Go Back Home
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
    </>
  );
};

export default NotFound;
