import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { MdOutlineLockReset } from "react-icons/md";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import InputField from "../../../components/user/InputField";
import PasswordField from "../../../components/user/PasswordField";
import Button from "../../../components/user/button";
import ResetPasswordPresenter from "../../../presenters/user/ResetPasswordPresenter";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    email: "",
    code: "",
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const presenter = new ResetPasswordPresenter({ navigate });

  useEffect(() => {
    // Get email from location state
    const email = location.state?.email;
    if (!email) {
      // If no email is provided, redirect back to forgot password
      navigate('/forgot-password');
      return;
    }
    setFormData(prev => ({ ...prev, email }));
  }, [location, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    presenter.handleReset(
      formData.email,
      formData.code,
      formData.password,
      formData.confirmPassword
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-[550px] p-10 bg-white rounded-2xl shadow-md">
        {/* Icon */}
        <div className="flex justify-center mb-8">
          <div className="bg-bg-icon rounded-full p-5 shadow-lg">
            <MdOutlineLockReset className="text-4xl text-warm-orange" />
          </div>
        </div>

        {/* Title and Description */}
        <h2 className="text-3xl font-bold text-center mb-4">
          Reset Kata Sandi
        </h2>
        <p className="text-text-gray text-center text-base mb-8">
          Masukkan kode verifikasi yang telah dikirim ke email Anda
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <InputField
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled
          />
          
          <InputField
            label="Kode Verifikasi"
            type="text"
            name="code"
            placeholder="Masukkan kode 6 digit"
            value={formData.code}
            onChange={handleChange}
            required
          />

          <PasswordField
            label="Kata Sandi Baru"
            name="password"
            value={formData.password}
            onChange={handleChange}
            showPassword={showPassword}
            togglePasswordVisibility={() => setShowPassword(!showPassword)}
            placeholder="Masukkan kata sandi baru"
          />

          <PasswordField
            label="Konfirmasi Kata Sandi"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            showPassword={showConfirmPassword}
            togglePasswordVisibility={() => setShowConfirmPassword(!showConfirmPassword)}
            placeholder="Konfirmasi kata sandi baru"
          />

          {/* Reset Button */}
          <Button type="submit" className="mt-6">
            Reset Kata Sandi
          </Button>
        </form>

        {/* Back to Login */}
        <div className="mt-8 text-center">
          <button
            onClick={() => presenter.goToLogin()}
            className="text-warm-orange hover:underline text-lg flex items-center justify-center"
          >
            <IoArrowBackCircleOutline className="mr-2 text-3xl" />
            Kembali ke halaman login
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
