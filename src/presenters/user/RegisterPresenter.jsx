import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterPresenter = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/validation-code");
  };

  const handleNavigateValidation = () => {
    navigate("/validation-code");
  };
  const handleExit = () => {
    navigate("/");
  };

  return {
    showPassword,
    togglePasswordVisibility,
    handleSubmit,
    handleNavigateValidation,
    handleExit
  };
};

export default RegisterPresenter;
