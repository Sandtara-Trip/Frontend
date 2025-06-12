import React, { useState } from "react";
import { FiX } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import InputField from "../../../components/user/InputField";
import PasswordField from "../../../components/user/PasswordField";
import Button from "../../../components/user/button";
import { API_BASE_URL } from '../../../config/api';

const LoginPage = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      if (data.token && data.user) {
        // Login using AuthContext
        auth.login({
          token: data.token,
          name: data.user.name,
          email: data.user.email,
          id: data.user.id,
          role: data.user.role
        });

        // Redirect based on role
        if (data.user.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/');
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleExit = () => {
    navigate('/');
  };

  return (
    <div className="flex min-h-screen w-full bg-white relative">
      {/* Tombol Exit */}
      <button
        className="absolute top-4 right-4 text-warm-orange hover:text-gray-700 z-10"
        onClick={handleExit}
      >
        <FiX size={30} />
      </button>

      {/* Kiri - Info */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-warm-orange to-light-orange flex-col justify-center items-center p-12">
        <h2 className="text-white text-4xl font-bold mb-4 text-center">
          Yuk Jelajahi Sandtara Trip!
        </h2>
        <p className="text-white text-center max-w-md">
          Temukan destinasi tersembunyi, tempat santai, dan pengalaman menginap
          yang tak terlupakan bersama kami!
        </p>
        <img src="/img/maskot.png" alt="Maskot" className="w-96 mt-6" />
      </div>

      {/* Kanan - Formulir */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-12">
        <div className="w-full max-w-md">
          <img src="/img/logo.png" alt="Logo" className="h-36 w-36 mx-auto" />

          <h2 className="text-3xl font-bold text-teal text-center mb-2">
            Halo <span className="text-warm-orange">Taraddicts!</span>
          </h2>
          <p className="text-text-gray text-center mb-6">
            Masuk dan temukan keindahan tersembunyi di Kota Denpasar
          </p>

          <form className="space-y-4" onSubmit={handleLogin}>
            {error && (
              <div className="p-3 bg-red-100 text-red-700 rounded-lg mb-4">
                {error}
              </div>
            )}
            <InputField
              label="Email"
              type="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="taraddicts@example.com"
            />

            <PasswordField
              label="Kata Sandi"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              showPassword={showPassword}
              togglePasswordVisibility={togglePasswordVisibility}
              placeholder="Masukkan Kata Sandi Anda"
            />

            <Link
              to="/forgot-password"
              className="text-orange-500 text-sm mt-2 block text-right hover:underline"
            >
              Lupa Password?
            </Link>

            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Memproses...' : 'Masuk'}
            </Button>
          </form>

          <p className="text-center text-sm text-text-gray mt-4">
            Belum punya akun Sandtara?{" "}
            <Link
              to="/register"
              className="text-warm-orange font-semibold hover:underline"
            >
              Daftar Sekarang
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
