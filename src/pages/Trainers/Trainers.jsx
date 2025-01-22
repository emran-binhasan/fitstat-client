import { MdWorkOutline } from "react-icons/md";
import PageTitle from "../../components/PageTitle";
import useTrainers from "../../hooks/useTrainers";
import TrainerBanner from "./TrainerBanner";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaClock,
  FaCalendarAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { HiOutlineArrowCircleRight } from "react-icons/hi";
import { Helmet } from "react-helmet-async";

const Trainers = () => {
  const [trainers] = useTrainers();
  const navigate = useNavigate();

  const socialIcons = {
    facebook: FaFacebook,
    twitter: FaTwitter,
    instagram: FaInstagram,
    linkedin: FaLinkedin,
  };

  return (
    <>
         <Helmet>
            <title>FitStat | Trainers</title>
          </Helmet>
      <div className="container mx-auto py-5">
        <PageTitle
          title="Trainers"
          subTitle="Checkout our best trainers who are experienced"
        />

        {/* Trainers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {trainers?.map((each) => (
            <div
              key={each._id}
              className="group border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300 bg-white flex flex-col"
            >
              {/* Profile Image */}
              <div className="relative  w-full overflow-hidden">
                <img
                  src={each.photoURL}
                  alt={each.name}
                  className="w-full h-80  object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {/* Social Icons on Hover */}
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {each.socialLinks.map((link, index) => {
                    const Icon = socialIcons[link.platform.toLowerCase()];
                    return (
                      Icon && (
                        <a
                          key={index}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white text-xl hover:text-blue-400 transition"
                        >
                          <Icon />
                        </a>
                      )
                    );
                  })}
                </div>
              </div>

              {/* Content */}
              <div className="p-4 flex flex-col justify-between flex-grow">
                <div>
                  {/* Name & Experience */}
                  <h3 className="text-lg font-semibold text-gray-800">
                    {each.name}
                  </h3>
                  <div className="flex  gap-2 mt-1 text-sm text-gray-700 dark:text-gray-300">
                    <p className="flex items-center gap-1 border px-2 py-1 rounded-md">
                      <HiOutlineArrowCircleRight /> {each?.age} Years Old
                    </p>
                    <p className="flex items-center gap-1 border px-4 py-1 rounded-md">
                      <MdWorkOutline /> {each?.experience} Years Experience
                    </p>
                  </div>
                  {/* Available Slots */}
                  <div className="text-sm font-medium text-green-600 mt-2">
                <p className="flex items-center gap-2">
                  <FaClock className="text-green-500" />
                  Available Slots:
                </p>
                <div className="mt-1 space-y-1">
                  {each.availableSlots?.days.map((day, index) => (
                    <span
                      key={index}
                      className="flex items-center gap-2 bg-gray-100 px-2 py-1 rounded-md"
                    >
                      <FaCalendarAlt className="text-gray-500" />
                      {day} -{each.availableSlots?.time}
                    </span>
                  ))}
                </div>
              </div>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2 mt-2">
                    {each.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded uppercase"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Know More Button */}
                <button
                  onClick={() => navigate(`/trainer/${each._id}`)}
                  className="w-full mt-4 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition"
                >
                  Know More
                </button>
              </div>
            </div>
          ))}
        </div>

        <TrainerBanner />
      </div>
    </>
  );
};

export default Trainers;
