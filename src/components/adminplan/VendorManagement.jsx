import React, { useEffect, useState } from "react";
import {
  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Typography,
  Box, TextField, FormControl, InputLabel, MenuItem, Select, Grid, Card, CardContent,
  Divider, Stack, Alert, Snackbar, Checkbox, FormGroup, FormControlLabel
} from "@mui/material";
import {
  Business, Email, Phone, AttachMoney, Description, Save
} from "@mui/icons-material";

function VendorManagement({ finalData, setfinalData }) {
  const [vendorType, setVendorType] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    vendorId: "SP001", 
    vendorName: "Sparsha",
    contactInfo: "Owner Name", 
    email: "owner@sparsha.com", 
    phone: "1234567890", 
    vendorType: vendorType,
    items: [],
    pricing: "",
    notes: ""
  });

  const itemOptions = {
    Catering: ["Appetizers", "Main Course", "Desserts", "Beverages"],
    Decoration: ["Flowers", "Lights", "Balloons", "Stage"],
    Entertainment: ["DJ", "Live Band", "Comedian", "Magician"],
    Photography: ["PersonalPhotoGraph", "Pendrive", "CD", "Album", "Graphics"],
  };

  const [vendorList, setVendorList] = useState(finalData?.VendorManagement || []);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const handleVendorTypeChange = (event) => {
    const value = event.target.value;
    setVendorType(value);
    const defaultContacts = {
      Catering: { contactInfo: "Chef John", email: "chef@sparsha.com", phone: "9876543210" },
      Decoration: { contactInfo: "Decorator Jane", email: "jane@sparsha.com", phone: "9876543211" },
      Entertainment: { contactInfo: "DJ Max", email: "djmax@sparsha.com", phone: "9876543212" },
      Photography: { contactInfo: "Photographer Mike", email: "mike@sparsha.com", phone: "9876543213" },
      Venue: { contactInfo: "Venue Manager", email: "manager@sparsha.com", phone: "9876543214" },
      Other: { contactInfo: "", email: "", phone: "" },
    };
    const defaultData = defaultContacts[value] || {};
    setFormData((prev) => ({ ...prev, vendorType: value, ...defaultData, items: [] }));
  };

  const handleInputChange = (field) => (event) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const handleItemChange = (item) => (event) => {
    setFormData((prev) => {
      const updatedItems = event.target.checked
        ? [...prev.items, item]
        : prev.items.filter((i) => i !== item);
      return { ...prev, items: updatedItems };
    });
  };

  const handleSubmit = () => {
    if (!formData.vendorName || !formData.email || !formData.phone || !formData.vendorType) {
      alert("Please fill in all required fields");
      return;
    }
    let updatedVendorList;
    if (isEditing) {
      updatedVendorList = vendorList.map((vendor, index) =>
        index === editIndex ? { ...formData } : vendor
      );
      setIsEditing(false);
      setEditIndex(null);
    } else {
      updatedVendorList = [...vendorList, { ...formData }];
    }
    setVendorList(updatedVendorList);
    setfinalData((prev) => ({ ...prev, VendorManagement: updatedVendorList }));
    setShowSuccess(true);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      vendorId: "SP001",
      vendorName: "Sparsha",
      contactInfo: "Owner Name",
      email: "owner@sparsha.com",
      phone: "1234567890",
      vendorType: "",
      items: [],
      pricing: "",
      notes: ""
    });
    setVendorType("");
  };

  const handleDelete = (index) => {
    const updatedVendorList = vendorList.filter((_, i) => i !== index);
    setVendorList(updatedVendorList);
    setfinalData((prev) => ({ ...prev, VendorManagement: updatedVendorList }));
  };

  const handleEdit = (index) => {
    setFormData(vendorList[index]);
    setVendorType(vendorList[index].vendorType);
    setIsEditing(true);
    setEditIndex(index);
  };

  return (
    <>
      <Card elevation={3} sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Vendor Management
          </Typography>
          <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Vendor ID"
            variant="outlined"
            value={formData.vendorId}
            onChange={handleInputChange('vendorId')}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Vendor Name"
            variant="outlined"
            value={formData.vendorName}
            onChange={handleInputChange('vendorName')}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>Vendor Type</InputLabel>
            <Select
              value={vendorType}
              onChange={handleVendorTypeChange}
            >
              <MenuItem value="Catering">Catering</MenuItem>
              <MenuItem value="Decoration">Decoration</MenuItem>
              <MenuItem value="Entertainment">Entertainment</MenuItem>
              <MenuItem value="Photography">Photography</MenuItem>
              <MenuItem value="Venue">Venue</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Contact Person"
            variant="outlined"
            value={formData.contactInfo}
            onChange={handleInputChange('contactInfo')}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            variant="outlined"
            value={formData.email}
            onChange={handleInputChange('email')}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Phone"
            variant="outlined"
            value={formData.phone}
            onChange={handleInputChange('phone')}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Pricing"
             
            variant="outlined"
            value={formData.pricing}
            onChange={handleInputChange('pricing')}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Notes"
            variant="outlined"
            value={formData.notes}
            onChange={handleInputChange('notes')}
          />
        </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Select Items</Typography>
              <FormGroup>
                {(itemOptions[vendorType] || []).map((item) => (
                  <FormControlLabel
                    key={item}
                    control={
                      <Checkbox
                        checked={formData.items.includes(item)}
                        onChange={handleItemChange(item)}
                      />
                    }
                    label={item}
                  />
                ))}
              </FormGroup>
            </Grid>
            <Grid item xs={12}>
            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button variant="outlined" onClick={() => {
                setFormData({
                  vendorId: "", vendorName: "", contactInfo: "", email: "", phone: "", foodItems: [], pricing: "", notes: "", vendorType: ""
                });
                setIsEditing(false);
                setEditIndex(null);
              }}>Cancel</Button>
              <Button variant="contained" onClick={handleSubmit} startIcon={<Save />}>{isEditing ? "Update" : "Save"}</Button>
            </Stack>
          </Grid>          </Grid>
        </CardContent>
      </Card>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Vendor ID</TableCell>
              <TableCell>Vendor Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Items</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vendorList.map((vendor, index) => (
              <TableRow key={index}>
                <TableCell>{vendor.vendorId}</TableCell>
                <TableCell>{vendor.vendorName}</TableCell>
                <TableCell>{vendor.vendorType}</TableCell>
                <TableCell>{vendor.items.join(", ")}</TableCell>
                <TableCell>{vendor.contactInfo}</TableCell>
                <TableCell>{vendor.email}</TableCell>
                <TableCell>{vendor.phone}</TableCell>
                <TableCell>
                  <Button color="primary" onClick={() => handleEdit(index)}>Edit</Button>
                  <Button color="secondary" onClick={() => handleDelete(index)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Snackbar
        open={showSuccess}
        autoHideDuration={6000}
        onClose={() => setShowSuccess(false)}
      >
        <Alert severity="success" onClose={() => setShowSuccess(false)}>
          Vendor details {isEditing ? "updated" : "saved"} successfully!
        </Alert>
      </Snackbar>
    </>
  );
}

export default VendorManagement;