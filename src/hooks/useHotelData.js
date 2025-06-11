import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config/api';

const useHotelData = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/hotels`);
        
        if (response.data.success) {
          const transformedHotels = await Promise.all(
            response.data.data.map(async (hotel) => {
              // Fetch ratings for this hotel
              let rating = 0;
              let reviewCount = 0;
              
              try {
                const reviewResponse = await axios.get(`${API_BASE_URL}/reviews/hotel/${hotel._id}`);
                if (reviewResponse.data.success) {
                  rating = reviewResponse.data.data.averageRating || 0;
                  reviewCount = reviewResponse.data.data.totalReviews || 0;
                }
              } catch (err) {
                console.error('Error fetching hotel reviews:', err);
              }

              // Handle Cloudinary image URL
              let imageUrl = `${API_BASE_URL}/uploads/default-hotel.jpg`;
              if (hotel.images && hotel.images.length > 0) {
                const imagePath = hotel.images[0];
                if (imagePath.includes('cloudinary.com')) {
                  // If it's already a Cloudinary URL, use it as is
                  imageUrl = imagePath;
                } else if (imagePath.startsWith('http')) {
                  // If it's another full URL, use it as is
                  imageUrl = imagePath;
                } else {
                  // If it's a relative path, construct the full URL
                  imageUrl = `${API_BASE_URL}${imagePath}`;
                }
              }

              return {
                id: hotel._id,
                name: hotel.name,
                region: `${hotel.location.city}, ${hotel.location.province}`,
                image: imageUrl,
                rating: rating,
                reviewCount: reviewCount
              };
            })
          );

          // Sort by rating to get the best hotels
          const sortedHotels = transformedHotels.sort((a, b) => b.rating - a.rating);
          setHotels(sortedHotels.slice(0, 5)); // Get top 5 hotels
          setError(null);
        } else {
          throw new Error(response.data.message || 'Failed to fetch hotels');
        }
      } catch (err) {
        console.error('Error fetching hotels:', err);
        setError(err.message || 'Failed to fetch hotels');
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  return { hotels, loading, error };
};

export default useHotelData; 