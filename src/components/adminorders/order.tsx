"use client";

import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import "@/components/list/list.scss";
import Image from "next/image";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Copy, CreditCard, Truck, MoreVertical } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Pagination, PaginationContent, PaginationItem } from "@/components/ui/pagination";

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

interface ListProps {
  email: string;
}

const List: React.FC<ListProps> = ({ email }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`/api/orders/${email}`);
        if (res.status === 200) {
          setOrders(res.data.orders); // Access orders from response
        }
      } catch (error) {
        console.error(error);
        alert('Error fetching orders');
      }
    };

    fetchOrders();
  }, [email]);

  const handleShowBill = (order: Order) => {
    setSelectedOrder(order);
  };

  const handleCloseBill = () => {
    setSelectedOrder(null);
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
                      width={32}
                      height={32}
                    />
                    {row.orderid}
                  </div>
                </TableCell>
                <TableCell className="tableCell">{row.date}</TableCell>
                <TableCell className="tableCell">{row.amount}</TableCell>
                <TableCell className="tableCell">{row.method}</TableCell>
                <TableCell className="tableCell">
                  <span className={`status ${row.status}`}>{row.status}</span>
                </TableCell>
                <TableCell className="tableCell">
                  <button onClick={() => handleShowBill(row)} className="showBillBtn">Show Bill</button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal open={!!selectedOrder} onClose={handleCloseBill}>
        <Box className="modalBox">
          <Card>
            <CardHeader>
              <CardTitle>Bill Details</CardTitle>
              <CardDescription>Order ID: {selectedOrder?.orderid}</CardDescription>
            </CardHeader>
            <CardContent>
              <div>
                <p>Customer Name: {selectedOrder?.customername}</p>
                <p>Email: {selectedOrder?.email}</p>
                <p>Phone: {selectedOrder?.phone}</p>
                <p>Date: {selectedOrder?.date}</p>
                <Separator />
                <p>Items:</p>
                {selectedOrder?.billDetails.items.map((item) => (
                  <div key={item._id}>
                    <p>{item.FOODNAME}</p>
                    <p>Price: {item.PRICE}</p>
                    <p>Discount: {item.DISCOUNT}</p>
                    <p>Cuisine: {item.CUSSINE}</p>
                    <Separator />
                  </div>
                ))}
                <Separator />
                <p>Subtotal: {selectedOrder?.billDetails.subtotal}</p>
                <p>Shipping: {selectedOrder?.billDetails.shipping}</p>
                <p>Tax: {selectedOrder?.billDetails.tax}</p>
                <p>Total: {selectedOrder?.billDetails.total}</p>
                <p>Shipping Address: {selectedOrder?.billDetails.shippingAddressStreet}, {selectedOrder?.billDetails.shippingAddressState}</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleCloseBill}>Close</Button>
            </CardFooter>
          </Card>
        </Box>
      </Modal>
    </div>
  );
};

export default List;
