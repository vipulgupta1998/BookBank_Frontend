import React from 'react'
import { useLocation,useNavigate } from 'react-router-dom'

export default function ResetPassword(props) {
   const location = useLocation();
   const queryParams = new URLSearchParams(location.search);
   const resetToken = queryParams.get('token'); 
   const userId = queryParams.get('id');    

   const port = process.env.REACT_APP_PORT;
  const [formData,setFormData] = React.useState({
    password:"",
    confirmPassword:"",
  })

  let navigate = useNavigate();
  const handleSubmit = async(event)=>{
    if (formData.password === formData.currentPassword) {
        props.showAlert("Password doesnot match please try again", "danger");
        return;
    }
    event.preventDefault();
    const response = await fetch(`${port}/auth/ResetPassword`,{
      method : "POST",
      headers : {
         'content-type':'application/json'            
      },
      body : JSON.stringify({userId : userId,password : formData.password,token:resetToken})
    });
    const json = await response.json();
    console.log(json);
    if(json.success){
      localStorage.setItem('token' , json.authtoken);
      props.showAlert("Succesfully Changed password","success");
      navigate("/");
    }
    else{
      props.showAlert("Invalid Password","danger");
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

  return (
    <div className="mx-auto max-w-screen-md mt-16 pt-16">
    <div className="bg-white shadow-md rounded-lg overflow-hidden" style={{ backgroundColor: 'rgba(243, 242, 243, 0.9)' }}>
      <h4 className="text-primary font-semibold text-2xl text-center text-white py-4" style={{ backgroundColor: "rgba(59, 64, 82, 0.8)" }}>Reset Password</h4>
      <form onSubmit={handleSubmit} className="p-6">
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
  
        <div className="mb-6">
          <label htmlFor="Confirmpassword" className="block text-lg font-medium text-gray-700">Confirm Password</label>
          <input
            type="password"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
            onChange={handleChange}
            value={formData.confirmPassword}
            name="confirmPassword"
          />
        </div>
  
        <button type="submit" className="my-3 w-full py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-300 ease-in-out transform hover:scale-105" style={{backgroundColor:"#8293f5"}}>
          Change Password
        </button>
      </form>
    </div>
  </div>
  )
}
