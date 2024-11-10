import React, { useContext, useEffect } from 'react'
import BookCard from './helper/bookCard';
import bookContext from '../context/document/bookContext';
import {useNavigate} from 'react-router-dom';

export default function BookHome() {
  const context = useContext(bookContext);
  const {books,getBooks} = context;

  useEffect(()=>{
    if(localStorage.getItem("token")){
      getBooks();
    }
    else{
       navigate("/login");
    }
  },[])
  let navigate = useNavigate();
  return (
    <div className="mt-16 pt-16">
      {/* Grid layout for books */}
      <div style={styles.grid}>
        {books.map((book, index) => (
          <BookCard
            key={index}
            imageUrl={book.coverImageUrl}
            title={book.title}
            description={book.description}
            author={book.author}
            condition={book.condition}
          />
        ))}
      </div>
    </div>
  );
}

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '20px',
    justifyItems: 'center', 
  },
};

