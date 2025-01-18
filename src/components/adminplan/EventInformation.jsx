"use client";
import React, { useEffect, useState } from "react";
import shortid from "shortid";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
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
  Container,
  Alert,
  Snackbar,
} from "@mui/material";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import {
  EventNote,
  Description,
  Place,
  LocationOn,
  AccessTime,
  CalendarMonth,
} from "@mui/icons-material";
import Pagination from "@mui/material/Pagination";

function EventInformation({ finalData, setfinalData, orders, setOrders }) {
  const [totallength, setTotalLength] = useState(0);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    itemsPerPage: 5,
  });
  const [decorations, setDecorations] = useState([]);
  const [search, setsearch] = useState("");
  const[EventId,setEventId]=useState(orders?.[0]?.orderid);
  const[EventName,setEventName]=useState(orders?.[0]?.customername);
  const[EventType,setEventType]=useState();
  const[EventTheme,setEventTheme]=useState();
  const[EventDescription,setEventDescription]=useState();
  const[EventStartDate,setEventStartDate]=useState();
  const[EventStartTime,setEventStartTime]=useState();
  const[EventEndDate,setEventEndDate]=useState();
  const[EventEndTime,setEventEndTime]=useState();
  const[EventVenueName,setEventVenueName]=useState();
  const[EventVeneueAddress,setEventVeneueAddress]=useState();
  const[EventLongitude,setEventLongitude]=useState();
  const[EventLatitude,setEventLatitude]=useState();
  const[decorationId,setdecorationId]=useState();
  const[isEditing,setisEditing]=useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  async function fetchDecorationInfo() {
    try {
      const response = await axios.get("/api/BirthdayhallDecoration", {
        params: {
          start: (pagination.currentPage - 1) * pagination.itemsPerPage,
          end:
            (pagination.currentPage - 1) * pagination.itemsPerPage +
            pagination.itemsPerPage,
          name: search,
        },
      });
      setTotalLength(response.data.totallength);
      setDecorations(response.data.data);
    } catch (error) {
      console.error("Failed to fetch decorations:", error);
      toast.error("Failed to load decoration options");
    }
  }
  useEffect(() => {
    fetchDecorationInfo();
  }, [pagination.currentPage]);

  const handleChange = (event) => {
    setFormData((prev) => ({ ...prev, EventType: event.target.value })); // Corrected field name
  };

  const handleEventThemeChange = (event) => {
    setFormData((prev) => ({ ...prev, EventTheme: event.target.value })); // Corrected field name
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async () => {
    console.log( {EventId:EventId,
        eventname:EventName,
        EventType: EventType,
        EventTheme: EventTheme,
        EventDescription: EventDescription,
        EventStartDate: EventStartDate,
        EventStartTime: EventStartTime,
        EventEndDate: EventEndDate,
        EventEndTime: EventEndTime,
        EventVenueName: EventVenueName,
        EventVeneueAddress:EventVeneueAddress,
        EventLongitude:EventLongitude,
        EventLatitude: EventLatitude,
      });
      const final={EventId:EventId,
        eventname:EventName,
        EventType: EventType,
        EventTheme: EventTheme,
        EventDescription: EventDescription,
        EventStartDate: EventStartDate,
        EventStartTime: EventStartTime,
        EventEndDate: EventEndDate,
        EventEndTime: EventEndTime,
        EventVenueName: EventVenueName,
        EventVeneueAddress:EventVeneueAddress,
        EventLongitude:EventLongitude,
        EventLatitude: EventLatitude,
        decorationId:decorationId
      };
    if (isEditing) {
      const updatedEvents = finalData.EventPlanning.map((event) =>
        event.EventId === final.EventId ? final : event
      );
      setfinalData((prev) => ({ ...prev, EventPlanning: updatedEvents }));
      setisEditing(false);
    } else {
      
      const newEvent = { ...final, EventId: shortid.generate() };
      setfinalData((prev) => ({
        ...prev,
        EventPlanning: [...prev.EventPlanning, newEvent],
      }));
    }
    console.log(finalData);
    resetForm();
    setShowSuccess(true);
  };
  useEffect(() => {
    console.log(finalData);
  }, [finalData]);
  const resetForm = () => {
    setEventId(shortid.generate());
    setEventName(orders?.[0]?.customername);
    setEventType("");
    setEventTheme("");
    setEventDescription("");
    setEventStartDate("");
    setEventStartTime("");
    setEventEndDate("");
    setEventEndTime("");
    setEventVenueName("");
    setEventVeneueAddress("");
    setEventLongitude("");
    setEventLatitude("");
    setdecorationId("");
    setisEditing(false);
  };

  const handleEdit = (event) => {
    setEventId(event.EventId);
    setEventName(event.eventname);
    setEventType(event.EventType);
    setEventTheme(event.EventTheme);
    setEventDescription(event.EventDescription);
    setEventStartDate(event.EventStartDate);
    setEventStartTime(event.EventStartTime);
    setEventEndDate(event.EventEndDate);
    setEventEndTime(event.EventEndTime);
    setEventVenueName(event.EventVenueName);
    setEventVeneueAddress(event.EventVeneueAddress);
    setEventLongitude(event.EventLongitude);
    setEventLatitude(event.EventLatitude);
    setdecorationId(event.decorationId);
    setisEditing(true);
  };

  const handleDelete = (eventId) => {
    const updatedEvents = finalData.EventPlanning.filter(
      (event) => event.EventId !== eventId
    ); // Corrected field name
    setfinalData((prev) => ({ ...prev, EventPlanning: updatedEvents }));
  };

  useEffect(() => {
    setEventId( orders?.[0]?.orderid);
    setEventName( orders?.[0]?.customername);
  }, [orders]);
  useEffect(() => {
    setisEditing(false);
  }, []);
  return (
    <Container maxWidth="lg" sx={{ py: 4, backgroundColor: "#ffffff57" }}>
      <Card elevation={3} sx={{ mb: 4, backgroundColor: "#ffffff57" }}>
        <CardContent sx={{ backgroundColor: "#ffffff57" }}>
          <Stack
            direction="row"
            alignItems="center"
            spacing={2}
            sx={{ mb: 3, backgroundColor: "#ffffff57" }}
          >
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
                id="EventId"
                label="Event Id"
                variant="outlined"
                value={EventId}
                 
                onChange={(e)=>{setEventId(e.target.value)}}
                InputProps={{ startAdornment: <EventNote sx={{ mr: 1 }} /> }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                fullWidth
                id="EventName"
                label="Event Name"
                variant="outlined"
                value={EventName}
                onChange={(e)=>{setEventName(e.target.value)}}
                InputProps={{ startAdornment: <EventNote sx={{ mr: 1 }} /> }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel>Event Type</InputLabel>
                <Select
                  value={EventType}
                  label="Event Type"
                  onChange={(e)=>{setEventType(e.target.value)}}
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
                  value={EventTheme}
                  label="Event Theme"
                  onChange={(e)=>{setEventTheme(e.target.value)}}
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
            <div
              className="flex flex-col w-96 m-auto mt-1 gap-4 text-xl align-center"
              style={{ width: "60vw" }}
            >
              <input
                type="text"
                name="searchValue"
                placeholder="Search Decorations..."
                value={search}
                onChange={(e) => {
                  setsearch(e.target.value);
                  fetchDecorationInfo();
                }}
                className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition duration-200"
              />
              <h3 className="text-2xl font-bold mb-4">
                Select Decoration Package
              </h3>
              <div className="flex flex-row overflow-auto gap-2 rounded-[10px] ">
                {decorations?.length > 0 &&
                  decorations.map((halldata) => (
                    <div
                      key={halldata._id}
                      className="relative bg-gray-800 rounded-[10px]"
                    >
                      <input
                        type="radio"
                        name="movieSelection"
                        value={halldata._id}
                        onChange={() => {
                          setdecorationId(halldata._id);
                        }}
                        className="absolute top-2 right-2 z-10 hidden w-10"
                        checked={decorationId === halldata._id}
                      />
                      <div
                        onClick={() => {
                          setdecorationId( halldata._id);
                        }}
                        className="sm:w-1/6 h-32 rounded-[10px] bg-cover bg-center w-10 font-black cursor-pointer"
                        style={{
                          backgroundImage: `url(${halldata.media.primary.url})`,
                          backgroundPosition: "center",
                          backgroundSize: "cover",
                          width: "230px",
                          height: "100%",
                          border:
                            decorationId === halldata._id
                              ? "2px solid #4CAF50"
                              : "1px solid white",
                        }}
                      >
                        <div
                          className="-z-10 bg-opacity-50 text-white text-center rounded-[10px] flex flex-col"
                          style={{
                            backgroundColor: "rgb(0,0,0,0.50)",
                            height: "100%",
                          }}
                        >
                          <div
                            className="flex flex-col flex-grow p-2 text-[#48bfe3] rounded-[10px]"
                            style={{
                              height: "220px",
                              display: "flex",
                              justifyContent: "space-around",
                            }}
                          >
                            <h2 className="text-lg font-extrabold font-serif text-white">
                              {halldata.name}
                            </h2>
                            <div className="flex justify-between mt-2 text-white text-sm flex-col">
                              <div>
                                <p className="border-1 border-white rounded-[10px] ">
                                  <strong>Decoration+hall price:</strong>Rs.{" "}
                                  {halldata.price.price + 12000}
                                </p>
                                <p className="border-1 border-white rounded-[10px]">
                                  <strong>Processing Time:</strong>{" "}
                                  {halldata.delivery.processingTime.hours} hrs
                                </p>
                              </div>
                              <div>
                                <p className="border-1 border-white rounded-[10px]">
                                  <strong>Rating:</strong>{" "}
                                  {halldata.quality.rating.value} ⭐
                                </p>
                                <p className="border-1 border-white rounded-[10px]">
                                  <strong>Votes:</strong>{" "}
                                  {halldata.quality.rating.count}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
              <div className="flex justify-center mb-6">
                <Pagination
                  count={Math.ceil(totallength / pagination.itemsPerPage)}
                  page={pagination.currentPage}
                  onChange={(e, page) =>
                    setPagination({ ...pagination, currentPage: page })
                  }
                  variant="outlined"
                  shape="rounded"
                  style={{ backgroundColor: "#00000087", borderRadius: "18px" }}
                  sx={{
                    "& .MuiPaginationItem-root": {
                      color: "white",
                      borderColor: "rgba(255,255,255,0.3)",
                      "&:hover": {
                        backgroundColor: "rgba(255,255,255,0.1)",
                      },
                    },
                  }}
                />
              </div>
            </div>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                multiline
                rows={4}
                id="EventDescription" // Corrected field name
                label="Event Description"
                variant="outlined"
                value={EventDescription} // Corrected field name
                onChange={(e)=>{setEventDescription(e.target.value)}}
                InputProps={{ startAdornment: <Description sx={{ mr: 1 }} /> }}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                required
                fullWidth
                type="date"
                id="EventStartDate" // Corrected field name
                label="Event Start Date"
                value={EventStartDate} // Corrected field name
                onChange={(e)=>{setEventStartDate(e.target.value)}}
                InputProps={{
                  startAdornment: <CalendarMonth sx={{ mr: 1 }} />,
                }}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                required
                fullWidth
                type="time"
                id="EventStartTime" // Corrected field name
                label="Start Time"
                value={EventStartTime} // Corrected field name
                onChange={(e)=>{setEventStartTime(e.target.value)}}
                InputProps={{ startAdornment: <AccessTime sx={{ mr: 1 }} /> }}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                required
                fullWidth
                type="date"
                id="EventEndDate" // Corrected field name
                label="Event End Date"
                value={EventEndDate} // Corrected field name
                onChange={(e)=>{setEventEndDate(e.target.value)}}
                InputProps={{
                  startAdornment: <CalendarMonth sx={{ mr: 1 }} />,
                }}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                required
                fullWidth
                type="time"
                id="EventEndTime" // Corrected field name
                label="End Time"
                value={EventEndTime} // Corrected field name
                onChange={(e)=>{setEventEndTime(e.target.value)}}
                InputProps={{ startAdornment: <AccessTime sx={{ mr: 1 }} /> }}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="EventVenueName" // Corrected field name
                label="Venue Name"
                variant="outlined"
                 
                value={EventVenueName} // Corrected field name
                onChange={(e)=>{setEventVenueName(e.target.value)}}
                InputProps={{ startAdornment: <Place sx={{ mr: 1 }} /> }}
              />
              <div className="text-sm text-gray-600">
                It Will Be Decided by Planner Through Call
              </div>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="EventVeneueAddress" // Corrected field name
                label="Venue Address"
                variant="outlined"
                 
                value={EventVeneueAddress} // Corrected field name
                onChange={(e)=>{setEventVeneueAddress(e.target.value)}}
                InputProps={{ startAdornment: <LocationOn sx={{ mr: 1 }} /> }}
              />
              <div className="text-sm text-gray-600">
                It Will Be Decided by Planner Through Call
              </div>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                 
                id="EventLongitude" // Corrected field name
                label="Venue Longitude"
                variant="outlined"
                value={EventLongitude} // Corrected field name
                onChange={(e)=>{setEventLongitude(e.target.value)}}
                InputProps={{ startAdornment: <Place sx={{ mr: 1 }} /> }}
              />
              <div className="text-sm text-gray-600">
                It Will Be Decided by Planner Through Call
              </div>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="EventLatitude" // Corrected field name
                label="Event Latitude"
                variant="outlined"
                 
                value={EventLatitude} // Corrected field name
                onChange={(e)=>{setEventLatitude(e.target.value)}}
                InputProps={{ startAdornment: <LocationOn sx={{ mr: 1 }} /> }}
              />
              <div className="text-sm text-gray-600">
                It Will Be Decided by Planner Through Call
              </div>{" "}
            </Grid>

            <Grid item xs={12}>
              <Stack direction="row" spacing={2}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                >
                  {isEditing ? "Update Event" : "Save Event"}
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={resetForm}
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
        autoHideDuration={3000}
        onClose={() => setShowSuccess(false)}
      >
        <Alert severity="success">
          Event {isEditing ? "updated" : "saved"} successfully!
        </Alert>
      </Snackbar>

      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>Event Id</TableCell>
              <TableCell>Event Name</TableCell>
              <TableCell>Event Type</TableCell>
              <TableCell>Event Theme</TableCell>
              <TableCell>Event Description</TableCell>
              <TableCell>Event StartDate</TableCell>
              <TableCell>Event StartTime</TableCell>
              <TableCell>Event EndDate</TableCell>
              <TableCell>Event EndTime</TableCell>
              <TableCell>Event VenueName</TableCell>
              <TableCell>Event Veneue Address</TableCell>
              <TableCell>Event Longitude</TableCell>
              <TableCell>Event Latitude</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {finalData?.EventPlanning?.map((row) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={row.EventId}>
                <TableCell>{row.EventId}</TableCell>
                <TableCell>{row.eventname}</TableCell>
                <TableCell>{row.EventType}</TableCell>
                <TableCell>{row.EventTheme}</TableCell>
                <TableCell>{row.EventDescription}</TableCell>
                <TableCell>{row.EventStartDate}</TableCell>
                <TableCell>{row.EventStartTime}</TableCell>
                <TableCell>{row.EventEndDate}</TableCell>
                <TableCell>{row.EventEndTime}</TableCell>
                <TableCell>{row.EventVenueName}</TableCell>
                <TableCell>{row.EventVeneueAddress}</TableCell>
                <TableCell>{row.EventLongitude}</TableCell>
                <TableCell>{row.EventLatitude}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleEdit(row)}
                    variant="outlined"
                    color="primary"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(row.EventId)}
                    variant="outlined"
                    color="error"
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default EventInformation;
