import React from "react";

function LoadingScreen() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-100 via-white to-orange-100 px-4">
      <div className="flex flex-col items-center space-y-6">
        {/* Spinner*/}
        <div className="w-16 h-16 border-[6px] border-orange-200 border-t-warm-orange rounded-full animate-spin shadow-orange-400 shadow-md"></div>

        {/* Teks  */}
        <p className="text-lg font-semibold text-warm-orange text-center animate-pulse tracking-wide">
          Memuat data, mohon tunggu sebentar...
        </p>
      </div>
    </div>
  );
}

export default LoadingScreen;
