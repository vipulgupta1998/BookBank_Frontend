import React, { useState ,useEffect} from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import BookState from './context/document/bookState';
import Loader from './components/Loader';
import Alert from './components/Alert'
import Navbar from './components/Navbar'
import Register from './components/Register'
import Login from './components/Login';
import BookHome from './components/BookHome';
import UserProfile from './components/UserProfile';
import ResetPassword from './components/ResetPassword';
import BookForSale from './components/BookForSale';
import BookSearch from './components/BookSearch';

export default function App() {
  const [alert,setAlert] = React.useState(null);
  const [databaseConnected, setDatabaseConnected] = useState(false);
  const host = process.env.REACT_APP_PORT;
  const showAlert = (message,type)=>{
    setAlert({
      msg:message,
      type:type
    })
    setTimeout(()=>{
      setAlert(null);
    },2500);
  }

  useEffect(() => {
    setTimeout(async() => {
      console.log(`${host}/start`);
      const response = await fetch(`${host}/start`,{
        method : "GET",
        headers:{
          'Content-Type':"application/json",
        }
      })
      const json = await response.json();
      setDatabaseConnected(true);
    }, 2000); 
    return () => {
    };
  }, []);

  if (!databaseConnected) {
    return <Loader />;
  }

  return (
    <BookState>
      <div style={{ position: 'relative' }}>
       <Navbar showAlert = {showAlert} />
       <div style={{ position: 'absolute', right: '2%' }}>
       <Alert alert={alert} />
       </div>
       <Routes>
       <Route exact path="/" element = {<BookHome />} />
       <Route exact path="/login" element = {<Login showAlert = {showAlert} />} />
       <Route exact path="/register" element = {<Register showAlert = {showAlert}/>} />
       <Route exact path="/ResetPassword/:params" element = {<ResetPassword showAlert = {showAlert}/>} />
       <Route exact path="/userProfile" element = {<UserProfile showAlert = {showAlert}/>} />
       <Route exact path="/bookHome" element = {<BookHome showAlert = {showAlert}/>} />
       <Route exact path="/bookForSale" element = {<BookForSale showAlert = {showAlert}/>} />
       <Route exact path="/searchBook" element = {<BookSearch showAlert = {showAlert}/>} />

      </Routes>
      </div>
    </BookState>
  );
}
