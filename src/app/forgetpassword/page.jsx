"use client";

import { motion } from "framer-motion";
import React, { useState } from "react";
import { ImagesSlider } from "@/components/ui/images-slider";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export default function ForgetPasswordPage() {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({ email: "" });

  const validate = () => {
    let emailError = "";

    if (!email) {
      emailError = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      emailError = "Invalid email address";
    }

    if (emailError) {
      setErrors({ email: emailError });
      return false;
    }

    setErrors({ email: "" });
    return true;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;

    try {
      const response = await axios.post("/api/forgetpassword", { email });
      if (response?.data?.error) {
        toast.error(`Error: ${response.data.error|| "An error occurred"}`, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
      if (response?.data?.message) {
        toast.success(response.data.message, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      toast.error(`Error: ${error.message || "An error occurred"}`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const images = [
    "https://th.bing.com/th/id/OIP.qzNMXr6JuDVdqqKsoca7IgHaEU?w=816&h=476&rs=1&pid=ImgDetMain",
    "https://images.unsplash.com/photo-1483982258113-b72862e6cff6?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1482189349482-3defd547e0e9?q=80&w=2848&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

  return (
    <ImagesSlider className="h-[40rem]" images={images}>
      <motion.div
        initial={{ opacity: 0, y: -80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="z-50 flex flex-col justify-center items-center"
      >
        <div className="border-2 border-white w-[46rem] mx-auto p-[2rem] gap-16 flex flex-col backdrop:blur-md text-[white] bg-[#80808042]">
          <h1>Forget Password</h1>
          <form onSubmit={onSubmit} className="text-lg flex flex-col">
            <label htmlFor="Email" className="justify-start flex">
              Email:
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent border-2 p-2"
              placeholder="Email"
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}
            <button
              type="submit"
              className="bg-red-600 my-8 p-2 rounded-2xl hover:shadow-[0_0_22px_10px_#ff0000fc]"
            >
              Submit
            </button>
            <div className="flex justify-between">
              <div className="text-xs">
                Do not have an account?{" "}
                <Link className="text-red-800" href="/Registration">
                  Sign up
                </Link>
              </div>
              <div className="text-xs">
                Already have an account?{" "}
                <Link className="text-red-800" href="/login">
                  Login
                </Link>
              </div>
            </div>
          </form>
        </div>
      </motion.div>
      <ToastContainer />
    </ImagesSlider>
  );
}
