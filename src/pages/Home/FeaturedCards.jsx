import React from 'react';
import { FaDumbbell, FaRunning, FaUsers, FaChalkboardTeacher, FaCalendarAlt, FaConciergeBell } from 'react-icons/fa';
import { Fade } from 'react-awesome-reveal';
import { motion } from 'framer-motion';

const FeaturedCards = () => {
  return (
    <section className="py-8 ">
      <div className="container mx-auto text-center">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Key Features of FitStat Gym</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16 px-10">
          {/* Card 1 - Cardio */}
          <Fade bottom>
            <motion.div
              className="bg-white border-2 border-blue-600 shadow-md rounded-xl p-6 text-center transform hover:scale-105 transition-all duration-300 ease-in-out"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="mb-4 flex justify-center items-center text-blue-600">
                <FaRunning className="text-4xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Cardio</h3>
              <p className="text-gray-600 text-base">Boost your endurance with our dedicated cardio workouts and track your progress.</p>
            </motion.div>
          </Fade>

          {/* Card 2 - Bodybuilding */}
          <Fade bottom>
            <motion.div
              className="bg-white border-2 border-red-600 shadow-md rounded-xl p-6 text-center transform hover:scale-105 transition-all duration-300 ease-in-out"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="mb-4 flex justify-center items-center text-red-600">
                <FaDumbbell className="text-4xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Bodybuilding</h3>
              <p className="text-gray-600 text-base">Focus on muscle building with our specialized bodybuilding equipment and training plans.</p>
            </motion.div>
          </Fade>

          {/* Card 3 - Membership */}
          <Fade bottom>
            <motion.div
              className="bg-white border-2 border-green-600 shadow-md rounded-xl p-6 text-center transform hover:scale-105 transition-all duration-300 ease-in-out"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="mb-4 flex justify-center items-center text-green-600">
                <FaUsers className="text-4xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Membership</h3>
              <p className="text-gray-600 text-base">Join our community with flexible membership options, designed for every fitness level.</p>
            </motion.div>
          </Fade>

          {/* Card 4 - Trainer */}
          <Fade bottom>
            <motion.div
              className="bg-white border-2 border-orange-600 shadow-md rounded-xl p-6 text-center transform hover:scale-105 transition-all duration-300 ease-in-out"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="mb-4 flex justify-center items-center text-orange-600">
                <FaChalkboardTeacher className="text-4xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Personal Trainers</h3>
              <p className="text-gray-600 text-base">Work with certified trainers to achieve your fitness goals with personalized plans.</p>
            </motion.div>
          </Fade>

          {/* Card 5 - Classes */}
          <Fade bottom>
            <motion.div
              className="bg-white border-2 border-yellow-600 shadow-md rounded-xl p-6 text-center transform hover:scale-105 transition-all duration-300 ease-in-out"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="mb-4 flex justify-center items-center text-yellow-600">
                <FaCalendarAlt className="text-4xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Fitness Classes</h3>
              <p className="text-gray-600 text-base">Join our group classes for yoga, pilates, HIIT, and more, tailored to your needs.</p>
            </motion.div>
          </Fade>

          {/* Card 6 - Concierge */}
          <Fade bottom>
            <motion.div
              className="bg-white border-2 border-purple-600 shadow-md rounded-xl p-6 text-center transform hover:scale-105 transition-all duration-300 ease-in-out"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="mb-4 flex justify-center items-center text-purple-600">
                <FaConciergeBell className="text-4xl" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Concierge Service</h3>
              <p className="text-gray-600 text-base">Enjoy personalized services like nutrition plans, fitness assessments, and more.</p>
            </motion.div>
          </Fade>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCards;
