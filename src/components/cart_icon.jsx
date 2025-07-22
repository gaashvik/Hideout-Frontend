import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css_files/cart.css'
const CartIcon = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Retrieve cart data from localStorage when the component mounts
    const savedCart = JSON.parse(localStorage.getItem('cart'));
    if (savedCart) {
      setCart(savedCart);
    }
  }, []);

  const cartItemCount = cart.length;

  return (
    cartItemCount > 0 && (
      <div className="fixed bottom-4 left-4 flex items-center justify-center">
        <Link to="/cart" className="relative">
          {/* Cart Icon */}
          <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl">
            <i className="fas fa-shopping-cart"></i>
          </div>
          
          {/* Cart Count Badge */}
          <div className="absolute bottom-0 right-0 w-6 h-6 bg-red-600 text-white text-xs rounded-full flex items-center justify-center">
            {cartItemCount}
          </div>
        </Link>
      </div>
    )
  );
};

export default CartIcon;
