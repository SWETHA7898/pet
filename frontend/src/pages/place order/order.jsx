import "./order.css";
import { StoreContext } from "../../context/store";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function PlaceOrder() {
    const navigate = useNavigate();
    
    const authToken = localStorage.getItem("authToken");
    const { amount, cartitem, setCart,contextvalue } = useContext(StoreContext);
    const [orderData, setOrderData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
        phone: ""
    });
     
    useEffect(()=>{
        if(!authToken){
            navigate("/cart")
        }
        else if(amount()===0){
            navigate("/cart")
        }

    },[authToken])



    // Handle input changes
    const handleChange = (e) => {
        setOrderData({ ...orderData, [e.target.name]: e.target.value });
    };

    // Submit order function
    const handleOrderSubmit = async (e) => {
        e.preventDefault();

        if (!authToken) {
            toast.error("You must be logged in to place an order.");
            return;
        }
        if (Object.keys(cartitem).length === 0) {
            toast.error("Your cart is empty.");
            return;
        }

        // Construct order items without modifying original cartitem
        let orderItems = [];
        Object.keys(cartitem).forEach((productId) => {
            if (cartitem[productId] > 0) {
                orderItems.push({
                    productId,
                    quantity: cartitem[productId],
                });
            }
        });
        console.log(orderItems)

       
        const orderPayload = {
            items: orderItems,
            firstName:orderData.firstName,
            lastName:orderData.lastName,
            amount: amount(),
            address: {
                street: orderData.street,
                city: orderData.city,
                state: orderData.state,
                zipCode: orderData.zipCode,
                country: orderData.country
            },
            phone: orderData.phone
        };

        try {
            const response = await fetch("https://pet-backend-tdmx.onrender.com/orders/placeorder", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": authToken
                },
                body: JSON.stringify(orderPayload)
            });

            const data = await response.json();
            console.log("Order Response:", data);

            if (response.ok) {
                razorPayment(data.order);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error("Error placing order:", error);
            toast.error("Something went wrong.");
        }
    };

    const razorPayment = (order) => {
        const authToken = localStorage.getItem("authToken"); // Fetch auth-token inside function
    
        if (!authToken) {
            toast.error("Authentication token not found. Please log in again.");
            return;
        }
    
        const options = {
            key: "rzp_test_SmT3UOUcpyxz3T",
            amount: order.amount * 100,
            currency: order.currency,
            description: "Test payment",
            order_id: order.id,
            handler: async function (response) {
                console.log("Received Payment Response:", response); // Debugging
    
                try {
                    const verifyResponse = await axios.post(
                        "https://pet-backend-tdmx.onrender.com/orders/verify",
                        {
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_signature: response.razorpay_signature,
                        },
                        {
                            headers: {
                                "Content-Type": "application/json",
                                "auth-token": authToken, // Include token in headers
                            },
                        }
                    );
    
                    console.log("Verification Response:", verifyResponse.data);
    
                    if (verifyResponse.data.success) {
                        toast.success("Payment verified successfully!");
                        setCart({});
                        navigate("/");
                    } else {
                        toast.error("Payment verification failed!");
                    }
                } catch (error) {
                    console.error("Error verifying payment:", error.response?.data || error);
                    toast.error("Payment verification error.");
                }
            },
        };
    
        const razorpop = new window.Razorpay(options);
        razorpop.open();
    };
    
    
    
    return (
        <form className="placeorder" onSubmit={handleOrderSubmit}>
            <div className="placeorder-left">
                <p className="title">Delivery Information</p>
                <div className="multi-fields">
                    <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} required />
                    <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} required />
                </div>
                <input type="email" name="email" placeholder="Enter your mail" onChange={handleChange} required />
                <input type="text" name="street" placeholder="Street" onChange={handleChange} required />
                <div className="multi-fields">
                    <input type="text" name="city" placeholder="City" onChange={handleChange} required />
                    <input type="text" name="state" placeholder="State" onChange={handleChange} required />
                </div>
                <div className="multi-fields">
                    <input type="text" name="zipCode" placeholder="Zip Code" onChange={handleChange} required />
                    <input type="text" name="country" placeholder="Country" onChange={handleChange} required />
                </div>
                <input type="text" name="phone" placeholder="Phone" onChange={handleChange} required />
            </div>

            <div className="placeorder-right">
                <div className="items-total">
                    <h1> Cart Total</h1>
                    <div>
                        <div className="items">
                            <p>Subtotal</p>
                            <p>{`\u20B9${amount()}`}</p>
                        </div>
                        <hr />
                        <div className="items">
                            <p>Shipping Fee</p>
                            <p>Free</p>
                        </div>
                        <hr />
                        <div className="items">
                            <p>Total</p>
                            <p>{`\u20B9${amount()}`}</p>
                        </div>
                    </div>
                    <button type="submit">Proceed to Payment</button>
                </div>
            </div>
        </form>
    );
}

export default PlaceOrder;
