import axios from 'axios';

const CORS_PROXY = 'https://api.allorigins.win/raw?url=';
const WEATHER_API_URL = `${CORS_PROXY}${encodeURIComponent('https://cuaca-harian-production-816b.up.railway.app/predict/daily')}`;
const HOURLY_WEATHER_API_URL = `${CORS_PROXY}${encodeURIComponent('https://cuaca-jam-production.up.railway.app/predict/hourly')}`;

export const fetchWeatherData = async () => {
  try {
    console.log('Fetching weather data from:', WEATHER_API_URL);
    const response = await axios.get(WEATHER_API_URL);
    
    // Response dari allorigins sudah dalam bentuk JSON
    const data = response.data;
    console.log('Raw API response:', JSON.stringify(data, null, 2));
    
    if (!data) {
      throw new Error('Empty response from weather API');
    }

    // Validate the response structure
    if (!data.predictions || !Array.isArray(data.predictions)) {
      console.error('Invalid predictions data:', data);
      throw new Error('Invalid predictions data structure');
    }

    // Log the first prediction for debugging
    if (data.predictions.length > 0) {
      console.log('Sample prediction:', data.predictions[0]);
    }

    return data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    if (error.response) {
      console.error('Error response:', error.response.data);
      console.error('Status code:', error.response.status);
    }
    throw new Error('Failed to fetch weather data: ' + (error.response?.data?.message || error.message));
  }
};

export const fetchHourlyWeatherData = async () => {
  try {
    console.log('Fetching hourly weather data from:', HOURLY_WEATHER_API_URL);
    const response = await axios.get(HOURLY_WEATHER_API_URL);
    console.log('Raw hourly API response:', JSON.stringify(response.data, null, 2));
    
    if (!response.data) {
      throw new Error('Empty response from hourly weather API');
    }

    // Validate the response structure
    if (!response.data.predictions || !Array.isArray(response.data.predictions)) {
      console.error('Invalid hourly predictions data:', response.data);
      throw new Error('Invalid hourly predictions data structure');
    }

    // Log the first prediction for debugging
    if (response.data.predictions.length > 0) {
      console.log('Sample hourly prediction:', response.data.predictions[0]);
    }

    return response.data;
  } catch (error) {
    console.error('Error fetching hourly weather data:', error);
    if (error.response) {
      console.error('Error response:', error.response.data);
      console.error('Status code:', error.response.status);
    }
    throw new Error('Failed to fetch hourly weather data: ' + (error.response?.data?.message || error.message));
  }
};

// Helper function to format date from YYYY-MM-DD to DD/MM/YYYY
export const formatDateForDisplay = (dateString) => {
  if (!dateString) return '';
  try {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
};

// Helper function to format date from DD/MM/YYYY to YYYY-MM-DD
export const formatDateForAPI = (dateString) => {
  if (!dateString) return '';
  try {
    const [day, month, year] = dateString.split('/');
    return `${year}-${month}-${day}`;
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
};

// Transform API data to match the app's expected format
export const transformWeatherData = (apiData) => {
  if (!apiData || !apiData.current_weather) {
    console.error('Invalid API data structure:', apiData);
    return null;
  }

  try {
    const { current_weather, location } = apiData;
    
    if (!location || !location.city || !current_weather.date) {
      console.error('Missing required weather data fields:', { location, current_weather });
      return null;
    }

    return {
      city: location.city,
      date: formatDateForDisplay(current_weather.date),
      temp: `${Math.round(current_weather.temperature_2m_max)}°`,
      description: current_weather.weather_description || 'Tidak tersedia',
      windSpeed: "10 km/h", // Default value as not provided by API
      rainChance: `${Math.round(current_weather.precipitation_sum || 0)}%`
    };
  } catch (error) {
    console.error('Error transforming weather data:', error);
    return null;
  }
};

// Transform predictions data for calendar
export const transformPredictionsData = (apiData) => {
  if (!apiData || !apiData.predictions) {
    console.error('Invalid predictions data structure:', apiData);
    return {};
  }

  try {
    const weatherMap = {};
    apiData.predictions.forEach(prediction => {
      if (!prediction.date) return;
      
      const date = formatDateForDisplay(prediction.date);
      weatherMap[date] = {
        temp: `${Math.round(prediction.temperature_2m_max)}°`,
        description: prediction.weather_description || 'Tidak tersedia',
        windSpeed: "10 km/h", // Default value
        rainChance: `${Math.round(prediction.precipitation_sum || 0)}%`
      };
    });

    return weatherMap;
  } catch (error) {
    console.error('Error transforming predictions data:', error);
    return {};
  }
};

// Transform hourly predictions data
export const transformHourlyPredictionsData = (apiData) => {
  if (!apiData || !apiData.predictions) {
    console.error('Invalid hourly predictions data structure:', apiData);
    return {};
  }

  try {
    const hourlyWeatherMap = {};
    apiData.predictions.forEach(prediction => {
      if (!prediction.date || !prediction.hour) return;
      
      const dateTime = `${prediction.date} ${prediction.hour}:00`;
      hourlyWeatherMap[dateTime] = {
        temp: `${Math.round(prediction.temperature_2m || 0)}°`,
        description: prediction.weather_description || 'Tidak tersedia',
        windSpeed: `${Math.round(prediction.windspeed_10m || 0)} km/h`,
        rainChance: `${Math.round(prediction.precipitation_probability || 0)}%`
      };
    });

    return hourlyWeatherMap;
  } catch (error) {
    console.error('Error transforming hourly predictions data:', error);
    return {};
  }
}; 