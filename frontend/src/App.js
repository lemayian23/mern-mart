import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/common/Navbar/Navbar';
import Footer from './components/common/Footer/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import CartPage from './pages/CartPage';
import Profile from './pages/Profile';
import Contact from './pages/Contact';
import About from './pages/About';
import NotFound from './pages/NotFound';
import AdminDashboard from './pages/AdminDashboard';
import PrivateRoute from './components/auth/PrivateRoute'; // Import PrivateRoute
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="App">
            <Navbar />
            
            <div className="main-container">
              <main className="main-content">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/admin" element={
                    <PrivateRoute>
                      <AdminDashboard />
                    </PrivateRoute>
                  } />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
            </div>

            <Footer />

            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;