import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Login from './components/form/Login/Login';
import Register from './components/form/Register/Register';


function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/Register" element={<Register/>} />
    </Routes>
  </BrowserRouter>
  )
}

export default App
