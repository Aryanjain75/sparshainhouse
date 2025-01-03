"use client";
import Input from "@/components/Input";
import { useState, useEffect, useContext } from "react";
import { Cartcontext } from "@/context/MoviesFoodContext";

function CustomerInfo({ formData, handleChange }) {
  const { Theater,show } = useContext(Cartcontext);
  
  const TheaterJson = {
    h9wea6zaeh5sododtfqt: {
      Imageurl: "https://res.cloudinary.com/devj7oonz/image/upload/v1735369318/h9wea6zaeh5sododtfqt.jpg",
      caption: "Cinematic Luxury at Home.",
      Price: 50,
    },
    nfpjuyqifhhbonsd59vb: {
      Imageurl: "https://res.cloudinary.com/devj7oonz/image/upload/v1735369318/h9wea6zaeh5sododtfqt.jpg",
      caption: "Sleek and Sophisticated Cinema",
      Price: 230,
    },
    havriv6h1ebvx20byrjb: {
      Imageurl: "https://res.cloudinary.com/devj7oonz/image/upload/v1735369317/havriv6h1ebvx20byrjb.jpg",
      caption: "Immersive Sound, Sleek Design",
      Price: 225,
    },
    vow3igduygjnmbxqoaxd: {
      Imageurl: "https://res.cloudinary.com/devj7oonz/image/upload/v1735369317/vow3igduygjnmbxqoaxd.jpg",
      caption: "Cinema Comfort",
      Price: 200,
    },
    tsmunt7zmxorzpmwd0wk: {
      Imageurl: "https://res.cloudinary.com/devj7oonz/image/upload/v1735369317/tsmunt7zmxorzpmwd0wk.jpg",
      caption: "Timeless Movie Magic",
      Price: 240,
    },
  };

  
  useEffect(()=>{show()},[]);
  useEffect(() => {
    console.log(Theater); 
  }, [Theater]);
  return (
    <div>
      <h3 className="text-2xl font-bold mb-4 text-primary font-anime text-white">
        Customer Information
      </h3>
      <Input
        label="Name"
        type="text"
        name="customerName"
        value={formData.customerName}
        onChange={handleChange}
      />
      <Input
        label="Contact Number"
        type="text"
        name="contactNumber"
        value={formData.contactNumber}
        onChange={handleChange}
      />
      <Input
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      <Input
        label="Address"
        type="text"
        name="address"
        value={formData.address}
        onChange={handleChange}
      />
      <Input
        label="Date & Time"
        type="datetime-local"
        name="dateTime"
        value={formData.dateTime}
        onChange={handleChange}
      />
      <h3 className="text-2xl font-bold mb-4 text-primary font-anime text-white">
        Seating Details
      </h3>
      <Input
        label="Number of Seats"
        type="number"
        name="numberOfSeats"
        value={formData.numberOfSeats}
        onChange={handleChange}
      />
      <h5 className="text-lg font-bold mb-4 text-primary font-anime text-white">
        Seating Arrangement
      </h5>
      <div className="flex overflow-auto gap-2">
        {Object.entries(TheaterJson).map(([id, val]) => (
          <label key={id} className="relative cursor-pointer">
            <input
              type="radio"
              name="SeatingArrangement"
              value={id}
              checked={formData.SeatingArrangement === id}
              onChange={handleChange}
              className="absolute top-2 right-2 z-10 hidden"
            />
            <div
              style={{
                backgroundImage: `url(${val.Imageurl})`,
                height: "157px",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                width: "208px",
                color: "white",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "11px",
                border:
                  formData.SeatingArrangement === id
                    ? "2px solid #4CAF50"
                    : "1px solid white",
                borderRadius: "15px",
              }}
            >
              <p>{val.caption}</p>
              <p>
                Rs.
                {typeof val.Price === "number"
                  ? val.Price * parseInt(formData.numberOfSeats || "1")
                  : val.Price}
              </p>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}

export default CustomerInfo;
