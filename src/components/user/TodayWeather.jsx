import React, { useRef } from "react";
import { MdLocationOn } from "react-icons/md";
import {
  WiDaySunny,
  WiDayCloudy,
  WiRain,
  WiThunderstorm,
} from "react-icons/wi";
import { FaWind } from "react-icons/fa";
import { FaTemperatureHalf } from "react-icons/fa6";
import { IoMdUmbrella } from "react-icons/io";

const TodayWeather = ({ data, formattedDate, hideTempIcon }) => {
  const dialogRef = useRef(null);

  const openModal = () => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };

  // Get weather icon based on description
  const getWeatherIcon = () => {
    if (!data?.description)
      return <WiDayCloudy className="text-6xl md:text-8xl" />;

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

    return <WiDayCloudy className="text-6xl md:text-8xl" />;
  };

  // Get travel tips based on weather
  const getTravelTips = () => {
    if (!data?.description) return [];

    const desc = data.description.toLowerCase();
    const tips = [];

    if (
      desc.includes("hujan") ||
      desc.includes("badai") ||
      desc.includes("petir")
    ) {
      tips.push(
        <>
          <p className="mb-2 font-semibold text-blue-600">
            Hujan? Tetap nyaman jika dipersiapkan dengan baik.
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
    } else if (desc.includes("berawan")) {
      tips.push(
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
    } else if (desc.includes("cerah")) {
      tips.push(
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

    return (
      <ul className="list-disc pl-4 space-y-1 text-sm">
        {tips.map((tip, index) => (
          <li key={index}>{tip}</li>
        ))}
      </ul>
    );
  };

  if (!data) {
    return (
      <div className="w-full max-w-xs md:max-w-sm bg-white bg-opacity-10 backdrop-blur-md text-white rounded-3xl flex flex-col justify-center items-center shadow-2xl p-5 md:p-6 text-center relative mx-auto md:mx-0">
        <p>Data cuaca tidak tersedia</p>
      </div>
    );
  }

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
        <div className="flex flex-col items-center justify-center text-white">
          <div className="text-4xl md:text-5xl font-extrabold leading-none">
            {data.temp}
          </div>

          <div className="flex flex-col items-center mt-4">
            <div className="text-5xl">{getWeatherIcon()}</div>
            <div className="text-lg md:text-xl font-medium mt-2 text-center">
              {data.description}
            </div>
          </div>
        </div>

        <div className="flex gap-4 mt-4 text-sm opacity-80">
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <IoMdUmbrella />
              <span>{data.rainChance}</span>
            </div>
            <div className="flex items-center gap-1">
              <FaWind />
              <span>{data.windSpeed}</span>
            </div>
            {data?.temperature_range && (
              <div className="flex items-center gap-1 text-white text-sm">
                {!hideTempIcon && <FaTemperatureHalf />}{" "}
                {/* hanya tampil kalau false */}
                <span>{data.temperature_range}</span>
              </div>
            )}
          </div>
        </div>

        <button
          className="rounded-full bg-warm-orange hover:bg-hover-orange duration-300 text-white mt-6 px-6 py-1.5 md:py-2 text-sm md:text-base font-semibold shadow-md hover:shadow-lg"
          onClick={openModal}
        >
          Tips Perjalanan
        </button>
      </div>

      <dialog ref={dialogRef} className="modal">
        <form
          method="dialog"
          className="modal-box max-w-md bg-white text-black rounded-xl"
        >
          <div>
            <h4 className="text-lg font-semibold mb-2">Tips Perjalanan:</h4>
            {getTravelTips()}
          </div>

          <hr className="my-4" />
          <div className="modal-action mt-6">
            <button className="btn btn-warning btn-outline border-2">
              Tutup
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
};

export default TodayWeather;
