import { FaDumbbell, FaRunning, FaUserTie } from 'react-icons/fa';
import { Reveal } from 'react-awesome-reveal';
import { motion } from 'framer-motion';
import aboutImg from "../../assets/images/about.jpg";

const About = () => {
  return (
    <section className="py-8 ">
      <div className="container mx-auto text-center lg:text-left">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Section */}
          <div className="flex justify-center lg:justify-start">
            <Reveal effect="fadeInUp" duration={1200}>
              <motion.img
                src={aboutImg}
                alt="FitStat team"
                className="rounded-lg shadow-xl max-w-full"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              />
            </Reveal>
          </div>

          {/* Text Section */}
          <div className="text-center lg:text-left">
            <Reveal effect="fadeInUp" duration={1200}>
              <h2 className="text-3xl font-semibold text-gray-800 mb-4">
                About FitStat
              </h2>
            </Reveal>

            <Reveal effect="fadeInUp" duration={1400}>
              <p className="text-lg text-gray-600 mb-6">
                FitStat is a premier fitness platform with over 10 years of experience. Our certified trainers and expert-led programs are designed to help you achieve your fitness goals. Whether you're looking to build strength, improve endurance, or enhance overall wellness, FitStat offers personalized solutions for every fitness level.
              </p>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {/* Feature 1 - Strength Training */}
              <motion.div
                className="flex items-center text-gray-800"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <div className="bg-blue-500 text-white p-3 rounded-full mr-4">
                  <FaDumbbell className="text-2xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Strength Training</h3>
                  <p className="text-gray-600">Build muscle and increase strength with our tailored workouts.</p>
                </div>
              </motion.div>

              {/* Feature 2 - Cardio Training */}
              <motion.div
                className="flex items-center text-gray-800"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <div className="bg-green-500 text-white p-3 rounded-full mr-4">
                  <FaRunning className="text-2xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Cardio Training</h3>
                  <p className="text-gray-600">Boost your endurance and cardiovascular health with dynamic cardio sessions.</p>
                </div>
              </motion.div>

              {/* Feature 3 - Professional Trainers */}
              <motion.div
                className="flex items-center text-gray-800"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <div className="bg-red-500 text-white p-3 rounded-full mr-4">
                  <FaUserTie className="text-2xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Certified Trainers</h3>
                  <p className="text-gray-600">Get personalized training plans from certified fitness experts.</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
