
 "use client";
import { createContext, useState, useEffect } from "react";

export const BirthdayhallContext = createContext();

export const BirthdayhallCartprovider = ({ children }) => {
  const [cart, setCart] = useState({ newCartItems: [] });
  useEffect(() => {
    setCartToState();
  }, []);

  const setCartToState = () => {
    const storedCart = localStorage.getItem("Birthdayhallcart");
    setCart(storedCart ? JSON.parse(storedCart) : { newCartItems: [] });
    console.log(JSON.parse(storedCart));
  };
  
  const addItemsToCart = (item) => {
    let newCartItems = [...cart?.newCartItems, item];
    const newCart = { ...cart, newCartItems: newCartItems };

    localStorage.setItem("Birthdayhallcart", JSON.stringify(newCart));
    setCartToState();
  };

  const deleteItemFromCart = (id) => {
    const newCartItems = cart.newCartItems.filter((i) => i.orderid !== id);
    const newCart = { ...cart, newCartItems: newCartItems };
    localStorage.setItem("Birthdayhallcart", JSON.stringify(newCart));
    setCartToState();
  };

  const saveOnCheckout = (info) => {
    const newCart = { ...cart, checkoutInfo: info };
    localStorage.setItem("Birthdayhallcart", JSON.stringify(newCart));
    setCartToState();
  };

  const clearCart = () => {
    localStorage.removeItem("Birthdayhallcart");
    setCartToState();
  };

  return (
    <BirthdayhallContext.Provider
      value={{
        cart,
        addItemsToCart,
        clearCart,
        saveOnCheckout,
        deleteItemFromCart,
      }}
    >
      {children}
    </BirthdayhallContext.Provider>
  );
};
