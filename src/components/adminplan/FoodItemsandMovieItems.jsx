import React from "react";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import Pagination from "@mui/material/Pagination";
import FoodBox from "./PLANBOXES/FoodBox";
import MovieBox from "./PLANBOXES/MovieBox";
import { PlanContext } from "@/context/PlanContext";

function FoodItemsandMovieItems({finalData, setfinalData, orders}) {
  const {   
    foodItemSelected,
    setFoodItemSelected,
    MovieItemSelected, 
    setMovieItemSelected,
    MoviehallItemSelected,
    setMoviehallItemSelected,
    TheaterJson,
    data,
    moviesData
  } = useContext(PlanContext);

  useEffect(() => {
    if (!TheaterJson || !data || !moviesData) return;

    setfinalData({
      ...finalData,
      FoodItemsandMovieItems: {
        FoodItems: foodItemSelected.map((d) => {
          const selectedFood = data.find(item => item._id === d.id);
          return { food: selectedFood, count: d.count };
        }),
        Movie: moviesData.find(item => item.id === MovieItemSelected),
        Moviehall: TheaterJson[MoviehallItemSelected]
      }
    });
    console.log(finalData);
  }, [foodItemSelected, MovieItemSelected, MoviehallItemSelected, TheaterJson, data, moviesData]);
  if (!TheaterJson) {
    return <div>Loading theater data...</div>;
  }
  
  return (
    <>
    <FoodBox/>
    <MovieBox/>
      <div className="text-black font-bold align-center" style={{fontSize:"large"}}>Movie Hall</div>
      <div className="flex overflow-auto gap-2" style={{fontSize:"small"}}>
        {Object.entries(TheaterJson).map(([id, val]) => (
          <label key={id} className="relative cursor-pointer">
            <input
              type="radio"
              name="SeatingArrangement"
              value={id}
              checked={MoviehallItemSelected === id}
              onChange={() => setMoviehallItemSelected(id)}
              className="absolute top-2 right-2 z-10 hidden"
            />
            <div
              style={{
                backgroundImage: `url(${val.Imageurl})`,
                height: "157px",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                width: "208px",
                color: "white",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "11px",
                border: MoviehallItemSelected === id
                  ? "2px solid #4CAF50"
                  : "1px solid white",
                borderRadius: "15px",
              }}
            >
              <p>{val.caption}</p>
              <p>
                Rs.
                {typeof val.Price === "number"
                  ? val.Price * parseInt(orders?.numberOfSeats || "1")
                  : val.Price} for one person
              </p>
            </div>
          </label>
        ))}
      </div>
    </>
  );
}

export default FoodItemsandMovieItems;
