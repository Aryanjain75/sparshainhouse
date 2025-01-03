"use client";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { useRef } from "react";
import { useState,useEffect ,useContext} from "react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Rating from '@mui/material/Rating';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Link from "next/link"; // Correct import for Link
import axios from "axios";
import {useCart} from "@/context/MoviesFoodContext";
import Image from "next/image"
function SpecialRequests({formData,handleChange}) {
  return (<>
    
    <h3 className="text-2xl font-bold mb-4 text-primary font-anime text-white">Special Requests</h3>
    <Input label="Special Requests"  type="text"  name="specialRequests"  value={formData.specialRequests}  onChange={handleChange}  required/>
    <Input label="Additional Equipment"  type="text"  name="additionalEquipment"  value={formData.additionalEquipment}  onChange={handleChange} required/>
    <h3 className="text-2xl font-bold mb-4 text-primary font-anime text-white"> Internal Use</h3>
    <Input label="Staff Handling" type="text" name="staffHandling" value={formData.staffHandling} onChange={handleChange} required/>
    <Input label="Notes" type="text" name="notes" value={formData.notes} onChange={handleChange} required/>
    </> )
}

export default SpecialRequests;