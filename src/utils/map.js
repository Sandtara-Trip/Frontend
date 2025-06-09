import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const API_BASE_URL = "http://localhost:3000";

/**
 * Fungsi untuk melakukan reverse geocoding
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @returns {Promise<string>} - Alamat berdasarkan koordinat
 */
async function reverseGeocode(lat, lon) {
  try {
    // Gunakan endpoint proxy di backend
    const response = await fetch(
      `${API_BASE_URL}/api/geocode/reverse?lat=${lat}&lon=${lon}`
    );
    const data = await response.json();
    return data.address || "Alamat tidak ditemukan";
  } catch (error) {
    console.error("Reverse geocoding failed:", error);
    // Jika gagal, kembalikan alamat dari props
    return "Alamat tidak ditemukan";
  }
}

/**
 * Fungsi untuk menampilkan peta statis dengan marker dan popup alamat
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @param {string} mapDivId - ID dari elemen div tempat peta ditampilkan
 */
export default async function Map(lat, lon, mapDivId) {
  // Tunggu sebentar untuk memastikan container sudah ada
  await new Promise(resolve => setTimeout(resolve, 100));

  const mapContainer = document.getElementById(mapDivId);
  if (!mapContainer) {
    console.error(`Map container with id "${mapDivId}" not found`);
    return;
  }

  // Reset peta jika sudah ada
  if (mapContainer._leaflet_id) {
    mapContainer._leaflet_id = null;
    mapContainer.innerHTML = "";
  }

  const alamat = await reverseGeocode(lat, lon);

  // Buat peta baru, dengan draggable enabled secara default
  const map = L.map(mapDivId, {
    dragging: true,
    scrollWheelZoom: true,
    doubleClickZoom: true,
    boxZoom: true,
    keyboard: true,
    tap: true,
  }).setView([lat, lon], 13);

  L.tileLayer(
    "https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=PbCfY2RXnvHmNVXUWKlO",
    {
      attribution:
        '&copy; <a href="https://www.maptiler.com/">MapTiler</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>',
    }
  ).addTo(map);

  const customIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  // Marker dengan event klik flyTo dan buka popup
  const marker = L.marker([lat, lon], { icon: customIcon }).addTo(map);

  marker.bindPopup(`
    <b>${alamat}</b><br/>
    <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      alamat
    )}" target="_blank" rel="noopener noreferrer">
      Lihat di Google Maps
    </a>
  `);

  marker.on("click", () => {
    map.flyTo([lat, lon], 15, {
      duration: 0.5,
    });
    marker.openPopup();
  });
}
