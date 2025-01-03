"use client";
import { createContext, useState, useEffect } from "react";
export const FinalCheckoutContext = createContext();
export const FinalCheckoutCartprovider = ({ children }) => {   
    const [bill,setbill]=useState({});

    return (
        <FinalCheckoutContext.Provider
            value={{
                bill,
                setbill
            }}
        >
            {children}
        </FinalCheckoutContext.Provider>
    );
 };