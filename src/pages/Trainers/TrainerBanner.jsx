import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HiArrowRightCircle } from "react-icons/hi2";
import { Fade } from "react-awesome-reveal";

const TrainerBanner = () => {
  return (
    <div className="pt-20 flex justify-center items-center">
      <Fade duration={1200} triggerOnce>
        <div className="border shadow-xl bg-white dark:bg-gray-800 max-w-lg w-full text-center px-8 py-10 rounded-lg">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Be a Trainer
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Join our team and help trainees achieve their fitness goals.
          </p>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-6"
          >
            <Link
              to="/trainers/apply"
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-3 rounded-lg font-medium text-lg shadow-lg hover:shadow-xl transition duration-300 dark:from-blue-400 dark:to-blue-600"
            >
              Start Applying Today <HiArrowRightCircle size={24} />
            </Link>
          </motion.div>
        </div>
      </Fade>
    </div>
  );
};

export default TrainerBanner;
