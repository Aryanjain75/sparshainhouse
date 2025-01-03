"use client";

import AuthContext from "@/context/AuthContext";
import React, { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import { UsernameContext } from '@/context/UserContext';
import axios from "axios";
import { useRouter } from "next/navigation";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from "next/image";

const UpdateProfile = () => {
  const { username, Email, userid } = useContext(UsernameContext);
  useContext(AuthContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState("https://res.cloudinary.com/devj7oonz/image/upload/v1721205831/blank-profile-picture-973460_960_720_t570pe.png");
  const [loading, setLoading] = useState(false);
  const router=useRouter();
  useEffect(() => {
    if (username) {
      setName(username);
      setEmail(Email);
    }
  }, [username, Email]);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);
    formData.set("id", userid);
    if (avatar) formData.set("image", avatar);
    console.log(formData);
    setLoading(true);
    try {
      await axios.put("/api/updateprofile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      router.push("/profile")
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2 && typeof reader.result === "string") {
          setAvatarPreview(reader.result);
        }
      };
      reader.readAsDataURL(file);
      setAvatar(file);
    }
  };

  return (
    <div style={{ maxWidth: "480px" }} className="mt-1 mb-20 p-4 md:p-7 mx-auto rounded bg-white">
      <form onSubmit={submitHandler}>
        <h2 className="mb-5 text-2xl font-semibold">Update Profile</h2>

        <div className="mb-4">
          <label className="block mb-1"> Full Name </label>
          <input
            className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
            type="text"
            placeholder="Type your name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            readOnly
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1"> Email </label>
          <input
            className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
            type="email"
            placeholder="Type your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            readOnly
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1"> Avatar </label>
          <div className="mb-4 flex flex-col md:flex-row">
            <div className="flex items-center mb-4 space-x-3 mt-4 cursor-pointer md:w-1/5 lg:w-1/4">
              <img className="w-14 h-14 rounded-full" src={avatarPreview} alt="Avatar Preview" />
            </div>
            <div className="md:w-2/3 lg:w-80">
              <input
                className="form-control block w-full px-2 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none mt-6"
                type="file"
                id="formFile"
                onChange={onChange}
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="my-2 px-4 py-2 text-center w-full inline-block text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update"}
        </button>
      </form>
      <ToastContainer />

    </div>
    
  );
};

export default UpdateProfile;
