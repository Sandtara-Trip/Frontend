import React from "react";

const BackgroundSlider = ({ slides, currentSlide, onSlideChange }) => {
  return (
    <>
      {/* Background Images */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out 
            ${index === currentSlide ? "opacity-100 z-0" : "opacity-0 z-0"}`}
          style={{
            backgroundImage: `url(${slide.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40 z-0" />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/60 to-transparent z-0" />

      {/* Bullet Navigation */}
      <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => onSlideChange(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 
              ${currentSlide === index ? "bg-white scale-125" : "bg-white/50"}`}
          />
        ))}
      </div>
    </>
  );
};

export default BackgroundSlider;
