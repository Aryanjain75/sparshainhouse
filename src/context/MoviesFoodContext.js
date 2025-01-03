import React, { createContext, useState, ReactNode, useEffect } from 'react';

export const Cartcontext = createContext();

const initialTheaters = {
  h9wea6zaeh5sododtfqt: {
    Imageurl: "https://res.cloudinary.com/devj7oonz/image/upload/v1735369318/h9wea6zaeh5sododtfqt.jpg",
    caption: "Cinematic Luxury at Home.",
    Price: 50,
  },
  nfpjuyqifhhbonsd59vb: {
    Imageurl: "https://res.cloudinary.com/devj7oonz/image/upload/v1735369318/h9wea6zaeh5sododtfqt.jpg",
    caption: "Sleek and Sophisticated Cinema",
    Price: 230,
  },
  havriv6h1ebvx20byrjb: {
    Imageurl: "https://res.cloudinary.com/devj7oonz/image/upload/v1735369317/havriv6h1ebvx20byrjb.jpg",
    caption: "Immersive Sound, Sleek Design",
    Price: 225,
  },
  vow3igduygjnmbxqoaxd: {
    Imageurl: "https://res.cloudinary.com/devj7oonz/image/upload/v1735369317/vow3igduygjnmbxqoaxd.jpg",
    caption: "Cinema Comfort",
    Price: 200,
  },
  tsmunt7zmxorzpmwd0wk: {
    Imageurl: "https://res.cloudinary.com/devj7oonz/image/upload/v1735369317/tsmunt7zmxorzpmwd0wk.jpg",
    caption: "Timeless Movie Magic",
    Price: 240,
  },
};

export const Cartprovider = ({ children }) => {
  const [moviedata, setmoviedata] = useState({cartItems:[]});
  const [Theaters,setTheater] = useState(initialTheaters);
  const setCartToState = () => {
    const storedCart = localStorage.getItem("Moviecart");
    setmoviedata(storedCart ? JSON.parse(storedCart) : { cartItems: [] });
  };
  useEffect(()=>{
    setCartToState()
  },[]);
  const addItemsToCart = (item) => {
    const isItemExist = moviedata.cartItems.find((i) => i.id === item.id);
    let newCartItems;

    if (isItemExist) {
      newCartItems = moviedata.cartItems.map((i) => (i.id === item.id ? item : i));
    } else {
      newCartItems = [...moviedata.cartItems, item];
    }
    const newCart = { ...moviedata, cartItems: newCartItems };
    localStorage.setItem("Moviecart", JSON.stringify(newCart));
    setCartToState();
  };
  const deleteItemFromCart = (id) => {
    const newCartItems = moviedata.cartItems.filter((i) => i.id !== id);
    const newCart = { ...moviedata, cartItems: newCartItems };
    localStorage.setItem("Moviecart", JSON.stringify(newCart));
    setCartToState();
  };
  const saveOnCheckout = (info) => {
    const newCart = { ...moviedata, checkoutInfo: info };
    localStorage.setItem("Moviecart", JSON.stringify(newCart));
    setCartToState();
  };
  const clearCart = () => {
    localStorage.removeItem("Moviecart");
    setCartToState();
  };

  function show(){
    console.log(moviedata);
    setTheater(initialTheaters);
  }
  return (
    <Cartcontext.Provider value={{Theaters, moviedata, show,setmoviedata, Theaters,addItemsToCart,deleteItemFromCart,saveOnCheckout,clearCart }}>
      {children}
    </Cartcontext.Provider>
  );
};
