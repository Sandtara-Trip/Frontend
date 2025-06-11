export const filterOptionsPerCategory = {
  Semua: [
    { 
      name: "jenis", 
      label: "Jenis", 
      options: ["Wisata", "Hotel", "Kuliner"] 
    },
    { 
      name: "rating", 
      label: "Rating Minimal", 
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
      label: "Rating Minimal", 
      options: ["1", "2", "3", "4", "5"] 
    },
  ],
  Hotel: [
    { 
      name: "rating", 
      label: "Rating Minimal", 
      options: ["1", "2", "3", "4", "5"] 
    },
  ],
  Kuliner: [
    {
      name: "jenis",
      label: "Jenis Kuliner",
      options: ["Tradisional", "Modern", "Kafe"],
    },
    { 
      name: "rating", 
      label: "Rating Minimal", 
      options: ["1", "2", "3", "4", "5"] 
    },
  ],
};