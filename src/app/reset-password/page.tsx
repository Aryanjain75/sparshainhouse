'use client';

import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { ImagesSlider } from "@/components/ui/images-slider";
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ResetPasswordPage() {
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({ password: "", confirmPassword: "" });
  const router = useRouter();
  const [loading,setloading]=useState(false);

  useEffect(() => {
    const urlToken = new URLSearchParams(window.location.search).get("token");
    setToken(urlToken || "");
  }, []);

  const validate = () => {
    let passwordError = "";
    let confirmPasswordError = "";

    if (!password) {
      passwordError = "Password is required";
    } else if (password.length < 6) {
      passwordError = "Password must be at least 6 characters long";
    }

    if (!confirmPassword) {
      confirmPasswordError = "Confirm password is required";
    } else if (confirmPassword !== password) {
      confirmPasswordError = "Passwords do not match";
    }

    if (passwordError || confirmPasswordError) {
      setErrors({ password: passwordError, confirmPassword: confirmPasswordError });
      return false;
    }

    setErrors({ password: "", confirmPassword: "" });
    return true;
  };

  const onSubmit = async (e:any) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;

    try {
      setloading(true);
      const response = await axios.post('/api/reset', { token, password });
      if (response.data.message === "Password successfully reset") {
        toast.success("Password Reset Successfully!", {
          position: "bottom-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: 0.1,
          theme: "colored",
        });
        setTimeout(() => {
          toast("Time Out", {
            position: "bottom-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: 0.1,
            theme: "colored",
          });
          router.push('/login');
        }, 5000);
      } else {
        setloading(false);

        toast.error(response.data.message || "Reset password failed", {
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
      toast.error(`Error: ${error.response?.data?.error || 'An error occurred'}`, {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: 0.1,
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
          <h1>Reset Password</h1>
          <form onSubmit={onSubmit} className="text-lg flex flex-col">
            <label htmlFor="Password" className="justify-start flex">
              New Password:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-transparent border-2 p-2"
              placeholder="New Password"
            />
            {errors.password && <p className="text-red-500">{errors.password}</p>}
            <label htmlFor="ConfirmPassword" className="justify-start flex mt-4">
              Confirm Password:
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="bg-transparent border-2 p-2"
              placeholder="Confirm Password"
            />
            {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword}</p>}
            <button
              type="submit"
              className="bg-red-600 my-8 p-2 rounded-2xl hover:shadow-[0_0_22px_10px_#ff0000fc]"
            >
              {loading?<span className="loading loading-bars loading-lg"></span>
                :"Submit"}
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
