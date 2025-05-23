// Button.js
import React from "react";

function Button({ onClick, children, type = "button", className = "" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full bg-warm-orange hover:bg-hover-orange text-white py-2 rounded-lg font-semibold ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
