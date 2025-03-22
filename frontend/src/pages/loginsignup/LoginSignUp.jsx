import "./LoginSignUp.css";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../../config/firebase";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"
import { toast } from "react-toastify";

function LoginSignUp() {
    const navigate=useNavigate()
    const [details, setDetails] = useState({
        email: "",
        password: "",
        name: "",
    });
    const[error,seterror]=useState("")

    const handleChange = (e) => {
        setDetails((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
       
    };
 
  

    async function handleSignup(e) {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, details.email, details.password);
            const user = userCredential.user;
    
         
            const firebaseToken = await user.getIdToken();
    
           
            const response = await axios.post("https://pet-pavu.onrender.com/users/signup", {
                firebaseToken,
                username: details.name,
                email: details.email
            });
    
            console.log("Signup Response:", response.data);  
            if (response.data.success) {
                if (response.data.token) {
                   
                    localStorage.setItem("authToken", response.data.token);
                    console.log("Token Stored in LocalStorage:", localStorage.getItem("authToken")); 
                } else {
                    console.error("❌ Token is missing in the response!");
                }
    
                toast.success(`Welcome ${details.name}`)
                navigate("/");
            } else {
                toast.success(` ${response.data.error}`)
              
            }
        } catch (error) {
            console.error("Signup Error:", error); 
            if (error.code === "auth/email-already-in-use") {
                seterror("This email is already registered. Please log in instead.");
            } else {
                alert("Signup failed: " + error.message);
            }
        }
    }
     return (
     <div className="loginsignup">
            <div className="container">
                <h1>SignUp</h1>
                <div className="fields">
                   
                        <input
                            type="text"
                            value={details.name}
                            placeholder="Your name"
                            name="name"
                            onChange={handleChange}
                        />
                    
                    <input
                        type="email"
                        value={details.email}
                        name="email"
                        placeholder="Your email"
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        value={details.password}
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                    />
                </div>
                <button onClick={handleSignup}>Continue</button>
                <p className="error">
                    {error}
                </p>
               
                
                    <p className="login">
                        Already have an account?
                        <Link to="/login"><span > Login Here</span></Link>
                    </p>
            
                
            </div>
        </div>
    );
}

export default LoginSignUp;
