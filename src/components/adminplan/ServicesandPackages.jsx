
"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "@/components/sidebar/Sidebar";
import Productable from "@/components/theaterproductable/Productable";
import Link from 'next/link';
import axios from "axios";

import {  Paper, Table, TableBody, TableCell, TableContainer,  TableHead, TablePagination, TableRow, Button, Typography, Box, TextField, FormControl, InputLabel, MenuItem, Select, Grid, Card, CardContent, Divider, Stack, Alert, Snackbar} from "@mui/material";
import {   NoteAddTwoTone,  ThumbDown,   ThumbUp,  ErrorOutline,  EventNote,  Category,  Palette,  Description,  LocationOn,  AccessTime,  CalendarMonth,  Place,  MyLocation,  Save,  MonetizationOn,  Clear} from "@mui/icons-material";
import EventInformation from "@/components/plan/EventInformation";
import GuestManagement from "@/components/plan/GuestManagement";
import VendorManagement from "@/components/plan/VendorManagement";
import shortid from "shortid";

function ServicesandPackages({formData,setFormData}) {
  const [serviceCategory, setServiceCategory] = useState('');
  const [serviceId, setServiceId] = useState(shortid.generate());
  const [serviceName, setServiceName] = useState('');
  const [servicePrice, setServicePrice] = useState('');
  const [serviceDescription, setServiceDescription] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('success');

  const handleServiceCategoryChange = (event) => {
    setServiceCategory(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      if (!serviceId || !serviceName || !serviceCategory || !servicePrice || !serviceDescription) {
        setAlertMessage('Please fill in all fields');
        setAlertSeverity('error');
        setShowAlert(true);
        return;
      }

      const newService = {
        serviceId: serviceId,
        serviceName: serviceName,
        servicePrice: servicePrice,
        serviceDescription: serviceDescription,
        serviceCategory: serviceCategory
      };

      setFormData({
        ...formData,
        ServicesandPackages: formData.ServicesandPackages ? 
          [...formData.ServicesandPackages, newService] :
          [newService]
      });

      setAlertMessage('Service saved successfully');
      setAlertSeverity('success');
      setShowAlert(true);
      clearForm();
      setServiceId(shortid.generate());
    } catch (error) {
      setAlertMessage('Error saving service');
      setAlertSeverity('error');
      setShowAlert(true);
    }
  };

  const clearForm = () => {
    setServiceName('');
    setServiceCategory('');
    setServicePrice('');
    setServiceDescription('');
  };

  return (
    <Box sx={{ p: 3 }}>
      <Card elevation={3} sx={{ mb: 4 }}>
        <CardContent>
          <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
            <Category fontSize="large" color="primary" />
            <Typography variant="h4" className="font-semibold">
              Services & Packages
            </Typography>
          </Stack>

          <Divider sx={{ mb: 4 }} />

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="service-id"
                label="Service ID"
                variant="outlined"
                value={serviceId}
                onChange={(e) => setServiceId(e.target.value)}
                InputProps={{
                  startAdornment: <Category sx={{ mr: 1 }} />,
                }}
                required
                disabled
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="service-name"
                label="Service Name"
                variant="outlined"
                value={serviceName}
                onChange={(e) => setServiceName(e.target.value)}
                InputProps={{
                  startAdornment: <Category sx={{ mr: 1 }} />,
                }}
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel>Service Category</InputLabel>
                <Select
                  value={serviceCategory}
                  label="Service Category"
                  onChange={handleServiceCategoryChange}
                >
                  <MenuItem value={"Photography"}>Photography</MenuItem>
                  <MenuItem value={"Catering"}>Catering</MenuItem>
                  <MenuItem value={"Music"}>Music</MenuItem>
                  <MenuItem value={"Decoration"}>Decoration</MenuItem>
                  <MenuItem value={"Venue"}>Venue</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="service-price"
                label="Price"
                variant="outlined"
                value={servicePrice}
                onChange={(e) => setServicePrice(e.target.value)}
                InputProps={{
                  startAdornment: <MonetizationOn sx={{ mr: 1 }} />,
                }}
                type="number"
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Service Description"
                variant="outlined"
                value={serviceDescription}
                onChange={(e) => setServiceDescription(e.target.value)}
                InputProps={{
                  startAdornment: <Description sx={{ mr: 1, alignSelf: 'flex-start', mt: 1 }} />,
                }}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <Stack direction="row" spacing={2} justifyContent="flex-end">
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<Clear />}
                  onClick={clearForm}
                >
                  Clear
                </Button>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<Save />}
                  onClick={handleSubmit}
                >
                  Save Service Details
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Snackbar 
        open={showAlert} 
        autoHideDuration={6000} 
        onClose={() => setShowAlert(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert 
          onClose={() => setShowAlert(false)} 
          severity={alertSeverity}
          sx={{ width: '100%' }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default ServicesandPackages;
