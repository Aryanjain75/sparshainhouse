/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useContext } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BirthdayhallContext } from "@/context/Birthdayhall";

interface EventData {
  id: string;
  TypeofEvent: string;
  address: string;
  contactnumber: string;
  customerName: string;
  email: string;
  dateTime: string;
  media: {
    primary: {
      url: string;
      defaultAlt: string;
    };
  };
  name: string;
  numberOfSeats: string;
  price: {
    mrp: number;
    price: number;
  };
  quality: {
    rating: {
      count: number;
      value: number;
    };
  };
  slotTypes: Array<{
    name: string;
    price: number;
    timeSlots: Array<{ label: string; _id: string }>;
  }>;
}

interface EventTableProps {
  data: EventData;
  populateBirthdayhalllayout: () => void; // Function to refresh data
}

const EventTable: React.FC<EventTableProps> = ({
  data,
  populateBirthdayhalllayout,
}) => {
  const { deleteItemFromCart: deleteBirthdayItem } = useContext(BirthdayhallContext);

  const handleDelete = () => {
    deleteBirthdayItem(data.id); // Delete item from context
    populateBirthdayhalllayout(); // Refresh data in the parent component
  };

  return (
    <>
      <div>Event Details</div>
      <Table>
        <TableCaption>Event Details</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Field</TableHead>
            <TableHead>Value</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Event Type</TableCell>
            <TableCell>{data?.TypeofEvent}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Customer Name</TableCell>
            <TableCell>{data?.customerName}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Address</TableCell>
            <TableCell>{data?.address}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Contact Number</TableCell>
            <TableCell>{data?.contactnumber}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Email</TableCell>
            <TableCell>{data?.email}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Date & Time</TableCell>
            <TableCell>{new Date(data?.dateTime).toLocaleString()}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Decoration Name</TableCell>
            <TableCell>{data?.name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Number of Seats</TableCell>
            <TableCell>{data?.numberOfSeats}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Price (MRP)</TableCell>
            <TableCell>₹{data?.price?.mrp}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Discounted Price</TableCell>
            <TableCell>₹{data?.price?.price}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Rating</TableCell>
            <TableCell>
              {data?.quality?.rating?.value} ({data?.quality?.rating?.count} ratings)
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Image</TableCell>
            <TableCell>
              <img
                src={data?.media?.primary?.url}
                alt={data?.media?.primary?.defaultAlt}
                className="w-32 h-32 object-cover"
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Cancel</TableCell>
            <TableCell>
              <div className="w-full flex items-center justify-end">
                <button
                  className="text-red-600 bg-white border border-gray-200 rounded-md px-4 py-2 hover:bg-gray-100"
                  onClick={handleDelete} // Call the handler
                >
                  Delete
                </button>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
};

export default EventTable;
