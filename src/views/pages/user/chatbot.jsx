import { useState, useRef, useEffect } from "react";
import { FaComments, FaTimes, FaTrash } from "react-icons/fa";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Halo! Ada yang bisa saya bantu?" },
  ]);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const chatRef = useRef(null);

  const quickReplies = [
    "Wisata populer di Denpasar",
    "Kuliner khas Denpasar",
    "Hotel terbaik di Denpasar",
  ];

  const articleReplies = {
    "Wisata populer di Denpasar": [
      {
        title: "Ini tempat wisata cocok untukmu",
        description:
          "Tempat favorit untuk menikmati sunrise. Cocok buat kamu yang suka suasana tenang dan jogging pagi hari.",
        link: "https://example.com/pantai-sanur",
        image:
          "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=60",
      },
      {
        title: "Pantai Mertasari",
        description:
          "Pantai yang cocok untuk keluarga dan anak-anak, dengan fasilitas lengkap.",
        link: "https://example.com/mertasari",
        image:
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=60",
      },
      {
        title: "Monumen Bajra Sandhi",
        description:
          "Monumen sejarah perjuangan rakyat Bali yang ikonik dan edukatif.",
        link: "https://example.com/monumen-bajra",
        image:
          "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=60",
      },
    ],

    "Kuliner khas Denpasar": [
      {
        title: "Ayam Betutu Gilimanuk",
        description:
          "Rasa rempah yang kuat dan pedasnya nendang, khas Bali banget!",
        link: "https://example.com/kuliner-ayam-betutu",
        image:
          "https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800&q=60",
      },
      {
        title: "Bebek Betutu",
        description:
          "Masakan tradisional Bali dengan bumbu khas dan cara masak unik.",
        link: "https://example.com/bebek-betutu",
        image:
          "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=60",
      },
      {
        title: "Sate Lilit Bali",
        description: "Sate khas Bali yang dibuat dari ikan dan rempah segar.",
        link: "https://example.com/sate-lilit",
        image:
          "https://images.unsplash.com/photo-1543353071-087092ec3938?auto=format&fit=crop&w=800&q=60",
      },
    ],

    "Hotel terbaik di Denpasar": [
      {
        title: "The Trans Resort Bali",
        description:
          "Penginapan mewah dengan fasilitas lengkap dan pelayanan terbaik. Rating 4.8/5.",
        link: "https://example.com/hotel-trans-resort",
        image:
          "https://images.unsplash.com/photo-1501117716987-c8e46b21c9a2?auto=format&fit=crop&w=800&q=60",
      },
      {
        title: "Grand Hyatt Bali",
        description:
          "Hotel bintang 5 dengan akses pantai pribadi dan kolam renang besar.",
        link: "https://example.com/grand-hyatt",
        image:
          "https://cdn.8mediatech.com/gambar/13974298407-7_destinasi_wisata_paling_ramai_di_denpasar_tahun_2025,_cocok_untuk_liburan_keluarga_dan_pasangan.jpg",
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
        const randomIndex = Math.floor(Math.random() * options.length);
        const { title, description, link, image } = options[randomIndex];
        botResponse = {
          sender: "bot",
          type: "article",
          title,
          description,
          link,
          image,
        };
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
    setMessages([{ sender: "bot", text: "Halo! Ada yang bisa saya bantu?" }]);
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
        className="fixed bottom-6 right-6 bg-warm-orange text-white p-4 rounded-full shadow-lg hover:bg-hover-orange transition-transform duration-300 z-50"
        aria-label={isOpen ? "Tutup chat" : "Buka chat"}
      >
        {isOpen ? <FaTimes size={20} /> : <FaComments size={20} />}
      </button>

      {/* Chat Popup */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 w-96 h-[520px] bg-white border border-gray-300 rounded-2xl shadow-lg flex flex-col z-50">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-3 bg-warm-orange text-white rounded-t-2xl shadow-md">
            <div>
              <h4 className="font-semibold text-lg">Tara Bot</h4>
              <p className="text-xs opacity-80">Teman digital perjalananmu.</p>
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
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 scrollbar-thin scrollbar-thumb-orange-300 scrollbar-track-gray-200">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`chat ${
                  msg.sender === "user" ? "chat-end" : "chat-start"
                }`}
              >
                {msg.type === "article" ? (
                  <div className="chat-bubble bg-white text-gray-700 border border-gray-200 rounded-xl shadow p-3">
                    <div className="font-semibold text-warm-orange text-base mb-1">
                      {msg.title}
                    </div>
                    <p className="text-sm mb-2">{msg.description}</p>
                    {msg.image && (
                      <img
                        src={msg.image}
                        alt={msg.title}
                        className="w-full h-40 object-cover rounded-md mb-2"
                      />
                    )}
                    <a
                      href={msg.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 underline hover:text-blue-800"
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
                            className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full shadow-sm hover:bg-orange-200 transition text-sm font-medium select-none"
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
          <div className="px-4 py-3 border-t border-gray-200 bg-white flex items-center justify-center gap-3">
            <button
              onClick={handleClearMessages}
              className="btn btn-ghost btn-sm rounded-full hover:bg-red-100 text-sm text-red-600"
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

export default Chatbot;
