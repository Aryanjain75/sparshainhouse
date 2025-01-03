"use client";

import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';
import { DriveFolderUploadOutlined } from "@mui/icons-material";
import "./new.css";

interface FoodFormProps {
  initialData?: {
    foodName: string;
    cussine: string;
    discount: string;
    price: string;
    rating: string;
    tags: string[];
    avatarPreview: string;
  };
  onSubmit: (data: any) => void;
  buttonText: string;
}

const FoodForm: React.FC<FoodFormProps> = ({ initialData, onSubmit, buttonText }) => {
  const [attach, setAttach] = useState("");
  const [tags, setTags] = useState<string[]>(initialData?.tags || []);
  
  const [foodName, setFoodName] = useState(initialData?.foodName || "");
  const [cussine, setCussine] = useState(initialData?.cussine || "");
  const [discount, setDiscount] = useState(initialData?.discount || "");
  const [price, setPrice] = useState(initialData?.price || "");
  const [rating, setRating] = useState(initialData?.rating || "");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState(initialData?.avatarPreview || "");

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const discountedPrice = parseFloat(price) - (parseFloat(price) * parseFloat(discount)) / 100;

    const formData = new FormData();
    formData.set("foodName", foodName);
    formData.set("cussine", cussine);
    formData.set("discount", discount);
    formData.set("price", price);
    formData.set("discountedPrice", discountedPrice.toString());
    formData.set("rating", rating);
    formData.set("tags", JSON.stringify(tags));
    if (avatar) formData.set("image", avatar);

    onSubmit(formData);
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

  const Attach = () => {
    if (attach.trim() !== "") {
      setTags((prevTags) => [...prevTags, attach]);
      setAttach("");
    }
  };

  const removeTag = (indexToRemove: number) => {
    setTags((prevTags) => prevTags.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div>
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
              <button className="bg-red-700 w-2 h-1 " onClick={() => removeTag(index)} >x</button>
            </div>
          ))}
        </div>
        <button type="submit">{buttonText}</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default FoodForm;
