

"use client";
import React, { useEffect, useState } from "react";
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
  Tooltip
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
  NavigateBefore
} from "@mui/icons-material";
import EventInformation from "@/components/plan/EventInformation";
import GuestManagement from "@/components/plan/GuestManagement";
import VendorManagement from "@/components/plan/VendorManagement";
import ServicesandPackages from "@/components/plan/ServicesandPackages";
import TaskandTimelineManagement from "@/components/plan/TaskandTimelineManagement";
import BudgetandExpenseManagementCard from "@/components/plan/BudgetandExpenseManagementCard";
import CommunicationandNotificationsCard from "@/components/plan/CommunicationandNotificationsCard";
import InvitationManagementCard from "@/components/plan/InvitationManagementCard";


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

function Product() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orders, setOrders] = useState<Array<OrderDetails> | null>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    EventPlanning: [{
      EventId: "",
      EventName: "",
      EventType: "",
      EventTheme: "",
      EventDescription: "",
      EventDate: "",
      EventStartTime: "",
      EventEndTime: "",
      EventVenueName: "",
      EventVeneueAddress: "",
      EventLongitude: "",
      EventLatitude: ""
    }],
    GuestPlanning: [{
      guestId: "",
      guestName: "",
      email: "",
      phone: "",
      rsvpStatus: "",
      guestCategory: "",
      specialRequests: "",
      openSnackbar: ""
    }],
    VendorManagement:[{
      vendorId: "",
      vendorName: "",
      contactInfo: "",
      email: "",
      phone: "",
      foodItems: [],
      pricing: "",
      notes: ""
    }],
    ServicesandPackages:[
      {
        serviceId:"",
        serviceName:"",
        servicePrice:"",
        serviceDescription:"",
        serviceCategory:""
      }
    ],
    TaskandTimelineManagement:[
      {
        taskId:"",
        taskName:"",
        dueDate:"",
        taskStatus:"",
        taskDescription:"",
      }
    ],
    BudgetandExpenseManagement:[
    { budgetId: '',
      expenseCategory: '',
      allocatedBudget: 0,
      actualExpense: 0,
      notes: ''}
    ],CommunicationandNotificationsCard:[
      {
        notificationId: '',
        recipient: '',
        scheduledTime: '',
        messageContent: ''
      }
    ],
    InvitationManagementCard:[
      {
        guestName: '',
        email: '',
        phone: '',
        invitationType: ''
      }
    ]
  });
  
  const steps = [
    'Event Information',
    'Guest Management', 
    'Vendor Management',
    'Services & Packages',
    'Tasks & Timeline',
    'Budget & Expenses',
    'Communication',
    'Invitations'
  ];

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("/api/orders/all");
      console.log(data.orders);
      setOrders(data.orders);
    } catch(error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <EventInformation finalData={formData} setfinalData={setFormData} />;
      case 1:
        return <GuestManagement formData={formData} setFormData={setFormData} />;
      case 2:
        return <VendorManagement finalData={formData} setfinalData={setFormData} />;
      case 3:
        return <ServicesandPackages formData={formData} setFormData={setFormData} />;
      case 4:
        return <TaskandTimelineManagement formData={formData} setFormData={setFormData} />;
      case 5:
        return <BudgetandExpenseManagementCard formData={formData} setFormData={setFormData} />;
      case 6:
        return <CommunicationandNotificationsCard finalData={formData} setFinalData={setFormData} />;
      case 7:
        return <InvitationManagementCard finalData={formData} setfinalData={setFormData} />;
      default:
        return 'Unknown step';
    }
  };

  const handleDelete = (key: string, index: number) => {
    setFormData((prev) => ({
      ...prev,
      [key]: prev[key as keyof typeof formData].filter((_, i) => i !== index)
    }));
  };

  return (
    <Box className="flex">
      <Sidebar />
      <Container maxWidth="lg" sx={{ mt: 12, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4, mb: 4, borderRadius: 2 }}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
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
          </CardContent>
        </Card>

        {Object.entries(formData).map(([key, data], index) => (
          <Card key={index} sx={{ mb: 3, borderRadius: 2 }}>
            <CardContent>
              <Typography 
                variant="h6" 
                gutterBottom 
                sx={{ 
                  fontWeight: 'bold',
                  color: 'primary.main',
                  mb: 3
                }}
              >
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </Typography>
              <TableContainer>
                <Table sx={{ minWidth: 650 }}>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: 'primary.light' }}>
                      {Object.keys(data[0] || {}).map((col, i) => (
                        <TableCell 
                          key={i}
                          sx={{ 
                            fontWeight: 'bold',
                            color: 'primary.contrastText'
                          }}
                        >
                          {col}
                        </TableCell>
                      ))}
                      <TableCell 
                        sx={{ 
                          fontWeight: 'bold',
                          color: 'primary.contrastText'
                        }}
                      >
                        Actions
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(data as Array<any>).map((row, i) => (
                      <TableRow 
                        key={i}
                        sx={{ 
                          '&:nth-of-type(odd)': {
                            backgroundColor: 'action.hover',
                          },
                          '&:hover': {
                            backgroundColor: 'action.selected',
                          }
                        }}
                      >
                        {Object.values(row).map((val, j) => (
                          <TableCell key={j}>{val as React.ReactNode}</TableCell>
                        ))}
                        <TableCell>
                          <Tooltip title="Delete">
                            <IconButton
                              color="error"
                              onClick={() => handleDelete(key, i)}
                              size="small"
                            >
                              <Delete />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        ))}
      </Container>
    </Box>
  );
}

export default Product;

