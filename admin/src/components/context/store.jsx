import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [allproducts, setproducts] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/products/")
            .then((res) => setproducts(res.data))
            .catch((err) => console.log("Error fetching products:", err));
    }, []);

    return (
        <ProductContext.Provider value={{ allproducts, setproducts }}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProducts = () => useContext(ProductContext);
