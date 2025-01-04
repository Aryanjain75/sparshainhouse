
/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useRef, useState, useEffect,useContext } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Rating from "@mui/material/Rating";
import Pagination from "@mui/material/Pagination";
import axios from "axios";
import { Cartcontext } from "@/context/MoviesFoodContext";
import SpecialRequests from "@/components/TheaterComponent/SpecialRequests";
import CustomerInfo from "@/components/TheaterComponent/CustomerInfo";
import "./productable.scss";
import "react-toastify/dist/ReactToastify.css";
import shortid from "shortid";
import { useRouter } from "next/navigation";


export default function TheaterBooking() {
  const [moviesData, setMoviesData] = useState([]);
  const [menuData, setMenuData] = useState([]);
      const router = useRouter();
  
  const [formData, setFormData] = useState({
    movieId: "",
    movieName: "",
    dateTime: "",
    duration: "",
    customerName: "",
    contactNumber: "",
    email: "",
    address:"",
    numberOfSeats: "",
    specialRequests: "",
    additionalEquipment:"",
    staffHandling:"",
    SeatingArrangement:"",
    notes:""
  });
  const {moviedata,setmoviedata,show,addItemsToCart}=useContext(Cartcontext)
  const [filters, setFilters] = useState({
    searchValue: "",
    selectedRating: null,
  });

  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
  });

  const itemsPerPage = 6;
  const formRef = useRef(null);

  const fetchData = async (page = 1) => {
    try {
      const [menuResponse, movieResponse] = await Promise.all([
        axios.get("/api/getMenu", {
          params: {
            page,
            limit: itemsPerPage,
            search: filters.searchValue,
            rating: filters.selectedRating,
          },
        }),
        axios.get(`https://movieapi-rook.onrender.com/getmovies?title=${filters.searchValue}&start=${(page-1)*itemsPerPage}&end=${page*itemsPerPage}`),
      ]);
      setMenuData(menuResponse.data.data|| []);
      setPagination({
        currentPage: page,
        totalPages: Math.ceil(movieResponse.data.data.length/ itemsPerPage) || 1
      });
      setMoviesData(movieResponse.data.paginated || []);
    } catch (error) {
      toast.error("Failed to fetch data");
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
    setPagination({ currentPage: 1, totalPages: pagination.totalPages });
    fetchData(1);
  };

  const handleMovieSelect = (movieId) => {
    const selectedMovie = moviesData.find((movie) => movie.id === movieId);
    if (selectedMovie) {
      setFormData((prev) => ({
        ...prev,
        movieId: selectedMovie.id,
        movieName: selectedMovie.title,
        duration: `${Math.floor(selectedMovie.runtime / 3600)}h ${Math.floor(
          (selectedMovie.runtime % 3600) / 60
        )}m`,
      }));
    }
  };

  const handleFoodSelect = (menuItemId) => {
    setMenuData((prev) =>
      prev.map((item) =>
        item._id === menuItemId ? { ...item, selected: !item.selected } : item
      )
    );
    calculateTotal();
  };

  const calculateTotal = () => {
    const total = menuData
      .filter((item) => item.selected)
      .reduce((sum, item) => sum + item.price, 0);
    setFormData((prev) => ({ ...prev, totalAmount: total }));
  };

  const [errors, setErrors] = useState({ movieId: "",
    movieName: "",
    dateTime: "",
    duration: "",
    customerName: "",
    contactNumber: "",
    email: "",
    address:"",
    numberOfSeats: "",
    specialRequests: "",
    additionalEquipment:"",
    staffHandling:"",
    SeatingArrangement:"",
    notes:""});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.movieId.trim()) newErrors.movieId = "Please select a movie.";
    if (!formData.customerName.trim()) newErrors.customerName = "Customer name is required.";
    if (!/^[0-9]{10}$/.test(formData.contactNumber)) {
      newErrors.contactNumber = "Contact number must be 10 digits.";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email address.";
    }
    if (!formData.address.trim()) newErrors.address = "Address is required.";
    if (!formData.numberOfSeats || parseInt(formData.numberOfSeats, 10) <= 0) {
      newErrors.numberOfSeats = "Please provide a valid number of seats.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      toast.success("Theater booked successfully!");
  addItemsToCart({id:shortid(),...formData});
      show();
      router.push("/cart")
      console.log("Form Data Submitted:", formData);
    } else {
      toast.error("Please fix the errors before submitting.",errors);
    }
  };

  useEffect(() => {
    fetchData(pagination.currentPage);
  }, [pagination.currentPage]);

  return (
    <div className="min-h-screen flex items-center justify-center p-8" 
      style={{
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url("https://res.cloudinary.com/devj7oonz/image/upload/v1721467461/th_izzrnh.jpg")',
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat", 
        backgroundSize: "cover",
        backgroundAttachment: "fixed"
      }}>
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="relative w-full max-w-5xl mx-auto p-8 rounded-xl shadow-2xl"
        style={{ 
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(255,255,255,0.1)",
          border: "1px solid rgba(255,255,255,0.2)"
        }}
      >
        <h2 className="text-4xl font-bold mb-8 text-white text-center">
          Private Theater Booking
        </h2>
        <div className="mb-6">
          <input
            type="text"
            name="searchValue"
            placeholder="Search movies..."
            value={filters.searchValue}
            onChange={handleFilterChange}
            className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition duration-200"
          />
        </div>
        <div className="flex flex-row overflow-auto gap-2">
          {moviesData.map((movie) => (
            <div key={movie.id} className="relative bg-gray-800 " >
              <input
                type="radio"
                name="movieSelection"
                value={movie.id}
                onChange={() => handleMovieSelect(movie.id)}
                className="absolute top-2 right-2 z-10 hidden"
                checked={formData.movieId === movie.id}
              />
              <div 
                onClick={() => handleMovieSelect(movie.id)}
                className="sm:w-1/6 h-32 rounded-md bg-cover bg-center w-fit font-black cursor-pointer"
                style={{ backgroundImage: `url(${movie.movieImage})`, backgroundPosition: 'center', backgroundSize: 'cover', width: '230px', height: '100%' ,border:formData.movieId === movie.id?'2px solid #4CAF50' : '1px solid white'}}
              >
                <div className="bg-opacity-50 text-white text-center rounded-b-lg flex flex-col" style={{backgroundColor:'rgb(0,0,0,0.50)', height:"100%"}}>   
                  <div className="flex flex-col flex-grow p-2 text-[#48bfe3]" style={{height: "220px",display: "flex",justifyContent: "space-around"}}>
                    <h2 className="text-lg font-extrabold font-serif text-gray-800">{movie.title}</h2>
                    <p className="text-gray-600 text-sm" style={{color:"white",fontWeight:"bolder",height:"65px",overflow:"hidden"}}>{movie.imageCaption}</p>
                    <div className="flex justify-between mt-2 text-white text-sm">
                      <div>
                        <p>
                          <strong>Release Year:</strong> {movie.releaseYear.year}
                        </p>
                        <p>
                          <strong>Runtime:</strong> {Math.round((movie.runtime/60)/60)} hrs
                        </p>
                      </div>
                      <div>
                        <p>
                          <strong>Rating:</strong> {movie.ratingsSummary.aggregateRating} ⭐
                        </p>
                        <p>
                          <strong>Votes:</strong> {movie.ratingsSummary.voteCount}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 flex gap-2">
                      {movie.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-[#7E99A3] text-[#4C585B] rounded-md text-xs border-white ">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mb-6">
          <Pagination
            count={pagination.totalPages}
            page={pagination.currentPage}
            onChange={(e, page) => setPagination({ ...pagination, currentPage: page })}
            variant="outlined"
            shape="rounded"
            sx={{
              '& .MuiPaginationItem-root': {
                color: 'white',
                borderColor: 'rgba(255,255,255,0.3)',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)'
                }
              }
            }}
          />
        </div>
        <div className="text-center mb-6 text-gray-300">
          Reviews available on <a className="text-blue-400 hover:text-blue-300 underline" href="https://moviesreviewsystem.netlify.app/" target="_blank" rel="noopener noreferrer">Movie Review System</a>
        </div>
        <div className="space-y-6 w-[100%]">
          <CustomerInfo formData={formData} handleChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })} />
          <div className="p-4 bg-gray-800 bg-opacity-50 rounded-lg">
            <p className="text-gray-300 text-center">For Food and Beverages please select from Restaurant page and attach the token which you get by booking this Movie</p>
          </div>
          <SpecialRequests formData={formData} handleChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })} />
          <div className="flex justify-center">
            <Button type="submit" text="Book Theater" className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition duration-200" />
          </div>
        </div>
        <ToastContainer position="bottom-right" theme="dark" />
      </form>
    </div>
  );
}
  
