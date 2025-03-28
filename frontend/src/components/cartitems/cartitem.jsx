import { useContext, useEffect } from "react"
import "./cartitem.css"
import { StoreContext } from "../../context/store"
import { assests } from "../../assets/assets/assests"
import { useNavigate } from "react-router-dom"
function CartItem() {
    const { contextvalue, cartitem, removecart,amount,addcart } = useContext(StoreContext);
    console.log(contextvalue)
    console.log(cartitem)
    const navigate=useNavigate()
   
       
    return (
        <div className="cartitems">
            <div className="cartitems-main">
                <p>Products</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr />
            {contextvalue.map((e) => {
                if (cartitem[e.id] > 0) {
                    return (
                        <div>
                            <div className="cart-products cartitems-main" key={e.id}>
                                <img src={e.image} alt="" className="cartimg" />
                                <p>{e.name}</p>
                                <p>{`\u20B9${e.newprice}`}</p>
                                <div className="quantity-controls">
                                <button className="decrement" onClick={() => removecart(e.id)}>-</button>
                                <span className="cart-quantity">{cartitem[e.id]}</span>
                                <button className="increment" onClick={() => addcart(e.id)}>+</button>
                            </div>
                                
                               
                                <p>{`\u20B9${e.newprice * cartitem[e.id]}`}</p>
                                <img
                                    className="remove-icon"
                                    src={assests.remove}
                                    alt="Remove"
                                    onClick={() => removecart(e.id)

                                    } 
                                />
                            </div>
                            <hr />
                        </div>

                    );
                }
                return null; 
            })}
            <div className="cart-items-down">
                <div className="cart-items-total">
                    <h1> Cart Total</h1>
               
                    <div>
                       <div className="cart-items">
                        <p>Subtotal</p>
                        <p>{`\u20B9${amount()}`}</p>
                       </div>
                       <hr />
                       <div className="cart-items">
                        <p>Shipping Fee</p>
                        <p>Free</p>
                        </div>
                           <hr />
                        <div className="cart-items">
                        <p>Total</p>
                        <p>{`\u20B9${amount()}`}</p>
                         </div>
                    </div>
                    <button onClick={()=>navigate('/order')}>Procced to checkout</button>
              </div>



            </div>


        </div>
    );


}
export default CartItem
