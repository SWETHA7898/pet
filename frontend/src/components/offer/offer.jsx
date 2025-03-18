 import "./offer.css"
 import { assests} from "../../assets/assets/assests"
import { Link } from "react-router-dom"
import { useScrollAnimation } from "../../hooks/hooks.js";

function Offer() {
    const [offerRef, isVisible] = useScrollAnimation();

    const handleScroll = () => {
        const section = document.getElementById("new-collection");
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div ref={offerRef} className={`offers ${isVisible ? "fade-in" : "fade"}`}>
            <div className="animated-overlay"></div>
            <div className="offers-left">
                <h1>Exclusive Savings for Your Beloved Pets</h1>
                <p>Top-Selling Products, Specially for Your Pet!</p>
              
                <button onClick={handleScroll}>Start Shopping</button>
                <div className="free">
                <p>Buy 2 Get 1 Free on Treats!</p>
                </div>
               
            </div>
           

        </div>
    );
}

 
 
  export default Offer