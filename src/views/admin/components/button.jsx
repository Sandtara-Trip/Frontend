// Button.js
import React from "react";

const Button = ({ 
  onClick, 
  children, 
  type = "button", 
  className = "",
  disabled = false,
  variant = "primary"
}) => {
  const baseStyles = "py-2 px-4 rounded-lg font-medium transition-all duration-200 ease-in-out";
  const variantStyles = {
    primary: "bg-[#FFBF69] hover:bg-[#FFB042] text-white disabled:bg-[#FFB042]/50",
    secondary: "border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:bg-gray-100"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${className} ${
        disabled ? "cursor-not-allowed" : "cursor-pointer"
      }`}
    >
      {children}
    </button>
  );
};

export default Button;
