import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Menu from './pages/Menu';
import About from './pages/About';
import Contact from './pages/Contact';
import Checkout from './pages/Checkout';
import TrackOrder from './pages/TrackOrder';
import OrderHistory from './pages/OrderHistory';
import { CartProvider } from './context/CartContext';

export default function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="menu" element={<Menu />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="track-order/:orderId" element={<TrackOrder />} />
            <Route path="order-history" element={<OrderHistory />} />
          </Route>
        </Routes>
      </Router>
    </CartProvider>
  );
}

