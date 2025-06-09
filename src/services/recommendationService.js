import axios from 'axios';

const HOT_WEATHER_URL = 'https://project-ml-production.up.railway.app/rekomendasi-wisata?query=wisata%20untuk%20cuaca%20panas&preferensi=wisata&top_n=20';
const RAINY_WEATHER_URL = 'https://project-ml-production.up.railway.app/rekomendasi-wisata?query=wisata%20untuk%20cuaca%20dingin&preferensi=wisata&top_n=20';

export const fetchWeatherBasedRecommendations = async (isHotWeather = true) => {
  try {
    const url = isHotWeather ? HOT_WEATHER_URL : RAINY_WEATHER_URL;
    console.log('Fetching recommendations for:', isHotWeather ? 'hot weather' : 'rainy weather');
    console.log('URL:', url);
    
    const response = await axios.get(url);
    console.log('Raw API response status:', response.status);
    console.log('Raw API response data:', JSON.stringify(response.data, null, 2));
    
    if (!response.data) {
      console.error('Empty response received');
      throw new Error('Empty response from recommendations API');
    }
    
    if (!Array.isArray(response.data)) {
      console.error('Invalid data format received:', typeof response.data);
      throw new Error('Invalid response format from recommendations API');
    }
    
    // Transform the data to include only necessary information
    const recommendations = response.data.map(item => {
      try {
        return {
          id: item.id,
          name: item.nama || 'Nama tidak tersedia',
          description: item.deskripsi || 'Deskripsi tidak tersedia',
          image: item.gambar || 'https://via.placeholder.com/800x600?text=Gambar+Tidak+Tersedia',
          location: item.lokasi || 'Lokasi tidak tersedia',
          rating: item.rating || 'N/A'
        };
      } catch (err) {
        console.error('Error transforming item:', item, err);
        return null;
      }
    }).filter(item => item !== null);

    console.log('Transformed recommendations:', recommendations);
    
    if (recommendations.length === 0) {
      throw new Error('No valid recommendations found in response');
    }

    return recommendations;
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    if (error.response) {
      console.error('Error response:', error.response.data);
      console.error('Status code:', error.response.status);
    }
    throw new Error('Failed to fetch recommendations: ' + (error.response?.data?.message || error.message));
  }
}; 