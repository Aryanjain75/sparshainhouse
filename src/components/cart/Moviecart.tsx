"use client"
import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
interface MoviecartProps {
  addItemsToCart: (item: any) => void;
  deleteItemFromCart: (id: string | number) => void;
  cart: Array<{
    id: React.Key | null | undefined;
    Refid: string | number;
    customerName: string;
    numberOfSeats: string ;
    address: string;
    email: string;
    contactNumber: string;
    additionalEquipment: string;
    dateTime: string | number | Date;
    specialRequests: string;
    staffHandling: string;
    notes: string;
    Imageurl: string;
    caption: string;
    Price: string ;
    movieImage: string;
    imageCaption: string;
    movieName: string;
    releaseYear: { year: string | number };
    movieduration: string | number;
  }>;
  clearcart: () => void;
  populatemoviebilllayout: () => void;
}

function Moviecart({addItemsToCart,deleteItemFromCart,cart,clearcart,populatemoviebilllayout}: MoviecartProps) {
 return (
<>
<div>Moviecart</div>
    <Table>
  <TableCaption>Movie Carts</TableCaption>
  {cart.map((data:{
    id: React.Key | null | undefined;
    Refid: string | number;
    customerName: string;
    numberOfSeats: string ;
    address: string;
    email: string;
    contactNumber: string;
    additionalEquipment: string;
    dateTime: string | number | Date;
    specialRequests: string;
    staffHandling: string;
    notes: string;
    Imageurl: string;
    caption: string;
    Price: string ;
    movieImage: string;
    imageCaption: string;
    movieName: string;
    releaseYear: { year: string | number };
    movieduration: string | number;
  }) => (
  <div key={data.Refid} className='border-2 border-black rounded-2xl'>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Topics</TableHead>
          <TableHead>Values</TableHead>
          <TableHead className="text-right">Total Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
      <TableRow>
          <TableCell className="font-medium">Reffrence Id no.</TableCell>
          <TableCell>{data.Refid}</TableCell>
          <TableCell className="text-right"></TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Customer Name</TableCell>
          <TableCell>{data.customerName}</TableCell>
          <TableCell className="text-right"></TableCell>
        </TableRow>
        
        <TableRow>
          <TableCell className="font-medium">Number of Seats</TableCell>
          <TableCell>{data.numberOfSeats}</TableCell>
          <TableCell className="text-right"></TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Address</TableCell>
          <TableCell>{data.address}</TableCell>
          <TableCell className="text-right"></TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">email</TableCell>
          <TableCell>{data.email}</TableCell>
          <TableCell className="text-right"></TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Contact Number</TableCell>
          <TableCell>{data.contactNumber}</TableCell>
          <TableCell className="text-right"></TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Additional Equipment</TableCell>
          <TableCell>{data.additionalEquipment}</TableCell>
          <TableCell className="text-right"></TableCell>
        </TableRow>
      
        <TableRow>
          <TableCell className="font-medium">Date & Time</TableCell>
          <TableCell>{new Date(data.dateTime).toLocaleString()}</TableCell>
          <TableCell className="text-right"></TableCell>
        </TableRow>
        
        <TableRow>
          <TableCell className="font-medium">Special Requests</TableCell>
          <TableCell>{data.specialRequests}</TableCell>
          <TableCell className="text-right"></TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Staff Handling</TableCell>
          <TableCell>{data.staffHandling}</TableCell>
          <TableCell className="text-right"></TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Notes</TableCell>
          <TableCell>{data.notes}</TableCell>
          <TableCell className="text-right"></TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium"><img src={data.Imageurl} alt={data.caption} /></TableCell>
          <TableCell>{data.caption}</TableCell>
          <TableCell className="text-right">Rs. {parseInt(data.Price)*parseInt(data.numberOfSeats)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium"><img src={data.movieImage} alt={data.imageCaption} /></TableCell>
          <TableCell>{data.movieName}</TableCell>
          <TableCell className="text-right">Rs.100{" Only When we didn't have that movie otherwise it will be returned"}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Release Year</TableCell>
          <TableCell>{data.releaseYear.year}</TableCell>
          <TableCell className="text-right"></TableCell>
        </TableRow><TableRow>
          <TableCell className="font-medium">Movie Runtime</TableCell>
          <TableCell>{(data.movieduration)}</TableCell>
          <TableCell className="text-right"></TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Cancel</TableCell>
          <TableCell>
          <div className="w-full md:w-1/5 flex items-center justify-end">
             
             <button
               className="text-red-600 bg-white border border-gray-200 rounded-md px-4 py-2 hover:bg-gray-100"
               onClick={()=>{deleteItemFromCart(data.Refid);populatemoviebilllayout();}}>Delete</button></div></TableCell>
          <TableCell className="text-right"></TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
))}

</Table>

</>
  )
}

export default Moviecart;