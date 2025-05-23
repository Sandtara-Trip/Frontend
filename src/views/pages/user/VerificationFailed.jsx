import React, { useState } from "react";
import { MdOutlineMailLock } from "react-icons/md";
import Button from "../../../components/user/button";
import InputField from "../../../components/user/InputField";
import VerificationFailedPresenter from "../../../presenters/user/VerificationFailedPresenter";

const VerificationFailed = () => {
  const [email, setEmail] = useState("");
  const presenter = new VerificationFailedPresenter({ setEmail });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-warm-orange to-light-orange">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 mx-4">
        <div className="flex flex-col items-center">
          {/* Icon */}
          <div className="w-16 h-16 mb-4">
            <MdOutlineMailLock className="text-warm-orange" size={50} />
          </div>

          {/* Title and description */}
          <h1 className="text-3xl font-bold text-center text-black">
            Email Verifikasi Gagal
          </h1>
          <p className="mt-2 text-sm text-center text-grey">
            Kami gagal mengirimkan email verifikasi. Periksa folder Spam atau
            kirim ulang email.
          </p>

          {/* Email input */}
          <div className="w-full mt-6 mb-4">
            <InputField
              label="Email"
              type="email"
              placeholder="taraddicts@example.com"
              value={email}
              onChange={(e) => presenter.handleEmailChange(e)}
            />
          </div>

          {/* Submit button */}
          <Button onClick={() => presenter.handleSubmit(email)}>Kirim</Button>
        </div>
      </div>
    </div>
  );
};

export default VerificationFailed;
