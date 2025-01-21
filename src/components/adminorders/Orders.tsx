
"use client";
import React, { useEffect, useState, useContext } from "react";
import Sidebar from "@/components/sidebar/Sidebar";
import "./product.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Backdrop from '@mui/material/Backdrop';
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
  Box
} from "@mui/material";
import {
  NoteAddTwoTone,
  ThumbDown,
  ThumbUp,
  ErrorOutline,
  Refresh
} from "@mui/icons-material";

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
  _id:string;
}
import { UsernameContext } from '@/context/UserContext';
import { TextField, Grid } from '@mui/material';

function Order() {
  const { username, Email, setUsername, isAuth, isAdmin, signOut, loadUserData } = useContext(UsernameContext);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orders, setOrders] = useState<Array<OrderDetails> | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [agent, setagent] = useState([]);
  const [s,sets]=useState<any>([]);
  const [agentDetails, setAgentDetails] = useState({
    orderId: '',
    agentName: username,
    contactNumber: '',
    email: Email,
    agencyName: 'Sparsha',
    agentId: '',
    specialization: '',
    address: '',
    experience: '',
  });
  
  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };
  useEffect(() => {
    setAgentDetails({
      ...agentDetails,
      agentName: username,
    })
  }, [username])
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = (id:any) => {
    setAgentDetails({
      ...agentDetails,
      orderId: id,
    })
    setOpen(true);
  };
  const fetchOrders = async () => {
    try {
      const [ ordersdata, agentData ] = await Promise.all([
        axios.get("/api/orders/all"),
        axios.get("/api/agentallot")
      ]);
      setOrders(ordersdata.data.orders);
      setagent(agentData.data.data);
      
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };
  useEffect(()=>{
    const nes: string[]=[];
  agent.map((data:{
        orderId: string;
        agentName: string;
        contactNumber: string;
        email: string;
        agencyName: string;
        agentId: string;
        specialization: string;
        address: string;
        experience: string;
      })=>{
        nes.push(data?.orderId);
      })
      sets(nes);
      console.log(s);
  },[agent])
  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchOrders();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setAgentDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async(e: any) => {
    e.preventDefault();
    handleClose();
    try {
        const agent = await axios.post("/api/agentallot", agentDetails);
        toast.success("Agent details submitted successfully");
        handleRefresh();
    } catch (err: any) {
        toast.error(err.response?.data?.message || 'Failed to submit agent details');
        console.error('Error submitting agent details:', err);
    }
};async function handlecancel(id:string){
  try{
    const res=await axios.delete(`/api/orders/${id}`);
    toast.success(res.data.message);
    handleRefresh();
  }
  catch(err: any){
    toast.error(err.response?.data?.message || 'An error occurred');
  }
}
  return (
    <Box className="flex">
      <Sidebar />
      <Box className="flex-1 p-6 mt-20">
        <Box className="flex justify-between items-center mb-6">
          <Typography variant="h4" className="font-semibold">
            Orders Management
          </Typography>
          <Button
            variant="contained"
            startIcon={<Refresh />}
            onClick={handleRefresh}
            disabled={refreshing}
          >
            {refreshing ? 'Refreshing...' : 'Refresh'}
          </Button>
        </Box>

        <Paper elevation={3} sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer sx={{ maxHeight: 600 }}>
            <Table stickyHeader aria-label="orders table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>Order ID</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Customer Name</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Phone Number</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Schedule</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Planning</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Order Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders?.map((order) => (
                  <TableRow
                    key={String(order.orderid)}
                    className={
                      order.billDetails.MovieItems.length === 0 &&
                        order.billDetails.birthdayhallitems.length === 0
                        ? "bg-yellow-100 hover:bg-yellow-200"
                        : "bg-blue-100 hover:bg-blue-200"
                    }
                  >
                    <TableCell>{order.orderid}</TableCell>
                    <TableCell>{order.customername}</TableCell>
                    <TableCell>{order.phone}</TableCell>
                    <TableCell>{order.time}</TableCell>
                    <TableCell>
                      <Box className="flex gap-2">
                        <Button
                          variant="contained"
                          endIcon={<ThumbUp />}
                          color="success"
                          size="small"
                          disabled={s.filter((d:string)=>d==order.orderid).length}
                          onClick={()=>handleOpen(order.orderid)}
                        >
                          Accept
                        </Button>
                        <Backdrop sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                          open={open}
                        >
                          <Box
                            component="form"
                            onSubmit={handleSubmit}
                            sx={{
                              maxWidth: 700,
                              mx: 'auto',
                              p: 4,
                              border: '1px solid #ddd',
                              borderRadius: 2,
                              boxShadow: 2,
                              backgroundColor: '#f5f5f5',
                            }}
                          >
                            <Typography variant="h5" component="h2" align="center" color={"black"} mb={3}>
                              Agent Details Form
                            </Typography>

                            <Grid container spacing={2}>
                              <Grid item xs={12} md={6}>
                                <TextField
                                  label="Agent Name"
                                  name="agentName"
                                  value={agentDetails.agentName}
                                  onChange={handleChange}
                                  fullWidth
                                  required
                                />
                              </Grid>

                              <Grid item xs={12} md={6}>
                                <TextField
                                  label="Contact Number"
                                  name="contactNumber"
                                  value={agentDetails.contactNumber}
                                  onChange={handleChange}
                                  fullWidth
                                  required
                                />
                              </Grid>

                              <Grid item xs={12} md={6}>
                                <TextField
                                  label="Email"
                                  name="email"
                                  type="email"
                                  value={agentDetails.email}
                                  onChange={handleChange}
                                  fullWidth
                                  required
                                />
                              </Grid>

                              <Grid item xs={12} md={6}>
                                <TextField
                                  label="Agency Name"
                                  name="agencyName"
                                  value={agentDetails.agencyName}
                                  onChange={handleChange}
                                  fullWidth
                                />
                              </Grid>

                              <Grid item xs={12} md={6}>
                                <TextField
                                  label="Contact Number"
                                  name="contactNumber"
                                  value={agentDetails.contactNumber}
                                  onChange={handleChange}
                                  fullWidth
                                  required
                                />
                              </Grid>

                              <Grid item xs={12} md={6}>
                                <TextField
                                  label="Email"
                                  name="email"
                                  type="email"
                                  value={agentDetails.email}
                                  onChange={handleChange}
                                  fullWidth
                                  required
                                />
                              </Grid>

                              <Grid item xs={12} md={6}>
                                <TextField
                                  label="Agency Name"
                                  name="agencyName"
                                  value={agentDetails.agencyName}
                                  onChange={handleChange}
                                  fullWidth
                                />
                              </Grid>

                              <Grid item xs={12} md={6}>
                                <TextField
                                  label="Agent ID"
                                  name="agentId"
                                  value={agentDetails.agentId}
                                  onChange={handleChange}
                                  fullWidth
                                />
                              </Grid>

                              <Grid item xs={12} md={6}>
                                <TextField
                                  label="Specialization"
                                  name="specialization"
                                  value={agentDetails.specialization}
                                  onChange={handleChange}
                                  fullWidth
                                />
                              </Grid>

                              <Grid item xs={12}>
                                <TextField
                                  label="Address"
                                  name="address"
                                  value={agentDetails.address}
                                  onChange={handleChange}
                                  fullWidth
                                  multiline
                                  rows={3}
                                />
                              </Grid>

                              <Grid item xs={12} md={6}>
                                <TextField
                                  label="Experience (in years)"
                                  name="experience"
                                  type="number"
                                  value={agentDetails.experience}
                                  onChange={handleChange}
                                  fullWidth
                                />
                              </Grid>
                              <Grid item xs={12} md={6}>
                                <TextField
                                  label="Order Id"
                                  name="orderId"
                                  value={agentDetails.orderId}
                                  onChange={ handleChange }
                                  fullWidth
                                  required
                                />
                              </Grid>
                              <Grid item xs={12}>
                                <Button type="submit" variant="contained" color="primary" fullWidth>
                                  Submit
                                </Button>
                              </Grid>
                            </Grid>
                          </Box>
                        </Backdrop>
                        <Button
                          variant="contained"
                          startIcon={<ThumbDown />}
                          disabled={s.filter((d:string)=>d==order.orderid).length}
                          color="error"
                          size="small"
                        >
                          Reject
                        </Button>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        endIcon={<NoteAddTwoTone />}
                        color="primary"
                        size="small"
                        href={`/admin/plan/${order.orderid}`}
                      >
                        Plan
                      </Button>
                      <Button
                        variant="contained"
                        startIcon={<ErrorOutline />}
                        color="warning"
                        size="small"
                        href={`/admin/plan/bill/${order.orderid}`}
                      >
                        Bill
                      </Button>
                    </TableCell>

                    <TableCell>
                      <Button
                        variant="contained"
                        startIcon={<ErrorOutline />}
                        color="warning"
                        size="small"
                        onClick={() => handlecancel(order._id)}
                      >
                        Cancel
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={orders?.length || 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </Box>
  );
}

export default Order;

