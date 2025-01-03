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
      console.log(data);
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
useEffect(()=>{console.log(data)},[data]);
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

  const handleTagChange = (tag) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];
    setSelectedTags(newTags);
    setCurrentPage(1); // Reset to first page
    fetchData(
      1,
      searchValue,
      selectedRating,
      newTags,
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

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/menu/${id}`);
      fetchData(currentPage, searchValue, selectedRating, selectedTags, selectedCuisine, priceRange[0], priceRange[1]);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <div className="productable">
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
      />
      <div className="shadow-lg flex flex-row flex-wrap p-4 gap-4">
        <button
          onClick={refresh}
          className="border border-black rounded p-2 mb-2 hover-animation"
        >
          Refresh
        </button>
        <button
          onClick={() => sortDataBy("FOODNAME")}
          className="border border-black rounded p-2 mb-2 hover-animation"
        >
          Sort by Food Name
        </button>
        <button
          onClick={() => sortDataBy("CUSSINE")}
          className="border border-black rounded p-2 mb-2 hover-animation"
        >
          Sort by Cuisine
        </button>
        <button
          onClick={() => sortDataBy("DISCOUNT")}
          className="border border-black rounded p-2 mb-2 hover-animation"
        >
          Sort by Discount
        </button>
        <button
          onClick={() => sortDataBy("PRICE")}
          className="border border-black rounded p-2 mb-2 hover-animation"
        >
          Sort by Price
        </button>
        <div className="border border-black rounded p-2 mb-2">
          <label
            htmlFor="rating"
            className="block text-sm font-medium text-gray-900"
          >
            Filter by Rating
          </label>
          <select
            id="rating"
            className="mt-1 block w-full bg-blue-100 backdrop:blur-md rounded-3xl"
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
        <div className="border border-black rounded p-2 mb-2">
          <label
            htmlFor="cuisine"
            className="block text-sm font-medium text-gray-900"
          >
            Filter by Cuisine
          </label>
          <select
            id="cuisine"
            className="mt-1 block w-full backdrop:blur-md rounded-3xl bg-blue-100"
            onChange={handleCuisineChange}
          >
            <option value="">All Cuisines</option>
            <option value="Italian">Italian</option>
            <option value="Chinese">Chinese</option>
            <option value="Mexican">Mexican</option>
            <option value="Indian">Indian</option>
          </select>
        </div>
        <div className="border border-black rounded p-2 mb-2">
          <label className="block text-sm font-medium text-gray-900">
            Filter by Price Range
          </label>
          <div className="flex items-center justify-between">
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
              <TableCell className="tableCell">Id</TableCell>
              <TableCell className="tableCell">FOODNAME</TableCell>
              <TableCell className="tableCell">DISCOUNT</TableCell>
              <TableCell className="tableCell">CUSSINE</TableCell>
              <TableCell className="tableCell">PRICE</TableCell>
              <TableCell className="tableCell">RATINGS</TableCell>
              <TableCell className="tableCell">TAGS</TableCell>
              <TableCell className="tableCell">VIEW</TableCell>
              <TableCell className="tableCell">DELETE</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row._id}>
                <TableCell className="tableCell">{row._id}</TableCell>
                <TableCell className="tableCell">
                  <div className="cellWrapper">
                    <img src={row.CloudanaryImageId} alt="" className="image" />
                    {row.FOODNAME}
                  </div>
                </TableCell>
                <TableCell className="tableCell">{row.DISCOUNT}</TableCell>
                <TableCell className="tableCell">{row.CUSSINE}</TableCell>
                <TableCell className="tableCell">{row.PRICE}</TableCell>
                <TableCell className="tableCell">{row.RATINGS}</TableCell>
                <TableCell className="tableCell">{row.TAGS.join(",")}</TableCell>
                <TableCell className="tableCell">
                  <Link href={`/admin/foodproducts/${row._id}`}>
                    <span>VIEW</span>
                  </Link>
                </TableCell>
                <TableCell className="tableCell">
                  <button
                    className={`status ${row.status}`}
                    onClick={() => handleDelete(row._id)}
                  >
                    DELETE
                  </button>
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
};
