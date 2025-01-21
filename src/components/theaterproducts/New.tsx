"use client";

import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "@/components/sidebar/Sidebar";
import "./new.css";
import { DriveFolderUploadOutlined } from "@mui/icons-material";
import shortid from "shortid";
import TextField from "@mui/material/TextField";
import { Button, Chip } from "@mui/material";

export default function New() {
  const [file, setFile] = useState<File | null>(null);
  const [attach, setAttach] = useState("");
  const [id, setId] = useState(shortid.generate());
  const [title, setTitle] = useState("");
  const [imageCaption, setImageCaption] = useState("");
  const [releaseYear, setReleaseYear] = useState({ endYear: null, year: 0 });
  const [ratingSummary, setRatingSummary] = useState({
    aggregateRating: 5,
    voteCount: 0,
  });
  const [runtime, setRuntime] = useState({ seconds: 0 });
  const [tags, setTags] = useState<string[]>([]);
  const [movieImage, setMovieImage] = useState<string>("");
  const [certificate, setCertificate] = useState("");
  const [latestTrailer, setLatestTrailer] = useState<any>({});
  const [avatarPreview, setAvatarPreview] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(`https://movieapi-rook.onrender.com/postmovie`, {
        id,
        title,
        movieImage,
        imageCaption,
        releaseYear,
        ratingSummary,
        runtime,
        certificate,
        tags,
        latestTrailer: [],
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
      setMovieImage(URL.createObjectURL(file));
    }
  };

  const attachTag = () => {
    if (attach.trim() !== "") {
      setTags((prevTags) => [...prevTags, attach]);
      setAttach("");
    }
  };

  const removeTag = (indexToRemove: number) => {
    setTags((prevTags) => prevTags.filter((_, index) => index !== indexToRemove));
  };

  const cancelHandler = () => {
    router.push("/admin/theaterproducts");
  };

  return (
    <>
      <div className="new">
        <Sidebar />
        <div className="newContainer">
          <div className="top" style={{ margin: "105px 0px 10px 10px " }}>
            <h1 className="text-2xl font-bold text-gray-800">Update Movie</h1>
          </div>
          <div className="bottom flex flex-col md:flex-row gap-8 p-6">
            <div className="left w-full md:w-1/3">
              <div
                key={id}
                className="relative bg-gray-800 rounded-lg shadow-xl overflow-hidden"
                style={{ maxWidth: "300px" }}
              >
                <div
                  className="aspect-[2/3] rounded-t-lg bg-cover bg-center cursor-pointer transition-transform hover:scale-105"
                  style={{
                    backgroundImage: `url(${movieImage})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    border: "2px solid white",
                  }}
                >
                  <div className="h-full bg-gradient-to-t from-black/80 to-transparent">
                    <div className="flex flex-col h-full justify-end p-4 space-y-3">
                      <h2 className="text-xl font-bold text-white">{title}</h2>
                      <p className="text-gray-200 text-sm line-clamp-3">
                        {imageCaption}
                      </p>
                      <div className="grid grid-cols-2 gap-4 text-white text-sm">
                        <div>
                          <p className="flex items-center gap-1">
                            <span className="font-semibold">Release:</span>{" "}
                            {releaseYear?.year}
                          </p>
                          <p className="flex items-center gap-1">
                            <span className="font-semibold">Runtime:</span>{" "}
                            {Math.floor(runtime.seconds / 3600)} hrs{" "}
                            {(runtime.seconds / 60) % 60} min
                          </p>
                        </div>
                        <div>
                          <p className="flex items-center gap-1">
                            <span className="font-semibold">Rating:</span>{" "}
                            {ratingSummary?.aggregateRating} ⭐
                          </p>
                          <p className="flex items-center gap-1">
                            <span className="font-semibold">Votes:</span>{" "}
                            {ratingSummary?.voteCount}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {tags &&
                          tags.map((tag, id) => (
                            <span
                              key={id}
                              className="px-3 py-1 bg-white/20 text-white rounded-full text-xs backdrop-blur-sm"
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
            <div className="right w-full md:w-2/3">
              <form
                className="grid md:grid-cols-2 gap-8"
                onSubmit={submitHandler}
              >
                <div className="formInput col-span-2">
                  <Button
                    component="label"
                    variant="outlined"
                    startIcon={<DriveFolderUploadOutlined />}
                    sx={{ width: "100%", p: 2, borderStyle: "dashed" }}
                  >
                    Upload Image
                    <input
                      type="file"
                      id="file"
                      hidden
                      onChange={onChange}
                      accept="image/*"
                    />
                  </Button>
                </div>

                <TextField
                  label="Movie ID"
                  variant="outlined"
                  fullWidth
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                />

                <TextField
                  label="Title"
                  variant="outlined"
                  fullWidth
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />

                <TextField
                  label="Release Year"
                  type="number"
                  variant="outlined"
                  fullWidth
                  value={releaseYear.year}
                  onChange={(e) =>
                    setReleaseYear({
                      ...releaseYear,
                      year: Number(e.target.value),
                    })
                  }
                />

                <TextField
                  label="Rating"
                  type="number"
                  variant="outlined"
                  fullWidth
                  inputProps={{ step: 0.1, min: 0, max: 10 }}
                  value={ratingSummary.aggregateRating}
                  onChange={(e) =>
                    setRatingSummary({
                      ...ratingSummary,
                      aggregateRating: parseFloat(e.target.value),
                    })
                  }
                />

                <TextField
                  label="Runtime (seconds)"
                  type="number"
                  variant="outlined"
                  fullWidth
                  value={runtime.seconds}
                  onChange={(e) =>
                    setRuntime({ seconds: Number(e.target.value) })
                  }
                />

                <TextField
                  label="Image Caption"
                  variant="outlined"
                  fullWidth
                  value={imageCaption}
                  onChange={(e) => setImageCaption(e.target.value)}
                />

                <div className="col-span-2 space-y-4">
                  <div className="flex gap-3">
                    <TextField
                      label="Add tags..."
                      variant="outlined"
                      fullWidth
                      value={attach}
                      onChange={(e) => setAttach(e.target.value)}
                    />
                    <Button variant="contained" onClick={attachTag} sx={{ px: 4 }}>
                      Add Tag
                    </Button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {tags &&
                      tags.map((tag, index) => (
                        <Chip
                          key={index}
                          label={tag}
                          onDelete={() => removeTag(index)}
                          sx={{ m: 0.5 }}
                        />
                      ))}
                  </div>
                </div>

                <div className="col-span-2 flex justify-end gap-4 mt-8">
                  <Button variant="outlined" onClick={cancelHandler}>
                    Cancel
                  </Button>
                  <Button variant="contained" type="submit" disabled={loading}>
                    {loading ? "Updating..." : "Update"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

