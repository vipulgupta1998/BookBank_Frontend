import React from 'react';

function RequestCard({ request, onApprove, onDisapprove }) {
  return (
    <div className="flex border border-gray-300 rounded-lg p-4 mb-4 max-w-md">
      {/* Book Cover Image */}
      <div className="flex-shrink-0">
        <img
          src={request.bookId.coverImageUrl}
          alt={request.bookId.title}
          className="w-24 h-36 object-cover rounded-md"
        />
      </div>

      {/* Request Details */}
      <div className="ml-4 flex flex-col justify-between w-full">
        <div>
          <h3 className="text-lg font-semibold">{request.bookId.title}</h3>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Requested by:</span> {request.requestedBy.name}
          </p>
        </div>

        {/* Approve and Disapprove Buttons */}
        {!request.completed&&<div className="flex gap-2 mt-4">    
          <button
            onClick={() => onApprove(request.bookId)}
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          >
            Approve
          </button>
          <button
            onClick={() => onDisapprove(request.bookId)}
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
          >
            Disapprove
          </button>
        </div>}

        {request.completed && <p>completed</p>}
      </div>
    </div>
  );
}

export default RequestCard;
