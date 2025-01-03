"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Link from "next/link"; // Correct import for Link
import "./productable.scss";
export default function Productable() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 6;
  const [searchValue, setSearchValue] = useState("");

  const fetchData = async (
    page = 1,
  ) => {
    try {
      const response = await axios.get("/api/movies", {
        params: {
          page,
          limit: itemsPerPage,
        },
      });
      setData(response.data.data);
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
    fetchData(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/movies/${id}`);
      fetchData(currentPage, searchValue, selectedRating, selectedTags, selectedCuisine, priceRange[0], priceRange[1]);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <div className="productable">
      <TableContainer component={Paper} className="tablecontainer">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="tableCell">Id</TableCell>
              <TableCell className="tableCell">Title</TableCell>
              <TableCell className="tableCell">Type</TableCell>
              <TableCell className="tableCell">Release Year</TableCell>
              <TableCell className="tableCell">Rating</TableCell>
              <TableCell className="tableCell">Genres</TableCell>
              <TableCell className="tableCell">View</TableCell>
              <TableCell className="tableCell">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data && data.map((row) => (
              <TableRow key={row._id}>
                <TableCell className="tableCell">{row._id}</TableCell>
                <TableCell className="tableCell">
                  <div className="cellWrapper">
                    <img src={row.primaryImage} alt="" className="image" />
                    {row.titleText}
                  </div>
                </TableCell>
                <TableCell className="tableCell">{row.titleType}</TableCell>
                <TableCell className="tableCell">{row.releaseYear}</TableCell>
                <TableCell className="tableCell">{row.ratingsSammary}</TableCell>
                <TableCell className="tableCell">{row.titleGenres.join(", ")}</TableCell>
                <TableCell className="tableCell">
                  <Link href={`/admin/products/${row._id}`}>
                    <span>VIEW</span>
                  </Link>
                </TableCell>
                <TableCell className="tableCell">
                  <button
                    className="status"
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
}
