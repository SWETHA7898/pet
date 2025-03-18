import Navbar from "./components/navbar/navbar"
import Admin from "./pages/admin/admin"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const App = ()=>{
  return(
    <div>
      <ToastContainer/>
         <Navbar></Navbar>
         <Admin></Admin>
         
    </div>
  )
} 
export default App







