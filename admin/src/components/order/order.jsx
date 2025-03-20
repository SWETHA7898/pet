import { useEffect, useState } from "react"
import axios from "axios"
import "./order.css"
import { toast } from "react-toastify"
import { useProducts } from "../context/store";

function Order() {
    const [orders, setOrders] = useState([])
    const { allproducts } = useProducts();

    const fetchOrders = async () => {
        const response = await axios.get("https://pet-backend-tdmx.onrender.com/orders/listorder")
        if (response.data.success) {

            setOrders(response.data.data)
            console.log(response.data.data)
        }
        else {
            toast.error("Error")
        }



    }
    useEffect(() => {
        fetchOrders()

    }, [])

    const status=async(e,orderId)=>{
        console.log(e,orderId)
        const response=await axios.post("https://pet-backend-tdmx.onrender.com/orders/update",{
            orderId,
            status:e.target.value
        })
        if(response.data.success){
            fetchOrders()
        }

    }
    return (
        <div className="order add">
            <h3>OrderPage</h3>
            <div className="orderlist">
                {
                    orders.map((order, index) => {
                        return (
                            <div className="listitems" key={index}>
                                {
                                    order.items.map((items, index) => {
                                        const product = allproducts.find(p => String(p.id) === String(items.productId));
                                        return (
                                            <div key={index} className="order-product">
                                                {product ? (
                                                    <>
                                                        <img src={product.image} alt={product.name} className="order-img" />
                                                        <p>{product.name}</p>
                                                        <p>Quantity: {items.quantity}</p>
                                                        <p>Price: ₹{product.newprice}</p>



                                                    </>
                                                ) : (
                                                    <p>Product details not available</p>
                                                )}


                                            </div>


                                        );

                                    })
                                }

                                <p className="name">{order.firstName + " " + order.lastName}</p>
                                <div className="address">
                                    <p>{order.address.street + ","}</p>
                                    <p>{order.address.city + " " + order.address.state + " " + order.address.zipCode}</p>
                                </div>
                                <p>Items:{order.items.length}</p>
                                <p>Amount:₹{order.amount}</p>
                                <p>Phone:{order.phone}</p>
                                <select onChange={(e)=>status(e,order._id)} value={order.status}>
                                    <option value="Order is placed">Order Placed</option>
                                    <option value="Dispatched">Dispatched</option>
                                    <option value="Out For Delivery">Out For Delivery</option>
                                    <option value="Delivered">Delivered</option>
                                </select>
                            </div>
                        )
                    })




                }
            </div>

        </div>
    )
}
export default Order
