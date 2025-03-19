import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assests } from "../../assets/assets/assests";
import "./Navbar.css";
import { StoreContext } from "../../context/store";
import auth from "../../config/firebase";
import { signOut } from "firebase/auth";

function Navbar() {
    const navigate = useNavigate();
    const [menu, setMenu] = useState("");
    const { totalcartitems } = useContext(StoreContext);
    const [log, setLog] = useState(false);
    const menuref = useRef();

 

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                console.log("✅ User logged in");
                setLog(true);
            } else {
                console.log("❌ User logged out");
                setLog(false);
            }
        });
    }, []);

    function Logout() {
        signOut(auth).then(() => {
            localStorage.removeItem("authToken");
            console.log("🔴 User logged out, authToken removed");
            window.location.replace("/");
        }).catch((error) => {
            console.error("Logout error:", error);
        });
    }

    const dropdown_toggle = (e) => {
        menuref.current.classList.toggle("navmenu-visible");
        e.target.classList.toggle("open");
    };

    return (
        <div className="navbar">
            <div className="header">
                Paws<span>&Co</span>
                <img onClick={dropdown_toggle} src={assests.nav} alt="Menu" className="nav-dropdown" />
            </div>

            <ul className="navmenu" ref={menuref}>
                {["home", "dogs", "cats", "avians", "fishes"].map((category) => (
                    <li key={category} className={menu === category ? "active" : ""} onClick={() => { setMenu(category); window.scroll(0, 0); }}>
                        <Link to={`/${category === "home" ? "" : category}`}>{category.charAt(0).toUpperCase() + category.slice(1)}</Link>
                    </li>
                ))}
            </ul>

            <div className="navright">
                <div className="cart">
                    <Link to="/cart">
                        <i className="fa-solid fa-cart-shopping" style={{ fontSize: "25px" }}></i>
                    </Link>
                    <div className="dot">{totalcartitems()}</div>
                </div>

                {log ? (
                    <div className="navbar-profile">
                        <i class="fa-solid fa-user" style={{color:"#A8DADC",fontSize:"28px"}}></i>
                        <ul className="nav-profile-dropdown">
                            <li>
                            <i class="fa-solid fa-bag-shopping" style={{fontSize:"20px",color:"black"}}></i>
                                <Link to="/userorder" style={{color:""}}>My Orders</Link>
                            </li>
                            <hr />
                            <li onClick={Logout}>
                            <i class="fa-solid fa-arrow-right-from-bracket" style={{color:"black"}}></i>
                                Logout
                            </li>
                        </ul>
                    </div>
                ) : (
                    <button onClick={() => navigate("/login")}>Login</button>
                )}
            </div>
        </div>
    );
}

export default Navbar;
