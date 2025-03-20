import { useEffect, useState } from "react";
import axios from "axios";
import "./listproduct.css";
import crossicon from "../../assets/Admin_Assets/cross_icon.png";
import { toast } from "react-toastify";

const Listproduct = () => {
    const [allproducts, setproducts] = useState([]);

    const fetchinfo = async () => {
        await axios.get("http://localhost:3000/products/")
            .then((res) => {
                console.log("Fetched Data:", res.data);
                setproducts(res.data); // Store products in state
            })
            .catch((err) => {
                console.log("Error fetching products:", err);
            });
    };

    useEffect(() => {
        fetchinfo();
    }, []);

    const remove = async (id) => {  
        console.log("Deleting product with ID:", id);
        axios.delete(`http://localhost:3000/products/remove/${id}`)
        .then((res) => {
            console.log("Deleted:", res.data);
            fetchinfo(); 
            toast.success("Product Removed")
        })
        .catch((err) => {
            console.error("Delete Error:", err);
        });
    };
    

    return (
        <div className="listproduct">
        <h1>All Products List</h1>

        {/* Header Row */}
        <div className="list-products header">
            <p>Product</p>
            <p>Title</p>
            <p>Old Price</p>
            <p>New Price</p>
            <p>Category</p>
          
            <p>Remove</p>
        </div>

        {/* Product List */}
        <div className="allproducts">
            {allproducts.length > 0 ? (
                allproducts.map((item) => (
                    <div className="list-products products" key={item._id}>
                        <img className="listproducticon" src={item.image} alt={item.name} />
                        <p>{item.name}</p>
                        <p>{`\u20B9${item.oldprice}`}</p>
                        <p>{`\u20B9${item.newprice}`}</p>
                        <p>{item.category}</p>
                      
                        <img
                            src={crossicon}
                            className="removeicon"
                            alt="Remove"
                            onClick={() => remove(item._id)}
                        />
                    </div>
                ))
            ) : (
                <p className="empty-message">No products available</p>
            )}
        </div>
    </div>
);

};

export default Listproduct;