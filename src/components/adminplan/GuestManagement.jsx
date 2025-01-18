"use client";
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
  Edit,
  Delete, 
   Person,
  Email,
  Phone,
  EventAvailable,
  Clear,
  Settings,
  HelpOutlineIcon
} from "@mui/icons-material";
import shortid from "shortid";


function GuestManagement({ formData, setFormData }) {
  const [guestId, setGuestId] = useState(shortid.generate());
  const [guestName, setGuestName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [rsvpStatus, setRsvpStatus] = useState("");
  const [guestCategory, setGuestCategory] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newGuest = {
      guestId,
      guestName,
      email,
      phone,
      rsvpStatus,
      guestCategory,
      specialRequests,
    };

    setFormData((prevData) => {
      const updatedGuests = isEditing
        ? prevData.GuestPlanning.map((guest) =>
            guest.guestId === guestId ? newGuest : guest
          )
        : [...(prevData.GuestPlanning || []), newGuest];
      return { ...prevData, GuestPlanning: updatedGuests };
    });

    resetForm();
    setOpenSnackbar(true);
  };

  const resetForm = () => {
    setGuestId(shortid.generate());
    setGuestName("");
    setEmail("");
    setPhone("");
    setRsvpStatus("");
    setGuestCategory("");
    setSpecialRequests("");
    setIsEditing(false);
  };

  const handleEdit = (guest) => {
    setGuestId(guest.guestId);
    setGuestName(guest.guestName);
    setEmail(guest.email);
    setPhone(guest.phone);
    setRsvpStatus(guest.rsvpStatus);
    setGuestCategory(guest.guestCategory);
    setSpecialRequests(guest.specialRequests);
    setIsEditing(true);
  };

  const handleDelete = (guestId) => {
    setFormData((prevData) => {
      const filteredGuests = prevData.GuestPlanning.filter(
        (guest) => guest.guestId !== guestId
      );
      return { ...prevData, GuestPlanning: filteredGuests };
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Box sx={{ p: 3, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Card elevation={3} sx={{ mb: 4, borderRadius: 2 }}>
        <CardContent>
          <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
            <Person fontSize="large" color="primary" />
            <Typography variant="h4" className="font-semibold" >
              Guest Management
            </Typography>
          </Stack>
          <div className="text-sm text-gray-500"> ? if you Need Help in this to fill then left it empty and move to next page our planner will call you and ask about this and help you to fill after submission of form</div>
          <Divider sx={{ mb: 4 }} />

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField 
                  fullWidth
                  id="guestId" 
                  label="Guest ID" 
                  variant="outlined"
                  value={guestId}
                   
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
                    startAdornment={<EventAvailable sx={{ mr: 1, color: 'primary.main' }} />}
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
                    startAdornment={<Category sx={{ mr: 1, color: 'primary.main' }} />}
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
                    startIcon={<Clear />}
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
      
      {/* Display Table */}
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><NoteAddTwoTone sx={{ mr: 1 }} /> Guest ID</TableCell>
                <TableCell><Person sx={{ mr: 1 }} /> Name</TableCell>
                <TableCell><Email sx={{ mr: 1 }} /> Email</TableCell>
                <TableCell><Phone sx={{ mr: 1 }} /> Phone</TableCell>
                <TableCell><EventAvailable sx={{ mr: 1 }} /> RSVP</TableCell>
                <TableCell><Category sx={{ mr: 1 }} /> Category</TableCell>
                <TableCell><Settings sx={{ mr: 1 }} /> Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {formData?.GuestPlanning?.map((guest) => (
                  <TableRow key={guest.guestId}>
                    <TableCell>{guest.guestId}</TableCell>
                    <TableCell>{guest.guestName}</TableCell>
                    <TableCell>{guest.email}</TableCell>
                    <TableCell>{guest.phone}</TableCell>
                    <TableCell>{guest.rsvpStatus}</TableCell>
                    <TableCell>{guest.guestCategory}</TableCell>
                    <TableCell>
                      <Button
                        startIcon={<Edit />}
                        onClick={() => handleEdit(guest)}
                      >
                        Edit
                      </Button>
                      <Button
                        startIcon={<Delete />}
                        onClick={() => handleDelete(guest.guestId)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        </Paper>
    </Box>
  );
}

export default GuestManagement;
