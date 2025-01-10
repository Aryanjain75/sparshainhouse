"use client";

import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/navigation";
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from "@/components/sidebar/Sidebar";
import "./new.css";
import { DriveFolderUploadOutlined } from "@mui/icons-material";
interface move{
  "id": string,
  "title":string,
  "movieImage": string,
  "imageCaption":string,
  "releaseYear": {
    "endYear": null,
    "year": number
  },
  "ratingsSummary": {
    "aggregateRating": any,
    "voteCount": number
  },
  "runtime": {
    "seconds": number
  },
  "certificate": null,
  "tags": Array<Array<String>>,
  "latestTrailer": {
    "id": string}| null,
  "reviews": Array<null>,
  "reviewstars": number
}
export default function Update({ movie }:{movie:move}) {
  const [file, setFile] = useState(null);
  const [attach, setAttach] = useState("");
  const [tags, setTags] = useState(movie?.tags.flat());
  const [title, setTitle] = useState(movie?.title);
  const [releaseYear, setReleaseYear] = useState(movie?.releaseYear?.year);
  const [runtime, setRuntime] = useState(Math.round(movie?.runtime?.seconds / 3600));
  const [imageCaption, setImageCaption] = useState(movie?.imageCaption);
  const [movieImage, setMovieImage] = useState(movie?.movieImage);
  const [certificate, setcertificate] = useState(movie?.certificate);
  const [avatarPreview, setAvatarPreview] = useState(movie?.movieImage);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    console.log(movie?.runtime?.seconds);
  }, []);

  const submitHandler = async (e:any) => {
    e.preventDefault();

    setLoading(true);
    try {
      await axios.put(`https://movieapi-rook.onrender.com/in/updatemovie/${movie.id}`, {
        title, movieImage, imageCaption, releaseYear, ratingsSummary:movie?.ratingsSummary, runtime, certificate, tags, latestTrailer :movie?.latestTrailer
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
            <div key={movie?.id} className="relative bg-gray-800 rounded-md w-60" style={{width:"230px"}}>
              <div
                className="sm:w-1/6 h-32 rounded-md bg-cover bg-center w-fit font-black cursor-pointer"
                style={{
                  backgroundImage: `url(${movie?.movieImage})`,
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
                    <h2 className="text-lg font-extrabold font-serif text-gray-800">{movie?.title}</h2>
                    <p
                      className="text-gray-600 text-sm"
                      style={{ color: "white", fontWeight: "bolder", height: "65px", overflow: "hidden" }}
                    >
                      {movie?.imageCaption}
                    </p>
                    <div className="flex justify-between mt-2 text-white text-sm">
                      <div>
                        <p>
                          <strong>Release Year:</strong> {movie?.releaseYear?.year}
                        </p>
                        <p>
                          <strong>Runtime:</strong> {runtime} hrs
                        </p>
                      </div>
                      <div>
                        <p>
                          <strong>Rating:</strong> {movie?.ratingsSummary?.aggregateRating} ⭐
                        </p>
                        <p>
                          <strong>Votes:</strong> {movie?.ratingsSummary?.voteCount}
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
                <label htmlFor="releaseYear" className="flex w-20">Year</label>
                <input
                  type="number"
                  id="releaseYear"
                  className="bg-white border-2 border-black m-[5px] p-2"
                  value={releaseYear}
                  onChange={(e) => setReleaseYear(Number(e.target.value))}
                />
              </div>
              <div className="flex flex-row">
                <label htmlFor="runtime" className="flex w-20">Runtime</label>
                <input
                  type="number"
                  id="runtime"
                  className="bg-white border-2 border-black m-[5px] p-2"
                  value={runtime}
                  onChange={(e) => setRuntime(Number(e.target.value))}
                />
              </div>
              
              <div className="flex flex-row">
                <label htmlFor="imageCaption" className="flex w-20">Caption</label>
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
              <div className="flex flex-row gap-4">
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">Update</button>
                <button type="button" onClick={cancelHandler} className="bg-gray-500 text-white p-2 rounded">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
