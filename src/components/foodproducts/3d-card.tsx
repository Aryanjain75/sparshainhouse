"use client";
import React, { useContext } from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { CartContext } from "@/context/CartContext";
import Image from "next/image";

interface Props {
  item: {
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
 console.log(item);
  return (
    <CardContainer className="inter-var">
      <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[20rem] h-auto rounded-xl p-6 border">
        <CardItem translateZ="100" className="w-full mt-4">
          <img
            src={`${item.CloudanaryImageId}`}
            style={{ width: "373px", height: "373px" }}
            className="object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
          />
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
          <CardItem translateZ={20} as="button" className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold">
            Add to Cart →
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
};

export default ThreeDCardDemo;
