import React, { useEffect, useState } from "react";

const DetailImageSlider = ({ images, interval = 4000 }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const autoSlide = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(autoSlide);
  }, [images.length, interval]);

  return (
    <div className="relative w-full h-72 rounded-xl overflow-hidden">
      {images.map((img, idx) => (
        <img
          key={idx}
          src={img}
          alt={`slide-${idx}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
            idx === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        />
      ))}
      {/* Bullets */}
      <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-2.5 h-2.5 rounded-full ${
              current === idx ? "bg-white scale-110" : "bg-white/50"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default DetailImageSlider;
