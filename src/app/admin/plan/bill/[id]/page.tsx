"use client"
import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  styled,
  Switch
} from '@mui/material';
import Sidebar from '@/components/sidebar/Sidebar';
import { toast } from 'react-toastify';
import axios from 'axios';
import "react-toastify/dist/ReactToastify.css";
interface BillingItem {
  id: number;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
  isPaid: boolean;
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  head: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}));

const BillingComponent = ({ params }: { params: { id: string } }) => {
  const [items, setItems] = useState<BillingItem[]>([]);
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [unitPrice, setUnitPrice] = useState(0);

  const paidItems = items.filter(item => item.isPaid);
  const unpaidItems = items.filter(item => !item.isPaid);
  
  const paidSubtotal = paidItems.reduce((sum, item) => sum + item.total, 0);
  const unpaidSubtotal = unpaidItems.reduce((sum, item) => sum + item.total, 0);
  
  const paidTax = paidSubtotal * 0.1;
  const unpaidTax = unpaidSubtotal * 0.1;
  
  const paidTotal = paidSubtotal + paidTax;
  const unpaidTotal = unpaidSubtotal + unpaidTax;
  async function billdata()
  {
    try {
        
        const resp = await axios.get(`/api/billing/${params.id}`);
        if (resp.status === 200) {
            setItems(resp.data.message.bill);
            console.log(resp.data.message.bill);
        } else {
            toast.error("Failed to submit payment");
        }
    } catch (e) {
        toast.error(e instanceof Error ? e.message : "An error occurred");
    }
  }
useEffect(()=>{
    billdata()
},[])
  const addItem = () => {
    if (description && quantity > 0 && unitPrice > 0) {
      const newItem: BillingItem = {
        id: Date.now(),
        description,
        quantity,
        unitPrice,
        total: quantity * unitPrice,
        isPaid: false
      };
      setItems([...items, newItem]);
      setDescription('');
      setQuantity(1);
      setUnitPrice(0);
    }
  };

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  const togglePaidStatus = (id: number) => {
    setItems(items.map(item => 
      item.id === id ? {...item, isPaid: !item.isPaid} : item
    ));
  };
  const submitItem = async () => {
    try {
        const data = {
            orderid: params.id,
            bill:items
        }
        const resp = await axios.post("/api/billing", data);
        if (resp.status >=200 && resp.status<400) {
            toast.success("Payment submitted successfully");
            billdata()
        } else {
            console.log(resp);
            toast.error("Failed to submit payment");
        }
    } catch (e) {
        toast.error(e instanceof Error ? e.message : "An error occurred");
    }
}  
return (
    <Box className="flex">
    <Sidebar />
    <Container maxWidth="md" sx={{paddingTop:"40px"}}>
      <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
        Party Planner Billing 
      </Typography>
      <Typography variant="body1" gutterBottom sx={{ mt: 4 }}>
        Order id :- {params.id} 
      </Typography>
      
      <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
        <TextField
          label="Item Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          type="number"
          label="Quantity"
          InputProps={{ inputProps: { min: 1 } }}
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
        />
        <TextField
          type="number"
          label="Unit Price"
          InputProps={{ inputProps: { min: 0, step: 0.01 } }}
          value={unitPrice}
          onChange={(e) => setUnitPrice(parseFloat(e.target.value))}
        />
        <Button variant="contained" onClick={addItem}>
          Add Item
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Description</StyledTableCell>
              <StyledTableCell>Quantity</StyledTableCell>
              <StyledTableCell>Unit Price</StyledTableCell>
              <StyledTableCell>Total</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell>Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map(item => (
              <TableRow key={item.id}>
                <TableCell>{item.description}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>${item.unitPrice.toFixed(2)}</TableCell>
                <TableCell>${item.total.toFixed(2)}</TableCell>
                <TableCell>
                  <Switch
                    checked={item.isPaid}
                    onChange={() => togglePaidStatus(item.id)}
                  />
                  {item.isPaid ? 'Paid' : 'Unpaid'}
                </TableCell>
                <TableCell>
                  <Button 
                    variant="outlined" 
                    color="error" 
                    onClick={() => removeItem(item.id)}
                  >
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button variant="contained" onClick={submitItem}>
          Submit payment
        </Button>
      <Box sx={{ textAlign: 'right' }}>
        <Typography variant="h6" color="success.main">
          Paid Subtotal: ${paidSubtotal.toFixed(2)}
        </Typography>
        <Typography variant="h6" color="success.main">
          Paid Tax (10%): ${paidTax.toFixed(2)}
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'success.main', mt: 2 }}>
          Paid Total: ${paidTotal.toFixed(2)}
        </Typography>

        <Typography variant="h6" color="error.main" sx={{ mt: 4 }}>
          Unpaid Subtotal: ${unpaidSubtotal.toFixed(2)}
        </Typography>
        <Typography variant="h6" color="error.main">
          Unpaid Tax (10%): ${unpaidTax.toFixed(2)}
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'error.main', mt: 2 }}>
          Unpaid Total: ${unpaidTotal.toFixed(2)}
        </Typography>
      </Box>
    </Container>
  </Box>
   
  );
};

export default BillingComponent;
