'use client';

import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ImagesSlider } from "@/components/ui/images-slider";
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from "next/link";
export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();

  const verifyUserEmail = async () => {
    try {
      const response = await axios.post('/api/verifyemail', { token });
      if (response.data.message === "Email successfully verified") {
        setVerified(true);
        toast.success("Email Verified Successfully!",{
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
        setError(true);
        toast.error(response.data.message || "Verification failed", {
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
    } catch (error:any) {
      setError(true);
      console.error('Error verifying email:', error);
      toast.error(`Error: ${error.response?.data?.error || 'An error occurred'}`, {
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
  };

  useEffect(() => {
    const urlToken = new URLSearchParams(window.location.search).get("token");
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token) {
      verifyUserEmail();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const images = [
    "https://th.bing.com/th/id/OIP.qzNMXr6JuDVdqqKsoca7IgHaEU?w=816&h=476&rs=1&pid=ImgDetMain",
    "https://images.unsplash.com/photo-1483982258113-b72862e6cff6?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1482189349482-3defd547e0e9?q=80&w=2848&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

  return (
    <ImagesSlider className="min-h-[100vh]" images={images}>
      <motion.div
        initial={{ opacity: 0, y: -80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="z-50 flex flex-col justify-center items-center"
      >
        <motion.div className="font-bold text-xl md:text-6xl text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 py-4">
          <div className="border-2 border-white w-[46rem] mt-[13rem] p-[2rem] gap-16 flex flex-col backdrop:blur-md text-[white] bg-[#80808042]">
            <h1>Email Verification</h1>
            {verified ? (
              <div className="text-lg flex flex-col items-center">
                <p>Your email has been successfully verified!</p>
                <Link href="/login" className="bg-red-600 my-8 p-2 rounded-2xl hover:shadow-[0_0_22px_10px_#ff0000fc]">
                  Login
                </Link>
              </div>
            ) : error ? (
              <div className="text-lg flex flex-col items-center text-red-500">
                <p>Verification failed. Please try again.</p>
              </div>
            ) : (
              <div className="text-lg flex flex-col items-center">
                <p>Verifying your email...</p>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
      <ToastContainer />
    </ImagesSlider>
  );
}
