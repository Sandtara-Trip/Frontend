export const filterOptionsPerCategory = {
  Semua: [
    { 
      name: "jenis", 
      label: "Jenis", 
      options: ["Wisata", "Hotel", "Kuliner"] 
    },
    { 
      name: "rating", 
      label: "Rating", 
      options: ["1", "2", "3", "4", "5"] 
    },
  ],
  Wisata: [
    {
      name: "kategori",
      label: "Kategori Wisata",
      options: ["Alam", "Budaya", "Religi", "Hiburan", "Monumen", "Museum", "Tempat Hiburan"],
    },
    { 
      name: "cuaca", 
      label: "Cuaca", 
      options: ["Panas", "Dingin"] 
    },
    { 
      name: "rating", 
      label: "Rating", 
      options: ["1", "2", "3", "4", "5"] 
    },
  ],
  Hotel: [
    { 
      name: "rating", 
      label: "Rating", 
      options: ["1", "2", "3", "4", "5"] 
    },
  ],
  Kuliner: [
    {
      name: "kategori",
      label: "Kategori",
      options: ["Kuliner Khas Denpasar", "Toko Oleh-Oleh"],
    },
  ],
};