import React from "react";
import InputField from "../../../components/user/InputField";
import { useNavigate } from "react-router-dom";
import { MdOutlineLockReset } from "react-icons/md";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import Button from "../../../components/user/button";
import ResetPasswordPresenter from "../../../presenters/user/ResetPasswordPresenter";

const ResetPassword = () => {
  const navigate = useNavigate();
  const presenter = new ResetPasswordPresenter({ navigate });

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-[550px] p-10 bg-white rounded-2xl shadow-md">
        {/* Icon */}
        <div className="flex justify-center mb-8">
          <div className="bg-bg-icon rounded-full p-5 shadow-lg">
            <MdOutlineLockReset className="text-4xl text-warm-orange" />
          </div>
        </div>

        {/* Judul dan Deskripsi */}
        <h2 className="text-3xl font-bold text-center mb-4">
          Reset Kata Sandi
        </h2>
        <p className="text-text-gray text-center text-base mb-8">
          Kami akan membantu untuk mengembalikan akses ke akun Anda.
        </p>

        {/* Form Input */}
        <div className="space-y-5">
          <InputField
            label="Email"
            type="email"
            placeholder="taraddicts@example.com"
          />
          <InputField
            label="Kode Verifikasi"
            type="number"
            placeholder="Masukkan kode dari email"
          />
          <InputField
            label="Kata Sandi Baru"
            type="password"
            placeholder="Masukkan kata sandi baru"
          />
        </div>

        {/* Tombol Reset */}
        <Button onClick={() => presenter.handleReset()} className="mt-6">
          Reset Kata Sandi
        </Button>

        {/* Link kembali */}
        <div className="mt-8 text-center">
          <button
            onClick={() => presenter.goToLogin()}
            className="w-full text-warm-orange hover:underline text-lg flex items-center justify-center"
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
