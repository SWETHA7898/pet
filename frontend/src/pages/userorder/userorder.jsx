import { useContext, useEffect, useState } from "react"
import "./userorder.css"
import axios from "axios";
import { StoreContext } from "../../context/store.jsx";

function UserOrder(){
    const [data, setOrders] = useState([]);
    const { contextvalue } = useContext(StoreContext);
    const authToken = localStorage.getItem("authToken");
    const fetchOrders = async () => {
        try {
            const response = await axios.post(
                "http://localhost:3000/orders/userorder",
                {},
                {
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": authToken,
                    },
                }
            );

            setOrders(response.data.data);
            console.log("User Orders:", response.data.data);
        } catch (error) {
            console.error("Error fetching user orders:", error);
        }
    };


    useEffect(() => {
       
        if (authToken) {
            fetchOrders();
        }
    }, [authToken]);

    return (
        <div className="user-orders">
        <h2>My Orders</h2>
        <div className="orders-container">
            {data.length > 0 ? (
                data.map((order, orderIndex) => (
                    <div key={orderIndex} className="order-card">
                        <div className="order-status">
                        <h3>Order #{orderIndex + 1}</h3>
                        <p><span>&#x25cf;</span><b>{order.status}</b></p>
                            </div>
                       
                        <div className="order-items">
                            {order.items.map((item, itemIndex) => {
                                const product = contextvalue.find(p => String(p.id) === String(item.productId));

                                return (
                                    <div key={itemIndex} className="order-item">
                                        {product ? (
                                            <>
                                                <img src={product.image} alt={product.name} className="product-image" />
                                                <div className="order-details">
                                                    <p className="product-name">{product.name}</p>
                                                    <p>Quantity: <span>{item.quantity}</span></p>
                                                    <p>Price: <span>₹{product.newprice}</span></p>
                                                </div>
                                            </>
                                        ) : (
                                            <p>Unknown Product x {item.quantity}</p>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                        <button className="track-order" onClick={fetchOrders} >Track Order</button>
                    </div>
                ))
            ) : (
                <p className="no-orders">No orders found.</p>
            )}
        </div>
    </div>
);
    
}



export default UserOrder