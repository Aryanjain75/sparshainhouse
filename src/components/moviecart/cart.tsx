"use client";

import React, { useContext } from "react";

import {CartContext} from "@/context/CartContext";
import Link from "next/link";
import Image from "next/image";
function Cart (){
  const { addItemsToCart, deleteItemFromCart, cart } = useContext(CartContext);

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
  const amountWithdiscount = cart?.cartItems?.reduce(
    (acc:any, item:any) => acc + item.quantity * item.DISCOUNTED_PRICE,
    0
  );
  const taxAmount = (amountWithdiscount * 0.15).toFixed(2);

  const totalAmount = (Number(amountWithdiscount) + Number(taxAmount)).toFixed(2);

  return (
    <>

      

    
              <main className="">
                <div className="border border-gray-200 bg-white shadow-sm rounded mb-5 p-3 lg:p-5 w-[120%]">
                  {cart?.cartItems?.map((cartItem:any) => (
                    <div key={cartItem._id}>
                      <div className="flex flex-wrap lg:flex-row gap-5  mb-4">
                        <div className="w-full lg:w-2/5 xl:w-2/4">
                          <figure className="flex leading-5">
                            <div>
                              <div className="block w-16 h-16 rounded border border-gray-200 overflow-hidden">
                                <Image src={cartItem.CloudanaryImageId} alt={cartItem.FOODNAME} />
                              </div>
                            </div>
                            <figcaption className="ml-3">
                              <p>
                                <a href="#" className="hover:text-blue-600">
                                  {cartItem.FOODNAME}
                                </a>
                              </p>
                              <p className="mt-1 text-gray-400">
                                
                                CUSSINE: {cartItem.CUSSINE}
                              </p>
                              <p className="mt-1 text-gray-400">
                                TAGS:{cartItem.TAGS}
                              </p>
                            </figcaption>
                          </figure>
                        </div>
                        <div className="w-24">
                          <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
                            <button
                              data-action="decrement"
                              className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
                              onClick={() => decreaseQty(cartItem)}
                            >
                              <span className="m-auto text-2xl font-thin">
                                −
                              </span>
                            </button>
                            <input
                              type="number"
                              className="outline-none focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-900  outline-none custom-input-number"
                              name="custom-input-number"
                              value={cartItem.quantity}
                              readOnly
                            ></input>
                            <button
                              data-action="increment"
                              className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
                              onClick={() => increaseQty(cartItem)}
                            >
                              <span className="m-auto text-2xl font-thin">
                                +
                              </span>
                            </button>
                          </div>
                        </div>
                        <div>
                          <div className="leading-5">
                            <p className="font-semibold not-italic">
                            Original Price:₹{cartItem.PRICE * cartItem.quantity.toFixed(2)}
                            </p>
                            <p className="font-semibold not-italic">
                            Discounted Price:₹{cartItem.DISCOUNTED_PRICE * cartItem.quantity.toFixed(2)}
                            </p>
                            <small className="text-gray-400">
                              {" "}
                              ₹{cartItem.DISCOUNTED_PRICE } / per item{" "}
                            </small>
                          </div>
                        </div>
                        <div className="flex-auto">
                          <div className="float-right">
                            <a
                              className="px-4 py-2 inline-block text-red-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100 cursor-pointer"
                              onClick={() =>
                                deleteItemFromCart(cartItem?._id)
                              }
                            >
                              Remove
                            </a>
                          </div>
                        </div>
                      </div>

                      <hr className="my-4" />
                    </div>
                  ))}
                </div>
              </main>
              

    </>
  );
};

export default Cart;