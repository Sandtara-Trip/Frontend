import React, { useState, useEffect, useRef } from "react";
import NavbarBefore from "../../../components/user/NavbarBefore";
import NavbarAfter from "../../../components/user/navbarAfter";
import { teamMembers } from "../../templates/team";
import Footer from "../../../components/user/footer";
import { motion } from "framer-motion";
import {
  FaHotel,
  FaMapMarkedAlt,
  FaDesktop,
  FaSatellite,
  FaCloudSun,
} from "react-icons/fa";
import { FaMapMarkerAlt, FaUtensils } from "react-icons/fa";
import { BiCalendarEvent } from "react-icons/bi";

const About = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const carouselRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);
  }, []);

  // Auto-scroll
  useEffect(() => {
    let animationId;
    const speed = 0.5;

    const scroll = () => {
      if (carouselRef.current) {
        carouselRef.current.scrollLeft += speed;

        const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;

        if (scrollLeft + clientWidth >= scrollWidth - 1) {
          carouselRef.current.scrollLeft = 0;
        }
      }

      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div>
      {/* Navbar */}
      {isLoggedIn ? <NavbarAfter /> : <NavbarBefore />}

      {/* Hero Section */}
      <div className="hero bg-base-200 min-h-screen px-4 py-0 pt-16">
        <div className="hero-content flex-col lg:flex-row gap-10 items-center">
          <div className="hidden lg:grid grid-cols-2 grid-rows-2 gap-4 w-full max-w-md">
            <img
              src="https://tse2.mm.bing.net/th?id=OIP.0xVqwOOI7Kls72MpUOGKzwHaFM&pid=Api&P=0&h=220"
              alt="Travel"
              className="row-span-2 rounded-lg shadow-lg object-cover h-full w-full"
            />
            <img
              src="https://www.eatsandretreats.com/travel/wp-content/uploads/2018/08/shutterstock_398836177.jpg"
              alt="Nature"
              className="rounded-lg shadow-lg object-cover h-full w-full"
            />
            <img
              src="https://tse3.mm.bing.net/th?id=OIP.ZtmHaV27CVO4iHRltKOTJgHaE1&pid=Api&P=0&h=220"
              alt="City"
              className="rounded-lg shadow-lg object-cover h-full w-full"
            />
          </div>

          <div className="lg:hidden w-full">
            <img
              src="https://www.eatsandretreats.com/travel/wp-content/uploads/2018/08/shutterstock_398836177.jpg"
              alt="Mobile Ilustrasi"
              className="rounded-lg shadow-lg w-full object-cover"
            />
          </div>

          <div className="max-w-xl text-left">
            <h1 className="text-5xl font-bold mb-4 text-teal">
              Apa Itu Sandtara Trip?
            </h1>
            <p className="text-base leading-relaxed">
              <strong>Sandtara Trip</strong> adalah aplikasi web cerdas yang
              dirancang untuk membantu masyarakat dan wisatawan dalam
              merencanakan liburan secara personal, khususnya di wilayah{" "}
              <strong>Kota Denpasar.</strong> Menggunakan teknologi{" "}
              <em>machine learning</em> Sandtara mampu menyesuaikan rekomendasi
              destinasi, aktivitas, dan jadwal perjalanan berdasarkan preferensi
              pengguna, seperti minat budaya, wisata kuliner, alam, hingga
              aktivitas keluarga.
              <br />
              Dengan Sandtara, wisata menjadi lebih dari sekadar jalan-jalan.
              Aplikasi ini mendekatkan wisatawan dengan kekayaan budaya lokal,
              sambil ikut mendorong pertumbuhan ekonomi masyarakat setempat
              melalui dukungan terhadap UMKM.
            </p>
          </div>
        </div>
      </div>

      {/* Kenapa Memilih Kami */}
      <section className="py-20 bg-white flex items-center justify-center">
        <div className="max-w-7xl w-full px-4 text-center">
          <h1 className="text-3xl font-bold text-teal mb-12">
            Kenapa Memilih Kami?
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl shadow-md bg-base-100">
              <FaMapMarkerAlt className="w-8 h-8 text-teal mx-auto mb-4" />
              <h3 className="font-semibold text-lg text-gray-800 mb-2">
                Destinasi Wisata Lengkap
              </h3>
              <p className="text-sm text-gray-600">
                Puluhan destinasi populer di Kota Denpasar
              </p>
            </div>
            <div className="p-6 rounded-2xl shadow-md bg-base-100">
              <FaHotel className="w-8 h-8 text-teal mx-auto mb-4" />
              <h3 className="font-semibold text-lg text-gray-800 mb-2">
                Rekomendasi Hotel
              </h3>
              <p className="text-sm text-gray-600">
                Temukan penginapan terbaik yang sesuai dengan budget Anda.
              </p>
            </div>
            <div className="p-6 rounded-2xl shadow-md bg-base-100">
              <FaUtensils className="w-8 h-8 text-teal mx-auto mb-4" />
              <h3 className="font-semibold text-lg text-gray-800 mb-2">
                Kuliner Autentik
              </h3>
              <p className="text-sm text-gray-600">
                Rasakan makanan khas lokal yang sulit ditemukan di tempat lain.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Fitur Unggulan */}
      <section className="py-16 bg-white">
        <h2 className="text-4xl font-bold text-teal text-center mb-12">
          Fitur Unggulan
        </h2>

        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <FaMapMarkedAlt size={24} className="text-pink-500" />,
                title: "Rekomendasi Wisata",
                desc: "Rekomendasi wisata berdasarkan preferensi, cuaca, dan rating.",
                bgColor: "bg-pink-100",
              },

              {
                icon: <FaCloudSun size={24} className="text-yellow-500" />,
                title: "Kalender Cuaca",
                desc: "Prediksi informasi cuaca real-time harian dan per jam.",
                bgColor: "bg-yellow-100",
              },
              {
                icon: <FaMapMarkedAlt size={24} className="text-green-500" />,
                title: "Rekomendasi Tempat Sekitar",
                desc: "Rekomendasi tempat terdekat seperti transportasi, resto, dan tempat oleh-oleh di sekitar wisata atau hotel terkait.",
                bgColor: "bg-green-100",
              },
              {
                icon: <FaHotel size={24} className="text-blue-500" />,
                title: "Rekomendasi Hotel Berdasarkan Rating",
                desc: "Temukan hotel dengan rating terbaik sesuai preferensi dan anggaran Anda.",
                bgColor: "bg-blue-100",
              },
            ].map((fitur, index) => (
              <div
                key={index}
                className={`p-6 rounded-xl ${fitur.bgColor} border border-gray-200 shadow-sm flex flex-col items-start gap-4`}
              >
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md">
                  {fitur.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {fitur.title}
                </h3>
                <p className="text-sm text-gray-700">{fitur.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Kenapa Harus Sandtara */}
      <section className="py-16 bg-base-200">
        <h2 className="text-4xl font-bold text-teal text-center mb-12">
          Kenapa Harus Sandtara?
        </h2>
        <div className="max-w-3xl mx-auto space-y-4 px-6">
          {[
            {
              title: "✨ Teknologi Cerdas",
              content:
                "Kami memanfaatkan machine learning untuk memberi rekomendasi personal.",
            },
            {
              title: "💡 Fokus pada Pengalaman",
              content:
                "Liburan terbaik dimulai dari perencanaan yang tepat dan nyaman.",
            },
            {
              title: "🌍 Dukungan UMKM",
              content:
                "Promosikan usaha lokal agar kamu bisa traveling berdampak positif.",
            },
            {
              title: "🔒 Keamanan Data",
              content:
                "Kami menjaga data pengguna dengan sistem keamanan terbaik.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              tabIndex={0}
              className="collapse collapse-arrow bg-base-100 border border-base-300"
            >
              <div className="collapse-title font-semibold text-lg">
                {item.title}
              </div>
              <div className="collapse-content text-sm text-gray-700">
                {item.content}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Visi & Misi - Timeline Kiri */}
      <div className="py-16 bg-white">
        <h2 className="text-4xl text-center font-bold text-teal mb-12">
          Tujuan Kami Membangun Sandtara
        </h2>

        <ul className="timeline timeline-vertical px-6 max-w-4xl mx-auto">
          {/* Visi */}
          <li>
            <hr />
            <div className="timeline-middle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
                className="w-5 h-5 text-teal"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="timeline-start mb-10 text-left">
              <div className="text-xl font-semibold text-teal mt-1 mb-2">
                Membantu Liburanmu Lebih Terarah
              </div>
              <p className="text-gray-700">
                Kami percaya bahwa waktu libur adalah momen yang berharga.
                Sandtara hadir untuk membantumu merencanakan perjalanan
                berdasarkan cuaca terbaik, agar kamu bisa menikmati keindahan
                Denpasar tanpa gangguan.
              </p>
            </div>
            <hr />
          </li>

          {/*1 */}
          <li>
            <hr />
            <div className="timeline-middle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
                className="w-5 h-5 text-teal"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="timeline-end mb-10 text-left">
              <div className="text-lg font-semibold text-teal mt-1 mb-1">
                Menghubungkan Budaya dan Teknologi
              </div>
              <p className="text-gray-700">
                Kami ingin menggabungkan kekayaan budaya lokal dengan teknologi
                modern. Sandtara bukan sekadar alat pencari wisata, tapi
                jembatan yang menghubungkan kamu dengan keunikan lokal yang
                autentik.
              </p>
            </div>
            <hr />
          </li>

          {/* Misi 2 */}
          <li>
            <hr />
            <div className="timeline-middle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
                className="w-5 h-5 text-teal"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="timeline-start mb-10 text-left">
              <div className="text-lg font-semibold text-teal mt-1 mb-1">
                Menjadi Jembatan bagi UMKM Lokal
              </div>
              <p className="text-gray-700">
                Di balik setiap destinasi, ada cerita dan usaha lokal yang
                berharga. Sandtara ingin menjadi ruang yang menghubungkanmu
                dengan pelaku UMKM agar perjalananmu tak hanya menyenangkan,
                tapi juga berdampak.
              </p>
            </div>
            <hr />
          </li>
          {/* Misi 2 */}
          <li>
            <hr />
            <div className="timeline-middle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
                className="w-5 h-5 text-teal"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="timeline-end mb-10 text-left">
              <div className="text-lg font-semibold text-teal mt-1 mb-1">
                Menciptakan Pengalaman yang Bermakna
              </div>
              <p className="text-gray-700">
                Kami percaya liburan bukan hanya soal tempat, tapi juga rasa.
                Dengan Sandtara, kami ingin setiap langkah perjalananmu menjadi
                cerita, setiap momen terasa dekat karena dirancang khusus sesuai
                dirimu.
              </p>
            </div>
            <hr />
          </li>
        </ul>
      </div>

      {/* Tim Kami */}
      <div className="py-16 bg-gray-50 overflow-hidden">
        <h2 className="text-4xl text-center font-bold text-teal mb-12">
          Tim Kami
        </h2>

        <div className="relative w-full overflow-hidden">
          <motion.div
            className="flex w-max space-x-6"
            initial={{ x: 0 }}
            animate={{ x: "-50%" }} // geser setengah karena kontennya digandakan
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear",
              duration: 30,
            }}
          >
            {[...teamMembers, ...teamMembers].map((member, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 w-56 bg-white rounded-xl shadow-md p-6 flex flex-col items-center text-center"
              >
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-24 h-24 rounded-full object-cover mb-4 shadow"
                />
                <h4 className="text-lg font-semibold text-teal">
                  {member.name}
                </h4>
                <p className="text-sm text-gray-500">{member.role}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* footer */}
      <Footer />
    </div>
  );
};

export default About;
