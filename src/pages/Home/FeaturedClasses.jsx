import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { FaCalendarCheck } from "react-icons/fa";
import { Reveal } from "react-awesome-reveal";
import { useNavigate } from "react-router-dom";

const FeaturedClasses = () => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  
  // Fetch popular classes data from API
  const { data: popularClasses, isLoading, isError } = useQuery({
    queryKey: ['class', 'popularClasses'],
    queryFn: async () => {
      const res = await axiosPublic.get('/classes/popular');
      return res.data;
    },
  });

  // Show loading or error state
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data.</div>;

  return (
    <div className="py-8 ">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Featured Classes</h2>

        {/* Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {popularClasses?.map((classItem, index) => (
            <Reveal key={classItem._id} effect="fadeInUp" delay={index * 200}>
              <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <img
                  src={classItem.image}
                  alt={classItem.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{classItem.title}</h3>

                  {/* Class details with line-clamp */}
                  <p className="text-gray-600 mb-4 line-clamp-4 text-justify">{classItem.details}</p>

                  {/* Author and Role */}
                  <div className="text-gray-600 mb-4">
                    <span className="font-semibold">{classItem.author}</span> -{" "}
                    <span className="italic">{classItem.role}</span>
                  </div>

                  {/* Booking Count After Image */}
                  <div className="flex items-center space-x-2 text-gray-600">
                    <FaCalendarCheck className="text-xl" />
                    <span className="text-sm">{classItem.bookingCount} Bookings</span>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Button to View All Classes */}
        <div className="mt-3">
          <button
            onClick={() => navigate('/classes')}
            className="bg-orange-500 text-white px-4 py-1.5 rounded-md text-lg hover:bg-orange-600 transition"
          >
            All Classes
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedClasses;
