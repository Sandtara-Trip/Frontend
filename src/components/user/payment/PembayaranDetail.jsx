const PembayaranDetail = ({ metodeBayar, totalHarga }) => {
  const logos = {
    transfer: [
      [
        "https://upload.wikimedia.org/wikipedia/id/5/5a/Logo_Bank_BCA.svg",
        "BCA",
      ],
      ["https://bankbri.co.id/o/bri-theme/images/logo.png", "BRI"],
      [
        "https://upload.wikimedia.org/wikipedia/commons/d/d5/Logo_BNI.png",
        "BNI",
      ],
    ],
    kartu: [
      [
        "https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png",
        "Visa",
      ],
      [
        "https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png",
        "MasterCard",
      ],
    ],
    gopay: [
      [
        "https://upload.wikimedia.org/wikipedia/commons/3/3b/Gopay_logo.png",
        "GoPay",
      ],
    ],
  };

  const titleMap = {
    transfer: "Transfer Bank",
    kartu: "Kartu Kredit/Debit",
    gopay: "GoPay / QRIS",
  };

  return (
    <div className="card bg-base-100 shadow-md w-full mt-12 lg:mt-28 p-4 lg:p-6">
      <div className="card-body space-y-6 p-0">
        <div>
          <h2 className="text-lg font-semibold text-orange-600 mb-2">
            Metode Pembayaran
          </h2>
          <p className="font-medium text-gray-800">{titleMap[metodeBayar]}</p>
          <div className="flex flex-wrap gap-3 mt-3">
            {logos[metodeBayar]?.map(([src, alt], idx) => (
              <img
                key={idx}
                src={src}
                alt={alt}
                className="h-6 sm:h-8 object-contain"
              />
            ))}
          </div>
        </div>

        <div className="border-t pt-4">
          <p className="text-md font-semibold text-gray-700">
            Total Harga:
            <span className="text-orange-600 ml-1">
              Rp {totalHarga.toLocaleString("id-ID")}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PembayaranDetail;
