import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

const PasswordField = ({ label, placeholder }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Cek  password
  const getPasswordStrength = (password) => {
    if (password.length === 0) return "";
    if (password.length < 6) return "Lemah";
    if (password.match(/[A-Z]/) && password.match(/[0-9]/) && password.length >= 8) {
      return "Kuat";
    }
    return "Sedang";
  };

  const passwordStrength = getPasswordStrength(password);

  return (
    <div className="relative">
      <label className="block text-gray-700 mb-1">{label}</label>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 pr-12 border-[2px] rounded-lg focus:outline-none focus:ring-2  bg-white text-gray-700 focus:ring-[#FF9F1C] transition duration-300 ease-in-out"
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute inset-y-0 right-4 flex items-center text-gray-500 transition duration-300 ease-in-out"
        >
          {showPassword ? (
            <FiEyeOff size={24} className="transition-transform duration-300 ease-in-out transform" />
          ) : (
            <FiEye size={24} className="transition-transform duration-300 ease-in-out transform" />
          )}
        </button>
      </div>

      {/* Password Strength */}
      {passwordStrength && (
        <p
          className={`text-sm mt-2 ${
            passwordStrength === "Kuat"
              ? "text-green-500"
              : passwordStrength === "Sedang"
              ? "text-yellow-500"
              : "text-red-500"
          }`}
        >
          Kekuatan Password: {passwordStrength}
        </p>
      )}
    </div>
  );
};

export default PasswordField;
