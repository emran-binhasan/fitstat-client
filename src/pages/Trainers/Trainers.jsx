import PageTitle from "../../components/PageTitle";
import useTrainers from "../../hooks/useTrainers";
import TrainerBanner from "./TrainerBanner";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaBriefcase } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Trainers = () => {
  const [trainers] = useTrainers();
  const navigate = useNavigate();

  // Mapping social platforms to icons
  const socialIcons = {
    facebook: FaFacebook,
    twitter: FaTwitter,
    instagram: FaInstagram,
    linkedin: FaLinkedin,
  };

  return (
    <>
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
              className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300 bg-white flex flex-col"
            >
              {/* Profile Image */}
              <div className="aspect-[4/3] w-full">
                <img
                  src={each.photoURL}
                  alt={each.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-4 space-y-3 flex-grow">
                {/* Name & Experience */}
                <h3 className="text-xl font-semibold text-gray-800">
                  {each.name}
                </h3>
                <p className="text-sm text-gray-600 flex items-center gap-2">
                  <FaBriefcase className="text-blue-500" /> {each.experience} years
                </p>

                {/* Available Slots */}
                
                <p className="text-sm space-y-1  font-medium text-green-600">
                  Slots:
                  {each.availableSlots?.days.map((day, index) => (
                    <span key={index} className=" border rounded-sm px-2 py-0.5 block">
                      {day} - {each.availableSlots.time}
                    </span>
                  ))}
                </p>
              

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

                {/* Social Icons */}
                <div className="flex gap-3 text-gray-500 text-lg mt-2">
                  {each.socialLinks.map((link, index) => {
                    const Icon = socialIcons[link.platform.toLowerCase()];
                    return (
                      Icon && (
                        <a
                          key={index}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Icon className="hover:text-blue-600 transition" />
                        </a>
                      )
                    );
                  })}
                </div>
              </div>

              {/* Know More Button */}
              <button
                onClick={() => navigate(`/trainer/${each._id}`)}
                className="w-full mt-auto py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition"
              >
                Know More
              </button>
            </div>
          ))}
        </div>

        <TrainerBanner />
      </div>
    </>
  );
};

export default Trainers;
