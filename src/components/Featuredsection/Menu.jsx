"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./productable.scss";
import Link from "next/link"; // Correct import for Link
import Image from "next/image";
export default function Productable() {
  const [data, setData] = useState([]);
  const [oldData, setOldData] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedRating, setSelectedRating] = useState(null);
  const [selectedCuisine, setSelectedCuisine] = useState("");
  const [priceRange, setPriceRange] = useState([0, 300]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 6;
  const [searchValue, setSearchValue] = useState("");
  const [Tags, setTags] = useState([]);
  const [selectedRows, setSelectedRows] = useState({});
  const [quantities, setQuantities] = useState({});

  const placeholders = [
    "What's the first rule of Fight Club?",
    "Who is Tyler Durden?",
    "Where is Andrew Laeddis hiding?",
    "Write a Javascript method to reverse a string",
    "How to assemble your own PC?",
  ];

  const refresh = () => {
    setData(oldData);
  };

  const fetchTags = async () => {
    try {
      const response = await axios.get("/api/tags");
      setTags(response.data);
      console.log(Tags);
    } catch (error) {
      console.error("Error fetching tags:", error);
    }
  };

  const fetchData = async (
    page = 1,
    search = "",
    rating = null,
    tags = [],
    cuisine = "",
    minPrice = 0,
    maxPrice = 300
  ) => {
    try {
      const response = await axios.get("/api/getMenu", {
        params: {
          page,
          limit: itemsPerPage,
          search,
          rating,
          tags: tags.join(","),
          cuisine,
          minPrice,
          maxPrice,
        },
      });
      setData(response.data.data);
      setOldData(response.data.data);
      setTotalPages(response.data.totalPages);
      setCurrentPage(response.data.currentPage);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchTags();
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchData(
      currentPage,
      searchValue,
      selectedRating,
      selectedTags,
      selectedCuisine,
      priceRange[0],
      priceRange[1]
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTags, selectedRating, selectedCuisine, priceRange, currentPage]);

  const handleChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchValue(value);
    setCurrentPage(1); // Reset to first page
    fetchData(
      1,
      value,
      selectedRating,
      selectedTags,
      selectedCuisine,
      priceRange[0],
      priceRange[1]
    );
  };

  const handleRatingChange = (e) => {
    const value = e.target.value ? parseInt(e.target.value) : null;
    setSelectedRating(value);
    setCurrentPage(1); // Reset to first page
    fetchData(
      1,
      searchValue,
      value,
      selectedTags,
      selectedCuisine,
      priceRange[0],
      priceRange[1]
    );
  };

  const handleCuisineChange = (e) => {
    setSelectedCuisine(e.target.value);
    setCurrentPage(1); // Reset to first page
    fetchData(
      1,
      searchValue,
      selectedRating,
      selectedTags,
      e.target.value,
      priceRange[0],
      priceRange[1]
    );
  };

  const handlePriceRangeChange = (e) => {
    const value = parseInt(e.target.value);
    const newRange =
      e.target.name === "min" ? [value, priceRange[1]] : [priceRange[0], value];
    setPriceRange(newRange);
    setCurrentPage(1); // Reset to first page
    fetchData(
      1,
      searchValue,
      selectedRating,
      selectedTags,
      selectedCuisine,
      newRange[0],
      newRange[1]
    );
  };

  const sortDataBy = (key) => {
    setCurrentPage(1);
    setData((prevData) =>
      [...prevData].sort((a, b) => {
        if (a[key] < b[key]) return -1;
        if (a[key] > b[key]) return 1;
        return 0;
      })
    );
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchData(
      page,
      searchValue,
      selectedRating,
      selectedTags,
      selectedCuisine,
      priceRange[0],
      priceRange[1]
    );
  };

  const handleSelect = (id) => {
    setSelectedRows((prev) => ({ ...prev, [id]: !prev[id] }));
    setQuantities((prev) => ({ ...prev, [id]: 1 }));
  };

  const handleIncrement = (id) => {
    setQuantities((prev) => ({ ...prev, [id]: prev[id] + 1 }));
  };

  const handleDecrement = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: prev[id] > 1 ? prev[id] - 1 : 1,
    }));
  };

  return (
    <div className="productable">
      <div className="shadow-lg flex flex-row flex-wrap p-4 gap-4 bg-white">
        <button
          onClick={refresh}
          className="border border-black rounded p-2 mb-2 hover-animation"
        >
          Refresh
        </button>
        <button
          onClick={() => sortDataBy("FOODNAME")}
          className="border border-black rounded p-2 mb-2 hover-animation bg-white"
        >
          Sort by Food Name
        </button>
        <button
          onClick={() => sortDataBy("CUSSINE")}
          className="border border-black rounded p-2 mb-2 hover-animation bg-white"
        >
          Sort by Cuisine
        </button>
        <button
          onClick={() => sortDataBy("DISCOUNT")}
          className="border border-black rounded p-2 mb-2 hover-animation bg-white"
        >
          Sort by Discount
        </button>
        <button
          onClick={() => sortDataBy("PRICE")}
          className="border border-black rounded p-2 mb-2 hover-animation bg-white"
        >
          Sort by Price
        </button>
        <div className="border border-black rounded p-2 mb-2">
          <label
            htmlFor="rating"
            className="block text-sm font-medium text-gray-900 bg-white"
          >
            Filter by Rating
          </label>
          <select
            id="rating"
            className="mt-1 block w-full bg-blue-100 backdrop:blur-md rounded-3xl bg-white"
            onChange={handleRatingChange}
          >
            <option value="">All Ratings</option>
            <option value="1">1 Star & Up</option>
            <option value="2">2 Stars & Up</option>
            <option value="3">3 Stars & Up</option>
            <option value="4">4 Stars & Up</option>
            <option value="5">5 Stars</option>
          </select>
        </div>
        <div className="border border-black rounded p-2 mb-2 bg-white">
          <label
            htmlFor="cuisine"
            className="block text-sm font-medium text-gray-900 "
          >
            Filter by Cuisine
          </label>
          <select
            id="cuisine"
            className="mt-1 block w-full backdrop:blur-md rounded-3xl bg-blue-100 bg-white"
            onChange={handleCuisineChange}
          >
            <option value="">All Cuisines</option>
            <option value="Italian">Italian</option>
            <option value="Chinese">Chinese</option>
            <option value="Mexican">Mexican</option>
            <option value="Indian">Indian</option>
          </select>
        </div>
        <div className="border border-black rounded p-2 mb-2 bg-white">
          <label className="block text-sm font-medium text-gray-900 bg-white">
            Filter by Price Range
          </label>
          <div className="flex items-center justify-between bg-white">
            <input
              type="number"
              name="min"
              className="w-full mr-2 backdrop:blur-md rounded-3xl bg-blue-100"
              value={priceRange[0]}
              onChange={handlePriceRangeChange}
              placeholder="Min Price"
            />
            <input
              type="number"
              name="max"
              className="w-full ml-2 backdrop:blur-md rounded-3xl bg-blue-100"
              value={priceRange[1]}
              onChange={handlePriceRangeChange}
              placeholder="Max Price"
            />
          </div>
        </div>
      </div>
      <TableContainer component={Paper} className="tablecontainer">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="tableCell">FOODNAME</TableCell>
              <TableCell className="tableCell">PRICE</TableCell>
              <TableCell className="tableCell">RATINGS</TableCell>
              <TableCell className="tableCell">TAGS</TableCell>
              <TableCell className="tableCell">Select</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row._id}>
                <TableCell className="tableCell">
                  <div className="cellWrapper">
                    <Image src={row.CloudanaryImageId} alt="" className="image" />
                    {row.FOODNAME}
                  </div>
                </TableCell>
                <TableCell className="tableCell">{row.PRICE}</TableCell>
                <TableCell className="tableCell">{row.RATINGS}</TableCell>
                <TableCell className="tableCell">{row.TAGS}</TableCell>
                <TableCell className="tableCell">
                  {!selectedRows[row._id] ? (
                    <button onClick={() => handleSelect(row._id)}>Select</button>
                  ) : (
                    <div className="w-24">
                      <div className="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
                        <button
                          data-action="decrement"
                          className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
                          onClick={() => handleDecrement(row._id)}
                        >
                          <span className="m-auto text-2xl font-thin">−</span>
                        </button>
                        <input
                          type="number"
                          className="outline-none focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black md:text-basecursor-default flex items-center text-gray-900 outline-none custom-input-number"
                          name="custom-input-number"
                          value={quantities[row._id]}
                          readOnly
                        />
                        <button
                          data-action="increment"
                          className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
                          onClick={() => handleIncrement(row._id)}
                        >
                          <span className="m-auto text-2xl font-thin">+</span>
                        </button>
                      </div>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="flex justify-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="border border-black rounded p-2 mr-2"
        >
          Previous
        </button>
        <span>{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="border border-black rounded p-2 ml-2"
        >
          Next
        </button>
      </div>
    </div>
  );
}
