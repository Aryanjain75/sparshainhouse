"use client";

import React, { useState, useContext, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Backdrop,
  Box,
} from "@mui/material";
import { Person, Refresh } from "@mui/icons-material";
import "@/components/list/list.scss";
import Image from "next/image";
import axios from "axios";
import { UsernameContext } from "@/context/UserContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Order {
  _id: string;
  orderid: string;
  customername: string;
  date: string;
  amount: string;
  method: string;
  status: string;
  phone: string;
  email: string;
  billDetails: {
    items: Array<{
      CUSSINE: string;
      CloudanaryImageId: string;
      DISCOUNT: string;
      FOODNAME: string;
      PRICE: string;
      RATINGS: number;
      TAGS: string[];
      itemid: string;
      _id: string;
    }>;
    subtotal: string;
    shipping: string;
    tax: string;
    total: string;
    shippingAddressStreet: string;
    shippingAddressState: string;
  };
}
const List: React.FC = () => {
  const { Email } = useContext(UsernameContext);
  const [refreshing, setRefreshing] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [agent, setAgent] = useState([]);
  const [open, setOpen] = useState(false);
  const [s, sets] = useState<Map<string, any>>(new Map());
  const [Restorders, setRestOrders] = useState<Order[]>([]);

  const fetchOrders = async () => {
    try {
      const [foodres, seatbooking, agentData] = await Promise.all([
        axios.get(`/api/orders/${Email}`),
        axios.get(`/api/Resturent`),
        axios.get("/api/agentallot"),
      ]);
      if (seatbooking.status === 404) {
        toast.error("No orders found");
      }
      if (foodres.status === 200) {
        setRestOrders(seatbooking.data.orders);
        setOrders(foodres.data.orders); // Access orders from response
        setAgent(agentData.data.data);
        console.log(foodres.data.orders);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error fetching orders: " + error);
    }
  };

  useEffect(() => {
    const agentMap = new Map();
    agent.forEach((data: {
      orderId: string;
      agentName: string;
      contactNumber: string;
      email: string;
      agencyName: string;
      agentId: string;
      specialization: string;
      address: string;
      experience: string;
    }) => {
      agentMap.set(data.orderId, data);
    });
    sets(agentMap);
    console.log(agentMap);
  }, [agent]);

  useEffect(() => {
    fetchOrders();
  }, [Email]);

  const handleShowBill = (order: Order) => {
    setSelectedOrder(order);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchOrders();
    setRefreshing(false);
  };

  const handleCloseBill = () => {
    setSelectedOrder(null);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div className="list">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="tableCell">Order ID</TableCell>
              <TableCell className="tableCell">Date</TableCell>
              <TableCell className="tableCell">Amount</TableCell>
              <TableCell className="tableCell">Payment Method</TableCell>
              <TableCell className="tableCell">Status</TableCell>
              <TableCell className="tableCell">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((row) => (
              <TableRow key={row._id}>
                <TableCell className="tableCell">
                  <div className="cellWrapper">
                    <Image
                      src="https://res.cloudinary.com/devj7oonz/image/upload/v1721407070/food_delivery_order-03-128_kqgeas.png"
                      alt=""
                      width={40}
                      height={40}
                      className="image"
                    />
                    {row.orderid}
                  </div>
                </TableCell>
                <TableCell className="tableCell">{row.date}</TableCell>
                <TableCell className="tableCell">{row.amount}</TableCell>
                <TableCell className="tableCell">{row.method}</TableCell>
                <TableCell className="tableCell">
                  <span
                    className={`status ${
                      row.status === "Delivered" ? "Approved" : "Pending"
                    }`}
                  >
                    {row.status}
                  </span>
                </TableCell>
                <TableCell className="tableCell">
                  <Box className="flex gap-2">
                    <Button
                      variant="contained"
                      endIcon={<Person />}
                      color="success"
                      size="small"
                      disabled={!s.has(row.orderid)} // Button disabled if no agent assigned
                      onClick={handleOpen}
                    >
                      Agent Info
                    </Button>
                    <Backdrop
                      sx={(theme) => ({
                        color: "#fff",
                        zIndex: theme.zIndex.drawer + 1,
                      })}
                      open={open}
                      onClick={handleClose}
                    >
                      <TableContainer component={Paper}>
                        <Table
                          sx={{ minWidth: 650 }}
                          size="small"
                          aria-label="a dense table"
                        >
                          <TableBody>
                            {s.has(row.orderid) &&
                              Object.entries(s.get(row.orderid)).map(
                                ([key, value]) => (
                                  <TableRow key={key}>
                                    <TableCell>{key}</TableCell>
                                    <TableCell>{value as React.ReactNode}</TableCell>
                                  </TableRow>
                                )
                              )}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Backdrop>
                  </Box>
                  {row.status === "Delivered" ? (
                    <button
                      onClick={() => handleShowBill(row)}
                      className="bg-yellow-300 border-2 border-yellow-300 text-white rounded-md p-2 h-fit w-28"
                    >
                      Show Bill
                    </button>
                  ) : (
                    <Button
                      variant="contained"
                      startIcon={<Refresh />}
                      onClick={handleRefresh}
                      disabled={refreshing}
                      className="bg-red-300 border-2 border-red-300 text-white rounded-md p-2 h-fit w-28"
                    >
                      {refreshing ? "Refreshing..." : "Refresh"}
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
            {Restorders.map((row) => (
              <TableRow key={row._id}>
                <TableCell className="tableCell">
                  <div className="cellWrapper">
                    <Image
                      src="https://cdn-icons-png.flaticon.com/512/2132/2132292.png"
                      alt=""
                      width={40}
                      height={40}
                      className="image"
                    />
                    {row?.orderid}
                  </div>
                </TableCell>
                <TableCell className="tableCell">{row.date}</TableCell>
                <TableCell className="tableCell">Cleared</TableCell>
                <TableCell className="tableCell">
                  {row.method || "At the time of Arrival"}
                </TableCell>
                <TableCell className="tableCell">
                  <span
                    className={`status ${
                      row.status === "confirmed" ? "Approved" : "Pending"
                    }`}
                  >
                    {row.status || "At confirmation"}
                  </span>
                </TableCell>
                <TableCell className="tableCell">
                  <Button
                    variant="contained"
                    startIcon={<Refresh />}
                    onClick={handleRefresh}
                    disabled={refreshing}
                    className="bg-red-300 border-2 border-red-300 text-white rounded-md p-2 h-fit w-28"
                  >
                    {refreshing ? "Refreshing..." : "Refresh"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ToastContainer />
    </div>
  );
};

export default List;
