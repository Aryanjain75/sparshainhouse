
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
  SelectChangeEvent,
  Container,
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
  Cancel
} from "@mui/icons-material";
import shortid from "shortid";

function EventInformation({finalData, setfinalData}) {
  const [eventType, setEventType] = useState('');
  const [eventTheme, setEventTheme] = useState('');
  const [formData, setFormData] = useState({
    eventId: shortid.generate(),
    eventName: '',
    eventType: '',
    eventTheme: '',
    description: '',
    date: '',
    startTime: '',
    endTime: '',
    venueName: '',
    venueAddress: '',
    longitude: '',
    latitude: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (event) => {
    setEventType(event.target.value);
    setFormData(prev => ({
      ...prev,
      eventType: event.target.value
    }));
  };

  const handleEventThemeChange = (event) => {
    setEventTheme(event.target.value);
    setFormData(prev => ({
      ...prev,
      eventTheme: event.target.value
    }));
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      const newEventPlanning = {
        ...formData,
        eventId: shortid.generate()
      };

      setfinalData(prev => ({
        ...prev,
        EventPlanning: [...prev.EventPlanning, newEventPlanning]
      }));

      setFormData({
        eventId: shortid.generate(),
        eventName: '',
        eventType: '',
        eventTheme: '',
        description: '',
        date: '',
        startTime: '',
        endTime: '',
        venueName: '',
        venueAddress: '',
        longitude: '',
        latitude: ''
      });
      
      setEventType('');
      setEventTheme('');
      setShowSuccess(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Card elevation={3} sx={{ mb: 4 }}>
        <CardContent>
          <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
            <EventNote fontSize="large" color="primary" />
            <Typography variant="h4" className="font-semibold">
              Event Planning
            </Typography>
          </Stack>

          <Divider sx={{ mb: 4 }} />

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField 
                required
                fullWidth
                id="eventId" 
                label="Event ID" 
                variant="outlined"
                value={formData.eventId}
                onChange={handleInputChange}
                InputProps={{
                  startAdornment: <NoteAddTwoTone sx={{ mr: 1 }} />
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField 
                required
                fullWidth
                id="eventName" 
                label="Event Name" 
                variant="outlined"
                value={formData.eventName}
                onChange={handleInputChange}
                InputProps={{
                  startAdornment: <EventNote sx={{ mr: 1 }} />
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel>Event Type</InputLabel>
                <Select
                  value={eventType}
                  label="Event Type"
                  onChange={handleChange}
                >
                  <MenuItem value={"Wedding"}>Wedding</MenuItem>
                  <MenuItem value={"Corporate"}>Corporate</MenuItem>
                  <MenuItem value={"Birthday"}>Birthday</MenuItem>
                  <MenuItem value={"Conference"}>Conference</MenuItem>
                  <MenuItem value={"Exhibition"}>Exhibition</MenuItem>
                  <MenuItem value={"Concert"}>Concert</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel>Event Theme</InputLabel>
                <Select
                  value={eventTheme}
                  label="Event Theme"
                  onChange={handleEventThemeChange}
                >
                  <MenuItem value={"Vintage"}>Vintage</MenuItem>
                  <MenuItem value={"Modern"}>Modern</MenuItem>
                  <MenuItem value={"Rustic"}>Rustic</MenuItem>
                  <MenuItem value={"Minimalist"}>Minimalist</MenuItem>
                  <MenuItem value={"Traditional"}>Traditional</MenuItem>
                  <MenuItem value={"Bohemian"}>Bohemian</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                multiline
                rows={4}
                id="description"
                label="Event Description"
                variant="outlined"
                value={formData.description}
                onChange={handleInputChange}
                InputProps={{
                  startAdornment: <Description sx={{ mr: 1, alignSelf: 'flex-start', mt: 1 }} />
                }}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                required
                fullWidth
                type="date"
                id="date"
                label="Event Date"
                value={formData.date}
                onChange={handleInputChange}
                InputProps={{
                  startAdornment: <CalendarMonth sx={{ mr: 1 }} />
                }}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                required
                fullWidth
                type="time"
                id="startTime"
                label="Start Time"
                value={formData.startTime}
                onChange={handleInputChange}
                InputProps={{
                  startAdornment: <AccessTime sx={{ mr: 1 }} />
                }}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                required
                fullWidth
                type="time"
                id="endTime"
                label="End Time"
                value={formData.endTime}
                onChange={handleInputChange}
                InputProps={{
                  startAdornment: <AccessTime sx={{ mr: 1 }} />
                }}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                required
                fullWidth
                id="venueName"
                label="Venue Name"
                variant="outlined"
                value={formData.venueName}
                onChange={handleInputChange}
                InputProps={{
                  startAdornment: <Place sx={{ mr: 1 }} />
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                required
                fullWidth
                id="venueAddress"
                label="Venue Address"
                variant="outlined"
                value={formData.venueAddress}
                onChange={handleInputChange}
                InputProps={{
                  startAdornment: <LocationOn sx={{ mr: 1 }} />
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="longitude"
                label="Longitude"
                variant="outlined"
                value={formData.longitude}
                onChange={handleInputChange}
                InputProps={{
                  startAdornment: <MyLocation sx={{ mr: 1 }} />
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="latitude"
                label="Latitude"
                variant="outlined"
                value={formData.latitude}
                onChange={handleInputChange}
                InputProps={{
                  startAdornment: <MyLocation sx={{ mr: 1 }} />
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Stack direction="row" spacing={2} justifyContent="flex-end">
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<Save />}
                  onClick={handleSubmit}
                >
                  Save Event
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  startIcon={<Cancel />}
                  onClick={() => {
                    setFormData({
                      eventId: shortid.generate(),
                      eventName: '',
                      eventType: '',
                      eventTheme: '',
                      description: '',
                      date: '',
                      startTime: '',
                      endTime: '',
                      venueName: '',
                      venueAddress: '',
                      longitude: '',
                      latitude: ''
                    });
                    setEventType('');
                    setEventTheme('');
                  }}
                >
                  Cancel
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
        <Alert 
          onClose={() => setShowSuccess(false)} 
          severity="success"
          sx={{ width: '100%' }}
        >
          Event saved successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default EventInformation;
 