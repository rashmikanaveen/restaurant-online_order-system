import './App.css';
import Navbar_v_1 from './components/Navbar_v_1.jsx';


import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Cart from './pages/Cart.jsx';
import Login from './pages/Login.jsx';
import RegisterNew from './pages/RegisterNew.jsx';
import Orders from './pages/Orders.jsx';
import Order from './pages/Order.jsx';
import ContactForm from './pages/ContactForm.jsx';
import Footer from './components/Footer';
import Admin from './pages/Admin';
import Navbar_v_2 from './components/Navbar_v_2.jsx';
import {ProtectedRoute,AdminRoute} from './components/ProtectedRoute';

function App() {
  return (
    <div>
      <Router>
      {/*<Navbar_v_1 />*/}
      <Navbar_v_2 />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<ProtectedRoute element={Cart}/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterNew />} />
        <Route path="/orders" element={<ProtectedRoute element={Orders}/>} />
        <Route path="/orders/:orderId" element={<ProtectedRoute element={Order}/>}  />
        <Route path="/contact" element={<ContactForm />} />
        <Route path="/admin" element={<AdminRoute element={Admin} />} />
      </Routes>
      

    </Router>
    </div>
  );
}

export default App;