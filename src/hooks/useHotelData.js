import { useState, useEffect } from 'react';
import axios from 'axios';

const useHotelData = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/hotels');
        
        if (response.data.success) {
          const transformedHotels = await Promise.all(
            response.data.data.map(async (hotel) => {
              // Fetch ratings for this hotel
              let rating = 0;
              let reviewCount = 0;
              
              try {
                const reviewResponse = await axios.get(`http://localhost:3000/reviews/hotel/${hotel._id}`);
                if (reviewResponse.data.success) {
                  rating = reviewResponse.data.data.averageRating || 0;
                  reviewCount = reviewResponse.data.data.totalReviews || 0;
                }
              } catch (err) {
                console.error('Error fetching hotel reviews:', err);
              }

              return {
                id: hotel._id,
                name: hotel.name,
                region: `${hotel.location.city}, ${hotel.location.province}`,
                image: hotel.images && hotel.images.length > 0
                  ? `http://localhost:3000${hotel.images[0]}`
                  : 'http://localhost:3000/uploads/default-hotel.jpg',
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