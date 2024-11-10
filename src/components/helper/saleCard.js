import React, { useState } from 'react';

const SaleCard = ({ imageUrl, title, description, author, condition, bookId, showAlert, requestedBy }) => {
  const [isPressed, setIsPressed] = useState(false);
  const host = process.env.REACT_APP_PORT;

  const handleClick = async () => {
    const response = await fetch(`${host}/book/requestBook`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),
      },
      body: JSON.stringify({ bookId }),
    });
    const json = await response.json();
    if(json.success){
        showAlert("Book requested successfully","success");
    }
    else showAlert(json.message, 'danger');
  };
  
  return (
    <div className="bg-blue-900 bg-opacity-80 rounded-lg shadow-lg w-56 h-96 m-4 overflow-hidden text-white font-sans flex flex-col transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
      <img src={imageUrl} alt={title} className="w-full h-44 object-cover" />
      <div className="p-4 flex flex-col justify-between h-full">
        <h3 className="text-lg font-semibold truncate">{title}</h3>
        <p className="text-sm mb-2 truncate">{description}</p>
        <p className="text-xs mb-1 truncate">Author: {author}</p>
        <p className="text-xs font-bold truncate">Condition: {condition}</p>
        <button
          onClick={handleClick}
          onMouseDown={() => setIsPressed(true)}
          onMouseUp={() => setIsPressed(false)}
          onMouseLeave={() => setIsPressed(false)}
          className={`mt-4 px-4 py-2 text-sm font-semibold text-blue-900 bg-white rounded-full transition-transform duration-100 ${
            isPressed ? 'scale-95 bg-blue-300' : 'hover:bg-gray-200'
          }`}
        >
        {(requestedBy==null)?"Request":"Unavailabale"}
        </button>
      </div>
    </div>
  );
};


export default SaleCard;
