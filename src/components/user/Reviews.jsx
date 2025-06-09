import React from "react";
import { FaStar, FaRegStar, FaStarHalfAlt, FaUser, FaCalendarAlt } from "react-icons/fa";

// Helper function to format date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Component to render star ratings
const StarRating = ({ rating }) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  
  // Add full stars
  for (let i = 0; i < fullStars; i++) {
    stars.push(<FaStar key={`full-${i}`} className="text-yellow-400" />);
  }
  
  // Add half star if needed
  if (hasHalfStar) {
    stars.push(<FaStarHalfAlt key="half" className="text-yellow-400" />);
  }
  
  // Add empty stars
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<FaRegStar key={`empty-${i}`} className="text-yellow-400" />);
  }
  
  return <div className="flex">{stars}</div>;
};

const Reviews = ({ reviews = [], averageRating = 0, totalReviews = 0 }) => {
  if (!reviews || reviews.length === 0) {
    return (
      <div className="mt-4 text-center p-6 bg-gray-50 rounded-lg">
        <p className="text-gray-500">Belum ada ulasan untuk destinasi ini.</p>
      </div>
    );
  }

  return (
    <div className="mt-4 space-y-6">
      {/* Summary section */}
      <div className="bg-gray-50 p-4 rounded-lg flex flex-col md:flex-row items-center justify-between">
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-xl font-bold">{averageRating.toFixed(1)}</h3>
          <div className="flex items-center mt-1">
            <StarRating rating={averageRating} />
            <span className="ml-2 text-sm text-gray-500">
              ({totalReviews} ulasan)
            </span>
          </div>
        </div>
        <div className="mt-4 md:mt-0">
          <button className="bg-warm-orange text-white px-4 py-2 rounded-md hover:bg-hover-orange transition">
            Tulis Ulasan
          </button>
        </div>
      </div>

      {/* Reviews list */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review._id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
            <div className="flex justify-between items-start">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                  <FaUser className="text-gray-500" />
                </div>
                <div className="ml-3">
                  <h4 className="font-medium">{review.user?.name || "Pengguna"}</h4>
                  <div className="flex items-center mt-1">
                    <StarRating rating={review.rating} />
                  </div>
                </div>
              </div>
              <div className="text-sm text-gray-500 flex items-center">
                <FaCalendarAlt className="mr-1" />
                {formatDate(review.createdAt)}
              </div>
            </div>
            
            <div className="mt-3">
              <p className="text-gray-700">{review.comment}</p>
            </div>
            
            {/* Review photos if available */}
            {review.photos && review.photos.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {review.photos.map((photo, idx) => (
                  <img
                    key={idx}
                    src={photo}
                    alt={`Review photo ${idx + 1}`}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
