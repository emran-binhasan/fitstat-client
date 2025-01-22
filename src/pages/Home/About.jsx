
import { FaUsers, FaHeartbeat, FaShieldAlt } from 'react-icons/fa';

const About = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto text-center lg:text-left">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Section */}
          <div className="flex justify-center lg:justify-start">
            <img
              src=""
              alt="FitStat team"
              className="rounded-lg shadow-xl max-w-full"
            />
          </div>

          {/* Text Section */}
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
              About FitStat
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              FitStat is a leading platform that helps individuals track their fitness
              journeys with precision and ease. We are dedicated to providing actionable
              insights, professional guidance, and a community to inspire and motivate
              every step of your fitness journey.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {/* Feature 1 */}
              <div className="flex items-center text-gray-800">
                <div className="bg-blue-500 text-white p-3 rounded-full mr-4">
                  <FaUsers className="text-2xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Community</h3>
                  <p className="text-gray-600">Join a community of like-minded individuals.</p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex items-center text-gray-800">
                <div className="bg-green-500 text-white p-3 rounded-full mr-4">
                  <FaHeartbeat className="text-2xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Health Tracking</h3>
                  <p className="text-gray-600">Track your workouts, nutrition, and health metrics.</p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex items-center text-gray-800">
                <div className="bg-red-500 text-white p-3 rounded-full mr-4">
                  <FaShieldAlt className="text-2xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Data Security</h3>
                  <p className="text-gray-600">Your data is secure with us, always.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

