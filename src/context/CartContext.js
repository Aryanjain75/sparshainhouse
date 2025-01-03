"use client";
import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ cartItems: [] });
  const [quantity, setQuantity] = useState(0);
  useEffect(() => {
    setCartToState();
  }, []);

  const setCartToState = () => {
    const storedCart = localStorage.getItem("cart");
    setCart(storedCart ? JSON.parse(storedCart) : { cartItems: [] });
  };
  function calculatequantity() {
    setQuantity( cart?.cartItems?.reduce((total, data) => total + data.quantity, 0) || 0);
  }
  const addItemsToCart = (item) => {
    const isItemExist = cart.cartItems.find((i) => i._id === item._id);
    let newCartItems;

    if (isItemExist) {
      newCartItems = cart.cartItems.map((i) => (i._id === item._id ? item : i));
    } else {
      newCartItems = [...cart.cartItems, item];
    }
    const newCart = { ...cart, cartItems: newCartItems };
    localStorage.setItem("cart", JSON.stringify(newCart));
    setCartToState();
  };

  const deleteItemFromCart = (id) => {
    const newCartItems = cart.cartItems.filter((i) => i._id !== id);
    const newCart = { ...cart, cartItems: newCartItems };
    localStorage.setItem("cart", JSON.stringify(newCart));
    setCartToState();
  };

  const saveOnCheckout = (info) => {
    const newCart = { ...cart, checkoutInfo: info };
    localStorage.setItem("cart", JSON.stringify(newCart));
    setCartToState();
  };

  const clearCart = () => {
    localStorage.removeItem("cart");
    setCartToState();
  };

  return (
    <CartContext.Provider
      value={{
        calculatequantity,
        quantity,
        cart,
        addItemsToCart,
        clearCart,
        saveOnCheckout,
        deleteItemFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
