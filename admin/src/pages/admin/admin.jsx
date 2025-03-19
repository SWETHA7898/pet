import "./admin.css"
import Sidebar from "../../components/sidebar/sidebar"
import { Routes } from "react-router-dom"
import { Route } from "react-router-dom"
import Addproduct from "../../components/addproduct/addproduct"
import Listproduct from "../../components/listproduct/listproduct"
import Order from "../../components/order/order"

const Admin=({token})=>{
    return(
        <div className="admin">
            <Sidebar></Sidebar>
            <Routes>
                <Route path="/addproduct" element={<Addproduct token={token} ></Addproduct>}></Route>
                <Route path="/listproduct" element={<Listproduct token={token}></Listproduct>}></Route>
                <Route path="/order" element={<Order token={token}></Order>}/>
                
            </Routes>

            

        </div>
    )
}
export default Admin