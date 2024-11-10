import React, { useState, useContext } from 'react';
import bookContext from '../context/document/bookContext';
import BookCard from './helper/bookCard';


export default function BookSearch() {
  const [searchCategory, setSearchCategory] = useState("title");
  const [searchQuery, setSearchQuery] = useState("");


  const context = useContext(bookContext);
  const {searchBook,getBookSearch} = context;

  const handleSearch = () => {
     getBookSearch(searchCategory,searchQuery);
  };

  return (
    <div className="flex items-center justify-center mt-16 pt-16 flex-col">
      <div className="flex space-x-2">
        <select
          value={searchCategory}
          onChange={(e) => setSearchCategory(e.target.value)}
          className="p-2 rounded-l-lg border border-gray-300 bg-white text-gray-700 focus:outline-none"
        >
          <option value="title">Title</option>
          <option value="author">Author</option>
          <option value="genre">Genre</option>
        </select>

        <input
          type="text"
          placeholder={`Search by ${searchCategory}`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border-t border-b border-gray-300 flex-grow focus:outline-none"
        />

        <button
          onClick={handleSearch}
          className="p-2 bg-blue-500 text-white font-semibold rounded-r-lg hover:bg-blue-600 transition-colors"
        >
          Search
        </button>
      </div>

      <div className="mt-8 pt-8">
      <div className='flex items-center space-y-4 mt-8' style={styles.grid}>
        {searchBook.map((book, index) => (
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
}
