"use client";

import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/navigation";
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from "@/components/sidebar/Sidebar";
import { DriveFolderUploadOutlined } from "@mui/icons-material";
import "./new.css";
import Rating from '@mui/material/Rating';

export function New() {
  const [file, setFile] = useState(null);
  const [attach, setAttach] = useState("");
  const [movietags, setMovieTags] = useState([]);
  const [heroattach, setHeroAttach] = useState("");
  const [movieherotags, setMovieHeroTags] = useState([]);
  const [titleText, setTitleText] = useState("");
  const [titleType, setTitleType] = useState("");
  const [originalTitleText, setOriginalTitleText] = useState("");
  const [primaryImage, setPrimaryImage] = useState(null);
  const [primaryImagePreview, setPrimaryImagePreview] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [ratingsSammary, setRatingsSammary] = useState(0);
  const [runtime, setRuntime] = useState(0);
  const [certificateratting, setCertificateRating] = useState("");
  const [canRate, setCanRate] = useState(true);
  const [titleGenres, setTitleGenres] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const submitHandler = async (e) => {
    e.preventDefault();
   ;
const data={
  "titleText":titleText,
  "titleType":titleType,
  "originalTitleText":originalTitleText,
  "primaryImage":primaryImagePreview,
  "heros":movieherotags,
  "releaseYear":releaseYear,
  "ratingsSammary":ratingsSammary,
  "runtime":runtime,
  "certificateratting":certificateratting,
  "canRate":canRate,
  "titleGenres":movietags
}
    setLoading(true);
    try {
      const e=await axios.post('/api/movies', data);
      router.push("/admin/movies");
      toast.success("Movie added successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add movie.");
    } finally {
      setLoading(false);
    }
  };

  const onChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      console.log(reader);
      reader.onload = () => {
        if (reader.readyState === 2 && typeof reader.result === "string") {
          setPrimaryImagePreview(reader.result);
        }
      };
      reader.readAsDataURL(file);
      setPrimaryImage(file);
      console.log(primaryImage);
    }
  };

  const Attach = () => {
    if (attach.trim() !== "") {
      setMovieTags((prevTags) => [...prevTags, attach]);
      setAttach("");
    }
  };

  const AttachHero = () => {
    if (heroattach.trim() !== "") {
      setMovieHeroTags((prevTags) => [...prevTags, heroattach]);
      setHeroAttach("");
    }
  };

  const removeTag = (indexToRemove, tagType) => {
    if (tagType === "movie") {
      setMovieTags((prevTags) => prevTags.filter((_, index) => index !== indexToRemove));
    } else {
      setMovieHeroTags((prevTags) => prevTags.filter((_, index) => index !== indexToRemove));
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <div className="top" style={{ margin: "105px 0px 10px 10px " }}>
          <h1>Movies</h1>
        </div>
        <div className="flex">
          <div style={{
            width: "34rem",
            borderRadius: "14px",
            border: "2px solid black",
            height: "20rem",
            margin: "12px",
            background: `url(${primaryImagePreview})`,
            backgroundSize: "cover",
          }}>
            <div
              style={{
                borderRadius: "14px",
                height: "20rem",
                padding: "1rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                background: "#ffffff38",
                backdropFilter: "blur(1px)"
              }}>
              <div className="font-extrabold text-5xl">{titleText}</div>
              <div className="flex">
                <div style={{
                  border: "2px solid black",
                  display: "flex",
                  width: "fit-content",
                  borderRadius: "12px",
                  backgroundColor: "#f0f8ff70",
                  padding: "4px",
                  fontWeight: "700"
                }}>{titleType}</div>
                <div className="flex flex-row flex-wrap justify-normal w-fit" style={{
                  width: "fit-content",
                  borderLeft: "none",
                  borderRadius: "21px",
                  background: "black",
                  color: "white",
                  paddingLeft: "12px",
                  paddingRight: "12px",
                  fontWeight: "900",
                  fontFamily: "emoji",
                  fontStyle: "oblique",
                  textShadow: "3px 4px 11px white",
                  boxShadow: "0px 0px 14px 7px black",
                  gap: "1rem"
                }}>
                  {movietags.map((item, index) => (
                    <span key={index}>{item}</span>
                  ))}
                </div>
              </div>
              <div
                style={{
                  fontFamily: "emoji",
                  fontStyle: "oblique",
                  display: "flex",
                  flexBasis: "fit-content",
                  flexWrap: "wrap",
                  border: "2px solid black",
                  fontWeight: "700",
                  borderRadius: "12px"
                }}>
                <div className="font-extrabold">Heros:</div>
                {movieherotags.map((item, index) => (
                  <span key={index}>{item},</span>
                ))}
              </div>
              <div style={{ display: "flex", flexDirection: "row ", justifyContent: "space-evenly " }}>
                <div>{parseInt((runtime/60)/60)} hours {parseInt(runtime/60)%60} minutes{runtime%60} seconds</div>
                <div>{releaseYear}</div>
              </div>
              <div style={{ transform: "translate3d(30px, 32px, 0px)" }}>
                <Rating name="customized-10" value={Number(ratingsSammary)} max={10} />
              </div>
              <div className="flex flex-row">
                <div
                  style={{
                    display: "flex",
                    width: "fit-content",
                    border: "2px solid black",
                    borderRadius: "12px",
                    padding: "4px",
                    fontSize: "x-small",
                    fontWeight: "900"
                  }}>{certificateratting}</div>
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
                <label htmlFor="titleText" className="flex w-20">Title Text</label>
                <input
                  type="text"
                  id="titleText"
                  className="bg-white border-2 border-black m-[5px] p-2"
                  value={titleText}
                  onChange={(e) => setTitleText(e.target.value)}
                />
              </div>
              <div className="flex flex-row">
                <label className="flex w-20" htmlFor="titleType">Title Type</label>
                <input
                  className="bg-white border-2 border-black m-[5px] p-2"
                  type="text"
                  id="titleType"
                  value={titleType}
                  onChange={(e) => setTitleType(e.target.value)}
                />
              </div>
              <div className="flex flex-row">
                <label className="flex w-20" htmlFor="originalTitleText">Original Title</label>
                <input
                  className="bg-white border-2 border-black m-[5px] p-2"
                  type="text"
                  id="originalTitleText"
                  value={originalTitleText}
                  onChange={(e) => setOriginalTitleText(e.target.value)}
                />
              </div>
              <div className="flex flex-row">
                <label className="flex w-20" htmlFor="releaseYear">Year</label>
                <input
                  className="bg-white border-2 border-black m-[5px] p-2"
                  type="number"
                  id="releaseYear"
                  value={releaseYear}
                  onChange={(e) => setReleaseYear(e.target.value)}
                />
              </div>
              <div className="flex flex-row">
                <label className="flex w-20" htmlFor="runtime">Runtime</label>
                <input
                  className="bg-white border-2 border-black m-[5px] p-2"
                  type="number"
                  id="runtime"
                  value={runtime}
                  onChange={(e) => setRuntime(e.target.value)}
                />
              </div>
              <div className="flex flex-row">
                <label className="flex w-20" htmlFor="certificateratting">Certificate</label>
                <input
                  className="bg-white border-2 border-black m-[5px] p-2"
                  type="text"
                  id="certificateratting"
                  value={certificateratting}
                  onChange={(e) => setCertificateRating(e.target.value)}
                />
              </div>
              <div className="flex flex-row">
                <label className="flex w-20" htmlFor="canRate">Can Rate</label>
                <input
                  className="bg-white border-2 border-black m-[5px] p-2"
                  type="checkbox"
                  id="canRate"
                  checked={canRate}
                  onChange={(e) => setCanRate(e.target.checked)}
                />
              </div>
              <div className="flex flex-row">
                <label className="flex w-20" htmlFor="ratingsSammary">Rating</label>
                <input
                  className="bg-white border-2 border-black m-[5px] p-2"
                  type="number"
                  id="ratingsSammary"
                  value={ratingsSammary}
                  onChange={(e) => setRatingsSammary(e.target.value)}
                />
              </div>
              <div className="flex flex-row">
                <label className="flex w-20" htmlFor="movietags">Movie Tags</label>
                <input
                  className="bg-white border-2 border-black m-[5px] p-2"
                  value={attach}
                  onChange={(e) => setAttach(e.target.value)}
                  type="text"
                  id="movietags"
                />
                <button type="button" onClick={Attach}>Add</button>
              </div>
              <div className="flex flex-row">
                {movietags.map((tag, index) => (
                  <div key={index} className="tag-item">
                    {tag}
                    <button className="bg-red-700 w-2 h-fit p-2" onClick={() => removeTag(index, "movie")}>x</button>
                  </div>
                ))}
              </div>
              <div className="flex flex-row">
                <label className="flex w-20" htmlFor="movieherotags">Movie Hero Tags</label>
                <input
                  className="bg-white border-2 border-black m-[5px] p-2"
                  value={heroattach}
                  onChange={(e) => setHeroAttach(e.target.value)}
                  type="text"
                  id="movieherotags"
                />
                <button type="button" onClick={AttachHero}>Add</button>
              </div>
              <div className="flex flex-row">
                {movieherotags.map((tag, index) => (
                  <div key={index} className="tag-item">
                    {tag}
                    <button className="bg-red-700 w-2 h-fit p-2" onClick={() => removeTag(index, "hero")}>x</button>
                  </div>
                ))}
              </div>
              <button type="submit" disabled={loading}>Send</button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
