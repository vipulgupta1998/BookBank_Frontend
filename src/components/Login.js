import React from 'react'
import {Link, useNavigate} from 'react-router-dom';

export default function Login(props) {
  const port = process.env.REACT_APP_PORT;
  const [formData,setFormData] = React.useState({
    email:"",
    password:"",
  })

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  let navigate = useNavigate();
  const handleSubmit = async(event)=>{
    event.preventDefault();
    const response = await fetch(`${port}/auth/login`,{
      method : "POST",
      headers : {
         'content-type':'application/json'            
      },
      body : JSON.stringify({email : formData.email,password : formData.password})
    });
    const json = await response.json();
    if(json.success){
      localStorage.setItem('token' , json.authtoken);
      props.showAlert("Succesfully Logged in","success");
      navigate("/");
    }
    else{
      props.showAlert("Invalid Credentials","danger");
    }
  }

  function handleChange(event){
    const {name,value} = event.target;
    setFormData((prev)=>{
      return{
         ...prev,
         [name]:value
      }
    })
 }

 async function handleForgotPassword(event){
  if(isValidEmail(formData.email)){
    const response = await fetch(`${port}/auth/RequestPasswordChange`,{
      method : "POST",
      headers : {
         'content-type':'application/json'            
      },
      body : JSON.stringify({email : formData.email})
    });
    const json = await response.json();
    if(json.success){
      props.showAlert(json.message,"success");
    }
    else{
      props.showAlert(json.message,"danger");
    }
  }else{
    props.showAlert("Please enter appropriate email","danger");
  }
 }

 console.log(isValidEmail(formData.email));
  return (
    <div className="mx-auto max-w-screen-md mt-16 pt-16">
    <div className="bg-white shadow-md rounded-lg overflow-hidden" style={{ backgroundColor: 'rgba(243, 242, 243, 0.9)' }}>
      <h4 className="text-primary font-semibold text-2xl text-center text-white py-4" style={{ backgroundColor: "rgba(59, 64, 82, 0.8)" }}>Login Page</h4>
      <form onSubmit={handleSubmit} className="p-6">
        <div className="mb-6">
          <label htmlFor="email" className="block text-lg font-medium text-gray-700">Email Address</label>
          <input
            type="email"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
            onChange={handleChange}
            value={formData.email}
            name="email"
          />
        </div>
  
        <div className="mb-6">
          <label htmlFor="password" className="block text-lg font-medium text-gray-700">Password</label>
          <input
            type="password"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
            onChange={handleChange}
            value={formData.password}
            name="password"
          />
        </div>
  
        <button type="submit" className="my-3 w-full py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-300 ease-in-out transform hover:scale-105" style={{backgroundColor:"#8293f5"}}>
          Submit
        </button>
      </form>
      <button
        className="my-2 mx-4 px-4 py-2 bg-gray-300 text-gray-800 font-semibold rounded-lg shadow-md hover:bg-gray-400 hover:shadow-lg transform hover:scale-105 transition duration-200 ease-in-out"
        style={{ float: 'right' }}
        onClick={handleForgotPassword}
      >
      Forgot Password ?
     </button>
    </div>
  </div>
  
  )
}
