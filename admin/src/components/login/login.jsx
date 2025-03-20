import { useState } from "react"
import "./login.css"
import axios from "axios"
import { toast } from "react-toastify"

function Login({settoken}){


    const[email,setemail]=useState("")
    const[pass,setpass]=useState("")


    const onSubmit= async (e)=>{
        try{
            e.preventDefault()

            const response=await axios.post("https://pet-pavu.onrender.com/users/admin",{email,pass})
            console.log(response.data.token)
            if(response.data.success){
                settoken(response.data.token)
                toast.success("Logined Successfully")

            }
            else{
                toast.error(response.data.message)
            }
           

        }
        catch(error){
              console.log("error",error.message)
              toast.error(error.message)
        }

    }
    return(
        <div className="login">
            <div className="com">
                <h1>Admin Panel</h1>
                <form onSubmit={onSubmit}>
                    <input type="email" placeholder="Enter Email" value={email} onChange={(e)=>setemail(e.target.value)} required></input>
                    <input type="password" placeholder="Enter Password " value={pass}onChange={(e)=>setpass(e.target.value)} required></input>
                    <button className="loginbtn">Login</button>
                </form>
            </div>

        </div>
    )
}
export default Login
