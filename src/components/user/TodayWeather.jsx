import React, { useRef } from "react";
import { MdLocationOn } from "react-icons/md";
import {
  WiDaySunny,
  WiDayCloudy,
  WiRain,
  WiThunderstorm,
} from "react-icons/wi";

const TodayWeather = ({ data, formattedDate }) => {
  const dialogRef = useRef(null);

  const openModal = () => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };

  // Mendapatkan icon sesuai cuaca
 const getWeatherIcon = () => {
    const desc = data.description.toLowerCase();

    if (
      desc.includes("badai") ||
      desc.includes("petir") ||
      desc.includes("hujan petir")
    ) {
      return <WiThunderstorm className="text-6xl md:text-8xl" />;
    }
    if (desc.includes("hujan deras")) {
      return <WiRain className="text-6xl md:text-8xl" />;
    }
    if (desc.includes("hujan ringan")) {
      return <WiRain className="text-6xl md:text-8xl" />;
    }
    if (desc.includes("hujan")) {
      return <WiRain className="text-6xl md:text-8xl" />;
    }
    if (desc.includes("cerah")) {
      return <WiDaySunny className="text-6xl md:text-8xl" />;
    }
    if (desc.includes("berawan")) {
      return <WiDayCloudy className="text-6xl md:text-8xl" />;
    }

    return <WiDayCloudy className="text-6xl md:text-8xl" />; // default
  };

  // Tips perjalanan berdasarkan cuaca
  const getTravelTips = () => {
    const desc = data.description.toLowerCase();

    if (
      desc.includes("badai") ||
      desc.includes("petir") ||
      desc.includes("hujan petir")
    ) {
      return (
        <>
          <p className="mb-2 font-semibold text-red-600">
            Cuaca ekstrem, hati-hati ya! Utamakan keselamatan dulu.
          </p>
          <ul className="list-disc list-inside ml-5 text-sm">
            <li>Tunda aktivitas luar ruangan jika memungkinkan</li>
            <li>Tetap di dalam ruangan saat ada petir</li>
            <li>Pastikan perangkat elektronik terlindungi</li>
            <li>Gunakan jaket dan sepatu anti air jika terpaksa keluar</li>
          </ul>
        </>
      );
    }

    if (desc.includes("hujan deras")) {
      return (
        <>
          <p className="mb-2 font-semibold text-blue-600">
            Hujan deras? Tetap nyaman jika dipersiapkan dengan baik.
          </p>
          <ul className="list-disc list-inside ml-5 text-sm">
            <li>Gunakan jas hujan tebal dan sepatu atau sandal tahan air</li>
            <li>Pilih pakaian tebal dan jaket untuk menjaga kehangatan</li>
            <li>Bawa payung dan pelindung tas</li>
            <li>
              Selalu pantau prakiraan cuaca terbaru yang ada di website kami
            </li>
          </ul>
        </>
      );
    }

    if (desc.includes("hujan ringan")) {
      return (
        <>
          <p className="mb-2 font-semibold text-blue-600">
            Hujan ringan, kamu tetap bisa jalan-jalan!
          </p>
          <ul className="list-disc list-inside ml-5 text-sm">
            <li>Bawa jas hujan atau payung yang mudah dibawa</li>
            <li>Pakai sepatu atau sandal tahan air yang nyaman</li>
            <li>Pilih jaket tipis supaya tetap hangat tapi tidak gerah</li>
          </ul>
        </>
      );
    }

    if (desc.includes("cerah")) {
      return (
        <>
          <p className="mb-2 font-semibold text-warm-orange">
            Cuaca cerah, waktu yang pas untuk menjelajah!
          </p>
          <ul className="list-disc list-inside ml-5 text-sm">
            <li>Gunakan pakaian ringan dan berwarna terang</li>
            <li>Topi atau payung untuk melindungi dari sinar matahari</li>
            <li>Sunblock dan Sunscreen untuk melindungi kulit</li>
            <li>Bawa air minum yang cukup</li>
            <li>Kacamata hitam untuk kenyamanan mata</li>
          </ul>
        </>
      );
    }

    if (desc.includes("berawan")) {
      return (
        <>
          <p className="mb-2 font-semibold text-warm-orange">
            Cuaca berawan, nyaman untuk beraktivitas!
          </p>
          <ul className="list-disc list-inside ml-5 text-sm">
            <li>Pilih pakaian yang nyaman dan tidak terlalu tebal</li>
            <li>Siapkan jaket tipis jika angin bertiup</li>
            <li>Payung lipat bisa jadi penyelamat jika tiba-tiba hujan</li>
            <li>Gunakan sunblock atau sunscreen untuk melindungi kulit</li>
            <li>Waktu yang tepat untuk berfoto tanpa silau matahari</li>
          </ul>
        </>
      );
    }

    return (
      <p className="text-sm text-warm-orange">
        Pastikan membawa perlengkapan sesuai kebutuhan dan kondisi cuaca saat
        ini.
      </p>
    );
  };

  return (
    <>
      <div className="w-full max-w-xs md:max-w-sm bg-white bg-opacity-10 backdrop-blur-md text-white rounded-3xl flex flex-col justify-center items-center shadow-2xl p-5 md:p-6 text-center relative mx-auto md:mx-0">
        <div className="flex items-center gap-1 text-xs md:text-sm mb-2 justify-center">
          <MdLocationOn className="text-base md:text-lg" />
          <span>{data.city}</span>
        </div>
        <h2 className="text-xl md:text-2xl font-bold mb-4">Cuaca Hari Ini</h2>
        <div className="text-[10px] md:text-xs text-white mb-4">
          {formattedDate}
        </div>
        <div className="text-4xl md:text-5xl font-extrabold leading-none">
          {data.temp}
        </div>
        <div className="flex flex-col items-center mt-6">
          {getWeatherIcon()}
          <div className="text-lg md:text-xl font-medium mt-2">
            {data.description}
          </div>
        </div>

        <button
          className="btn btn-primary mt-6 px-6 py-2 md:py-3 text-sm md:text-base"
          onClick={openModal}
        >
          Tips Perjalanan
        </button>
      </div>

      <dialog ref={dialogRef} className="modal ">
        <form
          method="dialog"
          className="modal-box max-w-md bg-white text-black rounded-xl"
        >
        
          
          <div>
            <h4 className="font-semibold mb-2">Tips Perjalanan:</h4>
            {getTravelTips()}
          </div>

          <hr className="my-4" />
          <div className="modal-action mt-6">
            <button className="btn btn-warning btn-outline border-2">Tutup</button>
          </div>
        </form>
      </dialog>
    </>
  );
};

export default TodayWeather;



  {/* <h3 className="text-lg font-bold mb-4">Detail Cuaca di {data.city}</h3>
          <p><strong>Temperatur:</strong> {data.temp}</p>
          <p><strong>Deskripsi:</strong> {data.description}</p>
          <p><strong>Tanggal:</strong> {formattedDate}</p> */}

