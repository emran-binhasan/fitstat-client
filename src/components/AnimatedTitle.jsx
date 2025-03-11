import gsap from "gsap";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AnimatedTitle = ({ title }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const titleAnimation = gsap.timeline({
        scrollTrigger: {
         trigger:containerRef.current,
                    start:'100 bottom',
                    end:'center bottom',
                    toggleActions:'play none none reverse'
        },
      });

      titleAnimation.fromTo(
        ".animated-word",
        {
          opacity: 0,
          transform: "translate3d(0, 100%, 0) rotateX(90deg)",
          translateX:'50',
          ease:'back.inOut'
        },
        {
          duration: 0.5,
          opacity: 1,
          transform: "translate3d(0, 0, 0) rotateX(0deg)",
          stagger: 0.5,
          ease: "power2.out",
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="text-center text-3xl flex justify-center gap-2 my-4">
      {title.split(" ").map((word, idxWord) => (
        <span key={idxWord} className="animated-word opacity-0">
          {word.split("").map((letter, idxLetter) => (
            <span key={idxLetter} className="inline-block">{letter}</span>
          ))}
        </span>
      ))}
    </div>
  );
};

export default AnimatedTitle;
