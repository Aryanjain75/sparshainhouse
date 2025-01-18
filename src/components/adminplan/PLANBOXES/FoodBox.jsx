import React, { useContext } from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Link from "next/link";
import { PlanContext } from "@/context/PlanContext";
function FoodBox() {
  const {foodItemSelected,setFoodItemSelected,data, setData}=useContext(PlanContext);
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
    "Search for your favorite Indian curry",
    "Looking for spicy Thai dishes?",
    "Find the best Italian pasta",
    "Craving some Mexican tacos?",
    "Discover authentic Chinese cuisine",
  ];
  const refresh = () => {
    setData(oldData);
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
      const respons = await axios.get("/api/tags");
      setTags(respons.data);
      setData(response.data.data);
      setOldData(response.data.data);
      setTotalPages(response.data.totalPages);
      setCurrentPage(response.data.currentPage);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
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
  }, [
    selectedTags,
    selectedRating,
    selectedCuisine,
    priceRange,
    currentPage,
    searchValue,
  ]);
  const handleChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchValue(value);
    setCurrentPage(1);
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
    setCurrentPage(1);
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
    setCurrentPage(1);
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
    setCurrentPage(1);
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
    setCurrentPage(1);
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
  function handleBuy(id) {
    setFoodItemSelected((prev) => {
      const existingItem = prev.find((item) => item.id === id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === id ? { ...item, count: item.count + 1 } : item
        );
      }
      return [...prev, { id, count: 1 }];
    });
  }

  function handleDecrement(id) {
    setFoodItemSelected((prev) => {
      const existingItem = prev.find((item) => item.id === id);
      if (existingItem && existingItem.count > 1) {
        return prev.map((item) =>
          item.id === id ? { ...item, count: item.count - 1 } : item
        );
      }
      return prev.filter((item) => item.id !== id); // Remove item if count reaches 0
    });
  }

  function remove(id) {
    setFoodItemSelected((prev) => prev.filter((item) => item.id !== id));
  }


 
  return (
    <>
      <div className="flex justify-center pt-20 pb-10">
        <h1 className="text-black font-extrabold text-5xl sm:text-7xl p-6 text-center">
          Food Items & Movie Items
        </h1>
      </div>

      <div className="productable">
        <PlaceholdersAndVanishInput
          placeholders={placeholders}
          onChange={handleChange}
        />
        <div
          className="shadow-lg flex flex-row flex-wrap p-4 gap-4 text-lg"
          style={{
            fontSize: "large",
            display: "flex",
            width: "fit-content",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: "4px",
          }}
        >
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
                <TableCell className="tableCell">SELECT</TableCell>
                <TableCell className="tableCell">DELETE</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((row) => (
                <TableRow key={row._id}>
                  <TableCell className="tableCell">{row._id}</TableCell>
                  <TableCell className="tableCell">
                    <div className="cellWrapper">
                      <img
                        src={row.CloudanaryImageId}
                        alt=""
                        className="image"
                      />
                      {row.FOODNAME}
                    </div>
                  </TableCell>
                  <TableCell className="tableCell">{row.DISCOUNT}</TableCell>
                  <TableCell className="tableCell">{row.CUSSINE}</TableCell>
                  <TableCell className="tableCell">{row.PRICE}</TableCell>
                  <TableCell className="tableCell">{row.RATINGS}</TableCell>
                  <TableCell className="tableCell">
                    {row.TAGS.join(",")}
                  </TableCell>
                  <TableCell className="tableCell">
                      {foodItemSelected.some((item) => item.id === row._id) ? (
                        <div className="flex items-center w-max">
                          <div className="flex items-center w-max">
                            <button
                              className="bg-gray-300 text-gray-600 hover:bg-gray-400 h-8 w-8 rounded-l flex items-center justify-center"
                              onClick={() => handleDecrement(row._id)}
                            >
                              <span className="text-xl">−</span>
                            </button>
                            <input
                              type="number"
                              className="w-full text-center bg-gray-100 border-t border-b border-gray-300" 
                              value={
                                foodItemSelected.find(
                                  (item) => item.id === row._id
                                )?.count || 0
                              }
                              readOnly
                            />
                            <button
                              className="bg-gray-300 text-gray-600 hover:bg-gray-400 h-8 w-8 rounded-r flex items-center justify-center"
                              onClick={() => handleBuy(row._id)}
                            >
                              <span className="text-xl">+</span>
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleBuy(row._id)}
                          className="px-4 py-2 rounded-xl bg-black text-white text-xs font-bold w-max"
                        >
                          Add to Cart →
                        </button>
                      )}
                    </TableCell>
                  <TableCell className="tableCell">
                  <button
                  onClick={() => remove(row._id)}
                  className="px-4 py-2 rounded-xl bg-black text-white text-xs font-bold"
                >
                  Remove
                </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div className="flex justify-center mt-4" style={{fontSize:"small"}}>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="border border-black rounded p-2 mr-2"
          >
            Previous
          </button>
          <span >{`Page ${currentPage} of ${totalPages}`}</span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="border border-black rounded p-2 ml-2"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default FoodBox;
