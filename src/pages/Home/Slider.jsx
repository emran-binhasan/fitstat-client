import React, { useState } from 'react';
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";

const slides = [
  {
    video: 'https://i.imgur.com/TN2BI2m.mp4',
    title: "Join Our Gym Today!",
    description: "Achieve your fitness goals with expert trainers.",
    buttonText: "View Classes",
    link: "/classes",
  },
  {
    video: 'https://i.imgur.com/HBS4fMP.mp4',
    title: "Transform Your Body",
    description: "Get fit with personalized workouts from top trainers.",
    buttonText: "Discover Programs",
    link: "/programs",
  },
  {
    video: 'https://i.imgur.com/msUMH3u.mp4',
    title: "Strength & Conditioning",
    description: "Personalized training programs for all levels.",
    buttonText: "Get Started",
    link: "/classes",
  },
];

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    loop: true,
    slides: { perView: 1 },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    drag: false, // Prevent manual sliding if you want pure autoplay
    breakpoints: {
      "(min-width: 400px)": {
        slides: { perView: 1, spacing: 5 },
      },
    },
    created(slider) {
      // Setup autoplay with more explicit configuration
      const autoplay = setInterval(() => {
        if (slider.track) {
          slider.next();
        }
      }, 3000);

      // Cleanup interval on unmount
      return () => {
        clearInterval(autoplay);
      };
    },
  });

  return (
    <div ref={sliderRef} className="keen-slider w-full h-[86vh] -mt-16">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`keen-slider__slide flex items-center justify-center relative ${
            currentSlide === index ? 'active' : ''
          }`}
        >
          {/* Video Background */}
          <video
            className="absolute inset-0 w-full h-full object-cover"
            src={slide.video}
            autoPlay
            loop
            muted
            playsInline
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>

          {/* Content */}
          <div className="relative text-center text-white px-6">
            <h2 className="text-3xl font-bold mb-2">{slide.title}</h2>
            <p className="text-lg mb-4">{slide.description}</p>
            <a
              href={slide.link}
              className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition"
            >
              {slide.buttonText}
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slider;