"use client";

import { motion } from "framer-motion";
import React, { useState } from "react";
import { ImagesSlider } from "@/components/ui/images-slider";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Page() {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({ email: "" });
  const router = useRouter();
  const [loading, setLoading] = useState(false);

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

    return true;
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;

    try {
        setLoading(true);
      const data = { Email: email };

      const response = await axios.post("/api/verify", data);
      if (response?.data?.message) {
        toast.success("Sent Successful!");
      } else {
        toast.error(response?.data?.error || "Wrong Email", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: 0.1,
          theme: "colored",
        });
      }
    } catch (error: any) {
      console.error("Error submitting form:", error);
      if (error.response) {
        toast.error(
          `Error: ${error?.response?.data?.error || "An error occurred"}`,
          {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: 0.1,
            theme: "colored",
          }
        );
      } else if (error.request) {
        toast.error("No response received from server", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: 0.1,
          theme: "colored",
        });
      } else {
        toast.error("Error setting up request: " + error.message, {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: 0.1,
          theme: "colored",
        });
      }
    } finally {
        setLoading(false);
      }
  };

  const images = [
    "https://images.unsplash.com/photo-1485433592409-9018e83a1f0d?q=80&w=1814&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1483982258113-b72862e6cff6?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1482189349482-3defd547e0e9?q=80&w=2848&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

  return (
    <>
      <ImagesSlider className="h-[40rem]" images={images}>
        <motion.div
          initial={{
            opacity: 0,
            y: -80,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
          }}
          className="z-50 flex flex-col justify-center items-center"
        >
          <motion.p className="font-bold text-xl md:text-6xl text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 py-4">
            The hero section slideshow <br />
            <input
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent border-2 p-2 h-[2rem] text-lg w-[26rem]"
              placeholder="Email"
            />
          </motion.p>
          <button
            className="px-4 py-2 backdrop-blur-sm border bg-emerald-300/10 border-emerald-500/20 text-white mx-auto text-center rounded-full relative mt-4"
            onClick={onSubmit}
          >
                              {loading ? <span className="loading loading-bars loading-lg"></span> : 
            <span>Send Email →</span>}
            <div className="absolute inset-x-0  h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent via-emerald-500 to-transparent" />
          </button>
        </motion.div>
      </ImagesSlider>
      <ToastContainer />
    </>
  );
}
