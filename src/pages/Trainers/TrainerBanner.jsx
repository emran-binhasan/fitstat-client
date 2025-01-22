import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HiArrowRightCircle } from "react-icons/hi2";
import { Fade } from "react-awesome-reveal";

const TrainerBanner = () => {
  return (
    <div className="p-4 flex justify-center items-center">
      <Fade duration={1200} triggerOnce>
        <div className="border shadow-xl bg-cta bg-fixed bg-bottom text-white bg-contain w-[860px] h-80 text-center px-8 py-10 rounded-lg">
        
        <div className="mt-20">
        <h3 className="text-4xl font-medium">
            Be a Trainer
          </h3>
          <p className=" mt-2 text-lg">
            Join our team and help trainees achieve their fitness goals.
          </p>
         <div className="m-4">
         <Link
              to="/trainers/apply"
              className="border py-2 px-3 rounded-md bg-orange-500 my-2"
            >
              Start Applying Today <HiArrowRightCircle className="inline" size={24} />
            </Link>
         </div>
        </div>
        </div>
      </Fade>
    </div>
  );
};

export default TrainerBanner;
