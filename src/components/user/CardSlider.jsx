import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

const CardSlider = ({ destinations = [], title = "" }) => {
  const sliderRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!sliderRef.current || isPaused) return;

    const interval = setInterval(() => {
      if (sliderRef.current.scrollLeft >= sliderRef.current.scrollWidth - sliderRef.current.clientWidth) {
        sliderRef.current.scrollLeft = 0;
      } else {
        sliderRef.current.scrollLeft += 1; 
      }
    }, 20);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <div className="w-full max-w-full md:max-w-2xl overflow-hidden">
      {/* Judul dinamis */}
      {title && (
        <h2 className="text-white text-2xl font-bold mb-4">{title}</h2>
      )}

      <div
        ref={sliderRef}
        onMouseEnter={() => setIsPaused(true)} // pause scroll on hover
        onMouseLeave={() => setIsPaused(false)}
        className="flex gap-6 overflow-x-auto pr-4 scrollbar-hide"
      >
        {destinations.map((dest, idx) => (
          <motion.div
            key={dest.id || idx}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: idx * 0.2,
            }}
            className="flex-shrink-0 w-48 h-64 rounded-2xl overflow-hidden shadow-lg transition-transform hover:scale-105 
              bg-white bg-opacity-10 backdrop-blur-md text-white relative"
          >
            <img
              src={dest.image}
              alt={dest.name}
              className="w-full h-40 object-cover"
            />
            <div className="p-3 flex flex-col justify-between h-24">
              <p className="text-xs uppercase opacity-80">{dest.region}</p>
              <h3 className="font-semibold leading-snug line-clamp-2">{dest.name}</h3>
            </div>
            <div className="absolute inset-0 hover:bg-black hover:bg-opacity-20 transition duration-300 rounded-2xl"></div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CardSlider;
