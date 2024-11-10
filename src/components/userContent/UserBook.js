import React, { useEffect, useState } from 'react';
import UserBookCard from '../helper/UserBookCard';


export default function UserBook(props) {
  const [books,setBooks] = React.useState([]);
  const host = process.env.REACT_APP_PORT;

  const [triggerFetch, setTriggerFetch] = useState(false);


  useEffect(() => {
    const fetchUserBooks = async () => {
      try {
        const response = await fetch(`${host}/book/user/all`, {
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
  }, [triggerFetch]);


  const onListClick = async(bookId)=>{
    const response = await fetch(`${host}/book/listBook/`,{
    method : "Post",
     headers:{
       'Content-Type':"application/json",
     },
     body:JSON.stringify({bookId})
   })
   const json = await response.json();
   if(json.success){
    setTriggerFetch(prev => !prev);
     props.showAlert("Succesfully changed listing","success");
   }
   else{
     props.showAlert("Some error occured","danger");
   }
 }

 const onDeleteClick = async(bookId)=>{
  const response = await fetch(`${host}/book/deleteBook/${bookId}`,{
    method : "Delete",
     headers:{
       'Content-Type':"application/json",
     },
   })
   const json = await response.json();
   if(json.success){
    setTriggerFetch(prev => !prev);
     props.showAlert("Succesfully Delted","success");
   }
   else{
     props.showAlert("Some error occured","danger");
   }
 }

  return (
    <>
      <div>
        {books && books.length > 0 ? (
          books.map((book,index) => (
            <UserBookCard
            key={index}
            imageUrl={book.coverImageUrl}
            title={book.title}
            description={book.description}
            author={book.author}
            condition={book.condition}
            isListed = {book.status == "available"}
            showAlert = {props.showAlert}
            onListClick={onListClick}
            onDeleteClick={onDeleteClick}
            bookId = {book._id}
          />
          ))
        ) : (
          <p>No books found.</p>
        )}
      </div>
    </>
  )
}
