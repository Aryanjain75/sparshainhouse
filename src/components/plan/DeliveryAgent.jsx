"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "@/components/sidebar/Sidebar";
import Productable from "@/components/theaterproductable/Productable";
import Link from 'next/link';
import axios from "axios";
import { Button, Typography, Container, Card, CardContent } from "@mui/material";
import { Stack, Divider, Grid, TextField } from '@mui/material';
import {
    EventNote,
    NoteAddTwoTone, 
    Description,
    Save,
    Place,
    LocationOn,
    MyLocation,
    Cancel
} from '@mui/icons-material';
import {
    Alert,
    CalendarMonth,
    Snackbar,
} from "@mui/material";

export function DeliveryAgent({ finalData, setfinalData }) {
    const [formData, setFormData] = useState({
        DeliveryAgentId: '',
        DeliveryAgentName: '',
        DeliveryAgentpurpose: '',
        DeliveryAgentDate: '',
        venueName: '',
        venueAddress: '',
        longitude: '',
        latitude: ''
    });

    const [showSuccess, setShowSuccess] = useState(false);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Add API endpoint logic here, if necessary
            setfinalData(prev => ({
                ...prev,
                DeliveryAgent: [...prev.DeliveryAgent, formData]
            }));
            setShowSuccess(true);

            // Reset form after successful submission
            setFormData({
                DeliveryAgentId: '',
                DeliveryAgentName: '',
                DeliveryAgentpurpose: '',
                DeliveryAgentDate: '',
                venueName: '',
                venueAddress: '',
                longitude: '',
                latitude: ''
            });
        } catch (error) {
            console.error('Error submitting form:', error);
            // Add error handling
        }
    };

    return (
        <>
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Card elevation={3} sx={{ mb: 4 }}>
                    <CardContent>
                        <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
                            <EventNote fontSize="large" color="primary" />
                            <Typography variant="h4" className="font-semibold">
                                Delivery Agent
                            </Typography>
                        </Stack>

                        <Divider sx={{ mb: 4 }} />

                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="DeliveryAgentId"
                                        label="DeliveryAgent ID"
                                        variant="outlined"
                                        value={formData.DeliveryAgentId}
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
                                        id="DeliveryAgentName"
                                        label="DeliveryAgent Name"
                                        variant="outlined"
                                        value={formData.DeliveryAgentName}
                                        onChange={handleInputChange}
                                        InputProps={{
                                            startAdornment: <EventNote sx={{ mr: 1 }} />
                                        }}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        multiline
                                        rows={4}
                                        id="DeliveryAgentpurpose"
                                        label="DeliveryAgent Purpose"
                                        variant="outlined"
                                        value={formData.DeliveryAgentpurpose}
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
                                        id="DeliveryAgentDate"
                                        label="DeliveryAgent Date"
                                        value={formData.DeliveryAgentDate}
                                        onChange={handleInputChange}
                                        InputProps={{
                                            startAdornment: <CalendarMonth sx={{ mr: 1 }} />
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
                                            type="submit"
                                            variant="contained"
                                            startIcon={<Save />}
                                        >
                                            Save
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            startIcon={<Cancel />}
                                            onClick={() => setFormData({
                                                DeliveryAgentId: '',
                                                DeliveryAgentName: '',
                                                DeliveryAgentpurpose: '',
                                                DeliveryAgentDate: '',
                                                venueName: '',
                                                venueAddress: '',
                                                longitude: '',
                                                latitude: ''
                                            })}
                                        >
                                            Cancel
                                        </Button>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </form>
                    </CardContent>
                </Card>

                <Snackbar
                    open={showSuccess}
                    autoHideDuration={6000}
                    onClose={() => setShowSuccess(false)}
                >
                    <Alert severity="success" onClose={() => setShowSuccess(false)}>
                        Delivery Agent details saved successfully!
                    </Alert>
                </Snackbar>
            </Container>
        </>
    );
}

