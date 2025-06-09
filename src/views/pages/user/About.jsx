import React, { useRef, useEffect } from "react";
import { teamMembers } from "../../templates/team";
import { motion } from "framer-motion";
import {
  FaHotel,
  FaMapMarkedAlt,
  FaCloudSun,
  FaMapMarkerAlt,
  FaUtensils,
  FaShoppingBasket,
} from "react-icons/fa";
import {} from "react-icons/fa";
import { FiCpu, FiLock, FiUserCheck } from "react-icons/fi";
import { TbBeach } from "react-icons/tb";
import { IoTicket } from "react-icons/io5";

const About = () => {
  const carouselRef = useRef(null);

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
      {/* Hero Section */}
      <div className="hero bg-white min-h-screen px-4 py-0">
        <div className="hero-content flex-col lg:flex-row gap-10 items-center">
          {/* Gambar besar untuk desktop */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="hidden lg:grid grid-cols-2 grid-rows-2 gap-4 w-full max-w-md"
          >
            <motion.img
              src="https://www.eatsandretreats.com/travel/wp-content/uploads/2018/08/shutterstock_398836177.jpg"
              alt="Nature"
              initial={{ rotate: 6 }}
              whileHover={{
                rotate: 0,
                scale: 1.05,
                transition: { duration: 0.4, ease: "easeInOut" },
              }}
              className="rounded-lg shadow-lg object-cover h-full w-full"
            />
            <motion.img
              src="https://cdn.thecrazytourist.com/wp-content/uploads/2017/07/Sanur-Beach.jpg"
              alt="City"
              initial={{ rotate: -6 }}
              whileHover={{
                rotate: 0,
                scale: 1.05,
                transition: { duration: 0.4, ease: "easeInOut" },
              }}
              className="rounded-lg shadow-lg object-cover h-full w-full"
            />
            <motion.img
              src="https://denpasarkota.go.id/public/uploads/berita/berita_203011081152_PantaiSindhu,SalahSatuSpotTerbaikMenikmatiMatahariTerbit.jpeg"
              alt="Nature"
              initial={{ rotate: -6 }}
              whileHover={{
                rotate: 0,
                scale: 1.05,
                transition: { duration: 0.4, ease: "easeInOut" },
              }}
              className="rounded-lg shadow-lg object-cover h-full w-full"
            />
            <motion.img
              src="https://tse3.mm.bing.net/th?id=OIP.ZtmHaV27CVO4iHRltKOTJgHaE1&pid=Api&P=0&h=220"
              alt="City"
              initial={{ rotate: 6 }}
              whileHover={{
                rotate: 0,
                scale: 1.05,
                transition: { duration: 0.4, ease: "easeInOut" },
              }}
              className="rounded-lg shadow-lg object-cover h-full w-full"
            />
          </motion.div>

          {/* Gambar untuk mobile */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:hidden w-full"
          >
            <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 pt-20">
              <motion.img
                src="https://www.eatsandretreats.com/travel/wp-content/uploads/2018/08/shutterstock_398836177.jpg"
                alt="Nature"
                initial={{ rotate: 6 }}
                whileHover={{
                  rotate: 0,
                  scale: 1.05,
                  transition: { duration: 0.4, ease: "easeInOut" },
                }}
                className="rounded-lg shadow-lg object-cover w-[90%] sm:w-1/2"
              />
              <motion.img
                src="https://tse3.mm.bing.net/th?id=OIP.ZtmHaV27CVO4iHRltKOTJgHaE1&pid=Api&P=0&h=220"
                alt="City"
                initial={{ rotate: -6 }}
                whileHover={{
                  rotate: 0,
                  scale: 1.05,
                  transition: { duration: 0.4, ease: "easeInOut" },
                }}
                className="rounded-lg shadow-lg object-cover w-[90%] sm:w-1/2"
              />
            </div>
          </motion.div>

          {/* Teks */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-xl text-left"
          >
            <h1 className="text-5xl font-bold mb-4 text-teal">
              Apa Itu Sandtara Trip?
            </h1>
            <p className="text-base leading-relaxed">
              <strong>Sandtara Trip</strong> adalah aplikasi web cerdas untuk
              merencanakan liburan personal di Kota Denpasar. Dengan teknologi{" "}
              <em>machine learning</em>, Sandtara merekomendasikan destinasi
              wisata sesuai dengan minat pengguna yaitu budaya, kuliner, alam,
              hingga wisata keluarga. Dilengkapi dengan{" "}
              <strong>rekomendasi cuaca</strong> harian dan prakiraan beberapa
              hari ke depan, membantu pengguna memilih waktu terbaik untuk
              berwisata. Lebih dari sekadar jalan-jalan, Sandtara menghubungkan
              wisatawan dengan budaya lokal dan mendukung pertumbuhan UMKM
              setempat.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Kenapa Memilih Kami */}
      <section className="py-20 bg-base-200 flex items-center justify-center">
        <div className="max-w-7xl w-full px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-teal mb-12"
          >
            Kenapa Memilih Kami?
          </motion.h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="p-6 rounded-2xl shadow-md bg-base-100"
            >
              <FaMapMarkerAlt className="w-8 h-8 text-teal mx-auto mb-4" />
              <h3 className="font-semibold text-lg text-gray-800 mb-2">
                Destinasi Wisata Lengkap
              </h3>
              <p className="text-sm text-gray-600">
                Puluhan destinasi populer di Kota Denpasar
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="p-6 rounded-2xl shadow-md bg-base-100"
            >
              <FaHotel className="w-8 h-8 text-teal mx-auto mb-4" />
              <h3 className="font-semibold text-lg text-gray-800 mb-2">
                Rekomendasi Hotel
              </h3>
              <p className="text-sm text-gray-600">
                Temukan penginapan terbaik yang sesuai dengan budget Anda.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="p-6 rounded-2xl shadow-md bg-base-100"
            >
              <FaUtensils className="w-8 h-8 text-teal mx-auto mb-4" />
              <h3 className="font-semibold text-lg text-gray-800 mb-2">
                Kuliner Autentik
              </h3>
              <p className="text-sm text-gray-600">
                Rasakan makanan khas lokal yang sulit ditemukan di tempat lain.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Fitur Unggulan */}
      <section className="py-16 bg-white">
        <h2 className="text-3xl font-bold text-teal text-center mb-12">
          Fitur Unggulan
        </h2>

        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              {
                icon: <TbBeach size={24} className="text-pink-500" />,
                title: "Rekomendasi Wisata",
                desc: "Rekomendasi wisata berdasarkan preferensi, cuaca, dan rating.",
                bgColor: "bg-pink-100",
              },
              {
                icon: <FaCloudSun size={24} className="text-yellow-500" />,
                title: "Kalender Cuaca",
                desc: "Prediksi informasi cuaca real-time harian dan per jam, serta prakiraan cuaca untuk beberapa hari ke depan",
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
              {
                icon: (
                  <IoTicket size={24} className="text-purple-600" />
                ),
                title: "Pemesanan Tiket Mudah",
                desc: "Pesan tiket perjalanan dengan mudah langsung melalui aplikasi kami untuk pengalaman liburan tanpa repot.",
                bgColor: "bg-purple-200",
              },
            ].map((fitur, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className={`p-6 rounded-xl ${fitur.bgColor} border border-gray-200 shadow-sm flex flex-col items-start gap-4`}
              >
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md">
                  {fitur.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {fitur.title}
                </h3>
                <p className="text-sm text-gray-700">{fitur.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Kenapa Harus Sandtara */}
      <section className="py-16 bg-base-200">
        <h2 className="text-3xl font-bold text-teal text-center mb-12">
          Apa yang Membuat Kami Berbeda?
        </h2>
        <div className="max-w-3xl mx-auto space-y-4 px-6">
          {[
            {
              icon: <FiCpu />,
              title: "Teknologi Cerdas",
              content:
                "Kami memanfaatkan teknologi machine learning untuk memberikan rekomendasi yang sesuai dengan preferensi dan kebutuhanmu. Mulai dari memilih destinasi, hingga menyarankan waktu terbaik berdasarkan prakiraan cuaca real-time, semuanya dirancang agar perjalananmu makin nyaman dan personal.",
            },
            {
              icon: <FiUserCheck />,
              title: "Fokus pada Pengalaman",
              content:
                "Bagi kami, liburan bukan hanya soal tujuan, tapi juga bagaimana kamu sampai di sana. Sandtara memprioritaskan kenyamanan dan kemudahan dalam perencanaan perjalananmu. Dari tampilan website yang intuitif, fitur rekomendasi berbasis minat, hingga kalender cuaca, semuanya dirancang untuk pengalaman liburan yang lebih tenang dan menyenangkan.",
            },
            {
              icon: <FaShoppingBasket />,
              title: "Mendukung UMKM Lokal",
              content:
                "Kami merekomendasikan UMKM lokal seperti tempat kuliner khas daerah Denpasar, toko oleh-oleh, hingga jasa transportasi lokal. Dengan begitu, kamu bisa menikmati keunikan Denpasar sekaligus membantu perekonomian masyarakat sekitar. Traveling jadi bukan cuma seru, tapi juga berdampak.",
            },
            {
              icon: <FiLock />,
              title: "Keamanan Data",
              content:
                "Kami menjaga keamanan data pribadimu dengan sistem perlindungan terbaik. Data yang kamu berikan digunakan hanya untuk meningkatkan pengalaman pengguna, tanpa disalahgunakan. Privasimu adalah prioritas kami.",
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
            >
              <div
                tabIndex={0}
                className="collapse collapse-arrow bg-base-100 border border-base-300"
              >
                <div className="collapse-title font-semibold text-lg flex items-center">
                  <span className="mr-2">{item.icon}</span>
                  <span>{item.title}</span>
                </div>

                <div className="collapse-content text-sm text-gray-700">
                  {item.content}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Visi & Misi - Timeline Kiri */}
      <div className="py-16 bg-white">
        <h2 className="text-3xl text-center font-bold text-teal mb-12">
          Tujuan Kami Membangun Sandtara
        </h2>

        <ul className="timeline timeline-vertical px-6 max-w-4xl mx-auto">
          {[
            // Masukin semua item dalam array supaya bisa map animasi
            {
              title: "Membantu Liburanmu Lebih Terarah",
              desc: `Kami percaya bahwa waktu libur adalah momen yang berharga. Sandtara hadir untuk membantumu merencanakan perjalanan berdasarkan cuaca terbaik, agar kamu bisa menikmati keindahan Denpasar tanpa gangguan.`,
              position: "start",
            },
            {
              title: "Menghubungkan Budaya dan Teknologi",
              desc: `Kami ingin menggabungkan kekayaan budaya lokal dengan teknologi modern. Sandtara bukan sekadar alat pencari wisata, tapi jembatan yang menghubungkan kamu dengan keunikan lokal yang autentik.`,
              position: "end",
            },
            {
              title: "Menjadi Jembatan bagi UMKM Lokal",
              desc: `Di balik setiap destinasi, ada cerita dan usaha lokal yang berharga. Sandtara ingin menjadi ruang yang menghubungkanmu dengan pelaku UMKM agar perjalananmu tak hanya menyenangkan, tapi juga berdampak.`,
              position: "start",
            },
            {
              title: "Menciptakan Pengalaman yang Bermakna",
              desc: `Kami percaya liburan bukan hanya soal tempat, tapi juga rasa. Dengan Sandtara, kami ingin setiap langkah perjalananmu menjadi cerita, setiap momen terasa dekat karena dirancang khusus sesuai dirimu.`,
              position: "end",
            },
          ].map(({ title, desc, position }, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
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
              <div className={`timeline-${position} mb-10 text-left`}>
                <div className="text-xl font-semibold text-teal mt-1 mb-2">
                  {title}
                </div>
                <p className="text-gray-700">{desc}</p>
              </div>
              <hr />
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Tim Kami */}
      <div className="py-16 bg-gray-50 overflow-hidden">
        <h2 className="text-3xl text-center font-bold text-teal mb-12">
          Tim Kami
        </h2>

        <div className="relative w-full overflow-hidden">
          <motion.div
            className="flex w-max space-x-6"
            initial={{ x: 0 }}
            animate={{ x: "-50%" }}
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
    </div>
  );
};

export default About;
