"use client";

import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AuthContext from "@/context/AuthContext";
import { UsernameContext } from "@/context/UserContext";

const UpdateProfile = () => {
  const { username, Email, userid } = useContext(UsernameContext);
  useContext(AuthContext);

  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    id: userid,
    image: null as File | null,
  });
  const [avatarPreview, setAvatarPreview] = useState(
    "https://res.cloudinary.com/devj7oonz/image/upload/v1721205831/blank-profile-picture-973460_960_720_t570pe.png"
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (username) {
      setFormData((prev) => ({
        ...prev,
        name: username,
        email: Email,
        id: userid,
      }));
    }
  }, [username, Email, userid]);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Prepare FormData
      const form = new FormData();
      form.append("name", formData.name);
      form.append("email", formData.email);
      form.append("id", formData.id);
      if (formData.image) {
        form.append("image", formData.image);
      }

      await axios.put("/api/updateprofile", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Profile updated successfully!");
      router.push("/profile");
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type (only allow images)
      const validTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!validTypes.includes(file.type)) {
        toast.error("Please upload a valid image (JPEG or PNG).");
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2 && typeof reader.result === "string") {
          setAvatarPreview(reader.result);
        }
      };
      reader.readAsDataURL(file);
      setFormData((prev) => ({ ...prev, image: file }));
    }
  };

  return (
    <div
      style={{ maxWidth: "480px" }}
      className="mt-1 mb-20 p-4 md:p-7 mx-auto rounded bg-white"
    >
      <form onSubmit={submitHandler}>
        <h2 className="mb-5 text-2xl font-semibold">Update Profile</h2>

        <div className="mb-4">
          <label className="block mb-1">Full Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) =>setFormData((prev) => ({ ...prev, name: e.target.value })) }
            className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 w-full focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input
            type="email"
            value={formData.email}
            readOnly
            className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 w-full focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Avatar</label>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <img
              src={avatarPreview}
              alt="Avatar Preview"
              className="w-14 h-14 rounded-full"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="form-control block w-full px-2 py-1.5 bg-white border rounded-md focus:outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          className={`w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
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
