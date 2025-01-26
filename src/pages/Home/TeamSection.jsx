import { MdWorkOutline } from "react-icons/md";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { HiOutlineArrowCircleRight } from "react-icons/hi";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const TeamSection = () => {
  const axiosPublic = useAxiosPublic();
  const { data: trainers } = useQuery({
    queryKey: ['trainer'],
    queryFn: async () => {
      const res = await axiosPublic.get('/trainers/team');
      return res.data;
    },
  });

  const socialIcons = {
    facebook: FaFacebook,
    twitter: FaTwitter,
    instagram: FaInstagram,
    linkedin: FaLinkedin,
  };

  return (
    <div className="container mx-auto py-5">
      <h2 className="text-3xl font-semibold text-center mb-6">Our Team</h2>
      <p className="text-center text-lg text-gray-600 mb-10">
        Meet our skilled and experienced team members who are dedicated to helping you achieve your fitness goals.
      </p>

      {/* Team Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {trainers?.map((member) => (
          <div
            key={member._id}
            className="group border rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition duration-300 bg-white flex flex-col"
          >
            {/* Profile Image */}
            <div className="relative w-full overflow-hidden">
              <img
                src={member.photoURL}
                alt={member.name}
                className="w-full h-72 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {/* Social Icons on Hover */}
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {member.socialLinks.map((link, index) => {
                  const Icon = socialIcons[link.platform.toLowerCase()];
                  return (
                    Icon && (
                      <a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white text-lg hover:text-orange-400 transition"
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
                <h3 className="text-lg font-semibold text-gray-800">{member.name}</h3>
                <div className="flex gap-2 mt-1 text-sm text-gray-700">
                  <p className="flex items-center gap-1 border px-2 py-1 rounded-md">
                    <HiOutlineArrowCircleRight /> {member.age} Years Old
                  </p>
                  <p className="flex items-center gap-1 border px-4 py-1 rounded-md">
                    <MdWorkOutline /> {member.experience} Years Experience
                  </p>
                </div>

                {/* Bio */}
                <div className="text-sm text-gray-700 mt-2">
                  <p>{member.biodata}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamSection;
