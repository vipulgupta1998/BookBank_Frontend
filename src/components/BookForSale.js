import React, { useContext, useEffect } from 'react'
import SaleCard from './helper/saleCard';
import bookContext from '../context/document/bookContext';
import {useNavigate} from 'react-router-dom';

export default function BookForSale(props) {
    const context = useContext(bookContext);
    const {books,getBooks} = context;
    const [user,setUser] = React.useState({});
    const host = process.env.REACT_APP_PORT;

    useEffect(()=>{
      const fetchUserDetails = async () => {
        try {
          const response = await fetch(`${host}/user/userDetails`, {
            method: "GET",
            headers: {
              'Content-Type': "application/json",
              "auth-token": localStorage.getItem('token'),
            },
          });
          if (!response.ok) {
            throw new Error("Failed to fetch user details");
          }
          const json = await response.json();
          setUser(json.user);
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      };
      if(localStorage.getItem("token")){
        getBooks();
        fetchUserDetails();
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
          {books.filter((book) => book.status === "available" && book.owner != user._id).map((book, index) => (
            <SaleCard
              key={index}
              bookId={book._id}
              imageUrl={book.coverImageUrl}
              title={book.title}
              description={book.description}
              author={book.author}
              condition={book.condition}
              showAlert = {props.showAlert}
              requestedBy={book.requestedBy}
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
}
