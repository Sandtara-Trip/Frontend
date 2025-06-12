import React from "react";
import { FiX } from "react-icons/fi";
import { Link } from "react-router-dom";

import InputField from "../../../components/user/InputField";
import PasswordField from "../../../components/user/PasswordField";
import Button from "../../../components/user/button";

import RegisterPresenter from "../../../presenters/user/RegisterPresenter";

const Register = () => {
  const {
    showPassword,
    formData,
    error,
    loading,
    togglePasswordVisibility,
    handleSubmit,
    handleInputChange,
    handleExit,
  } = RegisterPresenter();

  return (
    <div className="flex min-h-screen w-full bg-white relative">
      <button
        className="absolute top-4 right-4 text-warm-orange md:text-white hover:text-gray-700 z-10"
        onClick={handleExit}
      >
        <FiX size={30} />
      </button>

      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-5">
        <div className="w-full max-w-md">
      <img src="/img/logo.png" alt="Logo" className="h-36 w-36 mx-auto" />
          <h2 className="text-3xl font-bold text-teal text-center mb-2">
            Registrasi <span className="text-warm-orange">Disini!</span>
          </h2>
          <p className="text-text-gray text-center mb-6">
            Daftar sekarang dan temukan cara baru menjelajahi Denpasar
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <InputField
              label="Nama Pengguna"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Masukkan Nama Lengkap"
            />

            <InputField
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="taraddicts@example.com"
            />

            <PasswordField
              label="Kata Sandi"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Buat Kata Sandi Aman"
              showPassword={showPassword}
              togglePasswordVisibility={togglePasswordVisibility}
            />

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
            <Button type="submit" disabled={loading}>
              {loading ? "Mendaftar..." : "Daftar"}
            </Button>
          </form>

          <p className="text-center text-sm text-text-gray mt-4">
            Sudah punya akun?{" "}
            <Link
              to="/login"
              className="text-warm-orange font-semibold hover:underline"
            >
              Masuk
            </Link>
          </p>
        </div>
      </div>

      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-warm-orange to-light-orange flex-col justify-center items-center p-12">
        <h2 className="text-white text-4xl font-bold mb-4 text-center">
          Perjalanan Kita Dimulai di Sini!
        </h2>
        <p className="text-white text-center max-w-md">
          Bersama Sandtara Trip, setiap petualangan jadi lebih bermakna.
        </p>
        <img src="/img/maskot.png" alt="Maskot" className="w-96 mt-6" />
      </div>
    </div>
  );
};

export default Register;
