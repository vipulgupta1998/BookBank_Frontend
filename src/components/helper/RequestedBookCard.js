import React from 'react';

export default function RequestedBookCard({ imageUrl, title, description, author }) {
  return (
    <div className="m-8 max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl">
      <div className="flex">
        {/* Book Image */}
        <div className="w-1/3">
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover rounded-l-lg" 
          />
        </div>
        
        {/* Book Details */}
        <div className="p-4 w-2/3">
          <h2 className="text-2xl font-semibold mb-2">{title}</h2>
          <p className="text-gray-600 text-sm mb-2">{description}</p>
          <p className="text-gray-500 text-sm">Author: {author}</p>
        </div>
      </div>
    </div>
  );
}
