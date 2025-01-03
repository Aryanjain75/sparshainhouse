"use client";

import React from "react";
import { InfiniteMovingCards } from "@/components/Testimonials/infinite-moving-cards";
import json from "@/dataset/data.json";

function Testimonial() {
  const testimonials = json.data[6].testimonial!;

  return (
    <div className="bg-[hsl(38deg 44% 96% / 98%)]">
      <div className="mx-auto text-6xl justify-center flex font-bold mt-12 text-yellow-800">
        <span>Testimonials</span>
      </div>
      <div className="text-center mt-8">
        <h1 className="text-4xl font-bold">Our Customers Reviews</h1>
        <p className="mt-4 text-lg text-gray-600">
          Food is any substance consumed to provide nutritional support for an organism.
        </p>
      </div>
      <div className="justify-center items-center py-20">
        <InfiniteMovingCards items={testimonials} direction="right" speed="normal" />
      </div>
    </div>
  );
}

export default Testimonial;
