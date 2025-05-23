import React from "react";
import { FiX } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../../../components/user/InputField";
import PasswordField from "../../../components/user/PasswordField";
import Button from "../../../components/user/button";
import LoginPresenter from "../../../presenters/user/LoginPresenter";

const LoginPage = () => {
  const navigate = useNavigate();
  const presenter = new LoginPresenter({ navigate });

  return (
    <div className="flex min-h-screen w-full bg-white relative">
      {/* Tombol Exit */}
      <button
        className="absolute top-4 right-4 text-warm-orange hover:text-gray-700 z-10"
        onClick={() => presenter.handleExit()}
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
        <img src="publ" alt="Maskot" className="w-48 mt-6" />
      </div>

      {/* Kanan - Formulir */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-12">
        <div className="w-full max-w-md">
          <img src="img/logo.png" alt="Logo" className="h-36 w-36 mx-auto" />

          <h2 className="text-3xl font-bold text-teal text-center mb-2">
            Halo <span className="text-warm-orange">Taraddicts!</span>
          </h2>
          <p className="text-text-gray text-center mb-6">
            Masuk dan temukan keindahan tersembunyi di Kota Denpasar
          </p>

          <form
            className="space-y-4"
            onSubmit={(e) => presenter.handleLogin(e)}
          >
            <InputField
              label="Email"
              type="email"
              placeholder="taraddicts@example.com"
            />

            <PasswordField
              label="Kata Sandi"
              placeholder="Masukkan Kata Sandi Anda"
            />

            <Link
              to="/forgot-password"
              className="text-orange-500 text-sm mt-2 block text-right hover:underline"
            >
              Lupa Password?
            </Link>

            <Button type="submit">Masuk</Button>
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
