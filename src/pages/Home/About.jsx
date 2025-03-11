import { FaDumbbell, FaRunning, FaUserTie } from 'react-icons/fa';
import aboutImg from "../../assets/images/about.jpg";
import AnimatedTitle from '../../components/AnimatedTitle';

const About = () => {
  return (
    <section className="py-8 ">
      <div className="container mx-auto text-center lg:text-left">
     <AnimatedTitle title="About us"/>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
       
          {/* Image Section */}
          <div className="flex justify-center lg:justify-start">
            <img
              src={aboutImg}
              alt="FitStat team"
              className="rounded-lg shadow-xl max-w-full"
            />
          </div>

          {/* Text Section */}
          <div className="text-center lg:text-left">
           

            <p className="text-lg text-gray-600 mb-6">
              FitStat is a premier fitness platform with over 10 years of experience. Our certified trainers and expert-led programs are designed to help you achieve your fitness goals. Whether you're looking to build strength, improve endurance, or enhance overall wellness, FitStat offers personalized solutions for every fitness level.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {/* Feature 1 - Strength Training */}
              <div className="flex items-center text-gray-800">
                <div className="bg-blue-500 text-white p-3 rounded-full mr-4">
                  <FaDumbbell className="text-2xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Strength Training</h3>
                  <p className="text-gray-600">Build muscle and increase strength with our tailored workouts.</p>
                </div>
              </div>

              {/* Feature 2 - Cardio Training */}
              <div className="flex items-center text-gray-800">
                <div className="bg-green-500 text-white p-3 rounded-full mr-4">
                  <FaRunning className="text-2xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Cardio Training</h3>
                  <p className="text-gray-600">Boost your endurance and cardiovascular health with dynamic cardio sessions.</p>
                </div>
              </div>

              {/* Feature 3 - Professional Trainers */}
              <div className="flex items-center text-gray-800">
                <div className="bg-red-500 text-white p-3 rounded-full mr-4">
                  <FaUserTie className="text-2xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Certified Trainers</h3>
                  <p className="text-gray-600">Get personalized training plans from certified fitness experts.</p>
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
