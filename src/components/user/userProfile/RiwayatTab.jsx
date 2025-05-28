import {
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaCalendarAlt,
  FaStar,
} from "react-icons/fa";
import { useRef, useState } from "react";

const dummyRiwayat = [
  {
    id: "HOTEL001",
    type: "hotel",
    title: "Tiket Hotel A",
    qty: 1,
    total: 150000,
    roomType: "Deluxe Room",
    status: "Success",
    note: "Tolong sediakan extra bed",
    checkInDate: "13/02/2025",
    checkOutDate: "15/02/2025",
  },
   {
    id: "HOTEL001",
    type: "hotel",
    title: "Tiket Hotel A",
    qty: 1,
    total: 150000,
    roomType: "Deluxe Room",
    status: "Pending",
    note: "Tolong sediakan extra bed",
    checkInDate: "13/02/2025",
    checkOutDate: "15/02/2025",
  },
  {
    id: "SANUR001",
    type: "wisata",
    title: "Tiket Pantai Sanur",
    qty: 2,
    total: 10000,
    status: "Failed",
    note: "",
    orderDate: "12/02/2025 03:12 PM",
    visitDate: "13/02/2025",
  },
  {
    id: "UBUD001",
    type: "wisata",
    title: "Tiket Desa Wisata Ubud",
    qty: 3,
    total: 75000,
    status: "Success",
    note: "Ingin pemandu lokal",
    orderDate: "15/02/2025 10:00 AM",
    visitDate: "17/02/2025",
  },
];

const RiwayatTab = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [UPLOADED_IMAGE, setUploadedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [submittedReviews, setSubmittedReviews] = useState({});
  const [isReadOnly, setIsReadOnly] = useState(false);

  const fileInputRef = useRef(null);

  const resetForm = () => {
    setRating(0);
    setReview("");
    setUploadedImage(null);
    setImagePreview(null);
    setSelectedItem(null);
    setIsReadOnly(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Success":
        return (
          <div className="flex items-center gap-1 text-green-600 font-semibold text-sm">
            <FaCheckCircle className="text-green-500" />
            <span>{status}</span>
          </div>
        );
      case "Failed":
        return (
          <div className="flex items-center gap-1 text-red-600 font-semibold text-sm">
            <FaTimesCircle className="text-red-500" />
            <span>{status}</span>
          </div>
        );
      case "Pending":
        return (
          <div className="flex items-center gap-1 text-yellow-600 font-semibold text-sm">
            <FaClock className="text-yellow-500" />
            <span>{status}</span>
          </div>
        );
      default:
        return <span className="text-gray-500 text-sm">{status}</span>;
    }
  };

  const renderTanggalInfo = (item) => {
    if (item.type === "hotel") {
      return (
        <div className="mt-2 bg-blue-50 text-xs text-blue-800 rounded-md p-2 flex flex-col gap-1 w-fit">
          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-blue-500" />
            <span><strong>Check-in:</strong> {item.checkInDate}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-blue-500" />
            <span><strong>Check-out:</strong> {item.checkOutDate}</span>
          </div>
        </div>
      );
    } else {
      return (
        <div className="mt-2 bg-yellow-50 text-xs text-yellow-800 rounded-md p-2 flex flex-col gap-1 w-fit">
          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-yellow-500" />
            <span><strong>Dipesan:</strong> {item.orderDate}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-yellow-500" />
            <span><strong>Kunjungan:</strong> {item.visitDate}</span>
          </div>
        </div>
      );
    }
  };

  const handleOpenModal = (item) => {
    const existingReview = submittedReviews[item.id];
    if (existingReview) {
      setIsReadOnly(true);
      setRating(existingReview.rating);
      setReview(existingReview.review);
      setImagePreview(existingReview.imagePreview || null);
    } else {
      resetForm();
      setIsReadOnly(false);
    }
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleSubmitReview = () => {
    const today = new Date().toLocaleDateString("id-ID");
    const reviewData = {
      id: selectedItem?.id,
      rating,
      review,
      tanggal: today,
      imagePreview,
    };
    setSubmittedReviews((prev) => ({
      ...prev,
      [selectedItem.id]: reviewData,
    }));
    setShowModal(false);
    resetForm();
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Riwayat Pembelian</h1>
      <div className="space-y-6">
        {dummyRiwayat.map((item, index) => (
          <div key={index} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
            <div className="flex justify-between flex-col sm:flex-row gap-4 sm:items-start">
              <div className="flex-1 space-y-2">
                <h2 className="text-xl font-semibold text-warm-orange">{item.title}</h2>
                <p className="text-sm text-gray-600">
                  ID: <span className="font-mono">{item.id}</span>
                </p>
                <p className="text-sm text-gray-700">
                  Jumlah {item.type === "hotel" ? "Kamar" : "Tiket"}: <strong>{item.qty}</strong>
                </p>
                {item.roomType && (
                  <p className="text-sm text-gray-700">
                    Jenis Kamar: <strong>{item.roomType}</strong>
                  </p>
                )}
                <p className="text-sm text-gray-700">
                  Total Pembayaran: <strong>Rp {item.total.toLocaleString("id-ID")}</strong>
                </p>
                {item.note && (
                  <p className="text-sm text-gray-500 italic">Catatan: {item.note}</p>
                )}
                {renderTanggalInfo(item)}
              </div>
              <div className="text-right min-w-[120px]">{getStatusBadge(item.status)}</div>
            </div>
            {item.status === "Success" && (
              <div className="flex justify-end mt-4">
                <button
                  className="bg-warm-orange hover:bg-hover-orange text-white text-sm px-4 py-2 rounded-md transition"
                  onClick={() => handleOpenModal(item)}
                >
                  {submittedReviews[item.id] ? "Lihat Ulasan" : "Beri Ulasan"}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">
              {isReadOnly ? "Ulasan Anda" : "Beri Ulasan"}
            </h2>

            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">Rating:</label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((num) => (
                  <FaStar
                    key={num}
                    className={`text-3xl ${num <= rating ? "text-light-orange" : "text-gray-300"} ${isReadOnly ? "" : "cursor-pointer"}`}
                    onClick={() => !isReadOnly && setRating(num)}
                  />
                ))}
              </div>
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">Ulasan:</label>
              <textarea
                className="w-full border border-gray-300 rounded-md p-2 text-sm bg-white disabled:bg-gray-100"
                rows="3"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="Tulis ulasan Anda di sini..."
                disabled={isReadOnly}
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">Upload Foto (opsional):</label>
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setUploadedImage(file);
                      setImagePreview(reader.result);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
                disabled={isReadOnly}
                className="w-full border border-gray-300 rounded-md p-2 text-sm file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:text-sm file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100 disabled:bg-gray-100"
              />
              {imagePreview && (
                <div className="mt-2">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full max-h-48 object-contain rounded border"
                  />
                </div>
              )}
            </div>

            <div className="text-sm text-gray-500 mb-4">
              Tanggal: {new Date().toLocaleDateString("id-ID")}
            </div>

            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300"
                onClick={() => {
                  resetForm();
                  setShowModal(false);
                }}
              >
                {isReadOnly ? "Tutup" : "Batal"}
              </button>
              {!isReadOnly && (
                <button
                  className="px-4 py-2 text-sm bg-warm-orange text-white rounded hover:bg-hover-orange"
                  onClick={handleSubmitReview}
                >
                  Kirim
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RiwayatTab;
