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
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link"; 
import "./productable.scss";
import CircularProgress from "@mui/material/CircularProgress";

export default function Productable() {
  const [moviesData, setMoviesData] = useState([]);
  const [loading, setLoading] = useState(false);  // Loading state
  const [deleteLoading, setDeleteLoading] = useState({state:false,id:""});  // Delete button loading
  const [filters, setFilters] = useState({ searchValue: "", selectedRating: null });
  const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1 });
  const itemsPerPage = 6;

  const fetchData = async (page = 1) => {
    setLoading(true);
    try {
      const movieResponse = await axios.get(`https://movieapi-rook.onrender.com/getmovies?title=${filters.searchValue}&start=${(page - 1) * itemsPerPage}&end=${page * itemsPerPage}`);
      setPagination({
        currentPage: page,
        totalPages: Math.ceil(movieResponse.data.size / itemsPerPage) || 1,
      });
      setMoviesData(movieResponse.data.paginated || []);
    } catch (error) {
      toast.error("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setDeleteLoading({state:true,id:id});
    try {
      await axios.delete(`https://movieapi-rook.onrender.com/in/deletemovie/${id}`);
      fetchData(pagination.currentPage);
    } catch (error) {
      toast.error("Error deleting item");
    } finally {
      setDeleteLoading({state:false,id:id});
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData(pagination.currentPage);
  }, [pagination.currentPage]);

  const handlePageChange = (page) => {
    setPagination((prev) => ({ ...prev, currentPage: page }));
  };

  return (
    <div className="productable">
      {loading ? (
        <div className="flex justify-center p-4">
          <CircularProgress />
        </div>
      ) : (
        <TableContainer component={Paper} className="tablecontainer">
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className="tableCell">Id</TableCell>
                <TableCell className="tableCell">Title</TableCell>
                <TableCell className="tableCell">Certificate</TableCell>
                <TableCell className="tableCell">Release Year</TableCell>
                <TableCell className="tableCell">Rating</TableCell>
                <TableCell className="tableCell">Vote Count</TableCell>
                <TableCell className="tableCell">Runtime (seconds)</TableCell>
                <TableCell className="tableCell">Genres</TableCell>
                <TableCell className="tableCell">View</TableCell>
                <TableCell className="tableCell">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {moviesData.map((row, id) => (
                <TableRow key={id}>
                  <TableCell className="tableCell">{row.id}</TableCell>
                  <TableCell className="tableCell">
                    <div className="cellWrapper">
                      <img src={row.movieImage} alt="" className="image" />
                      {row.imageCaption}
                    </div>
                  </TableCell>
                  <TableCell className="tableCell">N/A</TableCell>
                  <TableCell className="tableCell">{row.releaseYear || "N/A"}</TableCell>
                  <TableCell className="tableCell">{row.ratingsSummary?.aggregateRating || "N/A"}</TableCell>
                  <TableCell className="tableCell">{row.ratingsSummary?.voteCount || 0}</TableCell>
                  <TableCell className="tableCell">{row.runtime || "N/A"}</TableCell>
                  <TableCell className="tableCell">{row.tags.join(", ") || "N/A"}</TableCell>
                  <TableCell className="tableCell">
                    <Link href={`/admin/theaterproducts/${row.id}`}>
                      <span>VIEW</span>
                    </Link>
                  </TableCell>
                  <TableCell className="tableCell">
                  <button
                  className="status bg-red-700 text-white rounded-[10px] p-2 cursor-pointer"
                  onClick={() => handleDelete(row.id)}
                  disabled={deleteLoading.state && deleteLoading.id === row.id}
                >
                  {deleteLoading.state && deleteLoading.id === row.id ? "Deleting..." : "DELETE"}
                </button>
                
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => handlePageChange(pagination.currentPage - 1)}
          disabled={pagination.currentPage === 1 || loading}
          className="border border-black rounded p-2 mr-2"
        >
          Previous
        </button>
        <span>{`Page ${pagination.currentPage} of ${pagination.totalPages}`}</span>
        <button
          onClick={() => handlePageChange(pagination.currentPage + 1)}
          disabled={pagination.currentPage === pagination.totalPages || loading}
          className="border border-black rounded p-2 ml-2"
        >
          Next
        </button>
      </div>
    </div>
  );
}
