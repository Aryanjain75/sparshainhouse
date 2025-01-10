
"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "@/components/sidebar/Sidebar";
import Productable from "@/components/theaterproductable/Productable";
import Link from 'next/link';
import axios from "axios";

import { Paper,Table,TableBody,TableCell,TableContainer, TableHead,TablePagination,TableRow,Button,Typography,Box,TextField,FormControl,InputLabel,MenuItem,Select,Grid,Card,CardContent,Divider,Stack,Alert,Snackbar
} from "@mui/material";
import { Business,NoteAddTwoTone,ThumbDown, ThumbUp,ErrorOutline,EventNote,Category,Palette,Description,LocationOn,AccessTime,CalendarMonth,Place,MyLocation,Save,Phone,Email,Language,AttachMoney
} from "@mui/icons-material";
import EventInformation from "@/components/plan/EventInformation";
import GuestManagement from "@/components/plan/GuestManagement";

function VendorManagement({finalData ,setfinalData}) {
  
  const [vendorType, setVendorType] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    vendorId: "",
    vendorName: "",
    contactInfo: "",
    email: "",
    phone: "",
    foodItems: [],
    pricing: "",
    notes: ""
  });

  const handleVendorTypeChange = (event) => {
    setVendorType(event.target.value);
  };

  const handleInputChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value
    });
  };

  const handleSubmit = () => {
    // Validate required fields
    if (!formData.vendorName || !formData.email || !formData.phone) {
      alert("Please fill in all required fields");
      return;
    }

    // Update finalData with new vendor
    setfinalData(prev => ({
      ...prev,
      VendorManagement: [...(prev.VendorManagement || []), {...formData}]
    }));

    // Show success message
    setShowSuccess(true);

    // Reset form
    setFormData({
      vendorId: "",
      vendorName: "",
      contactInfo: "",
      email: "",
      phone: "",
      foodItems: [],
      pricing: "",
      notes: ""
    });
    setVendorType("");
  };

  return (<>
        <Card elevation={3} sx={{ mb: 4 }}>
        <CardContent>
          <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
            <Business fontSize="large" color="primary" />
            <Typography variant="h4" className="font-semibold">
              Vendor Management
            </Typography>
          </Stack>

          <Divider sx={{ mb: 4 }} />

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="vendor-id"
                label="Vendor ID"
                variant="outlined"
                value={formData.vendorId}
                onChange={handleInputChange('vendorId')}
                InputProps={{
                  startAdornment: <Business sx={{ mr: 1 }} />,
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="vendor-name"
                label="Vendor Name"
                variant="outlined"
                value={formData.vendorName}
                onChange={handleInputChange('vendorName')}
                required
                InputProps={{
                  startAdornment: <Business sx={{ mr: 1 }} />,
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel>Vendor Type</InputLabel>
                <Select
                  value={vendorType}
                  label="Vendor Type"
                  onChange={handleVendorTypeChange}
                >
                  <MenuItem value={"Catering"}>Catering</MenuItem>
                  <MenuItem value={"Decoration"}>Decoration</MenuItem>
                  <MenuItem value={"Entertainment"}>Entertainment</MenuItem>
                  <MenuItem value={"Photography"}>Photography</MenuItem>
                  <MenuItem value={"Venue"}>Venue</MenuItem>
                  <MenuItem value={"Other"}>Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="vendor-contact"
                label="Contact Person"
                variant="outlined"
                value={formData.contactInfo}
                onChange={handleInputChange('contactInfo')}
                InputProps={{
                  startAdornment: <Business sx={{ mr: 1 }} />,
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="vendor-email"
                label="Email Address"
                type="email"
                variant="outlined"
                value={formData.email}
                onChange={handleInputChange('email')}
                required
                InputProps={{
                  startAdornment: <Email sx={{ mr: 1 }} />,
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="vendor-phone"
                label="Phone Number"
                variant="outlined"
                value={formData.phone}
                onChange={handleInputChange('phone')}
                required
                InputProps={{
                  startAdornment: <Phone sx={{ mr: 1 }} />,
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="vendor-pricing"
                label="Pricing Details"
                variant="outlined"
                value={formData.pricing}
                onChange={handleInputChange('pricing')}
                InputProps={{
                  startAdornment: <AttachMoney sx={{ mr: 1 }} />,
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Vendor Notes"
                variant="outlined"
                value={formData.notes}
                onChange={handleInputChange('notes')}
                InputProps={{
                  startAdornment: <Description sx={{ mr: 1, alignSelf: 'flex-start', mt: 1 }} />,
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Stack direction="row" spacing={2} justifyContent="flex-end">
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => {
                    setFormData({
                      vendorId: "",
                      vendorName: "",
                      contactInfo: "",
                      email: "",
                      phone: "",
                      foodItems: [],
                      pricing: "",
                      notes: ""
                    });
                    setVendorType("");
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<Save />}
                  onClick={handleSubmit}
                >
                  Save Vendor Details
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Snackbar
        open={showSuccess}
        autoHideDuration={6000}
        onClose={() => setShowSuccess(false)}
      >
        <Alert severity="success" onClose={() => setShowSuccess(false)}>
          Vendor details saved successfully!
        </Alert>
      </Snackbar>
  </>)
}

export default VendorManagement
