import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Login from './components/form/Login/Login';
import Home from './pages/home/Home';
import Register from "./pages/register/Register";
import AddProduct from "./components/form/addProduct/AddProduct";


function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/Home" element={<Home/>} />
      <Route path="/Register" element={<Register/>} />
      <Route path="/AddProduct" element={<AddProduct/>} />
    </Routes>
  </BrowserRouter>
  )
}

export default App
