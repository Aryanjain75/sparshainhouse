"use client";

import { motion } from "framer-motion";
import React, { useContext, useState } from "react";
import { ImagesSlider } from "@/components/ui/images-slider";
import Link from "next/link";
import axios from "axios";
import { UsernameContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const router = useRouter();
  const userContext = useContext(UsernameContext);
  const [Loading, setLoading] = useState(false);

  if (!userContext) {
    throw new Error("useContext must be used within a UserProvider");
  }

  const { setUsername, loadUserData } = userContext;

  const validate = () => {
    let emailError = "";
    let passwordError = "";

    if (!email) {
      emailError = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      emailError = "Invalid email address";
    }

    if (!password) {
      passwordError = "Password is required";
    }

    if (emailError || passwordError) {
      setErrors({ email: emailError, password: passwordError });
      return false;
    }

    return true;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;

    try {
      setLoading(true);
      const data = { Email: email, Password: password };

      const response = await axios.post("/api/login", data);
      if (response?.data?.username) {
        setUsername(response.data.username);
        loadUserData();
        toast.success("Login Successful!");
        router.push("/");
      } else {
        toast.error(response?.data?.error || "Login failed", {
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
    } catch (error) {
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
    "https://th.bing.com/th/id/OIP.qzNMXr6JuDVdqqKsoca7IgHaEU?w=816&h=476&rs=1&pid=ImgDetMain",
    "https://images.unsplash.com/photo-1483982258113-b72862e6cff6?q=80&w=3456&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1482189349482-3defd547e0e9?q=80&w=2848&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

  return (
    <>
      <ImagesSlider className="h-[40rem]" images={images}>
        <motion.div
          initial={{ opacity: 0, y: -80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="z-50 flex flex-col justify-center items-center"
        >
          <div className="border-2 border-white w-full max-w-2xl mx-auto p-6 md:p-12 gap-8 md:gap-16 flex flex-col backdrop-blur-md text-white bg-[#80808042]">
            <h1 className="font-bold text-3xl md:text-5xl">Login</h1>
            <form onSubmit={onSubmit} className="text-lg flex flex-col space-y-4">
              <div className="flex flex-col">
                <label htmlFor="Email" className="mb-1">
                  Email:
                </label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-transparent border-2 p-2 rounded"
                  placeholder="Email"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>
              <div className="flex flex-col">
                <label htmlFor="Password" className="mb-1">
                  Password:
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-transparent border-2 p-2 rounded"
                  placeholder="Password"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>
              <button
                type="submit"
                className="bg-red-600 p-2 rounded-2xl hover:shadow-[0_0_22px_10px_#ff0000fc] transition-shadow"
              >
                {Loading ? <span className="loading loading-bars loading-lg"></span> : "Submit"}
              </button>
              <div className="flex flex-col  justify-between text-xs text-center space-y-2 md:space-y-0 md:space-x-4">
                <div>
                  Not Exist?{" "}
                  <Link className="text-red-800" href="/Registration">
                    Sign up
                  </Link>
                </div>
                <div>
                  <Link className="text-red-800" href="/verify">
                    Verify Email
                  </Link>
                </div>
                <div>
                  <Link className="text-red-800" href="/forgetpassword">
                    Forget Password?
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </motion.div>
      </ImagesSlider>
      <ToastContainer />
    </>
  );
}
