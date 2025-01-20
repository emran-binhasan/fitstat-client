import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";

const slides = [
  {
    video:'https://i.imgur.com/XC385if.mp4', // Replace with your video path
    title: "Join Our Gym Today!",
    description: "Achieve your fitness goals with expert trainers.",
    buttonText: "View Classes",
    link: "/classes",
  },
  {
    video: 'https://i.imgur.com/LspTf0F.mp4',
    title: "Strength & Conditioning",
    description: "Personalized training programs for all levels.",
    buttonText: "Get Started",
    link: "/classes",
  },

];

const Slider = () => {
  const [sliderRef] = useKeenSlider({
    loop: true,
    mode: "free-snap", // Allows smooth transitions
    slides: { perView: 1 },
  });

  return (
    <div ref={sliderRef} className="keen-slider w-full h-[85vh] -mt-16">
      {slides.map((slide, index) => (
        <div
          key={index}
          className="keen-slider__slide flex items-center justify-center relative"
        >
          {/* Video Background */}
          <video
            className="absolute inset-0 blur-sm w-full h-full object-cover"
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
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
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
