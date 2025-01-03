"use client";

import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/navigation";
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from "@/components/sidebar/Sidebar";
import "./new.css";
import { ThreeDCardDemo } from "./3d-card";
import FoodForm from "./FoodForm";
import { DriveFolderUploadOutlined } from "@mui/icons-material";

export default function Update({ initialData }) {

  const [file, setFile] = useState(null);
  const [attach, setAttach] = useState("");
  const [tags, setTags] = useState(initialData.TAGS);
  
  const [foodName, setFoodName] = useState(initialData.FOODNAME);
  const [cussine, setCussine] = useState(initialData.CUSSINE);
  const [discount, setDiscount] = useState(initialData.DISCOUNT);
  const [price, setPrice] = useState(initialData.PRICE);
  const [rating, setRating] = useState(initialData.RATINGS);
  const [avatar, setAvatar] = useState(initialData.CloudanaryImageId);
  const [avatarPreview, setAvatarPreview] = useState(initialData.CloudanaryImageId);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const submitHandler = async (e) => {
    e.preventDefault();
    const discountedPrice = price - (price * discount) / 100;

    const formData = new FormData();
    formData.set("foodName", foodName);
    formData.set("cussine", cussine);
    formData.set("discount", discount);
    formData.set("price", price);
    formData.set("discountedPrice", discountedPrice.toString());
    formData.set("rating", rating);
    formData.set("tags", tags);
    formData.set("image", avatar);

    setLoading(true);
    try {
      await axios.put(`/api/menu/${initialData._id}`, formData); // Uncomment and add your endpoint
      router.push("/admin/products");
      toast.success("Product updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update product.");
    } finally {
      setLoading(false);
    }
  };

  const onChange = (e) => {
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

  const Attach = () => {
    if (attach.trim() !== "") {
      setTags((prevTags) => [...prevTags, attach]);
      setAttach("");
    }
  };

  const removeTag = (indexToRemove) => {
    setTags((prevTags) => prevTags.filter((_, index) => index !== indexToRemove));
  };

  const item = {
    CloudanaryImageId: avatarPreview,
    FOODNAME: foodName,
    CUSSINE: cussine,
    DISCOUNT: discount,
    PRICE: price,
    DISCOUNTED_PRICE: price - (price * discount) / 100,
    RATINGS: rating,
    TAGS: tags,
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <div className="top" style={{ margin: "105px 0px 10px 10px " }}>
          <h1>Products</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <ThreeDCardDemo item={item} />
          </div>
          <div className="right">
            <form className="grid md:grid-cols-2 sm:grid-cols-1 justify-start" onSubmit={submitHandler}>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlined className="icon" />
                </label>
                <input
                  className="bg-white border-2 border-black m-[5px] p-2"
                  type="file"
                  id="file"
                  style={{ display: "none" }}
                  onChange={onChange}
                />
              </div>
              <div className="flex flex-row">
                <label htmlFor="foodName" className="flex w-20">Food Name</label>
                <input
                  type="text"
                  id="foodName"
                  className="bg-white border-2 border-black m-[5px] p-2"
                  value={foodName}
                  onChange={(e) => setFoodName(e.target.value)}
                />
              </div>
              <div className="flex flex-row">
                <label className="flex w-20" htmlFor="discount">Discount</label>
                <input
                  className="bg-white border-2 border-black m-[5px] p-2"
                  type="number"
                  id="discount"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                />
              </div>
              <div className="flex flex-row">
                <label className="flex w-20" htmlFor="cussine">Cussine</label>
                <input
                  className="bg-white border-2 border-black m-[5px] p-2"
                  type="text"
                  id="cussine"
                  value={cussine}
                  onChange={(e) => setCussine(e.target.value)}
                />
              </div>
              <div className="flex flex-row">
                <label className="flex w-20" htmlFor="price">Price</label>
                <input
                  className="bg-white border-2 border-black m-[5px] p-2"
                  type="number"
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="flex flex-row">
                <label className="flex w-20" htmlFor="rating">Rating</label>
                <input
                  className="bg-white border-2 border-black m-[5px] p-2"
                  type="number"
                  id="rating"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                />
              </div>
              <div className="flex flex-row">
                <label className="flex w-20" htmlFor="tags">Tags</label>
                <input
                  className="bg-white border-2 border-black m-[5px] p-2"
                  value={attach}
                  onChange={(e) => setAttach(e.target.value)}
                  type="text"
                  id="tags"
                />
                <button type="button" onClick={Attach}>Add</button>
              </div>
              <div className="flex flex-row">
                {tags.map((tag, index) => (
                  <div key={index} className="tag-item">
                    {tag}
                    <button className="bg-red-700 w-2 h-fit p-2 " onClick={() => removeTag(index)}>x</button>
                  </div>
                ))}
              </div>
              <button type="submit">Send</button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
