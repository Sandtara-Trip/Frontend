import { useState, useRef, useEffect } from "react";
import { FaTimes, FaTrash, FaBook } from "react-icons/fa";

const ArticleChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Halo, aku Tara. Yuk, cari inspirasi baru di sini!",
    },
  ]);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [articleIndexes, setArticleIndexes] = useState({
    "Wisata populer di Denpasar": 0,
    "Kuliner khas Denpasar": 0,
    "Tips Liburan Seru": 0,
  });

  const chatRef = useRef(null);

  const quickReplies = [
    "Wisata populer di Denpasar",
    "Kuliner khas Denpasar",
    "Tips Liburan Seru",
  ];

  const articleReplies = {
    "Wisata populer di Denpasar": [
      {
        title: "Ini Wisata Cocok Buat Kamu!",
        description:
          "28 Tempat Wisata di Denpasar Bali Terbaru & Hits yang Wajib Dikunjungi",
        link: "https://tempatwisataseru.com/tempat-wisata-di-denpasar-bali/",
        image:
          "https://tempatwisataseru.com/wp-content/uploads/2018/08/Museum-Bali-Denpasar.jpg",
      },
      {
        title: "Sudah Pernah ke Tempat Ini?",
        description:
          "12 Wisata Populer di Kota Denpasar, Ada Taman Rekreasi Hingga Pantai",
        link: "https://travel.detik.com/domestic-destination/d-6920319/12-wisata-populer-di-kota-denpasar-ada-taman-rekreasi-hingga-pantai",
        image:
          "https://akcdn.detik.net.id/community/media/visual/2021/04/12/spot-sunrise-sejuta-photograper-1_169.jpeg?w=700&q=90",
      },
      {
        title: "Temukan Spot Favorit Liburanmu",
        description:
          "10 Tempat Wisata di Denpasar Paling Hits dan Instagramable",
        link: "https://www.mediawisata.id/10-tempat-wisata-di-denpasar/",
        image:
          "https://www.mediawisata.id/wp-content/uploads/10-Tempat-Wisata-di-Denpasar-Paling-Hits-dan-Instagramable.jpg",
      },
    ],

    "Kuliner khas Denpasar": [
      {
        title: "Tempat Makan yang Harus Kamu Kunjungi",
        description:
          "10 Daftar Tempat Makan Enak di Denpasar Bisa Untuk Keluarga dan Apa Ada Tempat Bermain Anak?",
        link: "https://pergimulu.com/tempat-makan-di-denpasar/",
        image:
          "https://tse1.mm.bing.net/th?id=OIP.bNdmtNP47WqWnWx6pBGypwHaEm&pid=Api&P=0&h=220",
      },
      {
        title: "Cicipi Kuliner Khas yang Bikin Nagih!",
        description: "10 Makanan Khas Denpasar Yang Enak dan Bikin Ketagihan",
        link: "https://www.detik.com/bali/kuliner/d-6404991/10-makanan-khas-denpasar-yang-enak-dan-bikin-ketagihan",
        image:
          "https://akcdn.detik.net.id/community/media/visual/2022/06/18/10-resep-masakan-bali-populer-ayam-betutu-hingga-sate-lilit-6_169.jpeg?w=700&q=90",
      },
      {
        title: "Restoran Enak Buat Makan Bareng",
        description: "10 Restoran di Denpasar yang Punya Cita Rasa Lezat",
        link: "https://blog.cove.id/restoran-di-denpasar/",
        image:
          "https://cove-blog-id.sgp1.cdn.digitaloceanspaces.com/cove-blog-id/2023/07/Restoran-di-Denpasar.webp",
      },
    ],

    "Tips Liburan Seru": [
      {
        title: "Panduan liburan low budget yang cocok buat kamu",
        description: "10 Tips Hemat Liburan Ke Bali Supaya Enggak Bangkrut",
        link: "https://keluyuran.com/tips-liburan-ke-bali/",
        image:
          "https://keluyuran.com/wp-content/uploads/2021/11/Pilih-Waktu-Liburan-Terbaik_.webp",
      },
      {
        title: "Biar Liburanmu Nggak Gagal, Simak Dulu Ini!",
        description:
          "7 Tips Rencanakan Liburan Panjang yang Menyenangkan, Hemat, dan Bermanfaat",
        link: "https://ik.imagekit.io/goodid/gnfi/uploads/articles/large-7-tips-merencanakan-liburan-panjang-yang-menyenangkan-hemat-dan-bermanfaat-3LJwYp00Tl.jpg?tr=w-730,h-486,fo-center",
        image:
          "https://ik.imagekit.io/goodid/gnfi/uploads/articles/large-7-tips-merencanakan-liburan-panjang-yang-menyenangkan-hemat-dan-bermanfaat-3LJwYp00Tl.jpg?tr=w-730,h-486,fo-center",
      },
      {
        title: "Waktu Terbaik Buat Liburan, Sudah Tahu Belum?",
        description: "Rekomendasi Waktu Liburan Terbaik, Hindari Peak Season",
        link: "https://travel.kompas.com/read/2023/12/18/175300827/rekomendasi-waktu-liburan-terbaik-hindari-peak-season",
        image:
          "https://asset.kompas.com/crops/V1OEHVGHO8FrcHIaTVQz3QBrSy0=/0x0:1920x1280/750x500/data/photo/2022/12/15/639ac7c355779.jpg",
      },
    ],
  };

  const sendMessage = (customInput) => {
    const messageText = customInput;
    if (!messageText.trim()) return;

    const userMessage = { sender: "user", text: messageText };
    setMessages((prev) => [...prev, userMessage]);
    setIsBotTyping(true);

    setTimeout(() => {
      let botResponse;
      if (articleReplies[messageText]) {
        const options = articleReplies[messageText];
        const currentIndex = articleIndexes[messageText] || 0;
        const nextIndex = (currentIndex + 1) % options.length;
        const { title, description, link, image } = options[currentIndex];

        botResponse = {
          sender: "bot",
          type: "article",
          title,
          description,
          link,
          image,
        };

        setArticleIndexes((prev) => ({
          ...prev,
          [messageText]: nextIndex,
        }));
      } else {
        botResponse = {
          sender: "bot",
          text: "Ini respon bot-nya ya!",
        };
      }

      setMessages((prev) => [...prev, botResponse]);
      setIsBotTyping(false);
    }, 1000);
  };

  const handleClearMessages = () => {
    setMessages([{ sender: "bot", text: "Halo, aku Tara. Yuk, cari inspirasi baru di sini!" }]);
  };

  useEffect(() => {
    chatRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isBotTyping]);

  useEffect(() => {
    if (isOpen) {
      chatRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [isOpen]);

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed bottom-6 right-6 bg-warm-orange text-white p-4 rounded-full shadow-lg hover:bg-hover-orange transition-transform duration-300 z-50 sm:p-5 sm:bottom-8 sm:right-8"
        aria-label={isOpen ? "Tutup chat" : "Buka chat"}
      >
        {isOpen ? <FaTimes size={20} /> : <FaBook size={20} />}
      </button>

      {/* Chat Popup */}
      {isOpen && (
        <div
  className="fixed bottom-20 right-6 w-full max-w-xs sm:max-w-md h-[70vh] sm:h-[480px] bg-white border border-gray-300 rounded-2xl shadow-lg flex flex-col z-50 sm:right-6 sm:bottom-20 md:right-6 md:bottom-20"
>

          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-warm-orange text-white rounded-t-2xl shadow-md">
            <div>
              <h4 className="font-semibold text-base sm:text-lg">
                Temu Wawasan
              </h4>
              <p className="text-xs sm:text-sm opacity-80">
                Temukan info menarik seputar destinasi dan tips perjalanan.
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              title="Tutup chat"
              className="hover:text-orange-200 transition"
              aria-label="Tutup chat"
            >
              <FaTimes size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 bg-gray-50 scrollbar-thin scrollbar-thumb-orange-300 scrollbar-track-gray-200">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`chat ${
                  msg.sender === "user" ? "chat-end" : "chat-start"
                }`}
              >
                {msg.type === "article" ? (
                  <div className="chat-bubble bg-white text-gray-700 border border-gray-200 rounded-xl shadow p-3">
                    <div className="font-semibold text-warm-orange text-sm sm:text-base mb-1">
                      {msg.title}
                    </div>
                    <p className="text-xs sm:text-sm mb-2">{msg.description}</p>
                    {msg.image && (
                      <img
                        src={msg.image}
                        alt={msg.title}
                        className="w-full h-32 sm:h-40 object-cover rounded-md mb-2"
                      />
                    )}
                    <a
                      href={msg.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs sm:text-sm text-blue-600 underline hover:text-blue-800"
                    >
                      Lihat selengkapnya
                    </a>
                  </div>
                ) : (
                  <div
                    className="chat-bubble"
                    style={{
                      backgroundColor:
                        msg.sender === "user" ? "#FB923C" : "#FFFFFF",
                      color: msg.sender === "user" ? "white" : "#374151",
                      borderRadius:
                        msg.sender === "user"
                          ? "1rem 1rem 0 1rem"
                          : "1rem 1rem 1rem 0",
                      border:
                        msg.sender === "bot" ? "1px solid #D1D5DB" : "none",
                      boxShadow: "0 1px 2px rgb(0 0 0 / 0.05)",
                    }}
                  >
                    {msg.text}

                    {msg.sender === "bot" && i === 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {quickReplies.map((text, idx) => (
                          <button
                            key={idx}
                            onClick={() => sendMessage(text)}
                            className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full shadow-sm hover:bg-orange-200 transition text-xs sm:text-sm font-medium select-none"
                            disabled={isBotTyping}
                            aria-label={`Pertanyaan cepat: ${text}`}
                          >
                            {text}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}

            {isBotTyping && (
              <div className="chat chat-start">
                <div
                  className="chat-bubble"
                  style={{
                    backgroundColor: "#FFFFFF",
                    color: "#9CA3AF",
                    border: "1px solid #D1D5DB",
                    borderRadius: "1rem 1rem 1rem 0",
                    boxShadow: "0 1px 2px rgb(0 0 0 / 0.05)",
                  }}
                >
                  <span className="loading loading-dots loading-xs" />
                </div>
              </div>
            )}

            <div ref={chatRef} />
          </div>

          {/* Footer */}
          <div className="px-4 py-3 border-t border-gray-200 bg-white flex items-center justify-center gap-2">
            <button
              onClick={handleClearMessages}
              className="btn btn-ghost btn-sm rounded-full hover:bg-red-100 text-sm text-red-600 flex items-center gap-1"
              aria-label="Hapus chat"
            >
              <FaTrash /> Hapus
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ArticleChat;
