import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from "react-helmet-async";
import About from "./About";
import FeaturedClasses from "./FeaturedClasses";
import LatestPosts from "./LatestPosts";
import Newsletter from "./Newsletters";
import Reviews from "./Reviews";
import Slider from "./Slider";
import TeamSection from './TeamSection';

const Home = () => {
  const [backgroundColor, setBackgroundColor] = useState('bg-white');
  const sectionRefs = useRef([]);

  // Enhanced background colors with light green and light red tones
  const backgroundColors = [
    'bg-white',            // Slider
    'bg-green-50',         // Light green for FeaturedCards
    'bg-red-50',           // Light red for About
    'bg-emerald-50',       // Another light green shade for FeaturedClasses
    'bg-rose-50',          // Light red variation for Reviews
    'bg-teal-50',          // Light teal/green for Newsletter
    'bg-gray-100'             // LatestPosts back to white
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      const currentSection = sectionRefs.current.findIndex((ref, index) => {
        if (!ref) return false;
        const sectionTop = ref.offsetTop;
        const sectionHeight = ref.offsetHeight;
        return (
          scrollPosition >= sectionTop - 100 && 
          scrollPosition < sectionTop + sectionHeight - 100
        );
      });

      if (currentSection !== -1) {
        setBackgroundColor(backgroundColors[currentSection]);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`transition-colors duration-500 ${backgroundColor}`}>
      <Helmet>
        <title>FitStat | Home</title>
      </Helmet>
      
      <div ref={(el) => sectionRefs.current[0] = el}>
        <Slider/>
      </div>
      
      <div ref={(el) => sectionRefs.current[1] = el}>
        <About/>
      </div>
      
      <div ref={(el) => sectionRefs.current[2] = el}>
        <FeaturedClasses/>
      </div>
      
      <div ref={(el) => sectionRefs.current[3] = el}>
        <Reviews/>
      </div>
      
      <div ref={(el) => sectionRefs.current[4] = el}>
        <Newsletter/>
      </div>
      
      <div ref={(el) => sectionRefs.current[5] = el}>
        <LatestPosts/>
      </div>
      <TeamSection/>
    </div>
  );
};

export default Home;