import { useState, useEffect } from 'react';
import axios from 'axios';

// Create a mutable array that will be updated with the hotel data
export let itemHotel = [];

// Function to fetch and update the hotel data
const fetchHotels = async () => {
  try {
    const response = await axios.get('http://localhost:3000/hotels');
    if (response.data.success) {
      const transformedHotels = [];
      
      // Process each hotel and fetch its ratings
      for (const hotel of response.data.data) {
        // Fetch ratings for this hotel
        let rating = 0;
        let reviewCount = 0;
        
        try {
          const reviewResponse = await axios.get(`http://localhost:3000/reviews/hotel/${hotel._id}`);
          if (reviewResponse.data.success) {
            rating = reviewResponse.data.data.averageRating || 0;
            reviewCount = reviewResponse.data.data.totalReviews || 0;
          }
        } catch (reviewErr) {
          console.error(`Error fetching reviews for hotel ${hotel._id}:`, reviewErr);
          rating = 0;
          reviewCount = 0;
        }

        // Get room information
        let minPrice = Infinity;
        let maxPrice = 0;
        let rooms = [];
        
        try {
          const roomResponse = await axios.get(`http://localhost:3000/admin/hotel/${hotel._id}/rooms`);
          if (roomResponse.data.success && roomResponse.data.data.length > 0) {
            rooms = roomResponse.data.data;
            rooms.forEach(room => {
              if (room.price < minPrice) minPrice = room.price;
              if (room.price > maxPrice) maxPrice = room.price;
            });
          }
        } catch (roomErr) {
          console.error(`Error fetching rooms for hotel ${hotel._id}:`, roomErr);
        }

        transformedHotels.push({
          id: hotel._id,
          title: hotel.name || hotel.nama,
          description: hotel.description || hotel.detail || hotel.deskripsi,
          image: hotel.images && hotel.images.length > 0
            ? `http://localhost:3000${hotel.images[0]}`
            : `http://localhost:3000/uploads/default-hotel.jpg`,
          rating: rating,
          reviewCount: reviewCount,
          lokasi: hotel.location 
            ? `${hotel.location.address}, ${hotel.location.city}, ${hotel.location.province}`
            : hotel.alamat || "Lokasi tidak tersedia",
          price: minPrice !== Infinity 
            ? `Rp ${minPrice.toLocaleString()} - Rp ${maxPrice.toLocaleString()}`
            : "Harga tidak tersedia",
          rooms: rooms
        });
      }
      
      // Update the exported array
      itemHotel = transformedHotels;
    }
  } catch (err) {
    console.error("Error fetching hotels:", err);
  }
};

// Fetch hotels immediately
fetchHotels();
