import React, { useState } from "react"; 
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { FaStar } from "react-icons/fa";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { Fade } from "react-awesome-reveal"; // Apply fade effect for smooth transition
import Loading from "../Others/Loading";

const Reviews = () => {
  const axiosPublic = useAxiosPublic();
  const [currentSlide, setCurrentSlide] = useState(0);

  const { data: reviews, isLoading, isError } = useQuery({
    queryKey: ['reviews'],
    queryFn: async () => {
      const res = await axiosPublic.get('/reviews');
      return res.data;
    },
  });

  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    slides: {
      perView: 3,
      spacing: 15,
    },
    breakpoints: {
      "(max-width: 1024px)": {
        slides: { perView: 2, spacing: 15 }
      },
      "(max-width: 640px)": {
        slides: { perView: 1, spacing: 15 }
      }
    },
    slideChanged: (slider) => {
      setCurrentSlide(slider.track.details.rel);
    },
    loop: true, // Enable looping for continuous slide movement
    autoplay: true, // Enable autoplay for automatic scrolling
    duration: 3000, // Set autoplay duration (3 seconds)
  });

  if (isLoading) return <Loading/>;
  if (isError) return <div>Error fetching reviews.</div>;
  if (!reviews?.length) return null;

  return (
    <div className="py-8 ">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-semibold text-gray-800 mb-8">What Our Members Say</h2>

        {/* Keen Slider */}
        <div ref={sliderRef} className="keen-slider">
          {reviews.map((review) => (
            <div key={review._id} className="keen-slider__slide">
              <Fade bottom> {/* Apply Fade from bottom animation */}
                <div className="bg-white shadow rounded-lg p-8 h-full">
                  <div className="flex flex-col items-center mb-4">
                    <h3 className="font-semibold text-lg text-gray-800 mb-2">{review.userName}</h3>
                    <div className="flex items-center mb-4">
                      {[...Array(5)].map((_, index) => (
                        <FaStar
                          key={index}
                          className={`text-orange-400 ${index < review.rating ? "fill-current" : "text-gray-300"}`} // Change color to orange
                        />
                      ))}
                    </div>
                    <p className="text-gray-600 line-clamp-4 text-center">{review.reviewText}</p>
                  </div>
                </div>
              </Fade>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => instanceRef.current?.prev()}
            className="p-2 text-orange-400 "
            aria-label="Previous Review"
          >
            <span className="text-2xl">&#10094;</span> {/* Left arrow */}
          </button>
          <button
            onClick={() => instanceRef.current?.next()}
            className="p-2 text-orange-400"
            aria-label="Next Review"
          >
            <span className="text-2xl">&#10095;</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
