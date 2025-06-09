import axios from 'axios';

const HOTEL_RECOMMENDATION_URL = 'https://rekomen-hotel-production.up.railway.app/rekomendasi?review=bagus%20dan%20nyaman5';

export const fetchHotelRecommendations = async () => {
  try {
    console.log('Fetching hotel recommendations...');
    const response = await axios.get(HOTEL_RECOMMENDATION_URL);
    console.log('Raw hotel API response:', response.data);

    if (!response.data || !Array.isArray(response.data)) {
      console.error('Invalid response format:', response.data);
      throw new Error('Invalid response format from hotel API');
    }

    // Transform the data to match our needs
    const recommendations = response.data.map(hotel => {
      try {
        return {
          id: hotel.id || Math.random().toString(36).substr(2, 9),
          name: hotel.nama_hotel || 'Nama hotel tidak tersedia',
          description: hotel.deskripsi || 'Deskripsi tidak tersedia',
          image: hotel.gambar || 'https://via.placeholder.com/800x600?text=Hotel+Image',
          location: hotel.lokasi || 'Lokasi tidak tersedia',
          rating: hotel.rating || 'N/A',
          price: hotel.harga || 'Harga tidak tersedia',
          facilities: hotel.fasilitas || []
        };
      } catch (err) {
        console.error('Error transforming hotel data:', hotel, err);
        return null;
      }
    }).filter(hotel => hotel !== null);

    console.log('Transformed hotel recommendations:', recommendations);

    if (recommendations.length === 0) {
      throw new Error('No valid hotel recommendations found');
    }

    return recommendations;
  } catch (error) {
    console.error('Error fetching hotel recommendations:', error);
    if (error.response) {
      console.error('Error response:', error.response.data);
      console.error('Status code:', error.response.status);
    }
    throw new Error('Failed to fetch hotel recommendations: ' + (error.response?.data?.message || error.message));
  }
}; 