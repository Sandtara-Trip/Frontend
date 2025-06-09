import { useState, useEffect } from 'react';
import axios from 'axios';

const useDestinationData = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/wisata');
        
        if (response.data.success) {
          const transformedDestinations = await Promise.all(
            response.data.data.map(async (destination) => {
              // Fetch ratings for this destination
              let rating = 0;
              let reviewCount = 0;
              
              try {
                const reviewResponse = await axios.get(`http://localhost:3000/reviews/destination/${destination._id}`);
                if (reviewResponse.data.success) {
                  rating = reviewResponse.data.data.averageRating || 0;
                  reviewCount = reviewResponse.data.data.totalReviews || 0;
                }
              } catch (err) {
                console.error('Error fetching destination reviews:', err);
              }

              return {
                id: destination._id,
                name: destination.name || destination.nama,
                region: `${destination.location?.city || 'Denpasar'}, ${destination.location?.province || 'Bali'}`,
                image: destination.gambar && destination.gambar.length > 0
                  ? `http://localhost:3000${destination.gambar[0]}`
                  : 'http://localhost:3000/uploads/default-destination.jpg',
                rating: rating,
                reviewCount: reviewCount,
                kategori: destination.kategori || 'Alam',
                cuaca: destination.cuaca || 'Panas'
              };
            })
          );

          // Sort by rating to get the best destinations
          const sortedDestinations = transformedDestinations.sort((a, b) => b.rating - a.rating);
          setDestinations(sortedDestinations.slice(0, 5)); // Get top 5 destinations
          setError(null);
        } else {
          throw new Error(response.data.message || 'Failed to fetch destinations');
        }
      } catch (err) {
        console.error('Error fetching destinations:', err);
        setError(err.message || 'Failed to fetch destinations');
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  return { destinations, loading, error };
};

export default useDestinationData; 