import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import Button from "../../../components/user/button";
import { SiFusionauth } from "react-icons/si";
import AuthenticationPresenter from "../../../presenters/user/AuthauenticationPresenter";

const AuthenticationForm = () => {
  const [code, setCode] = useState(Array(6).fill(""));
  const inputRefs = useRef([]);
  const presenter = new AuthenticationPresenter({
    updateCode: setCode,
    focusNextInput: (index) => inputRefs.current[index]?.focus(),
    focusPreviousInput: (index) => inputRefs.current[index]?.focus(),
    showError: (message) => alert(message),
    showSuccess: (message) => alert(message),
  });

  // Handle input change and auto-focus next input
  const handleChange = (index, value) => {
    presenter.handleChange(index, value, code);
  };

  // Handle backspace navigation
  const handleKeyDown = (index, e) => {
    presenter.handleKeyDown(index, e, code);
  };

  // Validate and submit the code
  const handleSubmit = () => {
    presenter.handleSubmit(code);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-warm-orange to-light-orange">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 mx-4">
        <div className="flex flex-col items-center">
          {/* Icon */}
          <div className="w-16 h-16 mb-4">
            <SiFusionauth className="text-warm-orange" size={50} />
          </div>

          {/* Title and description */}
          <h1 className="text-3xl font-bold text-center text-black">
            Verifikasi Akun Anda
          </h1>
          <p className="mt-2 text-sm text-center text-grey">
            Periksa email terdaftar Anda untuk menerima kode autentikasi dan
            verifikasi akun Anda sekarang.
          </p>

          {/* Verification code inputs */}
          <div className="w-full mt-6">
            <div className="flex justify-between mb-6">
              {code.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength="1"
                  className={`w-10 h-12 text-center text-lg border rounded-md
                               focus:outline-none focus:ring-2 focus:ring-warm-orange focus:border-light-orange
                              ${digit ? "shadow-md shadow-warm-orange" : ""}
                  `}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  autoFocus={index === 0}
                />
              ))}
            </div>

            {/* Submit button */}
            <Button onClick={handleSubmit}>Kirim</Button>
          </div>

          {/* Help text */}
          <p className="mt-4 text-sm items-center ">
            Masih mengalami masalah?{" "}
            <Link
              to="/resend"
              className="text-warm-orange font-semibold hover:underline"
            >
              Kirim ulang Email Verifikasi
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthenticationForm;
