
"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "@/components/sidebar/Sidebar";
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
  Alert,
  Snackbar
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
  Person,
  Email,
  Phone
} from "@mui/icons-material";
import shortid from "shortid";

function GuestManagement({formData, setFormData}) {
  const [guestId, setGuestId] = useState(shortid.generate());
  const [guestName, setGuestName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [rsvpStatus, setRsvpStatus] = useState("");
  const [guestCategory, setGuestCategory] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newGuest = {
        guestId,
        guestName,
        email,
        phone,
        rsvpStatus,
        guestCategory,
        specialRequests
      };

      setFormData(prevData => ({
        ...prevData,
        GuestPlanning: prevData.GuestPlanning ? [...prevData.GuestPlanning, newGuest] : [newGuest]
      }));

      // Reset form
      setGuestId(shortid.generate());
      setGuestName("");
      setEmail("");
      setPhone("");
      setRsvpStatus("");
      setGuestCategory("");
      setSpecialRequests("");
      setOpenSnackbar(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box sx={{ p: 3, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Card elevation={3} sx={{ mb: 4, borderRadius: 2 }}>
        <CardContent>
          <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
            <Person fontSize="large" color="primary" />
            <Typography variant="h4" className="font-semibold">
              Guest Management
            </Typography>
          </Stack>

          <Divider sx={{ mb: 4 }} />

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField 
                  required
                  fullWidth
                  id="guestId" 
                  label="Guest ID" 
                  variant="outlined"
                  value={guestId}
                  disabled
                  InputProps={{
                    startAdornment: <NoteAddTwoTone sx={{ mr: 1, color: 'primary.main' }} />
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField 
                  required
                  fullWidth
                  id="guestName" 
                  label="Guest Name" 
                  variant="outlined"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  InputProps={{
                    startAdornment: <Person sx={{ mr: 1, color: 'primary.main' }} />
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField 
                  required
                  fullWidth
                  type="email"
                  id="email" 
                  label="Email" 
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  InputProps={{
                    startAdornment: <Email sx={{ mr: 1, color: 'primary.main' }} />
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField 
                  required
                  fullWidth
                  id="phone" 
                  label="Phone Number" 
                  variant="outlined"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  InputProps={{
                    startAdornment: <Phone sx={{ mr: 1, color: 'primary.main' }} />
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth required>
                  <InputLabel>RSVP Status</InputLabel>
                  <Select
                    value={rsvpStatus}
                    label="RSVP Status"
                    onChange={(e) => setRsvpStatus(e.target.value)}
                  >
                    <MenuItem value="Confirmed">Confirmed</MenuItem>
                    <MenuItem value="Pending">Pending</MenuItem>
                    <MenuItem value="Declined">Declined</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth required>
                  <InputLabel>Guest Category</InputLabel>
                  <Select
                    value={guestCategory}
                    label="Guest Category"
                    onChange={(e) => setGuestCategory(e.target.value)}
                  >
                    <MenuItem value="VIP">VIP</MenuItem>
                    <MenuItem value="Friend">Friend</MenuItem>
                    <MenuItem value="Family">Family</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Special Requests"
                  variant="outlined"
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  InputProps={{
                    startAdornment: <Description sx={{ mr: 1, alignSelf: 'flex-start', mt: 1, color: 'primary.main' }} />
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <Stack direction="row" spacing={2} justifyContent="flex-end">
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={() => {
                      setGuestId(shortid.generate());
                      setGuestName("");
                      setEmail("");
                      setPhone("");
                      setRsvpStatus("");
                      setGuestCategory("");
                      setSpecialRequests("");
                    }}
                  >
                    Clear
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    startIcon={<Save />}
                  >
                    Save Guest Details
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>

      <Snackbar 
        open={openSnackbar} 
        autoHideDuration={6000} 
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          Guest details saved successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default GuestManagement;
