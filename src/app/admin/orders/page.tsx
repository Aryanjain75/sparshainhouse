
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
  Box
} from "@mui/material";
import { 
  NoteAddTwoTone, 
  ThumbDown, 
  ThumbUp,
  ErrorOutline
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
}

function Product() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orders, setOrders] = useState<Array<OrderDetails> | null>(null);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get("/api/orders/all");
      setOrders(data.orders);
    } catch(error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <Box className="flex">
      <Sidebar />
      <Box className="flex-1 p-6 mt-20">
        <Typography variant="h4" className="mb-6 font-semibold">
          Orders Management
        </Typography>
        
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
                        >
                          Accept
                        </Button>
                        <Button 
                          variant="contained" 
                          startIcon={<ThumbDown />} 
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
                        href="/admin/plan"
                      >
                        Plan
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="contained" 
                        startIcon={<ErrorOutline />} 
                        color="warning"
                        size="small"
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

export default Product;

