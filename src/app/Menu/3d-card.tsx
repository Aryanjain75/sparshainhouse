"use client";
import React, { useContext, useEffect } from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { CartContext } from "@/context/CartContext";
import Image from "next/image"

interface Props {
  item: {
    _id: string;
    CloudanaryImageId: string;
    DISCOUNT: string;
    CUSSINE: string;
    FOODNAME: string;
    PRICE: string;
    DISCOUNTED_PRICE: string;
    RATINGS: number;
    TAGS: string[];
  };
}

export const ThreeDCardDemo: React.FC<Props> = ({ item }) => {
  const cartContext = useContext(CartContext);

  if (!cartContext) {
    throw new Error("useContext must be used within a CartProvider");
  }

  const { addItemsToCart, cart, deleteItemFromCart ,calculatequantity} = cartContext;
  const [itemincart, setItemincart] = React.useState<{
    _id: string;
    CloudanaryImageId: string;
    DISCOUNT: string;
    CUSSINE: string;
    FOODNAME: string;
    PRICE: string;
    DISCOUNTED_PRICE: string;
    RATINGS: number;
    TAGS: string[];
    quantity?: number;
  } | undefined>(undefined);

  const addToCartHandler = () => {
    addItemsToCart({
      _id: item._id,
      CloudanaryImageId: item.CloudanaryImageId,
      DISCOUNT: item.DISCOUNT,
      CUSSINE: item.CUSSINE,
      FOODNAME: item.FOODNAME,
      PRICE: item.PRICE,
      DISCOUNTED_PRICE: item.DISCOUNTED_PRICE,
      RATINGS: item.RATINGS,
      TAGS: item.TAGS,
      quantity: 1,
    });
    const cartItem = cart.cartItems.find((items:{
      _id: string;
      CloudanaryImageId: string;
      DISCOUNT: string;
      CUSSINE: string;
      FOODNAME: string;
      PRICE: string;
      DISCOUNTED_PRICE: string;
      RATINGS: number;
      TAGS: string[];
      quantity?: number;
    } ) => items._id === item._id);
    setItemincart(cartItem);
  };
  
  const increaseQty = (cartItem: typeof itemincart) => {
    if (!cartItem) return;
    const newQty = (cartItem.quantity || 0) + 1;
    const item = { ...cartItem, quantity: newQty };
    addItemsToCart(item);
    calculatequantity();
  };

  const decreaseQty = (cartItem: typeof itemincart) => {
    if (!cartItem) return;
    const newQty = (cartItem.quantity || 0) - 1;
    console.log(newQty);
    if(newQty < 1) deleteItemFromCart(cartItem._id);
    if (newQty <= 0) return;
    const item = { ...cartItem, quantity: newQty };
    addItemsToCart(item);
    calculatequantity();
  };

  useEffect(() => {
    const cartItem = cart.cartItems.find((items:{
      _id: string;
      CloudanaryImageId: string;
      DISCOUNT: string;
      CUSSINE: string;
      FOODNAME: string;
      PRICE: string;
      DISCOUNTED_PRICE: string;
      RATINGS: number;
      TAGS: string[];
      quantity?: number;
    } ) => items._id === item._id);
    setItemincart(cartItem);
    calculatequantity();
  }, [cart.cartItems, item._id]);

  return (
    <CardContainer className="inter-var">
      <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[20rem] h-auto rounded-xl p-6 border">
        <CardItem translateZ="100" className="w-full mt-4">
          {
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={`${item.CloudanaryImageId}`}
              style={{ width: "373px", height: "373px" }}
              className="object-cover rounded-xl group-hover/card:shadow-xl"
              alt="thumbnail"
            />
          }
        </CardItem>
        <CardItem translateZ="50" className="text-xl font-bold text-black-600 dark:text-white">
          {item.FOODNAME}
        </CardItem>
        <CardItem as="p" translateZ="60" className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300">
          Cuisine: {item.CUSSINE}
        </CardItem>
        <CardItem as="p" translateZ="60" className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300">
          Discount: {item.DISCOUNT}%
        </CardItem>
        <CardItem as="p" translateZ="60" className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300">
          Price: ₹{Number(item.PRICE)}
        </CardItem>
        <CardItem as="p" translateZ="60" className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300">
          Discounted Price: ₹{item.DISCOUNTED_PRICE}
        </CardItem>
        <CardItem as="p" translateZ="60" className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300">
          Ratings: {"⭐".repeat(item.RATINGS)}
        </CardItem>
        <CardItem as="div" translateZ="60" className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300">
          Tags: {item.TAGS.map((tag) => (
            <span key={tag} className="inline-block bg-gray-200 dark:bg-gray-700 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 dark:text-gray-200 mr-2 mb-2">
              {tag}
            </span>
          ))}
        </CardItem>
        <div className="flex justify-between items-center mt-4">
          {itemincart ? (
            <div className="flex items-center w-full">
              <div className="flex items-center w-full">
                <button
                  className="bg-gray-300 text-gray-600 hover:bg-gray-400 h-8 w-8 rounded-l flex items-center justify-center"
                  onClick={() => decreaseQty(itemincart)}
                >
                  <span className="text-xl">−</span>
                </button>
                <input
                  type="number"
                  className="w-full text-center bg-gray-100 border-t border-b border-gray-300"
                  value={itemincart?.quantity}
                  readOnly
                />
                <button
                  className="bg-gray-300 text-gray-600 hover:bg-gray-400 h-8 w-8 rounded-r flex items-center justify-center"
                  onClick={() => increaseQty(itemincart)}
                >
                  <span className="text-xl">+</span>
                </button>
              </div>
            </div>
          ) : (
            <CardItem onClick={addToCartHandler} translateZ={20} as="button" className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold">
              Add to Cart →
            </CardItem>
          )}
        </div>
      </CardBody>
    </CardContainer>
  );
};

export default ThreeDCardDemo;
