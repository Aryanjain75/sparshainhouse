
"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "@/components/sidebar/Sidebar";
import "./product.css";
import Productable from "@/components/theaterproductable/Productable";
import Link from 'next/link';
import axios from "axios";
import {   Paper,  Table,  TableBody,  TableCell,  TableContainer,   TableHead,  TablePagination,  TableRow,  Button,  Typography,  Box,  Container,  Card,  CardContent} from "@mui/material";
import {   NoteAddTwoTone,   ThumbDown,   ThumbUp,  ErrorOutline,  Restaurant} from "@mui/icons-material";
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
interface OrderDetails {
  date: string;
  email: string;
  message: string;
  name: string;
  noOfPeople: string;
  orderid: string;
  phone: string; 
  time: string;
  status:string;
  userid: string;
  __v: Number;
  _id: string; 
}

function Product() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orders, setOrders] = useState<Array<OrderDetails> | null>(null);
  const [loading, setLoading] = useState(true);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/Resturent/all");
      setOrders(data.orders);
    } catch(error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);
 async function handleconfirm(id: string) {
  try {
    const { data } = await axios.put(`/api/Resturent/${id}`);
    toast.success(data);
    console.log(data);
    fetchOrders();
  } catch (e:any) {
    console.log(e);
    toast.error(e.message);
  }
}

async function handledelete(id: string) {
  try {
    const { data } = await axios.delete(`/api/Resturent/${id}`);
    toast.success(data); 
    fetchOrders();
  } catch (e:any) {
    toast.error(e.message);
  }
}  return (
    <Box className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <Container  className="flex-1 p-8 mt-20 w-[85%]">
        <Card elevation={0} className="mb-8">
          <CardContent className="flex items-center">
            <Restaurant className="mr-3 text-primary" />
            <Typography variant="h4" className="font-semibold text-gray-800">
              Orders Management
            </Typography>
          </CardContent>
        </Card>

        <Paper elevation={2} sx={{ borderRadius: 2, backgroundColor: '#fff' }}>
          <TableContainer sx={{ maxHeight: 600 }}>
            <Table stickyHeader aria-label="orders table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>User ID</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Order ID</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Date</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Time</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Email</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>People</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Phone</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Planning</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((order) => (
                  <TableRow 
                    key={order._id}
                    hover
                    sx={{ '&:hover': { backgroundColor: '#f8f9fa' } }}
                  >
                    <TableCell>{order.userid}</TableCell>
                    <TableCell>{order.orderid}</TableCell>
                    <TableCell><strong>{order.name}</strong></TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>{order.time}</TableCell>
                    <TableCell>{order.email}</TableCell>
                    <TableCell>{order.noOfPeople}</TableCell>
                    <TableCell>{order.phone}</TableCell>
                    
                    <TableCell>
                      <Button 
                        variant="contained" 
                        endIcon={<NoteAddTwoTone />} 
                        color="primary"
                        size="small"
                        disabled={order.status=="confirmed"?true:false}
                        onClick={()=>handleconfirm(order._id)}
                        sx={{ textTransform: 'none', borderRadius: 2 }}
                      >
                        Confirm
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="outlined" 
                        startIcon={<ErrorOutline />} 
                        color="warning"
                        size="small"
                        onClick={()=>{handledelete(order._id)}}
                        sx={{ textTransform: 'none', borderRadius: 2 }}
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
            sx={{ borderTop: 1, borderColor: 'divider' }}
          />
        </Paper>
      </Container>
                        <ToastContainer />
      
    </Box>
  );
}

export default Product;

