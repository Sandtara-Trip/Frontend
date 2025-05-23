import React from "react";
import InputField from "../../../components/user/InputField";
import { TbKeyOff } from "react-icons/tb";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/user/button";
import ForgotPasswordPresenter from "../../../presenters/user/ForgotPasswordPresenter";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const presenter = new ForgotPasswordPresenter({ navigate });

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="p-8 rounded-lg shadow-md w-[600px]">
        <div className="flex items-center justify-center mb-6">
          <div className="bg-bg-icon rounded-full p-4 shadow-lg">
            <TbKeyOff className="text-4xl text-warm-orange" />
          </div>
        </div>
        <h2 className="text-center text-3xl font-bold mb-3">
          Lupa Kata Sandi?
        </h2>
        <p className="text-text-gray text-center text-base mb-8">
          Jangan khawatir, kami akan memandu Anda
        </p>

        <InputField
          label="Email"
          type="email"
          placeholder="taraddicts@example.com"
          required
        />

        <Button
          type="button"
          onClick={() => presenter.handleResetPassword()}
          className="mt-6"
        >
          Kirim
        </Button>

        <p className="text-center mt-6 font-normal">
          <a
            href="/login"
            className="text-warm-orange hover:underline text-lg flex items-center justify-center"
          >
            <IoArrowBackCircleOutline className="mr-2 text-3xl" /> Kembali ke
            halaman login
          </a>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
