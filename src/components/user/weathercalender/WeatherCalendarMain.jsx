import React, { useRef, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import {
  WiDaySunny,
  WiDayCloudy,
  WiRain,
  WiThunderstorm,
} from "react-icons/wi";

const getWeatherIcon = (desc, className = "text-xl") => {
  if (!desc) return null;
  const d = desc.toLowerCase();
  if (d.includes("badai") || d.includes("petir") || d.includes("hujan petir")) {
    return <WiThunderstorm className={className} />;
  }
  if (
    d.includes("hujan deras") ||
    d.includes("hujan ringan") ||
    d.includes("hujan")
  ) {
    return <WiRain className={className} />;
  }
  if (d.includes("cerah")) {
    return <WiDaySunny className={className} />;
  }
  if (d.includes("berawan")) {
    return <WiDayCloudy className={className} />;
  }
  return <WiDayCloudy className={className} />;
};

const toLocalDateStr = (date) => {
  const tzOffset = date.getTimezoneOffset() * 60000;
  const localDate = new Date(date.getTime() - tzOffset);
  return localDate.toISOString().split("T")[0];
};

const getTravelTips = (desc = "") => {
  const d = desc.toLowerCase();

  if (d.includes("badai") || d.includes("petir") || d.includes("hujan petir")) {
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

  if (d.includes("hujan deras")) {
    return (
      <>
        <p className="mb-2 font-semibold text-blue-600">
          Hujan deras? Tetap nyaman jika dipersiapkan dengan baik.
        </p>
        <ul className="list-disc list-inside ml-5 text-sm">
          <li>Gunakan jas hujan tebal dan sepatu atau sandal tahan air</li>
          <li>Pilih pakaian tebal dan jaket untuk menjaga kehangatan</li>
          <li>Bawa payung dan pelindung tas</li>
          <li>Selalu pantau prakiraan cuaca terbaru</li>
        </ul>
      </>
    );
  }

  if (d.includes("hujan ringan")) {
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

  if (d.includes("cerah")) {
    return (
      <>
        <p className="mb-2 font-semibold text-orange-500">
          Cuaca cerah, waktu yang pas untuk menjelajah!
        </p>
        <ul className="list-disc list-inside ml-5 text-sm">
          <li>Gunakan pakaian ringan dan berwarna terang</li>
          <li>Topi atau payung untuk melindungi dari sinar matahari</li>
          <li>Sunblock dan sunscreen untuk melindungi kulit</li>
          <li>Bawa air minum yang cukup</li>
          <li>Kacamata hitam untuk kenyamanan mata</li>
        </ul>
      </>
    );
  }

  if (d.includes("berawan")) {
    return (
      <>
        <p className="mb-2 font-semibold text-orange-500">
          Cuaca berawan, nyaman untuk beraktivitas!
        </p>
        <ul className="list-disc list-inside ml-5 text-sm">
          <li>Pilih pakaian yang nyaman dan tidak terlalu tebal</li>
          <li>Siapkan jaket tipis jika angin bertiup</li>
          <li>Payung lipat bisa jadi penyelamat jika tiba-tiba hujan</li>
          <li>Gunakan sunblock atau sunscreen</li>
        </ul>
      </>
    );
  }

  return (
    <p className="text-sm text-gray-600">
      Tidak ada tips khusus untuk cuaca ini.
    </p>
  );
};

const WeatherCalendarMain = ({
  holidayDates = {},
  weatherDescriptions = {},
}) => {
  const [selectedWeather, setSelectedWeather] = useState(null);
  const dialogRef = useRef();

  const handleIconClick = (dateStr) => {
    setSelectedWeather({
      date: dateStr,
      desc: weatherDescriptions[dateStr],
    });
    dialogRef.current?.showModal();
  };

  return (
    <div className="md:col-span-2 bg-white rounded-2xl shadow-md p-6">
      <h1 className="text-2xl font-bold text-gray-800 text-center">
        Kalender Cuaca
      </h1>
      <p className="text-gray-600 text-center mb-6">
        Lihat prakiraan cuaca dan hari libur langsung dalam satu tampilan
        kalender.
      </p>

      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        height="auto"
        aspectRatio={1.4}
        headerToolbar={{
          left: "prev,next today",
          center: "",
          right: "title",
        }}
        buttonText={{ today: "Hari ini" }}
        dayHeaderContent={(args) => (
          <div className="text-teal-600 font-semibold">{args.text}</div>
        )}
        dayCellContent={(arg) => {
          const dateStr = toLocalDateStr(arg.date);
          const isSunday = arg.date.getDay() === 0;
          const isHoliday = holidayDates[dateStr];
          const isToday = toLocalDateStr(new Date()) === dateStr;

          const isRed = isSunday || isHoliday;
          const textColor = isRed ? "text-red-600" : "text-gray-800";

          const tooltipText = [
            isSunday ? "Hari Minggu" : null,
            isHoliday ? holidayDates[dateStr] : null,
          ]
            .filter(Boolean)
            .join(" & ");

          const weatherData = weatherDescriptions[dateStr];

          return (
            <div
              className={`w-full h-full aspect-square flex flex-col justify-between items-start p-1 text-xs ${
                tooltipText ? "tooltip tooltip-accent" : ""
              }`}
              data-tip={tooltipText}
            >
              <div
                className={`ml-auto text-sm ${
                  isToday ? "bg-yellow-200 rounded-full px-1" : ""
                } ${textColor}`}
              >
                {arg.dayNumberText}
              </div>
              {weatherData && (
                <button
                  onClick={() => handleIconClick(dateStr)}
                  className="mx-auto my-1 transition-transform duration-300 hover:scale-110 hover:rotate-3"
                >
                  {getWeatherIcon(weatherData.description, "text-4xl")}
                </button>
              )}
            </div>
          );
        }}
        events={[]}
        eventContent={() => null}
      />

      {/* Modal Cuaca */}
      <dialog ref={dialogRef} className="modal">
        <form
          method="dialog"
          className="modal-box max-w-md bg-white text-black rounded-xl"
        >
          {selectedWeather?.desc && (
            <>
              <h3 className="font-bold text-lg mb-2">
                Cuaca: {selectedWeather.desc.description}
              </h3>

              <p className="mb-1">
                <span className="font-semibold">Suhu:</span>{" "}
                {selectedWeather.desc.temp}
              </p>
              <hr></hr>
              <div>
                <h4 className="font-semibold mb-2">Tips Perjalanan:</h4>
                {getTravelTips(selectedWeather.desc.description)}
              </div>
            </>
          )}

          <div className="modal-action mt-6">
            <button className="btn btn-warning btn-outline border-2">
              Tutup
            </button>
          </div>
        </form>
      </dialog>
    </div>
  );
};

export default WeatherCalendarMain;
