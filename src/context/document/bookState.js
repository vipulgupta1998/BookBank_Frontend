import React from "react";
import bookContext from "./bookContext";

const BookState = (props)=>{
   const host = process.env.REACT_APP_PORT;
   const [books,setBooks] = React.useState([]);
   const [searchBook,setSearch] = React.useState([]);

/************************** Get all books ******************/
   const getBooks = async ()=>{
    const response = await fetch(`${host}/book/findAllBooks`,{
     method : "GET",
      headers:{
        'Content-Type':"application/json",
        "auth-token" : localStorage.getItem('token')
      }
    })
    const json = await response.json();
    console.log("all the books are " + json);
    setBooks(json);
}


/************************ Get book search *******************/
const getBookSearch = async (tag,query)=>{
    const response = await fetch(`${host}/book/SearchBook`,{
        method : "POST",
        headers:{
            'Content-Type':"application/json",
            "auth-token" : localStorage.getItem('token')
            },
            body:JSON.stringify({tag,query})
        }
        )
        const json = await response.json();
        setSearch(json);
    }

            
 return(
    <bookContext.Provider value = {{books,getBooks,searchBook,getBookSearch}}>
    {props.children}
    </bookContext.Provider>
 )
}
export default BookState;