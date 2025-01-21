import { useParams } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import PageTitle from "../../components/PageTitle";
import { MdWorkOutline } from "react-icons/md";
import { HiOutlineArrowCircleRight } from "react-icons/hi";
import TrainerBanner from "./TrainerBanner";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const TrainerDetails = () => {
  const axiosPublic = useAxiosPublic();
  const { id } = useParams();

  const { data: trainer } = useQuery({
    queryKey: ["trainer", id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/trainer/${id}`);
      return res.data[0];
    },
  });
    const socialIcons = {
      facebook: FaFacebook,
      twitter: FaTwitter,
      instagram: FaInstagram,
      linkedin: FaLinkedin,
    };

  const { name, age, photoURL, availableSlots, biodata, email, skills, experience, socialLinks } = trainer || {};

  return (
    <div className="container mx-auto py-5">
      <PageTitle title={`${name} Details`} subTitle="Learn about your trainer before booking" />
      
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Left Side: Trainer Image & Availability */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 flex flex-col md:flex-row items-center gap-6">
          {/* Image */}
          <img className="w-56 h-56 md:w-72 md:h-72 rounded-full border shadow-md object-cover" src={photoURL} alt={name} />
          
          {/* Available Slots */}
          <div>
            <p className="text-lg font-medium text-gray-800 dark:text-gray-100">Available Slots:</p>
            <div className="mt-2 flex flex-col gap-2">
              {availableSlots?.days?.map((day, index) => (
                <span key={index} className="border rounded-md px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700">
                  {day} - {availableSlots.time}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Trainer Info */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
          <h4 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{name}</h4>
          
          <div className="flex flex-wrap gap-3 mt-3 text-gray-700 dark:text-gray-300">
            <p className="flex items-center gap-1 border px-4 py-1 rounded-md"><HiOutlineArrowCircleRight /> {age} Years Old</p>
            <p className="flex items-center gap-1 border px-4 py-1 rounded-md"><MdWorkOutline /> {experience} Years Experience</p>
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            {skills?.map((each, index) => (
              <span className="border px-4 py-1 rounded-md text-sm bg-gray-100 dark:bg-gray-700" key={index}>
                {each}
              </span>
            ))}
          </div>
          <div className="flex gap-3 text-gray-500 text-lg mt-2">
                  {socialLinks?.map((link, index) => {
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

          <p className="text-gray-600 dark:text-gray-300 mt-4 text-lg">{email}</p>
          <p className="mt-3 text-gray-700 dark:text-gray-300 leading-relaxed">Biodata: {biodata}</p>
        </div>
      </div>
      <TrainerBanner/>
    </div>
  );
};

export default TrainerDetails;
