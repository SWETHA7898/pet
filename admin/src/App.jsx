import Navbar from "./components/navbar/navbar"
import Admin from "./pages/admin/admin"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from "./components/login/login";
import { useEffect, useState } from "react";



const App = ()=>{
  const[token,settoken]=useState(localStorage.getItem("token")?localStorage.getItem("token"):"")

  useEffect(()=>{
    localStorage.setItem("token",token)
  },[token])
  return(
    <div>
      {token===""?
      <Login settoken={settoken}></Login>:
      <> <ToastContainer/>
         <Navbar settoken={settoken}></Navbar>
         <Admin settoken={token}></Admin></>
      }
    
         
    </div>
  )
} 
export default App







