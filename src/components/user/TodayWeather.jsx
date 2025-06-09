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

  // Get weather icon based on description
  const getWeatherIcon = () => {
    if (!data?.description) return <WiDayCloudy className="text-6xl md:text-8xl" />;
    
    const desc = data.description.toLowerCase();

    if (desc.includes("badai") || desc.includes("petir") || desc.includes("hujan petir")) {
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

  // Get travel tips based on weather
  const getTravelTips = () => {
    if (!data?.description) return [];

    const desc = data.description.toLowerCase();
    const tips = [];

    if (desc.includes("hujan") || desc.includes("badai") || desc.includes("petir")) {
      tips.push(
        "Bawalah payung atau jas hujan",
        "Hindari aktivitas outdoor",
        "Pilih destinasi indoor seperti museum atau galeri",
        "Perhatikan peringatan cuaca",
        "Hindari area rawan banjir"
      );
    } else if (desc.includes("berawan")) {
      tips.push(
        "Suhu relatif nyaman untuk outdoor",
        "Tetap bawa payung untuk jaga-jaga",
        "Cocok untuk aktivitas santai di luar",
        "Ideal untuk fotografi",
        "Baik untuk hiking atau tracking"
      );
    } else if (desc.includes("cerah")) {
      tips.push(
        "Gunakan sunscreen SPF minimal 30",
        "Bawalah air minum yang cukup",
        "Kenakan pakaian yang nyaman dan breathable",
        "Pilih waktu pagi atau sore untuk aktivitas outdoor",
        "Hindari terlalu lama di bawah sinar matahari langsung"
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
        <div className="text-4xl md:text-5xl font-extrabold leading-none">
          {data.temp}
        </div>
        {data.temperature_range && (
          <div className="text-sm mt-2 opacity-80">
            {data.temperature_range}
          </div>
        )}
        <div className="flex flex-col items-center mt-6">
          {getWeatherIcon()}
          <div className="text-lg md:text-xl font-medium mt-2">
            {data.description}
          </div>
        </div>
        <div className="flex gap-4 mt-4 text-sm opacity-80">
          <div>
            <span>Curah Hujan: </span>
            <span>{data.rainChance}</span>
          </div>
          <div>
            <span>Angin: </span>
            <span>{data.windSpeed}</span>
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
            <h4 className="font-semibold mb-2">Tips Perjalanan:</h4>
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

{
  /* <h3 className="text-lg font-bold mb-4">Detail Cuaca di {data.city}</h3>
          <p><strong>Temperatur:</strong> {data.temp}</p>
          <p><strong>Deskripsi:</strong> {data.description}</p>
          <p><strong>Tanggal:</strong> {formattedDate}</p> */
}
