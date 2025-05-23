import React from "react";
import { FaInstagram, FaFacebookF, FaTiktok, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-light-teal text-base-content">
      <div className="footer sm:footer-horizontal p-10">
        <aside>
          <img
            src="img/logo.png"
            alt="Sandtara Trip Logo"
            width={70}
            height={70}
            className="mb-2"
          />
          <p>
            Sandtara Trip
            <br />
            Jelajahi Keindahan Kota Denpasar
          </p>
        </aside>

        <nav>
          <h6 className="footer-title">Layanan</h6>
          <a className="link link-hover">Pemesanan Wisata</a>
          <a className="link link-hover">Pemesanan Hotel</a>
          <a className="link link-hover">Informasi Pariwisata</a>
          <a className="link link-hover">Konsultasi Perjalanan</a>
        </nav>

        <nav>
          <h6 className="footer-title">Dukungan</h6>
          <a className="link link-hover">FAQ (Pertanyaan Umum)</a>
          <a className="link link-hover">Syarat & Ketentuan</a>
          <a className="link link-hover">Kebijakan Privasi</a>
          <a className="link link-hover">Layanan Pelanggan</a>
        </nav>

        <nav>
          <h6 className="footer-title">Media Sosial</h6>
          <div className="flex space-x-4 mt-2">
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl hover:text-teal"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl hover:text-teal"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://www.tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl hover:text-teal"
            >
              <FaTiktok />
            </a>
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl hover:text-teal"
            >
              <FaYoutube />
            </a>
          </div>
        </nav>
      </div>

      <div className="text-center p-4 bg-teal border-t border-gray-200">
        <p>© {new Date().getFullYear()} Sandtara Trip. Hak Cipta Dilindungi.</p>
      </div>
    </footer>
  );
};

export default Footer;
