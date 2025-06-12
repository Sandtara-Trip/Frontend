import React from "react";
import {
  FaInstagram,
  FaFacebook,
  FaTiktok,
  FaYoutube,
  FaGithub,
  FaEnvelope,
  // FaLocationDot,
  FaPhoneAlt,
} from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="bg-white">
      <hr />

      <div className="mx-auto max-w-screen-xl px-4 pt-16 pb-6 sm:px-6 lg:px-8 lg:pt-24">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <div className="flex justify-center text-teal-600 sm:justify-start">
              <img
                src="/img/logo.png"
                alt="Sandtara Trip Logo"
                width={70}
                height={70}
                className="mb-2"
              />
            </div>

            <p className="mt-6 max-w-md text-center leading-relaxed text-gray-500 sm:max-w-xs sm:text-left">
              Sandtara Trip adalah website berbasis machine learning yang
              memberikan rekomendasi wisata berdasarkan cuaca dan preferensi
              pengguna serta rekomendasi hotel, dan kuliner di Denpasar
            </p>

            <ul className="mt-8 flex justify-center gap-6 sm:justify-start md:gap-8">
              <li>
                <a
                  href="https://www.facebook.com/denpasar.viral/"
                  rel="noreferrer"
                  target="_blank"
                  className="text-2xl text-grey transition hover:text-teal"
                >
                  <span className="sr-only">Facebook</span>
                  <FaFacebook />
                </a>
              </li>

              <li>
                <a
                  href="https://www.instagram.com/denpasar.viral/"
                  rel="noreferrer"
                  target="_blank"
                  className="text-2xl text-grey transition hover:text-teal"
                >
                  <span className="sr-only">Instagram</span>
                  <FaInstagram />
                </a>
              </li>

              <li>
                <a
                  href="https://www.tiktok.com/@denpasar.viral?_t=ZS-8x8EdI7JXLV&_r=1"
                  rel="noreferrer"
                  target="_blank"
                  className="text-2xl text-grey transition hover:text-teal"
                >
                  <span className="sr-only">Tiktok</span>
                  <FaTiktok />
                </a>
              </li>

              <li>
                <a
                  href="https://www.youtube.com/c/denpasarviral"
                  rel="noreferrer"
                  target="_blank"
                  className="text-2xl text-grey transition hover:text-teal"
                >
                  <span className="sr-only">Youtube</span>
                  <FaYoutube />
                </a>
              </li>

              <li>
                <a
                  href="https://github.com/Sandtara-Trip"
                  rel="noreferrer"
                  target="_blank"
                  className="text-2xl text-grey transition hover:text-teal"
                >
                  <span className="sr-only">Github</span>
                  <FaGithub />
                </a>
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 lg:col-span-2">
            <div className="text-center sm:text-left">
              <p className="text-lg font-medium text-gray-900">Layanan</p>

              <ul className="mt-8 space-y-4 text-sm">
                <li>
                  <a
                    className="text-gray-700 transition hover:text-gray-700/75"
                    href="#"
                  >
                    Pemesanan Wisata
                  </a>
                </li>

                <li>
                  <a
                    className="text-gray-700 transition hover:text-gray-700/75"
                    href="#"
                  >
                    Pemesanan Hotel
                  </a>
                </li>

                <li>
                  <a
                    className="text-gray-700 transition hover:text-gray-700/75"
                    href="/"
                  >
                    Informasi Pariwisata
                  </a>
                </li>
              </ul>
            </div>

            <div className="text-center sm:text-left">
              <p className="text-lg font-medium text-gray-900">Dukungan</p>

              <ul className="mt-8 space-y-4 text-sm">
                <li>
                  <a
                    className="text-gray-700 transition hover:text-gray-700/75"
                    href="faq"
                  >
                    FAQ (Pertanyaan Umum)
                  </a>
                </li>

                <li>
                  <a
                    className="text-gray-700 transition hover:text-gray-700/75"
                    href="#"
                  >
                    {" "}
                    Syarat & Ketentuan
                  </a>
                </li>

                <li>
                  <a
                    className="text-gray-700 transition hover:text-gray-700/75"
                    href="#"
                  >
                    {" "}
                    Kebijakan Privasi
                  </a>
                </li>

                <li>
                  <a
                    className="text-gray-700 transition hover:text-gray-700/75"
                    href="#"
                  >
                    {" "}
                    Layanan Pelanggan
                  </a>
                </li>
              </ul>
            </div>

            <div className="text-center sm:text-left">
              <p className="text-lg font-medium text-gray-900">Tautan Cepat</p>

              <ul className="mt-8 space-y-4 text-sm">
                <li>
                  <a
                    className="text-gray-700 transition hover:text-gray-700/75"
                    href="/"
                  >
                    {" "}
                    Beranda
                  </a>
                </li>

                <li>
                  <a
                    className="text-gray-700 transition hover:text-gray-700/75"
                    href="about"
                  >
                    {" "}
                    Tentang Kami
                  </a>
                </li>

                <li>
                  <a
                    className="text-gray-700 transition group-hover:text-gray-700/75"
                    href="weather-calender"
                  >
                    Kalender Cuaca
                    <span className="relative flex size-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-75"></span>
                      <span className="relative inline-flex size-2 rounded-full bg-teal-500"></span>
                    </span>
                  </a>
                </li>
              </ul>
            </div>

            <div className="text-center sm:text-left">
              <p className="text-lg font-medium text-gray-900">Kontak Kami</p>

              <ul className="mt-8 space-y-4 text-sm">
                <li>
                  <a
                    className="flex items-center gap-2 justify-center sm:justify-start"
                    href="mailto:sandtaratrip@gmail.com"
                  >
                    <FaEnvelope className="text-lg text-gray-700" />
                    <span className="text-gray-700">
                      sandtaratrip@gmail.com
                    </span>
                  </a>
                </li>

                <li>
                  <a
                    className="flex items-center gap-2 justify-center sm:justify-start"
                    href="tel:0123456789"
                  >
                    <FaPhoneAlt className="text-lg text-gray-700" />
                    <span className="text-gray-700">0123456789</span>
                  </a>
                </li>

                <li>
                  <address className="flex items-center gap-2 justify-center sm:justify-start text-gray-700 not-italic">
                    <MdLocationPin className="text-2xl"/>
                    <span>Denpasar, Bali</span>
                  </address>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-100 pt-6">
          <div className="text-center sm:flex sm:justify-between sm:text-left">
            <p className="text-sm text-gray-500">
              <span className="block sm:inline">All rights reserved.</span>

              <a
                className="inline-block text-teal-600 underline transition hover:text-teal-600/75"
                href="#"
              >
                Terms & Conditions
              </a>

              <span>&middot;</span>

              <a
                className="inline-block text-teal-600 underline transition hover:text-teal-600/75"
                href="#"
              >
                Privacy Policy
              </a>
            </p>

            <p className="mt-4 text-sm text-gray-500 sm:order-first sm:mt-0">
              &copy; 2025 Sandtara Trip
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
