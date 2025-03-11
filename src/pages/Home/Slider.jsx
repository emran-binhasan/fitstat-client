import { useState, useEffect, useRef, useLayoutEffect } from "react";
import clsx from "clsx";
import { gsap } from "gsap";

/**
 * Responsive Parallax Image Slider Component
 * - True parallax transitions with slides overlapping
 * - Optimized performance with GSAP context
 * - Fully responsive on all devices
 * - Text animations with staggered reveals for both title and description
 */
const Slider = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Create refs
  const sliderRef = useRef(null);
  const slidesRef = useRef([]);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const titleCharsRef = useRef([]);
  const descriptionCharsRef = useRef([]);
  const ctxRef = useRef(null);





  // Slide data
  const slides = [
    {
      id: 0,
      title: "Join Our Gym Today",
      description:
        "Get fit with personalized workouts from top trainer. Achieve your fitness      goals with expert guidance and state-of-the-art equipment.",
      imgUrl:
        "https://i.ibb.co.com/PG0nLvVn/2.jpg",
    },
    {
      id: 1,
      title: "Transform Your Body",
      description:
        "Take your fitness journey to the next level with our advanced training     programs tailored to your needs.",
      imgUrl: "https://i.ibb.co.com/ZpycF8G9/1.jpg",
    },
    {
      id: 2,
      title: "Stay Motivated with Us",
      description:
        "Push yourself every day with our community support and track your      progress like never before.",
      imgUrl: "https://i.ibb.co.com/ycVv68WQ/3.jpg",
    },
  ];

  // Create GSAP context for better performance
  useLayoutEffect(() => {
    // Create context for better memory management and performance
    ctxRef.current = gsap.context(() => {}, sliderRef);

    return () => ctxRef.current.revert(); // Clean up animations on unmount
  }, []);

  // Initialize slides on mount
  useEffect(() => {
    if (!ctxRef.current) return;

    ctxRef.current.add(() => {
      // Set up initial z-index stacking
      slidesRef.current.forEach((slide, index) => {
        gsap.set(slide, {
          xPercent: index === 0 ? 0 : 100,
          autoAlpha: index === 0 ? 1 : 0,
          zIndex: slides.length - index,
        });
      });

      // Set up initial text animations
      splitTextIntoSpans(slides[0].title, titleRef, titleCharsRef);
      splitTextIntoSpans(
        slides[0].description,
        descriptionRef,
        descriptionCharsRef
      );
      animateTextIn();
    });
  }, []);

  /**
   * Splits text into spans for character animation
   * @param {string} text - Text to split
   * @param {React.RefObject} containerRef - Reference to the container element
   * @param {React.RefObject} charsRefArray - Reference to store character spans
   */
  const splitTextIntoSpans = (text, containerRef, charsRefArray) => {
    if (!containerRef.current) return;

    containerRef.current.innerHTML = "";
    charsRefArray.current = [];

    [...text].forEach((char) => {
      const span = document.createElement("span");
      span.textContent = char;
      span.style.display = "inline-block";
      span.style.opacity = "0";
      span.style.transform = "translateY(50px)";
      containerRef.current.appendChild(span);
      charsRefArray.current.push(span);
    });
  };

  /**
   * Animate text characters out
   */
  const animateTextOut = () => {
    return ctxRef.current.add(() => {
      const tl = gsap.timeline();

      // Animate title out first
      tl.to(titleCharsRef.current, {
        duration: 0.3,
        opacity: 0,
        y: -50,
        stagger: 0.015,
        ease: "power2.inOut",
      });

      // Then animate description out slightly faster
      tl.to(
        descriptionCharsRef.current,
        {
          duration: 0.25,
          opacity: 0,
          y: -50,
          stagger: 0.01,
          ease: "power2.inOut",
        },
        "-=0.2"
      ); // Slight overlap

      return tl;
    });
  };

  /**
   * Animate text characters in
   */
  const animateTextIn = () => {
    ctxRef.current.add(() => {
      const tl = gsap.timeline();

      // Animate title in first
      tl.to(titleCharsRef.current, {
        duration: 0.6,
        opacity: 1,
        y: 0,
        stagger: 0.03,
        ease: "power2.out",
        delay: 0.3,
      });

      // Then animate description in
      tl.to(
        descriptionCharsRef.current,
        {
          duration: 0.5,
          opacity: 1,
          y: 0,
          stagger: 0.01,
          ease: "power2.out",
        },
        "-=0.3"
      ); // Slight overlap for natural flow

      return tl;
    });
  };

  /**
   * Handle transition between slides with parallax effect
   */
  const transitionToSlide = (nextIndex) => {
    if (isAnimating || nextIndex === activeSlide) return;

    setIsAnimating(true);

    const currentSlide = slidesRef.current[activeSlide];
    const nextSlide = slidesRef.current[nextIndex];

    // Start text exit animation
    animateTextOut();

    ctxRef.current.add(() => {
      // Position next slide for animation
      gsap.set(nextSlide, {
        xPercent: 100,
        autoAlpha: 1,
        zIndex: slides.length + 1,
      });

      // Create animation timeline
      const tl = gsap.timeline({
        onComplete: () => {
          // Update z-index for all slides
          slidesRef.current.forEach((slide, idx) => {
            const zOffset =
              idx > nextIndex
                ? idx - nextIndex
                : slides.length + nextIndex - idx;

            gsap.set(slide, {
              zIndex:
                idx === nextIndex ? slides.length : slides.length - zOffset,
            });
          });

          // Update state and prepare new text
          setActiveSlide(nextIndex);
          splitTextIntoSpans(slides[nextIndex].title, titleRef, titleCharsRef);
          splitTextIntoSpans(
            slides[nextIndex].description,
            descriptionRef,
            descriptionCharsRef
          );
          animateTextIn();
          setIsAnimating(false);
        },
      });

      // True parallax effect: slide comes over the previous one
      tl.to(
        nextSlide,
        {
          xPercent: 0,
          duration: 1,
          ease: "power2.out",
        },
        0
      );

      // Add subtle scale effect for enhanced parallax feeling
      tl.fromTo(
        nextSlide,
        { scale: 1.05 },
        { scale: 1, duration: 1.2, ease: "power2.out" },
        0
      );
    });
  };

  // Navigation click handler
  const handleNavigation = (index) => transitionToSlide(index);

  // Next button click handler
  const handleNext = () => transitionToSlide((activeSlide + 1) % slides.length);

  return (
    <div
      ref={sliderRef}
      className="w-full -mt-16 h-[75vh] md:h-screen relative overflow-hidden"
    >
      {/* Slides */}
      <div className="w-full h-full relative">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            ref={(el) => (slidesRef.current[index] = el)}
            className="absolute inset-0 w-full h-full"
            style={{
              backgroundImage: `url(${slide.imgUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-black/30"></div>
          </div>
        ))}
      </div>

      {/* Text content container */}
      <div
        className="absolute z-20 
        top-20 left-5 w-4/5 max-w-2xl
        md:top-1/4 md:left-1/2 md:-translate-x-1/2
        lg:top-1/4"
      >
        {/* Title with character animation */}
        <div
          ref={titleRef}
          className="text-white font-medium text-2xl sm:text-3xl md:text-4xl whitespace-pre-wrap"
        />

        {/* Description with character animation */}
        <div
          ref={descriptionRef}
          className="text-white/90 mt-4 text-base sm:text-lg md:text-xl font-light whitespace-pre-wrap max-w-2xl"
        />
      </div>

      {/* Navigation Controls */}
      <div
        className="absolute z-20 flex gap-y-4 md:gap-x-14 lg:gap-x-14
        bottom-20 left-6 max-w-[calc(100%-80px)]
        md:bottom-16 md:left-1/2 md:-translate-x-1/2
        lg:bottom-20"
      >
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className="flex flex-col mr-6 cursor-pointer sm:mr-4"
            onClick={() => handleNavigation(index)}
          >
            {/* Nav Title (shortened version) */}
            <span
              className={clsx(
                "text-white transition-opacity duration-500 text-sm truncate max-w-40 sm:max-w-2xl md:max-w-60 lg:max-72",
                {
                  "opacity-100": index === activeSlide,
                  "opacity-50": index !== activeSlide,
                }
              )}
            >
              <span className="sm:block md:hidden">{`${index + 1}. ${
                slide.title.split(" ")[0]
              }`}</span>

              {/* On medium and larger screens, show the full title */}
              <span className="hidden md:block">{`${index + 1}. ${
                slide.title
              }`}</span>
            </span>

            {/* Progress Bar */}
            <div
              className={clsx(
                "relative h-1 bg-white/30 overflow-hidden mt-2 transition-all duration-500",
                {
                  "opacity-100 w-16 sm:w-24 md:32 lg:w-40": index === activeSlide,
                  "opacity-50 w-12 sm:w-20 md:24 lg:w-28": index !== activeSlide,
                }
              )}
            >
              <div
                className={clsx(
                  "absolute inset-0 bg-white transition-transform duration-500",
                  {
                    "translate-x-0": index === activeSlide,
                    "-translate-x-full": index !== activeSlide,
                  }
                )}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Next Button */}
      <button
        className="absolute z-20 bg-transparent border-0 cursor-pointer
          bottom-20 right-6
          md:bottom-16 md:right-10"
        onClick={handleNext}
        aria-label="Next slide"
      >
        <svg
          className="fill-white w-10 h-10 md:w-12 md:h-12"
          viewBox="0 0 24 24"
        >
          <path
            d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"
            stroke="white"
            strokeWidth="1.5" // Medium stroke width
            fill="none"
            strokeDasharray="100"
            strokeDashoffset="100"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="100"
              to="0"
              dur="2s"
              repeatCount="indefinite"
            />
          </path>
        </svg>
      </button>
    </div>
  );
};

export default Slider;
