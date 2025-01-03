"use client";

import React from "react";
import { CardBody, CardContainer, CardItem } from "./3d-card";
import json from "@/dataset/data.json";
import { InfiniteMovingCards } from "@/components/Promo.js/infinite-moving-cards";

function Promo() {
  const promo = json.data[2].promo!;

  return (
    <>
    <div className="mx-auto text-6xl justify-center flex font-bold mt-12"><span>PROMOS</span></div>
      <div className="justify-center items-center py-20">
        <InfiniteMovingCards items={promo} direction="right" speed="slow" />
      </div>
    </>
  );
}

export default Promo;
