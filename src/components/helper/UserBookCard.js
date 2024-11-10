import React from 'react';

export default function UserBookCard({ bookId, imageUrl, title, description, author, isListed, onListClick,onDeleteClick}) {
  const host = process.env.REACT_APP_PORT;
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
          <p className="text-gray-500 text-sm mb-4">Author: {author}</p>
          
          {/* Buttons Section */}
          <div className="flex space-x-4">
            <button 
              onClick={() => onListClick(bookId)}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              {isListed?"Unlist":"List"}
            </button>
            <button 
              onClick={() => onDeleteClick(bookId)}
              className="w-full px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
