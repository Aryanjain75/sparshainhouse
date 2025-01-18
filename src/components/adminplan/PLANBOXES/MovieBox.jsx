"use Client"
import React, { useContext } from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "@mui/material/Pagination";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PlanContext } from "@/context/PlanContext";
function MovieBox() {
  const {moviesData, setMoviesData,MovieItemSelected, 
    setMovieItemSelected,}  = useContext(PlanContext);

   
  const [filters, setFilters] = useState({
    searchValue: "",
    selectedRating: null,
  });

  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
  });

  const itemsPerPage = 6;

  const fetchData = async (page = 1) => {
    try {
      const movieResponse = await axios.get(`https://movieapi-rook.onrender.com/getmovies?title=${filters.searchValue}&start=${(page-1)*itemsPerPage}&end=${page*itemsPerPage}`);
      setPagination({
        currentPage: page,
        totalPages: Math.ceil(movieResponse.data.data.length/ itemsPerPage) || 1
      });
      console.log(movieResponse);
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
    setMovieItemSelected(movieId);
  };
  useEffect(() => {
    fetchData(pagination.currentPage);
  }, [pagination.currentPage]);

  return <>
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
                style={{fontSize:"small"}}
                className="w-full p-3 rounded-lg  bg-gray-800 text-white border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition duration-200"
              />
            </div>
            <div className="flex flex-row overflow-auto gap-2">
              {moviesData?.map((movie) => (
                <div key={movie.id} className="relative bg-gray-800 " >
                  <input
                    type="radio"
                    name="movieSelection"
                    value={movie.id}
                    onChange={() => handleMovieSelect(movie.id)}
                    className="absolute top-2 right-2 z-10 hidden"
                    checked={MovieItemSelected === movie.id}
                  />
                  <div 
                    onClick={() => handleMovieSelect(movie.id)}
                    className="sm:w-1/6 h-32 rounded-md bg-cover bg-center w-fit font-black cursor-pointer"
                    style={{ backgroundImage: `url(${movie.movieImage})`, backgroundPosition: 'center', backgroundSize: 'cover', width: '230px', height: '100%' ,border:MovieItemSelected === movie.id?'2px solid #4CAF50' : '1px solid white'}}
                  >
                    <div className="bg-opacity-50 text-white text-center rounded-b-lg flex flex-col" style={{backgroundColor:'rgb(0,0,0,0.50)', height:"100%"}}>   
                      <div className="flex flex-col flex-grow p-2 text-[#48bfe3]" style={{height: "220px",display: "flex",justifyContent: "space-around"}}>
                        <h2 className="text-lg font-extrabold font-serif text-gray-800">{movie.title}</h2>
                        <p className="text-gray-600 text-sm" style={{color:"white",fontWeight:"bolder",height:"65px",overflow:"hidden"}}>{movie.imageCaption}</p>
                        <div className="flex justify-between mt-2 text-white text-sm">
                          <div>
                            <p>
                              <strong>Release Year:</strong> {movie.releaseYear}
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
            <div className="text-center mb-6 text-gray-900" style={{fontSize:"small"}}>
              Reviews available on <a className="text-blue-400 hover:text-blue-300 underline" href="https://moviesreviewsystem.netlify.app/" target="_blank" rel="noopener noreferrer">Movie Review System</a>
            </div>
    
    </>
}

export default MovieBox;
