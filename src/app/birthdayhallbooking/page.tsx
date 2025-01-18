"use client";
import React, { useState, useEffect, useContext } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BirthdayhallContext } from "@/context/Birthdayhall";
import "./productable.scss";
import { useRouter } from "next/navigation";
import shortid from "shortid";
import {Paper,Button,  Box,  Card,  CardContent,  Stepper,  Step,  StepLabel,  Container} from "@mui/material";
import {NavigateNext,NavigateBefore} from "@mui/icons-material";
import EventInformation from "@/components/plan/EventInformation";
import GuestManagement from "@/components/plan/GuestManagement";
import VendorManagement from "@/components/plan/VendorManagement";

import BudgetandExpenseManagementCard from "@/components/plan/BudgetandExpenseManagementCard";
import CommunicationandNotificationsCard from "@/components/plan/CommunicationandNotificationsCard";
import InvitationManagementCard from "@/components/plan/InvitationManagementCard";
import FoodItemsandMovieItems from "@/components/plan/FoodItemsandMovieItems";
import Preview from "@/components/plan/Preview";
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
interface BillDetails {
  Fooditems: Array<JSON>;
  MovieItems: Array<JSON>;
  birthdayhallitems: Array<JSON>;
  shipping: number;
  shippingAddressState: string;
  shippingAddressStreet: string;
  subtotal: number;
  tax: string;
  total: string;
}
interface PaymentDetails {
  amount: number;
  amount_due: number;
  amount_paid: number;
  attempts: number;
  created_at: number;
  currency: string;
  entity: string;
  id: string;
  notes: Array<any>;
  offer_id: string;
  receipt: string;
  status: string;
}
interface OrderDetails {
  amount: string;
  billDetails: BillDetails;
  customername: string;
  date: string;
  email: string;
  method: string;
  orderid: string;
  payments: PaymentDetails;
  phone: string;
  status: string;
  time: string;
}
interface EventPlanning {
  EventId: string;
  EventName: string;
  EventType: string;
  EventTheme: string;
  EventDescription: string;
  EventStartDate: string;
  EventStartTime: string;
  EventEndTime: string;
  EventVenueName: string;
  EventVeneueAddress: string;
  EventLongitude: string;
  EventLatitude: string;
  decorationId:string;
  isEditing: boolean;
}
interface GuestPlanning {
  guestId: string;
  guestName: string;
  email: string;
  phone: string;
  rsvpStatus: string;
  guestCategory: string;
  specialRequests: string;
  openSnackbar: string;
  isEditing: boolean;
}
interface VendorManagement {
  vendorId: string;
  vendorName: string;
  contactInfo: string;
  email: string;
  phone: string;
  foodItems: string[]; // List of food items, assuming strings here
  pricing: string;
  notes: string;
  isEditing: boolean;
}
interface BudgetandExpenseManagement {
  budgetId: string;
  expenseCategory: string;
  allocatedBudget: number;
  actualExpense: number;
  isEditing: boolean;
  notes: string;
}
interface CommunicationandNotificationsCard {
  notificationId: string;
  recipient: string;
  scheduledTime: string;
  messageContent: string;
  isEditing: boolean;
}


interface FormCollector {
  EventPlanning: EventPlanning[];
  GuestPlanning: GuestPlanning[];
  VendorManagement: VendorManagement[];
  FoodItemsandMovieItems:{
    FoodItems:[{
      food:{
        _id: any;
        CloudanaryImageId: string;
        DISCOUNT: string;
        CUSSINE: string;
        FOODNAME: string;
        PRICE: string;
        DISCOUNTED_PRICE: string;
        RATINGS: number;
        TAGS: string[];
    },
    count:number
    }]|[],
    Movie:{
      certificate:{
        ratting:string
      },
      id:String,
      imageCaption:string,
      latestTrailer:{
        id:String
      },
      movieImage:String,
      rattingsSummary:{
        voteCount:number,aggregateRatting:any
      },
      releaseYear:number,
      reviews:Array<any>,
      reviewstars:number,
      runtime:number,
      tags:Array<string>,
      title:string,
    }|[],
    Moviehall:{
      Imageurl:string,
      Price:number,
      caption:string
    }|[]
   }|{},
  BudgetandExpenseManagement: BudgetandExpenseManagement[];
  CommunicationandNotificationsCard: CommunicationandNotificationsCard[];
}
interface FormData {
  orderid:string;
  hallid: string;
  customername: string;
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
import { UsernameContext } from '@/context/UserContext';
import { PlanContext } from "@/context/PlanContext";
import { CartContext } from "@/context/CartContext";

function Page() {
  
const {foodItemSelected,
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
   steps}=useContext(PlanContext);
  const router = useRouter();
  const { username} = useContext(UsernameContext);
  const Contest =useContext(BirthdayhallContext);
useEffect(()=>{
setOrders([
  {
    orderid:shortid.generate(),
    hallid: "",
    customername: username,
    address:"",
    email: "",
    contactNumber: "",
    dateTime: "",
    numberOfSeats: "12",
    message: "",
    selectedDecoration: "",
    TypeofEvent:"",
    slots:"",
  }
]);
},[])
  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <EventInformation finalData={formData} setfinalData={setFormData} orders={orders} setOrders={setOrders}/>;
      case 1:
        return <GuestManagement formData={formData} setFormData={setFormData} />;
      case 2:
        return <VendorManagement finalData={formData} setfinalData={setFormData} />;
      case 3:
        return <FoodItemsandMovieItems finalData={formData} setfinalData={setFormData} orders={orders}/>
      case 4:
        return <BudgetandExpenseManagementCard formData={formData} setFormData={setFormData} />;
      case 5:
        return <CommunicationandNotificationsCard finalData={formData} setFinalData={setFormData} />;
        case 6:
          return <Preview  />;  

          default:
        return 'Unknown step';
    }
  };
  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      // await axios.post("/api/bookings", formData);
      toast.success("Booking submitted successfully!");
      Contest.addItemsToCart(formData);
      setFormData({
         EventPlanning: [],
           GuestPlanning: [],
           VendorManagement: [],
           FoodItemsandMovieItems:{},
           BudgetandExpenseManagement: [],
           CommunicationandNotificationsCard: [],
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
      <div className=" justify-center text-white text-5xl flex  flex-col items-center justify-items-center">
       
     <Container maxWidth="lg" sx={{ mt: 12, mb: 4,backgroundColor:"#ffffff57" }}>
             <Paper elevation={3} sx={{ p: 4, mb: 4, borderRadius: 2,backgroundColor:"#ffffff57" }}>
               <Stepper activeStep={activeStep} alternativeLabel>
                 {steps.map((label:any) => (
                   <Step key={label}>
                     <StepLabel>{label}</StepLabel>
                   </Step>
                 ))}
               </Stepper>
             </Paper>
     
             <Card sx={{ mb: 4, borderRadius: 2,backgroundColor:"#ffffff57" }}>
               <CardContent sx={{backgroundColor:"#ffffff57"}}>
                 {getStepContent(activeStep)}
                 <Box sx={{
                   display: 'flex',
                   justifyContent: 'space-between',
                   backgroundColor:"#ffffff57",
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
               </CardContent>
             </Card>
           </Container>
       <div className="flex justify-center mt-8">
  
       <Button
                     variant="contained"
                     onClick={handleSubmit}
                     disabled={activeStep != steps.length - 1}
                     endIcon={<NavigateNext />}
                     fullWidth
                     color="error"
                     sx={{
                       borderRadius: 2,
                       width:"22vw",
                       textTransform: 'none',
                       boxShadow: 2
                     }}
                   >
                     Procced to Check Out
                   </Button>
          </div>
          <ToastContainer position="bottom-right" />
      </div>
    </div>
  );
}

export default Page;
