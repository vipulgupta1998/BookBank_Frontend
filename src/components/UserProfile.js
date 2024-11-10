import React, { useEffect, useState } from 'react';
import UserBook from './userContent/UserBook';
import RequestedBook from './userContent/RequestedBook';
import AddBook from './userContent/AddBook';
import Requests from './userContent/Requests';

export default function UserProfile(props) {
  const [selectedOption, setSelectedOption] = useState("Your Books");
  const [user,setUser] = useState({});
  const host = process.env.REACT_APP_PORT;

  useEffect(() => {
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
    fetchUserDetails();
  }, [host]);

  
  const renderContent = () => {
    switch (selectedOption) {
      case "Your Books":
        return <UserBook userId={user._id} showAlert = {props.showAlert}/>
      case "Requested Books":
        return <RequestedBook userId={user._id} showAlert = {props.showAlert}/>
      case "Add Book":
        return <AddBook userId={user._id} showAlert = {props.showAlert}/>
      case "Requests":
        return <Requests userId={user._id} showAlert = {props.showAlert}/>;
      default:
        return <div>Select an option from the menu.</div>;
    }
  };
 

  return (
    <div className="flex flex-col items-center p-4 pt-16 mt-16">
      {/* Greeting */}
      <h1 className="text-2xl font-bold mb-4">Hello, {user.name}!</h1>
      
      {/* Menu Bar */}
      <div className="flex space-x-4 mb-8">
        {["Your Books", "Requested Books", "Add Book", "Requests"].map((option) => (
          <button
            key={option}
            onClick={() => setSelectedOption(option)}
            className={`px-4 py-2 rounded-md ${
              selectedOption === option ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
            } transition-colors duration-200 hover:bg-blue-400`}
          >
            {option}
          </button>
        ))}
      </div>

      {/* Render content based on selected option */}
      <div className="w-full max-w-md bg-white p-6 rounded-md shadow-md">
        {renderContent()}
      </div>
    </div>
  );
}
