import React from "react";
import { Link } from "react-router-dom";
import { SlArrowLeftCircle } from "react-icons/sl";

function NotFoundPage() {
  return (
    <main
      className="relative flex items-center justify-center min-h-screen bg-white px-4 py-12"
      role="main"
      aria-labelledby="page-title"
      aria-describedby="page-desc"
    >
      {/* Wave SVG bertumpuk */}
      <div
        className="absolute bottom-0 left-0 w-full overflow-hidden leading-none"
        style={{ height: 200 }}
      >
        <svg
          className="relative block w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          {/* Wave orange muda (light orange) */}
          <path
            fill="#FFBF69"
            fillOpacity="0.8"
            d="M0,224L48,213.3C96,203,192,181,288,160C384,139,480,117,576,122.7C672,128,768,160,864,176C960,192,1056,192,1152,165.3C1248,139,1344,85,1392,58.7L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
          {/* Wave orange coral */}
          <path
            fill="#FF9F1C"
            fillOpacity="0.8"
            d="M0,160L48,149.3C96,139,192,117,288,112C384,107,480,117,576,133.3C672,149,768,171,864,181.3C960,192,1056,192,1152,176C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>

      <div className="bg-white border border-gray-200 shadow-xl rounded-xl p-10 w-full max-w-md text-center relative z-10 -mt-20">
        <h1
          id="page-title"
          className="text-6xl font-extrabold text-warm-orange mb-4"
        >
          404
        </h1>

        <img
          src="img/logo.png"
          alt="Not Found Illustration"
          className="mx-auto mb-6 w-32 h-32 object-contain"
        />

        <p className="text-xl font-semibold text-gray-800 mb-2">
          Halaman tidak ditemukan
        </p>

        <p id="page-desc" className="text-gray-600 text-sm mb-6">
          Oops! Halaman ini nggak bisa ditemukan. Mungkin sudah dipindah atau
          dihapus. Yuk, kita kembali ke beranda!
        </p>

        <Link
          to="/"
          className="inline-flex items-center justify-center bg-warm-orange hover:bg-hover-orange text-white font-medium px-5 py-2 rounded-md transition"
        >
          <SlArrowLeftCircle className="mr-2 text-lg" />
          Kembali ke Beranda
        </Link>
      </div>
    </main>
  );
}

export default NotFoundPage;
