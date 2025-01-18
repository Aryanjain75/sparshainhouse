"use client"
import React, { useContext, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { styled } from '@mui/material/styles';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { BirthdayhallContext } from "@/context/Birthdayhall";
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

import { 
  EventNote, Description, Place, LocationOn, AccessTime, CalendarMonth, 
  Category, Email, EventAvailable, NoteAddTwoTone, Person, Phone 
} from '@mui/icons-material';
import { PlanContext } from '../../context/PlanContext.js';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function Birthdayhallcart({formData,index,deleteBirthdayItem}) {
  return <>
  <Paper key={index} sx={{ width: '100%', overflow: 'hidden' }}>
  <TableContainer sx={{ maxHeight: 440 }}>
    <Table stickyHeader aria-label="Event Planning Details">
      {/* Event Planning Table */}
      <TableHead>
        <TableRow>
          <StyledTableCell>Event ID</StyledTableCell>
          <StyledTableCell>Event Name</StyledTableCell>
          <StyledTableCell>Type</StyledTableCell>
          <StyledTableCell>Theme</StyledTableCell>
          <StyledTableCell>Description</StyledTableCell>
          <StyledTableCell>Start Date</StyledTableCell>
          <StyledTableCell>Start Time</StyledTableCell>
          <StyledTableCell>End Date</StyledTableCell>
          <StyledTableCell>End Time</StyledTableCell>
          <StyledTableCell>Venue Name</StyledTableCell>
          <StyledTableCell>Address</StyledTableCell>
          <StyledTableCell>Longitude</StyledTableCell>
          <StyledTableCell>Latitude</StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {formData?.EventPlanning?.map(row => (
          <StyledTableRow  key={row.EventId} hover>
            <StyledTableCell>{row.EventId}</StyledTableCell>
            <StyledTableCell>{row.eventname}</StyledTableCell>
            <StyledTableCell>{row.EventType}</StyledTableCell>
            <StyledTableCell>{row.EventTheme}</StyledTableCell>
            <StyledTableCell>{row.EventDescription}</StyledTableCell>
            <StyledTableCell>{row.EventStartDate}</StyledTableCell>
            <StyledTableCell>{row.EventStartTime}</StyledTableCell>
            <StyledTableCell>{row.EventEndDate}</StyledTableCell>
            <StyledTableCell>{row.EventEndTime}</StyledTableCell>
            <StyledTableCell>{row.EventVenueName}</StyledTableCell>
            <StyledTableCell>{row.EventVeneueAddress}</StyledTableCell>
            <StyledTableCell>{row.EventLongitude}</StyledTableCell>
            <StyledTableCell>{row.EventLatitude}</StyledTableCell>
          </StyledTableRow>
        ))}
      </TableBody>
</Table>
  </TableContainer>
  <TableContainer sx={{ maxHeight: 440 }}>
    <Table stickyHeader aria-label="Guest Planning Table">
      {/* Guest Planning Table */}
      <TableHead>
        <TableRow >
          <StyledTableCell><NoteAddTwoTone /> Guest ID</StyledTableCell>
          <StyledTableCell><Person /> Name</StyledTableCell>
          <StyledTableCell><Email /> Email</StyledTableCell>
          <StyledTableCell><Phone /> Phone</StyledTableCell>
          <StyledTableCell><EventAvailable /> RSVP</StyledTableCell>
          <StyledTableCell><Category /> Category</StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {formData?.GuestPlanning?.map(guest => (
          <StyledTableRow  key={guest.guestId} hover>
            <StyledTableCell>{guest.guestId}</StyledTableCell>
            <StyledTableCell>{guest.guestName}</StyledTableCell>
            <StyledTableCell>{guest.email}</StyledTableCell>
            <StyledTableCell>{guest.phone}</StyledTableCell>
            <StyledTableCell>{guest.rsvpStatus}</StyledTableCell>
            <StyledTableCell>{guest.guestCategory}</StyledTableCell>
          </StyledTableRow>
        ))}
      </TableBody>
      </Table>
      </TableContainer>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="Vendor Management Table">
      {/* Vendor Management Table */}
      <TableHead>
        <TableRow>
          <StyledTableCell>Vendor ID</StyledTableCell>
          <StyledTableCell>Name</StyledTableCell>
          <StyledTableCell>Type</StyledTableCell>
          <StyledTableCell>Items</StyledTableCell>
          <StyledTableCell>Contact</StyledTableCell>
          <StyledTableCell>Email</StyledTableCell>
          <StyledTableCell>Phone</StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {formData?.VendorManagement?.map((vendor, index) => (
          <StyledTableRow  key={index} hover>
            <StyledTableCell>{vendor.vendorId}</StyledTableCell>
            <StyledTableCell>{vendor.vendorName}</StyledTableCell>
            <StyledTableCell>{vendor.vendorType}</StyledTableCell>
            <StyledTableCell>{vendor.items.join(', ')}</StyledTableCell>
            <StyledTableCell>{vendor.contactInfo}</StyledTableCell>
            <StyledTableCell>{vendor.email}</StyledTableCell>
            <StyledTableCell>{vendor.phone}</StyledTableCell>
          </StyledTableRow>
        ))}
      </TableBody>
</Table>
      </TableContainer>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="Food Items Table">
      {/* Food Items Table */}
      <TableHead>
        <TableRow>
          <StyledTableCell>ID</StyledTableCell>
          <StyledTableCell>Food Name</StyledTableCell>
          <StyledTableCell>Discount</StyledTableCell>
          <StyledTableCell>Cuisine</StyledTableCell>
          <StyledTableCell>Price</StyledTableCell>
          <StyledTableCell>Ratings</StyledTableCell>
          <StyledTableCell>Tags</StyledTableCell>
          <StyledTableCell>Quantity</StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {formData?.FoodItemsandMovieItems?.FoodItems?.map(data => (
          <StyledTableRow  key={data.food._id} hover>
            <StyledTableCell>{data.food._id}</StyledTableCell>
            <StyledTableCell>
              <div className="flex items-center space-x-2">
                <img
                  src={data.food.CloudanaryImageId}
                  alt="Food"
                  className="h-10 w-10 rounded-full"
                />
                <span>{data.food.FOODNAME}</span>
              </div>
            </StyledTableCell>
            <StyledTableCell>{data.food.DISCOUNT}</StyledTableCell>
            <StyledTableCell>{data.food.CUSSINE}</StyledTableCell>
            <StyledTableCell>{data.food.PRICE}</StyledTableCell>
            <StyledTableCell>{data.food.RATINGS}</StyledTableCell>
            <StyledTableCell>{data.food.TAGS.join(', ')}</StyledTableCell>
            <StyledTableCell>
              <input
                type="number"
                className="w-16 text-center bg-gray-100 border rounded"
                value={data.count
                }
                readOnly
              />
            </StyledTableCell>
          </StyledTableRow>
        ))}
      </TableBody>
        </Table>
      </TableContainer>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="Movie Items Table">
      <TableHead>
        <TableRow>
          <StyledTableCell>ID</StyledTableCell>
          <StyledTableCell>Movie Name</StyledTableCell>
          <StyledTableCell>certificate</StyledTableCell>
          <StyledTableCell>Total Ratting</StyledTableCell>
          <StyledTableCell>Vote Count</StyledTableCell>
          <StyledTableCell>releaseYear</StyledTableCell>
          <StyledTableCell>runtime</StyledTableCell>
          <StyledTableCell>Tags</StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {
          <StyledTableRow  key={formData?.FoodItemsandMovieItems?.Movie?.id} hover>
            <StyledTableCell>{formData?.FoodItemsandMovieItems?.Movie?.id}</StyledTableCell>
            <StyledTableCell>
              <div className="flex items-center space-x-2">
                <img
                  src={formData?.FoodItemsandMovieItems?.Movie?.movieImage}
                  alt={formData?.FoodItemsandMovieItems?.Movie?.imageCaption}
                                       className="h-10 w-10 rounded-full"
                />
                <span>{formData?.FoodItemsandMovieItems?.Movie?.title}</span>
              </div>
            </StyledTableCell>
            <StyledTableCell>{formData?.FoodItemsandMovieItems?.Movie?.certificate?.rating}</StyledTableCell>
            <StyledTableCell>{formData?.FoodItemsandMovieItems?.Movie?.ratingsSummary?.aggregateRating}</StyledTableCell>
            <StyledTableCell>{formData?.FoodItemsandMovieItems?.Movie?.ratingsSummary?.voteCount}</StyledTableCell>
            <StyledTableCell>{formData?.FoodItemsandMovieItems?.Movie?.releaseYear}</StyledTableCell>
            <StyledTableCell>{formData?.FoodItemsandMovieItems?.Movie?.runtime}</StyledTableCell>
            <StyledTableCell>{formData?.FoodItemsandMovieItems?.Movie?.tags.join(', ')}</StyledTableCell>
            
          </StyledTableRow>
        }
      </TableBody>
        </Table>
      </TableContainer>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="Movie hall Table">
       <TableHead>
        <TableRow>
          <StyledTableCell>Image</StyledTableCell>
          <StyledTableCell>Price</StyledTableCell>
          <StyledTableCell>caption</StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {
          <StyledTableRow  key={formData?.FoodItemsandMovieItems?.Movie?.id} hover>
            <StyledTableCell>
              <div className="flex items-center space-x-2">
                <img
                  src={formData?.FoodItemsandMovieItems?.Moviehall?.Imageurl}
                  alt={""}
                                       className="h-[100%] w-[100%]"
                />
              </div>
            </StyledTableCell>
            <StyledTableCell>{formData?.FoodItemsandMovieItems?.Moviehall?.Price}</StyledTableCell>
            <StyledTableCell>{formData?.FoodItemsandMovieItems?.Moviehall?.caption}</StyledTableCell>
            
          </StyledTableRow>
        }
      </TableBody>
        </Table>
      </TableContainer>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="Notification table Table">
       <TableHead>
        <TableRow>
          <StyledTableCell>notificationId</StyledTableCell>
          <StyledTableCell>guestName</StyledTableCell>
          <StyledTableCell>Address</StyledTableCell>
          <StyledTableCell>email</StyledTableCell>
          <StyledTableCell>phone</StyledTableCell>
          <StyledTableCell>invitationType</StyledTableCell>
          <StyledTableCell>messageContent</StyledTableCell>
          <StyledTableCell>scheduledTime</StyledTableCell>

        </TableRow>
      </TableHead>
      <TableBody>
      {formData?.CommunicationandNotificationsCard?.map(data => (
        <StyledTableRow  key={data.notificationId} hover>
          <StyledTableCell>{data.notificationId}</StyledTableCell>
          <StyledTableCell>{data.guestName}</StyledTableCell>
          <StyledTableCell>{data.Address}</StyledTableCell>
          <StyledTableCell>{data?.email}</StyledTableCell>
          <StyledTableCell>{data?.phone}</StyledTableCell>
          <StyledTableCell>{data?.invitationType}</StyledTableCell>
          <StyledTableCell>{data?.messageContent}</StyledTableCell>
          <StyledTableCell>{data?.scheduledTime}</StyledTableCell>
        </StyledTableRow>
      ))}
      </TableBody>
    </Table>
          <button onclick={()=>{deleteBirthdayItem(index) }}>Remove</button>
    </TableContainer>
</Paper>
    </>
}

export default Birthdayhallcart;
