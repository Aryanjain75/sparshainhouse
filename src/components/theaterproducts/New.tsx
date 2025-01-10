"use client";

import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/navigation";
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from "@/components/sidebar/Sidebar";
import "./new.css";
import { DriveFolderUploadOutlined } from "@mui/icons-material";
import shortid from "shortid";

export default function New() {
  const [file, setFile] = useState(null);
  const [attach, setAttach] = useState("");
  const [id,setid]=useState(shortid.generate());
  const [title, setTitle] = useState("");
  const [imageCaption, setImageCaption] = useState("");
  const [releaseYear, setReleaseYear] = useState({"endYear": null,"year": 0});
  const [rattingSummary,setrattingSummary]=useState({ aggregateRatting:5,voteCount:0});
  const [runtime, setRuntime] = useState({seconds:0});
  const [tags, setTags] = useState([""]);
  const [movieImage, setMovieImage] = useState("");
  const [certificate, setcertificate] = useState("");
  const [reviews,setreviews]=useState("");
  const [reviewstars,setStars]=useState("");
  const [latestTrailer,setlatestTrailer]=useState({});
  const [avatarPreview, setAvatarPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const submitHandler = async (e:any) => {
    e.preventDefault();

    setLoading(true);
    try {
      await axios.post(`https://movieapi-rook.onrender.com/postmovie`, {
        id,
        title, 
        movieImage, 
        imageCaption, 
        releaseYear, 
        rattingSummary,
        runtime, 
        certificate, 
        tags, 
        latestTrailer :[]
      });
      router.push("/admin/theaterproducts");
      toast.success("Movie updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update movie.");
    } finally {
      setLoading(false);
    }
  };

  const onChange = (e:any) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2 && typeof reader.result === "string") {
          setAvatarPreview(reader.result);
        }
      };
      reader.readAsDataURL(file);
      setMovieImage(file);
    }
  };

  const Attach = () => {
    if (attach.trim() !== "") {
      setTags((prevTags) => [...prevTags, attach]);
      setAttach("");
    }
  };

  const removeTag = (indexToRemove:any) => {
    setTags((prevTags) => prevTags.filter((_, index) => index !== indexToRemove));
  };

  const cancelHandler = () => {
    router.push("/admin/theaterproducts");  // Navigates to the movie list or admin products page
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <div className="top" style={{ margin: "105px 0px 10px 10px " }}>
          <h1>Update Movie</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <div key={id} className="relative bg-gray-800 rounded-md w-60" style={{width:"230px"}}>
              <div
                className="sm:w-1/6 h-32 rounded-md bg-cover bg-center w-fit font-black cursor-pointer"
                style={{
                  backgroundImage: `url(${movieImage})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  width: "230px",
                  height: "100%",
                  border: "1px solid white",
                }}
              >
                <div
                  className="bg-opacity-50 text-white text-center rounded-b-lg flex flex-col"
                  style={{ backgroundColor: "rgba(0, 0, 0, 0.50)", height: "100%" }}
                >
                  <div
                    className="flex flex-col flex-grow p-2 text-[#48bfe3]"
                    style={{ height: "220px", display: "flex", justifyContent: "space-around" }}
                  >
                    <h2 className="text-lg font-extrabold font-serif text-gray-800">{title}</h2>
                    <p
                      className="text-gray-600 text-sm"
                      style={{ color: "white", fontWeight: "bolder", height: "65px", overflow: "hidden" }}
                    >
                      {imageCaption}
                    </p>
                    <div className="flex justify-between mt-2 text-white text-sm">
                   
                      <div>
                        <p>
                          <strong>Release Year:</strong> {releaseYear?.year}
                        </p>
                        <p>
                          <strong>Runtime:</strong> {runtime.seconds/3600} hrs {(runtime.seconds/60)%60}min {((runtime.seconds%60)%60)}
                        </p>
                      </div>
                      <div>
                        <p>
                          <strong>Rating:</strong> {rattingSummary?.aggregateRatting} ⭐
                        </p>
                        <p>
                          <strong>Votes:</strong> {rattingSummary?.voteCount}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 flex gap-2">
                      {tags && tags.map((tag,id) => (
                        <span
                          key={id}
                          className="px-2 py-1 bg-[#7E99A3] text-[#4C585B] rounded-md text-xs border-white"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
                <label htmlFor="id" className="flex w-20">id</label>
                <input
                  type="text"
                  id="id"
                  className="bg-white border-2 border-black m-[5px] p-2"
                  value={id}
                  onChange={(e) => setid(e.target.value)}
                />
              </div>
              <div className="flex flex-row">
                <label htmlFor="title" className="flex w-20">Title</label>
                <input
                  type="text"
                  id="title"
                  className="bg-white border-2 border-black m-[5px] p-2"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="flex flex-row">
                <label htmlFor="releaseYear" className="flex w-20">Release Year</label>
                <input
                  type="number"
                  id="releaseYear"
                  className="bg-white border-2 border-black m-[5px] p-2"
                  value={releaseYear.year}
                  onChange={(e) => setReleaseYear({...releaseYear, year: Number(e.target.value)})}
                />
              </div>
              <div className="flex flex-row">
                <label htmlFor="aggregateRatting" className="flex w-20">aggregateRatting</label>
                <input
                  type="number"
                  id="aggregateRatting"
                  className="bg-white border-2 border-black m-[5px] p-2"
                  value={rattingSummary.aggregateRatting}
                  onChange={(e) => setrattingSummary({...rattingSummary, aggregateRatting: parseFloat(e.target.value)})}
                />
              </div>
              <div className="flex flex-row">
                <label htmlFor="runtime" className="flex w-20">runtime</label>
                <input
                  type="number"
                  id="runtime"
                  className="bg-white border-2 border-black m-[5px] p-2"
                  value={runtime.seconds}
                  onChange={(e) => setRuntime({seconds:Number(e.target.value)})}
                />
              </div>
              
              <div className="flex flex-row">
                <label htmlFor="imageCaption" className="flex w-20">image Caption</label>
                <input
                  type="text"
                  id="imageCaption"
                  className="bg-white border-2 border-black m-[5px] p-2"
                  value={imageCaption}
                  onChange={(e) => setImageCaption(e.target.value)}
                />
              </div>
              

              <div className="flex flex-row">
                <label htmlFor="tags" className="flex w-20">Tags</label>
                <input
                  type="text"
                  id="tags"
                  className="bg-white border-2 border-black m-[5px] p-2"
                  value={attach}
                  onChange={(e) => setAttach(e.target.value)}
                />
                <button type="button" onClick={Attach}>Add</button>
              </div>
              <div className="flex flex-row">
                {tags && tags.map((tag, index) => (
                  <div key={index} className="tag-item">
                    {tag}
                    <button
                      type="button"
                      className="bg-red-700 w-2 h-fit p-2"
                      onClick={() => removeTag(index)}
                    >
                      x
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-4">
                <button 
                  type="submit" 
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  disabled={loading}
                >
                  {loading ? "Updating..." : "Update Movie"}
                </button>
                <button
                  type="button"
                  onClick={cancelHandler}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
