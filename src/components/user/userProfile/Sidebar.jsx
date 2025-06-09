import { FaBars, FaTimes } from "react-icons/fa";
import { LuUserRound } from "react-icons/lu";
import { MdReceiptLong, MdOutlineLogout } from "react-icons/md";

const Sidebar = ({
  name,
  isSidebarOpen,
  setIsSidebarOpen,
  activeTab,
  setActiveTab,
}) => {
  return (
    <div
      className={`
        h-full bg-white border-r border-gray-200 shadow-sm transition-all duration-300
        ${isSidebarOpen ? "md:w-60" : "md:w-20"} w-20 
        flex flex-col justify-between
      `}
    >
      <div className="px-2 py-4 flex flex-col gap-6">
        {/* Tombol toggle hanya tampil di desktop */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="self-end text-gray-500 hover:text-orange-500 hidden md:block"
        >
          {isSidebarOpen ? (
            <FaTimes className="w-5 h-5" />
          ) : (
            <FaBars className="w-5 h-5" />
          )}
        </button>

        {/* User Info */}
        <div className="flex items-center gap-3 px-2">
          <span className="grid size-10 place-content-center rounded-full bg-orange-100 text-orange-600 text-xl font-semibold">
            {name?.charAt(0).toUpperCase()}
          </span>
          {isSidebarOpen && (
            <div className="hidden md:block">
              <p className="text-sm font-medium text-gray-700">{name}</p>
              <p className="text-xs text-gray-500">User Aktif</p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="space-y-2">
          <button
            onClick={() => setActiveTab("profile")}
            className={`relative flex items-center gap-3 rounded-lg px-3 py-2 font-medium transition group w-full text-left ${
              activeTab === "profile"
                ? "bg-orange-100 text-orange-600"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <LuUserRound />
            {isSidebarOpen && (
              <span className="hidden md:inline">Akun Pengguna</span>
            )}
            {!isSidebarOpen && (
              <span className="absolute left-full ml-2 whitespace-nowrap bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition z-10">
                Akun Pengguna
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("riwayat")}
            className={`relative flex items-center gap-3 rounded-lg px-3 py-2 font-medium transition group w-full text-left ${
              activeTab === "riwayat"
                ? "bg-orange-100 text-orange-600"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <MdReceiptLong />
            {isSidebarOpen && (
              <span className="hidden md:inline">Riwayat Pembelian</span>
            )}
            {!isSidebarOpen && (
              <span className="absolute left-full ml-2 whitespace-nowrap bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition z-10">
                Riwayat Pembelian
              </span>
            )}
          </button>
        </nav>
      </div>

      {/* Logout */}
      <div className="border-t border-gray-100 px-4 py-4">
        <a
          href="#"
          className="relative flex items-center gap-3 text-gray-500 hover:text-red-600 hover:bg-red-100 rounded-lg px-3 py-2 transition group"
        >
          <MdOutlineLogout />
          {isSidebarOpen && <span className="hidden md:inline">Logout</span>}
          {!isSidebarOpen && (
            <span className="absolute left-full ml-2 whitespace-nowrap bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition z-10">
              Logout
            </span>
          )}
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
