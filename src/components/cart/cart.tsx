"use client";

import React, { useContext,useEffect } from "react";
import { CartContext } from "@/context/CartContext";
import Image from "next/image";

interface CartItem {
  _id: string;
  quantity: number;
  PRICE: number;
  DISCOUNTED_PRICE: number;
  CloudanaryImageId: string;
  FOODNAME: string;
  CUSSINE: string;
  TAGS: string;
}

interface CartProps {
  addItemsToCart: (item: CartItem) => void;
  deleteItemFromCart: (id: string) => void;
  cart: { cartItems: CartItem[] };
  quantity: number;
}


function Cart({ addItemsToCart, deleteItemFromCart, cart, quantity }: CartProps) {

  const increaseQty = (cartItem:any) => {
    const newQty = cartItem?.quantity + 1;
    const item = { ...cartItem, quantity: newQty };
    addItemsToCart(item);
  };

  const decreaseQty = (cartItem:any) => {
    const newQty = cartItem?.quantity - 1;
    const item = { ...cartItem, quantity: newQty };
    if (newQty <= 0) return;
    addItemsToCart(item);
  };

  const amountWithoutTax = cart?.cartItems?.reduce(
    (acc:any, item:any) => acc + item.quantity * item.PRICE,
    0
  );
  const amountWithDiscount = cart?.cartItems?.reduce(
    (acc:any, item:any) => acc + item.quantity * item.DISCOUNTED_PRICE,
    0
  );
  useEffect(()=>{console.log(cart)},[]);
  const taxAmount = (amountWithDiscount * 0.15).toFixed(2);
  const totalAmount = (Number(amountWithDiscount) + Number(taxAmount)).toFixed(2);

  return (
    <main className="bg-white shadow-md rounded-lg p-4 md:p-6">
      {quantity > 0 ? (
        cart.cartItems.map((cartItem:any) => (
          <div key={cartItem._id} className="border-b border-gray-200 pb-4 mb-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center w-full md:w-2/5 xl:w-2/4 relative">
                <div className="flex-shrink-0 w-16 h-16 border border-gray-200 rounded overflow-hidden">
                  <Image src={cartItem.CloudanaryImageId} alt={cartItem.FOODNAME} layout="fill" objectFit="cover" />
                </div>
                <div className="ml-3">
                  <p className="text-lg font-semibold">{cartItem.FOODNAME}</p>
                  <p className="mt-1 text-gray-500">Cuisine: {cartItem.CUSSINE}</p>
                  <p className="mt-1 text-gray-500">Tags: {cartItem.TAGS}</p>
                </div>
              </div>
              <div className="flex items-center w-full md:w-1/5">
                <div className="flex items-center w-full">
                  <button
                    className="bg-gray-300 text-gray-600 hover:bg-gray-400 h-8 w-8 rounded-l flex items-center justify-center"
                    onClick={() => decreaseQty(cartItem)}
                  >
                    <span className="text-xl">−</span>
                  </button>
                  <input
                    type="number"
                    className="w-full text-center bg-gray-100 border-t border-b border-gray-300"
                    value={cartItem.quantity}
                    readOnly
                  />
                  <button
                    className="bg-gray-300 text-gray-600 hover:bg-gray-400 h-8 w-8 rounded-r flex items-center justify-center"
                    onClick={() => increaseQty(cartItem)}
                  >
                    <span className="text-xl">+</span>
                  </button>
                </div>
              </div>
              <div className="w-full md:w-1/4">
                <p className="font-semibold">Original Price: ₹{(cartItem.PRICE * cartItem.quantity).toFixed(2)}</p>
                <p className="font-semibold">Discounted Price: ₹{(cartItem.DISCOUNTED_PRICE * cartItem.quantity).toFixed(2)}</p>
                <small className="text-gray-400">₹{cartItem.DISCOUNTED_PRICE} / per item</small>
              </div>
              <div className="w-full md:w-1/5 flex items-center justify-end">
             
                <button
                  className="text-red-600 bg-white border border-gray-200 rounded-md px-4 py-2 hover:bg-gray-100"
                  onClick={() => deleteItemFromCart(cartItem._id)}
                >
                  Remove
                </button>
              </div>
            </div>
            <hr className="my-4" />
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">Your cart is empty</p>
      )}
    </main>
  );
}

export default Cart;
