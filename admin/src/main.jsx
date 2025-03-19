import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {BrowserRouter} from "react-router-dom"
import "./index.css"
import { ProductProvider } from "./components/context/store";


const root=ReactDOM.createRoot(document.getElementById("root"))

root.render(
  <BrowserRouter>
    <ProductProvider>
      <App></App>

    </ProductProvider>
    
  </BrowserRouter>
  
)