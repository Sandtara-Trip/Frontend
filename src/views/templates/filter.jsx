export const filterOptionsPerCategory = {
  Semua: [
    { name: "jenis", label: "Jenis", options: ["Wisata", "Hotel", "Kuliner"] },
    { name: "rating", label: "Rating", options: ["1", "2", "3", "4", "5"] },
  ],
  Wisata: [
    {
      name: "kategori",
      label: "Kategori Wisata",
      options: ["Alam", "Budaya", "Keluarga", "Hiburan"],
    },
    { name: "cuaca", label: "Cuaca", options: ["Panas", "Hujan"] },
    { name: "rating", label: "Rating", options: ["1", "2", "3", "4", "5"] },
  ],
  Hotel: [
    {
      name: "fasilitas",
      label: "Fasilitas",
      options: ["Wifi", "Parkir", "Kolam Renang"],
    },
    { name: "rating", label: "Rating", options: ["1", "2", "3", "4", "5"] },
  ],
  Kuliner: [
    {
      name: "jenis",
      label: "Jenis Kuliner",
      options: ["Tradisional", "Modern", "Kafe"],
    },
    { name: "rating", label: "Rating", options: ["1", "2", "3", "4", "5"] },
  ],
};