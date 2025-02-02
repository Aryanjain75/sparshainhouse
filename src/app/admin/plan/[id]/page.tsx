

"use client";
import React, { useContext, useEffect, useState } from "react";
import Sidebar from "@/components/sidebar/Sidebar";
import "./product.css";
import Productable from "@/components/theaterproductable/Productable";
import Link from 'next/link';
import axios from "axios";

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Button,
  Typography,
  Box,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  Card,
  CardContent,
  Divider,
  Stack,
  Stepper,
  Step,
  StepLabel,
  Container,
  IconButton,
  Tooltip,
  styled,
  tableCellClasses
} from "@mui/material";
import {
  NoteAddTwoTone,
  ThumbDown,
  ThumbUp,
  ErrorOutline,
  EventNote,
  Category,
  Palette,
  Description,
  LocationOn,
  AccessTime,
  CalendarMonth,
  Place,
  MyLocation,
  Save,
  Delete,
  NavigateNext,
  NavigateBefore,
  Email,
  EventAvailable,
  Person,
  Phone
} from "@mui/icons-material";
import EventInformation from "@/components/adminplan/EventInformation";
import GuestManagement from "@/components/adminplan/GuestManagement";
import VendorManagement from "@/components/adminplan/VendorManagement";
import FoodItemsandMovieItems from "@/components/adminplan/FoodItemsandMovieItems";
import TaskandTimelineManagement from "@/components/adminplan/TaskandTimelineManagement";
import BudgetandExpenseManagementCard from "@/components/adminplan/BudgetandExpenseManagementCard";
import CommunicationandNotificationsCard from "@/components/adminplan/CommunicationandNotificationsCard";
import InvitationManagementCard from "@/components/plan/InvitationManagementCard";
import Preview from "@/components/adminplan/adminpreview";
import {AdminPlanContext} from "@/context/AdminContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

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

const Product = ({ params }: { params: { id: string } }) => {
  const {
    foodItemSelected,
    setFoodItemSelected,
    MovieItemSelected, 
    setMovieItemSelected,
    MoviehallItemSelected,
     setMoviehallItemSelected,
     TheaterJson,
     moviesData, 
     setMoviesData,
     data, 
     setData,
     orders, setOrders,
     formData, setFormData,
     activeStep, setActiveStep,
     handleNext,
     handleBack,
     steps,
     partyplan,setpartyplan
     
  }=useContext(AdminPlanContext);
    const router = useRouter();
  
useEffect(()=>{console.log(formData)},[formData])
 useEffect(() => {
  const fetchOrders = async () => {
  try {
    const [orderdata, plans] = await Promise.all([
      axios.get("/api/orders/all"),
      axios.get(`/api/plans/${params.id}`)
    ]);
    console.log(orderdata.data.orders)
    const filteredOrders = orderdata.data.orders.filter((order:any) => order.orderid == params.id);
    console.log(filteredOrders);
    setOrders(filteredOrders);
  } catch (error) {
    console.error('Error fetching orders:', error);
  }
};

  fetchOrders();
}, [params.id]);

// Add another useEffect to log when orders are updated
useEffect(() => {

  console.log('Orders updated:', formData);
  console.log('Orders updated:', orders);

}, [orders]);
const handleSubmit = async () => {
  try {
    const p = {
      orderid: orders?.[0]?.orderid,
      plan: partyplan
    }
    const resp = await axios.post("/api/plans", p);
    console.log("Plan submitted successfully:", resp.data);
    toast.success("Plan submitted successfully!");
    router.push("/admin/orders");

  } catch (error) {
    console.error("Error submitting plan:", error);
    toast.error("Error submitting plan. Please try again.");
    throw error;
  }
}
  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <EventInformation finalData={formData} setfinalData={setFormData} orders={orders} setOrders={orders}/>;
      case 1:
        return <GuestManagement formData={formData} setFormData={setFormData} />;
      case 2:
        return <VendorManagement finalData={formData} setfinalData={setFormData} />;
      case 3:
        return <FoodItemsandMovieItems finalData={formData} setfinalData={setFormData} orders={orders}  />;
      case 4:
        return <TaskandTimelineManagement formData={formData} setFormData={setFormData} />;
      case 5:
        return <BudgetandExpenseManagementCard formData={formData} setFormData={setFormData} />;
      case 6:
        return <CommunicationandNotificationsCard finalData={formData} setFinalData={setFormData} />;
      case 7:
        return <Preview orderid={params.id} />;
      default:
        return 'Unknown step';
    }
  };

  return (
    <Box className="flex">
      <Sidebar />
      <Container maxWidth="lg" sx={{ mt: 12, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4, mb: 4, borderRadius: 2 }}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label:any) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Paper>

        <Card sx={{ mb: 4, borderRadius: 2 }}>
          <CardContent>
            {getStepContent(activeStep)}
            <Box sx={{
              display: 'flex',
              justifyContent: 'space-between',
              mt: 3,
              px: 2
            }}>
              <Button
                variant="contained"
                disabled={activeStep === 0}
                onClick={handleBack}
                startIcon={<NavigateBefore />}
                sx={{
                  borderRadius: 2,
                  textTransform: 'none',
                  boxShadow: 2
                }}
              >
                Back
              </Button>
              <Button
                variant="contained"
                onClick={handleNext}
                disabled={activeStep === steps.length - 1}
                endIcon={<NavigateNext />}
                sx={{
                  borderRadius: 2,
                  textTransform: 'none',
                  boxShadow: 2
                }}
              >
                Next
              </Button>
            </Box>
            <Box sx={{
              display: 'flex',
              justifyContent: 'center',

              mt: 3,
              px: 2
            }}>
            <Button
                variant="contained"
                disabled={activeStep != steps.length - 1}
                endIcon={<NavigateNext />}
                onClick={handleSubmit}

                sx={{
                  borderRadius: 2,
                  textTransform: 'none',

                  boxShadow: 2
                }}
              >
                Submit Plan
              </Button>
              </Box>
          </CardContent>
        </Card>
        <ToastContainer/>t
      </Container>
      <Container maxWidth="lg" sx={{ mt: 12, mb: 4 }}>
       
        <Paper sx={{ width: '200%', overflow: 'hidden', background:"white" }}>
              <TableContainer >
                <Table stickyHeader aria-label="Order Details">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Order ID</StyledTableCell>
                      <StyledTableCell>Customer Name</StyledTableCell>
                      <StyledTableCell>Paid Amount</StyledTableCell>
                      <StyledTableCell>Booking Date</StyledTableCell>
                      <StyledTableCell>Email</StyledTableCell>
                      <StyledTableCell>Payment Method</StyledTableCell>
                      <StyledTableCell>phone No</StyledTableCell>
                      <StyledTableCell>Application Status</StyledTableCell>
                      <StyledTableCell>Booking Time</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orders.map((row:any) => (
                      <StyledTableRow  key={row.orderid} hover>
                        <StyledTableCell>{row.orderid}</StyledTableCell>
                        <StyledTableCell>{row.customername}</StyledTableCell>
                        <StyledTableCell>{row.amount}</StyledTableCell>
                        <StyledTableCell>{row.date}</StyledTableCell>
                        <StyledTableCell>{row.email}</StyledTableCell>
                        <StyledTableCell>{row.method}</StyledTableCell>
                        <StyledTableCell>{row.phone}</StyledTableCell>
                        <StyledTableCell>{row.status}</StyledTableCell>
                        <StyledTableCell>{row.time}</StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
          </Table>
          <Table stickyHeader aria-label="Payments Details">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Payments ID</StyledTableCell>
                      <StyledTableCell>Payments Amount</StyledTableCell>
                      <StyledTableCell>Payments Currency</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orders.map((row:any) => (
                      <StyledTableRow  key={row.payments.id} hover>
                        <StyledTableCell>{row.payments.id}</StyledTableCell>
                        <StyledTableCell>{row.payments.amount/100}/-</StyledTableCell>
                        <StyledTableCell>{row.currency}</StyledTableCell>
                       
                      </StyledTableRow>
                    ))}
                  </TableBody>
          </Table>
          <Table stickyHeader aria-label="Payments Details">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>shipping Amount</StyledTableCell>
                      <StyledTableCell>shipping Address State</StyledTableCell>
                      <StyledTableCell>shipping Address Street</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                      <StyledTableRow  key={orders?.[0]?.billDetails?.subtotal} hover>
                        <StyledTableCell>{orders?.[0]?.billDetails?.subtotal}/-</StyledTableCell>
                        <StyledTableCell>{orders?.[0]?.billDetails?.shippingAddressState}</StyledTableCell>
                        <StyledTableCell>{orders?.[0]?.billDetails?.shippingAddressStreet}</StyledTableCell>
                       
                      </StyledTableRow>
                  </TableBody>
          </Table>
          <Table stickyHeader aria-label="Resturent  Order  Details">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Item Id</StyledTableCell>
                      <StyledTableCell>Food Name</StyledTableCell>
                      <StyledTableCell>Cussine</StyledTableCell>
                      <StyledTableCell>Discount</StyledTableCell>
                      <StyledTableCell>Price</StyledTableCell>
                      <StyledTableCell>Ratting </StyledTableCell>
                      <StyledTableCell>Tags</StyledTableCell>
                      <StyledTableCell>quantity</StyledTableCell>

                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orders?.[0]?.billDetails?.Fooditems?.map((row:any) => (
                      <StyledTableRow  key={row.itemid} hover>
                        <StyledTableCell>{row.itemid}</StyledTableCell>
                        <StyledTableCell><img src={row.CloudanaryImageId} alt="" style={{width:"40px",height:'40px'}} />{row.FOODNAME}</StyledTableCell>
                        <StyledTableCell>{row.CUSSINE}</StyledTableCell>
                        <StyledTableCell>{row.DISCOUNT}</StyledTableCell>
                        <StyledTableCell>{row.PRICE}</StyledTableCell>
                        <StyledTableCell>{row.RATINGS}</StyledTableCell>
                        <StyledTableCell>{row.TAGS.map((data:string)=>{data})}</StyledTableCell>
                        <StyledTableCell>{row?.quantity||0}</StyledTableCell>

                      </StyledTableRow>
                    ))}
                  </TableBody>
          </Table>
          {orders?.[0]?.billDetails?.MovieItems?.map((data:any) => (
  <div key={data.Refid} className='border-2 border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 my-4 mx-2'>
    <Table>
      <TableHead>
        <StyledTableRow className="bg-gray-50">
          <StyledTableCell className="w-[150px] text-gray-700 font-semibold">Topics</StyledTableCell>
          <StyledTableCell className="text-gray-700 font-semibold">Values</StyledTableCell>
          <StyledTableCell className="text-right text-gray-700 font-semibold">Total Amount</StyledTableCell>
        </StyledTableRow>
      </TableHead>
      <TableBody>
        <StyledTableRow>
          <StyledTableCell className="font-medium text-gray-600">Reference ID</StyledTableCell>
          <StyledTableCell className="text-gray-800">{data?.Refid}</StyledTableCell>
          <StyledTableCell className="text-right"></StyledTableCell>
        </StyledTableRow>
        <StyledTableRow>
          <StyledTableCell className="font-medium text-gray-600">Customer Name</StyledTableCell>
          <StyledTableCell className="text-gray-800">{data?.customerName}</StyledTableCell>
          <StyledTableCell className="text-right"></StyledTableCell>
        </StyledTableRow>
        <StyledTableRow>
          <StyledTableCell className="font-medium text-gray-600">Number of Seats</StyledTableCell>
          <StyledTableCell className="text-gray-800">{data?.numberOfSeats}</StyledTableCell>
          <StyledTableCell className="text-right"></StyledTableCell>
        </StyledTableRow>
        <StyledTableRow>
          <StyledTableCell className="font-medium text-gray-600">Address</StyledTableCell>
          <StyledTableCell className="text-gray-800">{data?.address}</StyledTableCell>
          <StyledTableCell className="text-right"></StyledTableCell>
        </StyledTableRow>
        <StyledTableRow>
          <StyledTableCell className="font-medium text-gray-600">Email</StyledTableCell>
          <StyledTableCell className="text-gray-800">{data?.email}</StyledTableCell>
          <StyledTableCell className="text-right"></StyledTableCell>
        </StyledTableRow>
        <StyledTableRow>
          <StyledTableCell className="font-medium text-gray-600">Contact Number</StyledTableCell>
          <StyledTableCell className="text-gray-800">{data?.contactNumber}</StyledTableCell>
          <StyledTableCell className="text-right"></StyledTableCell>
        </StyledTableRow>
        <StyledTableRow>
          <StyledTableCell className="font-medium text-gray-600">Additional Equipment</StyledTableCell>
          <StyledTableCell className="text-gray-800">{data?.additionalEquipment}</StyledTableCell>
          <StyledTableCell className="text-right"></StyledTableCell>
        </StyledTableRow>
        <StyledTableRow>
          <StyledTableCell className="font-medium text-gray-600">Date & Time</StyledTableCell>
          <StyledTableCell className="text-gray-800">{new Date(data?.dateTime).toLocaleString()}</StyledTableCell>
          <StyledTableCell className="text-right"></StyledTableCell>
        </StyledTableRow>
        <StyledTableRow>
          <StyledTableCell className="font-medium text-gray-600">Special Requests</StyledTableCell>
          <StyledTableCell className="text-gray-800">{data?.specialRequests}</StyledTableCell>
          <StyledTableCell className="text-right"></StyledTableCell>
        </StyledTableRow>
        <StyledTableRow>
          <StyledTableCell className="font-medium text-gray-600">Staff Handling</StyledTableCell>
          <StyledTableCell className="text-gray-800">{data?.staffHandling}</StyledTableCell>
          <StyledTableCell className="text-right"></StyledTableCell>
        </StyledTableRow>
        <StyledTableRow>
          <StyledTableCell className="font-medium text-gray-600">Notes</StyledTableCell>
          <StyledTableCell className="text-gray-800">{data?.notes}</StyledTableCell>
          <StyledTableCell className="text-right"></StyledTableCell>
        </StyledTableRow>
        <StyledTableRow>
          <StyledTableCell className="font-medium">
            <img src={data?.Imageurl} alt={data?.caption} className="rounded-lg shadow-sm max-w-[200px]" />
          </StyledTableCell>
          <StyledTableCell className="text-gray-800">{data?.caption}</StyledTableCell>
          <StyledTableCell className="text-right font-semibold text-green-600">Rs. {parseInt(data?.Price)*parseInt(data?.numberOfSeats)}</StyledTableCell>
        </StyledTableRow>
        <StyledTableRow>
          <StyledTableCell className="font-medium">
            <img src={data?.movieImage} alt={data?.imageCaption} className="rounded-lg shadow-sm max-w-[200px]" />
          </StyledTableCell>
          <StyledTableCell className="text-gray-800">{data?.movieName}</StyledTableCell>
          <StyledTableCell className="text-right text-sm text-gray-600">Rs.100 <span className="italic">(Only when movie unavailable)</span></StyledTableCell>
        </StyledTableRow>
        <StyledTableRow>
          <StyledTableCell className="font-medium text-gray-600">Release Year</StyledTableCell>
          <StyledTableCell className="text-gray-800">{data?.releaseYear?.year}</StyledTableCell>
          <StyledTableCell className="text-right"></StyledTableCell>
        </StyledTableRow>
        <StyledTableRow>
          <StyledTableCell className="font-medium text-gray-600">Movie Runtime</StyledTableCell>
          <StyledTableCell className="text-gray-800">{data?.movieduration}</StyledTableCell>
          <StyledTableCell className="text-right"></StyledTableCell>
        </StyledTableRow>
      </TableBody>
    </Table>
  </div>
))}      {orders?.[0]?.billDetails?.birthdayhallitems.map((Row:any)=>(
    <>
    <div>
      
      <Table stickyHeader aria-label="Event Planning Details">
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
          {Row?.EventPlanning?.map((row:any) => (
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
            {Row?.GuestPlanning?.map((guest:any) => (
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
            {Row?.VendorManagement?.map((vendor:any, index:any) => (
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
            {Row?.FoodItemsandMovieItems?.FoodItems?.map((data:any) => (
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
              <StyledTableRow  key={Row?.FoodItemsandMovieItems?.Movie?.id} hover>
                <StyledTableCell>{Row?.FoodItemsandMovieItems?.Movie?.id}</StyledTableCell>
                <StyledTableCell>
                  <div className="flex items-center space-x-2">
                    <img
                      src={Row?.FoodItemsandMovieItems?.Movie?.movieImage}
                      alt={Row?.FoodItemsandMovieItems?.Movie?.imageCaption}
                                           className="h-10 w-10 rounded-full"
                    />
                    <span>{Row?.FoodItemsandMovieItems?.Movie?.title}</span>
                  </div>
                </StyledTableCell>
                <StyledTableCell>{Row?.FoodItemsandMovieItems?.Movie?.certificate?.rating}</StyledTableCell>
                <StyledTableCell>{Row?.FoodItemsandMovieItems?.Movie?.ratingsSummary?.aggregateRating}</StyledTableCell>
                <StyledTableCell>{Row?.FoodItemsandMovieItems?.Movie?.ratingsSummary?.voteCount}</StyledTableCell>
                <StyledTableCell>{Row?.FoodItemsandMovieItems?.Movie?.releaseYear}</StyledTableCell>
                <StyledTableCell>{Row?.FoodItemsandMovieItems?.Movie?.runtime}</StyledTableCell>
                <StyledTableCell>{Row?.FoodItemsandMovieItems?.Movie?.tags.join(', ')}</StyledTableCell>
                
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
              <StyledTableRow  key={Row?.FoodItemsandMovieItems?.Movie?.id} hover>
                <StyledTableCell>
                  <div className="flex items-center space-x-2">
                    <img
                      src={Row?.FoodItemsandMovieItems?.Moviehall?.Imageurl}
                      alt={""}
                                           className="h-[100%] w-[100%]"
                    />
                  </div>
                </StyledTableCell>
                <StyledTableCell>{Row?.FoodItemsandMovieItems?.Moviehall?.Price}</StyledTableCell>
                <StyledTableCell>{Row?.FoodItemsandMovieItems?.Moviehall?.caption}</StyledTableCell>
                
              </StyledTableRow>
            }
          </TableBody>
            </Table>
          </TableContainer>
          <TableContainer sx={{ maxHeight: 440 }}>
           1 <Table stickyHeader aria-label="Notification table Table">
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
          {Row?.CommunicationandNotificationsCard?.map((data:any) => (
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
        
      </TableContainer>
     </div>
    </>
))}
              </TableContainer>
              
            </Paper>
        
      </Container>
    </Box>
  );
};

export default Product;
