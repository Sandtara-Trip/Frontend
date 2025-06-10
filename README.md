# 🌐 Sandtara Trip

Sandtara Trip adalah aplikasi web berbasis kecerdasan buatan yang bertujuan untuk membantu wisatawan dalam merencanakan perjalanan secara personal dan cerdas. Aplikasi ini memberikan rekomendasi wisata, hotel, dan kuliner khas berdasarkan:

- ⭐ Rating pengguna
- ☁️ Kondisi cuaca saat ini
- 🙋 Preferensi individu

Dengan dukungan dua bahasa (Bahasa Indonesia & Inggris), Sandtara Trip ramah digunakan oleh wisatawan lokal maupun mancanegara.

---

## 🎯 Tujuan Sandtara Trip

Menyediakan antarmuka pengguna yang interaktif dan responsif untuk:

- Menampilkan rekomendasi wisata, hotel, dan kuliner
- Mengelola konten oleh admin (CRUD data)
- Mendukung tampilan multi-bahasa

---

## 🧩 Fitur Sandtara Trip

### 👤 Bagi Pengguna

- Melihat rekomendasi wisata, hotel, dan kuliner berdasarkan rating, preferensi, dan cuaca
- UI multibahasa: Indonesia dan Inggris
- Desain responsif dan mudah digunakan

### 🛠️ Bagi Admin

- CRUD data:
  - Hotel & Room
  - Wisata
  - Kuliner
  - Order
  - Pengguna

---

## 🛠️ Teknologi yang Digunakan

- ⚛️ React
- ⚡ Vite
- 🎨 Tailwind CSS
- 🌐 HTML5
- 📦 Axios

---

## 🛠️ Instalasi & Menjalankan Proyek

```bash
# 1. Clone repositori
git clone https://github.com/Sandtara-Trip/Frontend.git
cd sandtara-trip

# 2. Install dependensi
npm install

# 3. Jalankan aplikasi
npm run dev
```

Buka browser dan akses `http://localhost:5173`

---

## 📁 Struktur Direktori

```
sandtara-trip/
├── node_modules/              # Direktori dependensi proyek
├── public/                    # File publik (favicon, dll.)
├── src/                       # Source code utama
│   ├── components/            # Komponen UI reusable
│   ├── models/                # Struktur data atau model business logic
│   ├── presenters/            # Penghubung antara model dan view
│   ├── root/                  # Komponen root seperti layout, router, wrapper
│   ├── styles/                # File CSS atau Tailwind config tambahan
│   ├── utils/                 # Fungsi bantu (helper function) seperti formatter, validator, dll.
│   ├── views/                 # Halaman atau tampilan utama (dashboard, login, detail, dll.)
│   └── main.jsx               # Entry point aplikasi
├── .gitignore
├── catatan.md
├── eslint.config.js           # Konfigurasi ESLint (linting code)
├── index.html                 # Template HTML utama untuk aplikasi
├── package-lock.json          # Lock file untuk konsistensi dependensi
├── package.json               # Metadata proyek dan daftar dependensi
├── postcss.config.js          # Konfigurasi PostCSS
├── README.md                  # Dokumentasi proyek
├── tailwind.config.js         # Konfigurasi untuk Tailwind CSS
└── vite.config.js             # Konfigurasi Vite
```

---
