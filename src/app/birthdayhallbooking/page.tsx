"use client";
import { useGSAP } from "@gsap/react";
import React, { useState, useEffect, useContext } from "react";
import { gsap } from "gsap";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Pagination from "@mui/material/Pagination";
import "react-toastify/dist/ReactToastify.css";
import { BirthdayhallContext } from "@/context/Birthdayhall";
import "./productable.scss";
import Input from "@/components/Input";
import { useRouter } from "next/navigation";
import shortid from "shortid";

interface DecorationData {
  _id: string;
  type: string;
  name: string;
  slug: string;
  media: {
    primary: {
      defaultAlt?: string;
      url: string;
    };
  };
  updatedAt: Date;
  sku: string;
  quality: {
    rating: {
      value?: number;
      count?: number;
    };
  };
  delivery: {
    processingTime: {
      hours?: number;
    };
    slots: Array<{
      type: string;
    }>;
  };
  price: {
    price: number;
    mrp: number;
  };
}

interface FormData {
  orderid:string;
  hallid: string;
  customerName: string;
  email: string;
  address:string;
  contactNumber: string;
  dateTime: string;
  numberOfSeats: string;
  message: string;
  selectedDecoration?: string;
  TypeofEvent:string;
  slots:string;
}

function Page() {
  const [formData, setFormData] = useState<FormData>({
    orderid:shortid.generate(),
    hallid: "",
    customerName: "",
    address:"",
    email: "",
    contactNumber: "",
    dateTime: "",
    numberOfSeats: "",
    message: "",
    selectedDecoration: "",
    TypeofEvent:"",
    slots:"",
  });
const Contest=useContext(BirthdayhallContext)
  const [decorations, setDecorations] = useState<DecorationData[]>([]);
  const [totallength, setTotalLength] = useState(0);
  const [pagination, setPagination] = useState({ currentPage: 1, itemsPerPage: 5 });
  const [search,setsearch]=useState("");
    const router = useRouter();
  
  async function fetchDecorationInfo() {
    try {
      const response = await axios.get("/api/BirthdayhallDecoration", {
        params: {
          start: (pagination.currentPage - 1) * pagination.itemsPerPage,
          end: (pagination.currentPage - 1) * pagination.itemsPerPage+pagination.itemsPerPage,
          name:search
        },
      });
      setTotalLength(response.data.totallength);
      setDecorations(response.data.data);
    } catch (error) {
      console.error("Failed to fetch decorations:", error);
      toast.error("Failed to load decoration options");
    }
  }

  useEffect(() => {
    fetchDecorationInfo();
  }, [pagination.currentPage]);

  const handleHallSelect = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      hallid: id,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const contactNumberRegex = /^\d{10}$/;
  
    if (!formData.customerName.trim()) {
      toast.error("Customer name is required.");
      return;
    }
  
    if (!/^[a-zA-Z\s]+$/.test(formData.customerName)) {
      toast.error("Customer name must contain only alphabets.");
      return;
    }
  
    if (!formData.email || !emailRegex.test(formData.email)) {
      toast.error("Invalid email address.");
      return;
    }
  
    if (!formData.contactNumber || !contactNumberRegex.test(formData.contactNumber)) {
      toast.error("Contact number must be a valid 10-digit number.");
      return;
    }
  
    if (!formData.address.trim()) {
      toast.error("Address is required.");
      return;
    }
  
    if (!formData.dateTime) {
      toast.error("Date and time are required.");
      return;
    }
    if (!formData.slots) {
      toast.error("Please select at least one slot.");
      return;
    }
    const selectedDate = new Date(formData.dateTime);
    const currentDate = new Date();
    if (selectedDate <= currentDate) {
      toast.error("Date and time must be in the future.");
      return;
    }
  
    if (!formData.numberOfSeats || parseInt(formData.numberOfSeats) <= 0) {
      toast.error("Number of seats must be a positive number.");
      return;
    }
  
    if (!formData.TypeofEvent) {
      toast.error("Please select the type of event.");
      return;
    }
  
    if (!formData.hallid) {
      toast.error("Please select a decoration package.");
      return;
    }
  
    try {
      // await axios.post("/api/bookings", formData);
      toast.success("Booking submitted successfully!");
      Contest.addItemsToCart(formData);
      setFormData({
        orderid:"",
        hallid: "",
        customerName: "",
        address: "",
        email: "",
        contactNumber: "",
        dateTime: "",
        numberOfSeats: "",
        message: "",
        selectedDecoration: "",
        TypeofEvent: "",
        slots:""
      });
      router.push("/cart");

    } catch (error) {
      toast.error("Failed to submit booking.");
      console.error(error);
    }
  };
  
  return (
    <div
      className="w-full overflow-x-hidden"
      style={{
        backgroundImage:
          "url('https://media.ouest-france.fr/v1/pictures/2bb85adbe40d6722b19d55f599d7df56-144654.jpg?width=1400&client_id=eds&sign=9fea0896b3b4f8a398415aa43263bd9b7cbfa176f0eeda7a07859ac9f7265af6')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex justify-center text-white text-5xl flex items-center justify-items-center">
        <form
          onSubmit={handleSubmit}
          className="relative border-2 border-white w-full max-w-3xl p-8 flex flex-col mx-4"
          style={{
            margin: "6rem auto",
            background: "#7c6b6b6b",
            backdropFilter: "blur(10px)",
          }}
        >
          <h1 className="p-2 font-bold">Birthday Hall Booking</h1>

          <div className="flex flex-col w-[100%] gap-4 text-xl">
          <input
            type="text"
            name="searchValue"
            placeholder="Search Decorations..."
            value={search}
            onChange={(e)=>{setsearch(e.target.value);fetchDecorationInfo();}}
            className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition duration-200"
          />
            <h3 className="text-2xl font-bold mb-4">Select Decoration Package</h3>
            <div className="flex flex-row overflow-auto gap-2 rounded-[10px]">
              {decorations.map((halldata) => (
                <div key={halldata._id} className="relative bg-gray-800 rounded-[10px]">
                  <input
                    type="radio"
                    name="movieSelection"
                    value={halldata._id}
                    onChange={() => handleHallSelect(halldata._id)}
                    className="absolute top-2 right-2 z-10 hidden"
                    checked={formData.hallid === halldata._id}
                  />
                  <div
                    onClick={() => handleHallSelect(halldata._id)}
                    className="sm:w-1/6 h-32 rounded-[10px] bg-cover bg-center w-fit font-black cursor-pointer"
                    style={{
                      backgroundImage: `url(${halldata.media.primary.url})`,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                      width: "230px",
                      height: "100%",
                      border: formData.hallid === halldata._id ? "2px solid #4CAF50" : "1px solid white",
                    }}
                  >
                    <div
                      className="-z-10 bg-opacity-50 text-white text-center rounded-[10px] flex flex-col"
                      style={{ backgroundColor: "rgb(0,0,0,0.50)", height: "100%" }}
                    >
                      <div
                        className="flex flex-col flex-grow p-2 text-[#48bfe3] rounded-[10px]"
                        style={{
                          height: "220px",
                          display: "flex",
                          justifyContent: "space-around",
                        }}
                      >
                        <h2 className="text-lg font-extrabold font-serif text-white">{halldata.name}</h2>
                        <div className="flex justify-between mt-2 text-white text-sm flex-col">
                          <div>
                            <p className="border-1 border-white rounded-[10px] ">
                              <strong>Decoration+hall price:</strong>Rs. {halldata.price.price + 12000}
                            </p>
                            <p className="border-1 border-white rounded-[10px]">
                              <strong>Processing Time:</strong> {halldata.delivery.processingTime.hours} hrs
                            </p>
                          </div>
                          <div>
                            <p className="border-1 border-white rounded-[10px]">
                              <strong>Rating:</strong> {halldata.quality.rating.value} ⭐
                            </p>
                            <p className="border-1 border-white rounded-[10px]">
                              <strong>Votes:</strong> {halldata.quality.rating.count}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center mb-6">
              <Pagination
                count={Math.ceil(totallength / pagination.itemsPerPage)}
                page={pagination.currentPage}
                onChange={(e, page) => setPagination({ ...pagination, currentPage: page })}
                variant="outlined"
                shape="rounded"
                sx={{
                  "& .MuiPaginationItem-root": {
                    color: "white",
                    borderColor: "rgba(255,255,255,0.3)",
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.1)",
                    },
                  },
                }}
              />
            </div>
          </div>
          <p className="text-white p-3 bg-slate-600 rounded-[10px] text-sm">go to this website and write name of the room <a className="underline decoration-slate-100" href="https://giftlaya.com/birthday-decoration">website</a></p>
          <h3 className="text-2xl font-bold mb-4 text-primary font-anime text-white">
        Customer Information
      </h3>
      <Input
        label="Name"
        type="text"
        name="customerName"
        value={formData.customerName}
        onChange={(e: { target: { name: any; value: any; }; }) => setFormData({ ...formData, [e.target.name]: e.target.value })}
      />
      <Input
        label="Contact Number"
        type="text"
        name="contactNumber"
        value={formData.contactNumber}
        onChange={(e: { target: { name: any; value: any; }; }) => setFormData({ ...formData, [e.target.name]: e.target.value })}
      />
      <Input
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={(e: { target: { name: any; value: any; }; }) => setFormData({ ...formData, [e.target.name]: e.target.value })}
      />
      <Input
        label="Address"
        type="text"
        name="address"
        value={formData.address}
        onChange={(e: { target: { name: any; value: any; }; }) => setFormData({ ...formData, [e.target.name]: e.target.value })}
      />
      <Input
        label="Date & Time"
        type="datetime-local"
        name="dateTime"
        value={formData.dateTime}
        onChange={(e: { target: { name: any; value: any; }; }) => setFormData({ ...formData, [e.target.name]: e.target.value })}
      />
      <h3 className="text-2xl font-bold mb-4 text-primary font-anime text-white">
        Seating Details
      </h3>
      <Input
        label="Number of Seats"
        type="number"
        name="numberOfSeats"
        value={formData.numberOfSeats}
        onChange={(e: { target: { name: any; value: any; }; }) => setFormData({ ...formData, [e.target.name]: e.target.value })}
      />
       <div className="mb-4">
  <label className="block text-white text-lg font-bold mb-2">Type of Event</label>
  <div className="flex flex-wrap gap-4">
    {['Birthday', 'Wedding', 'Corporate', 'Other'].map((eventType) => (
      <label key={eventType} className="inline-flex items-center">
        <input
          type="radio"
          name="TypeofEvent"
          value={eventType}
          checked={formData.TypeofEvent === eventType}
          onChange={(e) => setFormData({ ...formData, TypeofEvent: e.target.value })}
          className="form-radio h-3 w-3 text-red-600"
        />
        <span className="ml-2 text-white text-sm">{eventType}</span>
      </label>
    ))}
  </div>
</div>   

<h3 className="text-2xl font-bold mb-4 text-primary font-anime text-white">
        Select Slot
      </h3>
      <select
        name="slots"
        value={formData.slots}
        onChange={(e) => 
          setFormData({ ...formData, slots: e.target.value })
        }
        className="p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition duration-200 text-sm"
      >
        <option value="" disabled>
          Select Slot
        </option>
        {['8:00 Am to 10:00AM', "10:00 AM - 12:00 PM", "12:00 PM - 02:00 PM", "02:00 PM - 04:00 PM","04:00 PM - 06:00 PM","06:00 PM - 08:00 PM","08:00 PM - 10:00 PM","Full Day"].map((slot, index) => (
          <option key={index} value={slot}>
            {slot}
          </option>
        ))}
      </select>  

       <div className="flex justify-center mt-8">
  
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-3xl transition-colors duration-200"
              style={{ fontSize: "xx-large", padding: "10px 111px" }}
              type="submit"
            >
              Submit Booking
            </button>
          </div>
          <ToastContainer position="bottom-right" />
        </form>
      </div>
    </div>
  );
}

export default Page;
