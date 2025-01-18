import { CartProvider } from "@/context/CartContext";
import { UserProvider } from "@/context/UserContext";
import { AuthProvider } from "@/context/AuthContext";
import {FinalCheckoutCartprovider} from "@/context/FinalContext";
import '@fortawesome/fontawesome-svg-core/styles.css'; // Import the CSS
import { config } from '@fortawesome/fontawesome-svg-core';
import { DarkModeContextProvider } from "@/context/darkModeContext";
import {AdminPlanCartprovider} from "@/context/AdminContext"
import React,{useState,useEffect} from "react";
import {PlanCartprovider} from "@/context/PlanContext";
import { ToastContainer } from "react-toastify";
import { Cartprovider  } from '@/context/MoviesFoodContext';
import { BirthdayhallCartprovider }  from '@/context/Birthdayhall';
export  function GlobalProvider({ children }: { children: React.ReactNode }) {
  return <>
    <ToastContainer
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
    />
    <AdminPlanCartprovider>
        <DarkModeContextProvider>
        <PlanCartprovider>
          <FinalCheckoutCartprovider>
          <BirthdayhallCartprovider>
      <UserProvider>
        <Cartprovider>
         <CartProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </CartProvider>
      </Cartprovider>
      </UserProvider>
      </BirthdayhallCartprovider>
      </FinalCheckoutCartprovider>
      </PlanCartprovider>
      </DarkModeContextProvider>
      </AdminPlanCartprovider>
  </>
    ;
}