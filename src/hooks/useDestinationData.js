import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config/api';

const useDestinationData = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/wisata`);
        
        if (response.data.success) {
          const transformedDestinations = await Promise.all(
            response.data.data.map(async (destination) => {
              // Fetch ratings for this destination
              let rating = 0;
              let reviewCount = 0;
              
              try {
                const reviewResponse = await axios.get(`${API_BASE_URL}/reviews/destination/${destination._id}`);
                if (reviewResponse.data.success) {
                  rating = reviewResponse.data.data.averageRating || 0;
                  reviewCount = reviewResponse.data.data.totalReviews || 0;
                }
              } catch (err) {
                console.error('Error fetching destination reviews:', err);
              }

              // Handle Cloudinary image URL
              let imageUrl = `${API_BASE_URL}/uploads/default-destination.jpg`;
              if (destination.gambar && destination.gambar.length > 0) {
                const imagePath = destination.gambar[0];
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
                id: destination._id,
                name: destination.name || destination.nama,
                region: `${destination.location?.city || 'Denpasar'}, ${destination.location?.province || 'Bali'}`,
                image: imageUrl,
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