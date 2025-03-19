import "./navbar.css"
import navprofile from "../../assets/Admin_Assets/nav-profile.jpg"

const Navbar=({settoken})=>{
    return (
        <div className="navbar">
            <div>
            <div className="header"> 
           
               Paws<span>&Co</span>
               </div>
          
          
            </div>
           <button className="logout" onClick={()=>settoken('')}>Logout</button>

        </div>
    )
}
export default Navbar