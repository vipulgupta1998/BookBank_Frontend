import React from 'react';

const BookCard = ({ imageUrl, title, description, author, condition }) => {
  return (
    <div className="bg-blue-900 bg-opacity-80 rounded-lg shadow-lg w-56 h-80 m-4 overflow-hidden text-white font-sans flex flex-col transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
      <img src={imageUrl} alt={title} className="w-full h-44 object-cover" />
      <div className="p-4 flex flex-col justify-between h-full">
        <h3 className="text-lg font-semibold truncate">{title}</h3>
        <p className="text-sm mb-2 truncate">{description}</p>
        <p className="text-xs mb-1 truncate">Author: {author}</p>
        <p className="text-xs font-bold truncate">Condition: {condition}</p>
      </div>
    </div>
  );
};

export default BookCard;
