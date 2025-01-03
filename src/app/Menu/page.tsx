"use client";
import React, { useEffect, useState } from "react";
import { ThreeDCardDemo } from "./3d-card";
import axios from "axios";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import Menu from "./menu";

export default function Page() {
   

    return (
        <>
            <div>
                <div className="text-black justify-center flex pt-32 font-extrabold text-4xl sm:text-7xl">
                    <h1>Discount Cards</h1>
                </div>
                <Menu/>
                </div>
        </>
    );
}
