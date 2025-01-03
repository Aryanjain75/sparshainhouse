"use client";

import { motion } from "framer-motion";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ImagesSlider } from "@/components/ui/images-slider";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Page() {
  const { register, handleSubmit, getValues, formState: { errors } } = useForm();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: any) => {
    const userData = {
      Name: data.Name,
      Email: data.Email,
      Password: data.Password,
      PhoneNumber: data.PhoneNumber,
      Street: data.Street,
      City: data.City,
      State: data.State,
      ZipCode: data.ZipCode,
      Country: data.Country,
    };
    try {
      setLoading(true);
      const response = await axios.post("/api/Registration", userData);
      
      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        toast.success("Registration successful! Redirecting to login...");
        toast.success("Before login . verify your email which sent to your registered mail id");
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      }
    } catch (error: any) {
      console.error("There was an error during registration!", error);
      if (error.response && error.response.data && error.response.data.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
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
      <ToastContainer />
      <ImagesSlider className="min-h-[100vh]" images={images}>
        <motion.div
          initial={{ opacity: 0, y: -80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="z-50 flex flex-col justify-center items-center"
        >
          <motion.p className="font-bold text-xl md:text-6xl text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 py-4">
            <div className="border-2 border-white w-full max-w-4xl mt-16 p-6 md:p-12 gap-8 md:gap-16 flex flex-col backdrop-blur-md text-white bg-[#80808042] rounded-lg">
              <h1 className="text-3xl md:text-5xl font-semibold mb-4 underline">Registration</h1>
              <form onSubmit={handleSubmit(onSubmit)} className="text-lg flex flex-col gap-4">
                <div className="flex flex-col">
                  <label htmlFor="Name" className="mb-1 text-justify">Username:</label>
                  <input
                    type="text"
                    {...register("Name", { required: true })}
                    className="bg-transparent border-2 p-2 rounded"
                    placeholder="Username"
                  />
                  {errors.Name && <p className="text-red-500 mt-1">Username is required</p>}
                </div>

                <div className="flex flex-col">
                  <label htmlFor="Email" className="mb-1 text-justify">Email:</label>
                  <input
                    type="text"
                    {...register("Email", { required: true, pattern: /^\S+@\S+\.\S+$/ })}
                    className="bg-transparent border-2 p-2 rounded"
                    placeholder="Email"
                  />
                  {errors.Email && (
                    <p className="text-red-500 mt-1">
                      {errors.Email.type === "required" ? "Email is required" : "Invalid email address"}
                    </p>
                  )}
                </div>

                <div className="flex flex-col">
                  <label htmlFor="Password" className="mb-1 text-justify">Password:</label>
                  <input
                    type="password"
                    {...register("Password", { required: true })}
                    className="bg-transparent border-2 p-2 rounded"
                    placeholder="Password"
                  />
                  {errors.Password && <p className="text-red-500 mt-1">Password is required</p>}
                </div>

                <div className="flex flex-col">
                  <label htmlFor="ConfirmPassword" className="mb-1 text-justify">Confirm Password:</label>
                  <input
                    type="password"
                    {...register("ConfirmPassword", {
                      required: true,
                      validate: (value) => value === getValues("Password"),
                    })}
                    className="bg-transparent border-2 p-2 rounded"
                    placeholder="Confirm Password"
                  />
                  {errors.ConfirmPassword && (
                    <p className="text-red-500 mt-1">
                      {errors.ConfirmPassword.type === "required" ? "Confirm Password is required" : "Passwords do not match"}
                    </p>
                  )}
                </div>
                
                <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                  <div className="flex flex-col">
                    <label htmlFor="Street" className="mb-1 text-justify">Street:</label>
                    <input
                      type="text"
                      {...register("Street", { required: true })}
                      className="bg-transparent border-2 p-2 rounded"
                      placeholder="Street"
                    />
                    {errors.Street && <p className="text-red-500 mt-1">Street is required</p>}
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="City" className="mb-1 text-justify">City:</label>
                    <input
                      type="text"
                      {...register("City", { required: true })}
                      className="bg-transparent border-2 p-2 rounded"
                      placeholder="City"
                    />
                    {errors.City && <p className="text-red-500 mt-1">City is required</p>}
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="State" className="mb-1 text-justify">State:</label>
                    <input
                      type="text"
                      {...register("State", { required: true })}
                      className="bg-transparent border-2 p-2 rounded"
                      placeholder="State"
                    />
                    {errors.State && <p className="text-red-500 mt-1">State is required</p>}
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="ZipCode" className="mb-1 text-justify">Zip Code:</label>
                    <input
                      type="text"
                      {...register("ZipCode", { required: true })}
                      className="bg-transparent border-2 p-2 rounded"
                      placeholder="Zip Code"
                    />
                    {errors.ZipCode && <p className="text-red-500 mt-1">Zip Code is required</p>}
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="Country" className="mb-1 text-justify">Country:</label>
                    <input
                      type="text"
                      {...register("Country", { required: true })}
                      className="bg-transparent border-2 p-2 rounded"
                      placeholder="Country"
                    />
                    {errors.Country && <p className="text-red-500 mt-1">Country is required</p>}
                  </div>
                </div>

                <div className="flex flex-col">
                  <label htmlFor="PhoneNumber" className="mb-1 text-justify">Phone Number:</label>
                  <input
                    type="text"
                    {...register("PhoneNumber", { required: true, pattern: /^[0-9]+$/ })}
                    className="bg-transparent border-2 p-2 rounded"
                    placeholder="Phone Number"
                  />
                  {errors.PhoneNumber && (
                    <p className="text-red-500 mt-1">
                      {errors.PhoneNumber.type === "required" ? "Phone Number is required" : "Invalid phone number"}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="bg-red-600 mt-4 p-2 rounded-2xl hover:shadow-[0_0_22px_10px_#ff0000fc]"
                >
                  {loading ? <span className="loading loading-bars loading-lg"></span> : "Submit"}
                </button>
                <div className="flex justify-start mt-2">
                  <div className="text-xs">
                    Already exist? <Link className="text-red-800" href="/login">Login</Link>
                  </div>
                </div>
              </form>
            </div>
          </motion.p>
        </motion.div>
      </ImagesSlider>
    </>
  );
}
