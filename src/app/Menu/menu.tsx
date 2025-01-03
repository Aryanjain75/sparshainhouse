"use client";
import React, { useEffect, useState } from "react";
import { ThreeDCardDemo } from "./3d-card";
import axios from "axios";
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";

interface MenuItem {
    _id: any;
    CloudanaryImageId: string;
    DISCOUNT: string;
    CUSSINE: string;
    FOODNAME: string;
    PRICE: string;
    DISCOUNTED_PRICE: string;
    RATINGS: number;
    TAGS: string[];
}

export default function Menu() {
    const [data, setData] = useState<MenuItem[]>([]);
    const [oldData, setOldData] = useState<MenuItem[]>([]);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [selectedRating, setSelectedRating] = useState<number | null>(null);
    const [selectedCuisine, setSelectedCuisine] = useState<string>("");
    const [priceRange, setPriceRange] = useState<number[]>([0, 300]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 6;
    const [searchValue, setSearchValue] = useState("");
    const [Tags, setTags] = useState<string[]>([]);
    const placeholders = [
    "Search for your favorite Indian curry",
    "Looking for spicy Thai dishes?",
    "Find the best Italian pasta",
    "Craving some Mexican tacos?", 
    "Discover authentic Chinese cuisine"
];
    const refresh = () => {
        setData(oldData);
    };

    const fetchData = async (page = 1,search = "",rating: number | null = null,tags: string[] = [],cuisine = "",minPrice = 0,maxPrice = 300) => {
        try {
            const response = await axios.get("/api/getMenu", {params: {page,limit: itemsPerPage,search,rating,tags: tags.join(","),cuisine,minPrice,maxPrice,},});
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

    useEffect(() => {fetchData(currentPage,searchValue,selectedRating,selectedTags,selectedCuisine,priceRange[0],priceRange[1]);}, [selectedTags,selectedRating,selectedCuisine,priceRange,currentPage,searchValue,]);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.toLowerCase();
        setSearchValue(value);
        setCurrentPage(1); 
        fetchData(1,value,selectedRating,selectedTags,selectedCuisine,priceRange[0],priceRange[1]);
    };

    const handleRatingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value ? parseInt(e.target.value) : null;
        setSelectedRating(value);
        setCurrentPage(1); 
        fetchData(1,searchValue,value,selectedTags,selectedCuisine,priceRange[0],priceRange[1]);
    };

    const handleTagChange = (tag: string) => {
        const newTags = selectedTags.includes(tag)? selectedTags.filter((t) => t !== tag): [...selectedTags, tag];
        setSelectedTags(newTags);
        setCurrentPage(1); 
        fetchData(1,searchValue,selectedRating,newTags,selectedCuisine,priceRange[0],priceRange[1]);
    };

    const handleCuisineChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCuisine(e.target.value);
        setCurrentPage(1); 
        fetchData(1,searchValue,selectedRating,selectedTags,e.target.value,priceRange[0],priceRange[1]);
    };

    const handlePriceRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        const newRange =e.target.name === "min" ? [value, priceRange[1]] : [priceRange[0], value];
        setPriceRange(newRange);
        setCurrentPage(1); 
        fetchData(1,searchValue,selectedRating,selectedTags,selectedCuisine,newRange[0],newRange[1]);
    };

    const sortDataBy = (key: keyof MenuItem) => {
        setCurrentPage(1);
        setData((prevData) =>[...prevData].sort(
            (a, b) => {if (a[key] < b[key]) return -1;
            if (a[key] > b[key]) return 1;
                return 0;
            })
        );
    };

    const handlePageChange = (page: number) => {
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

    return (
        <>
            <div className="text-black justify-center flex pt-32 font-extrabold text-4xl sm:text-7xl p-[3vw]">
                <h1>MENU</h1>
            </div>
            <PlaceholdersAndVanishInput placeholders={placeholders} onChange={handleChange} />
            <div className="flex flex-col md:flex-row md:flex-wrap justify-center p-4 gap-4">
                <div className="shadow-lg w-full md:w-[24vw] flex flex-col p-4 mb-4 md:mb-0">
                    <button onClick={refresh} className="border border-black rounded p-2 mb-2 hover-animation">Refresh</button>
                    <button onClick={() => sortDataBy("FOODNAME")} className="border border-black rounded p-2 mb-2 hover-animation">Sort by Food Name</button>
                    <button onClick={() => sortDataBy("CUSSINE")} className="border border-black rounded p-2 mb-2 hover-animation"> Sort by Cuisine</button>
                    <button onClick={() => sortDataBy("DISCOUNT")} className="border border-black rounded p-2 mb-2 hover-animation">Sort by Discount</button>
                    <button onClick={() => sortDataBy("PRICE")} className="border border-black rounded p-2 mb-2 hover-animation">Sort by Price</button>
                    <div className="border border-black rounded p-2 mb-2">
                        <label htmlFor="rating" className="block text-sm font-medium text-gray-900"> Filter by Rating</label>
                        <select id="rating" className="mt-1 block w-full bg-blue-100 backdrop:blur-md rounded-3xl" onChange={handleRatingChange}>
                            <option value="">All Ratings</option>
                            <option value="1">1 Star & Up</option>
                            <option value="2">2 Stars & Up</option>
                            <option value="3">3 Stars & Up</option>
                            <option value="4">4 Stars & Up</option>
                            <option value="5">5 Stars</option>
                        </select>
                    </div>
                    <div className="border border-black rounded p-2 mb-2">
                        <label    htmlFor="cuisine"    className="block text-sm font-medium text-gray-900">Filter by Cuisine </label>
                        <select id="cuisine"   className="mt-1 block w-full backdrop:blur-md rounded-3xl bg-blue-100"    onChange={handleCuisineChange}>
                            <option value="">All Cuisines</option>
                            <option value="Italian">Italian</option>
                            <option value="Chinese">Chinese</option>
                            <option value="Mexican">Mexican</option>
                            <option value="Indian">Indian</option>
                        </select>
                    </div>
                    <div className="border border-black rounded p-2 mb-2">
                        <label className="block text-sm font-medium text-gray-900">Filter by Price Range</label>
                        <div className="flex items-center justify-between">
                            <input type="number" name="min" className="w-full mr-2 backdrop:blur-md rounded-3xl bg-blue-100" value={priceRange[0]} onChange={handlePriceRangeChange} placeholder="Min Price"/>
                            <input type="number" name="max" className="w-full ml-2 backdrop:blur-md rounded-3xl bg-blue-100" value={priceRange[1]} onChange={handlePriceRangeChange} placeholder="Max Price" />
                        </div>
                    </div>
                    <div className="border border-black rounded p-2 mb-2">
                        <label className="block text-sm font-medium text-gray-900">Filter by Tags  </label>
                        <div className="grid grid-cols-3 md:grid-cols-1">
                            {Tags.map((tag) => (
                                <div key={tag} className="flex items-center">
                                    <input type="checkbox" id={`tag-${tag}`} checked={selectedTags.includes(tag)} onChange={() => handleTagChange(tag)} className="mr-2 backdrop:blur-md rounded-3xl bg-blue-100"/>
                                    <label  htmlFor={`tag-${tag}`}  className="text-sm font-medium text-gray-900"> {tag}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="flex-1">
                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {data.map((item) => (<ThreeDCardDemo key={item.CloudanaryImageId} item={item} />))}
                    </div>
                    <div className="flex justify-center mt-4">
                        <button   onClick={() => handlePageChange(currentPage - 1)}  disabled={currentPage === 1}  className="border border-black rounded p-2 mr-2">Previous</button>
                        <span>{`Page ${currentPage} of ${totalPages}`}</span>
                        <button  onClick={() => handlePageChange(currentPage + 1)}  disabled={currentPage === totalPages}  className="border border-black rounded p-2 ml-2">Next</button>
                    </div>
                </div>
            </div>
        </>
    );
}
