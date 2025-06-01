// Button.js
import React from "react";

function Button({ onClick, children, type = "button", className = "" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-warm-orange hover:bg-hover-orange text-white py-2 px-2 rounded-full font-medium ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
