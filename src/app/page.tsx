"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      const response = await axios.get(`https://picsum.photos/v2/list?page=${page}&limit=12`);
      setImages(prevImages => [...prevImages, ...response.data]);
    };
    fetchImages();
  }, [page]);

  const loadMoreImages = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="bg-gray-900 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold">MyGallery</div>
          <div className="hidden md:flex space-x-6">
            <a href="#" className="hover:text-gray-400">Home</a>
            <a href="#" className="hover:text-gray-400">Gallery</a>
            <a href="#" className="hover:text-gray-400">About</a>
            <a href="#" className="hover:text-gray-400">Contact</a>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-gray-800">
            <a href="#" className="block px-4 py-2 hover:bg-gray-700">Home</a>
            <a href="#" className="block px-4 py-2 hover:bg-gray-700">Gallery</a>
            <a href="#" className="block px-4 py-2 hover:bg-gray-700">About</a>
            <a href="#" className="block px-4 py-2 hover:bg-gray-700">Contact</a>
          </div>
        )}
      </nav>

      {/* Header Image */}
      <div className="relative h-64 md:h-96">
        <img
          src="https://picsum.photos/1600/400"
          alt="Header Image"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-black opacity-50 flex items-center justify-center">
          <h1 className="text-white text-4xl md:text-6xl font-bold">Welcome to MyGallery</h1>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="container mx-auto p-6">
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {images.map((image, index) => {
            // Assign different classes for different image sizes on larger screens
            const gridClass = 
              index % 7 === 0 ? "sm:col-span-2 sm:row-span-2" : // Larger image on larger screens
              index % 5 === 0 ? "sm:col-span-2 sm:row-span-1" : // Medium image on larger screens
              "sm:col-span-1 sm:row-span-1";                    // Standard image on larger screens
              
            return (
              <div 
                key={image.id} 
                className={`rounded-lg overflow-hidden shadow-lg transform transition-transform duration-500 ease-in-out hover:scale-105 ${gridClass}`}
              >
                <img 
                  src={image.download_url} 
                  alt={image.author} 
                  className="w-full h-full object-cover" 
                />
                <div className="p-4 bg-gray-900 text-white">
                  <h2 className="font-semibold text-lg truncate">{image.author}</h2>
                  <p className="text-sm opacity-75">Image ID: {image.id}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="text-center mt-12">
          <button
            onClick={loadMoreImages}
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-10 rounded-full shadow-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105"
          >
            Load More
          </button>
        </div>
      </div>
    </div>
  );
}
