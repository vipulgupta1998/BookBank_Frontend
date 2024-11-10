import React, { useEffect, useState } from 'react';
import UserBookCard from '../helper/UserBookCard';
import RequestedBookCard from '../helper/RequestedBookCard';

export default function UserBook(props) {
  const [books,setBooks] = React.useState([]);
  const host = process.env.REACT_APP_PORT;

  useEffect(() => {
    const fetchUserBooks = async () => {
      try {
        const response = await fetch(`${host}/book/user/temp`, {
          method: "GET",
          headers: {
            'Content-Type': "application/json",
            "auth-token": localStorage.getItem('token'),
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch book details");
        }
        const json = await response.json();
        setBooks(json);
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    };
    fetchUserBooks();
  }, [host]);

  return (
    <>
      <div>
        {books && books.length > 0 ? (
          books.map((book,index) => (
            <RequestedBookCard
            key={index}
            imageUrl={book.coverImageUrl}
            title={book.title}
            description={book.description}
            author={book.author}
            condition={book.condition}
            id = {book._id}
          />
          ))
        ) : (
          <p>No books found.</p>
        )}
      </div>
    </>
  )
}
