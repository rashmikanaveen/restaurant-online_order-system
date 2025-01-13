import './App.css';
import Navbar from './components/Navbar';


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
import Sidebar from './components/Sidebar';
function App() {
  return (
    <div>
      <Router>
      {/*<Navbar />*/}
      <Sidebar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterNew />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/orders/:orderId" element={<Order />} />
        <Route path="/contact" element={<ContactForm />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      <Footer />

    </Router>
    </div>
  );
}

export default App;