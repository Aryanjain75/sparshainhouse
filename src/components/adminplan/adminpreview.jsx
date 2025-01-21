"use client";
import React, { useContext, useEffect } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  styled,
  tableCellClasses,
} from "@mui/material";
import axios from "axios";
import {
  NoteAddTwoTone,
  ThumbDown,
  ThumbUp,
  ErrorOutline,
  EventNote,
  Category,
  Description,
  LocationOn,
  AccessTime,
  CalendarMonth,
  Place,
  Save,
  Edit,
  Delete,
  Person,
  Email,
  Phone,
  EventAvailable,
} from "@mui/icons-material";

import { AdminPlanContext } from "../../context/AdminContext";

// Styled components for table cells and rows
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function Preview({orderid}) {
  const { formData, setFormData, partyplan, setpartyplan, setActiveStep } =
    useContext(AdminPlanContext);
    useEffect(() => {
      const fetchOrders = async () => {
      try {
        const  plans = await axios.get(`/api/plans/${orderid}`);
        setpartyplan(plans.data.message.plan);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    
      fetchOrders();},[orderid]);
  // Ensure formData is added only when it's valid and non-empty
  useEffect(() => {
    if (
      formData &&
      Object.keys(formData).length > 0 &&
      formData.EventPlanning.length > 0
    ) {
      setpartyplan((prevPlans) => [...prevPlans, formData]);

      // Reset formData to the initial state
      setFormData({
        EventPlanning: [],
        GuestPlanning: [],
        VendorManagement: [],
        FoodItemsandMovieItems: {
          FoodItems: [],
          Movie: [],
          Moviehall: [],
        },
        TaskandTimelineManagement: [],
        BudgetandExpenseManagement: [],
        CommunicationandNotificationsCard: [],
        DeliveryAgent: [],
      });
    }
  }, [formData, setFormData, setpartyplan]);

  // Edit handler
  const handleEdit = (plan, index) => {
    console.log("Edit clicked for:", plan);
    setFormData(plan); // Load the selected plan into formData for editing
    setpartyplan((prevPlans) =>
      prevPlans.filter((_, idx) => idx !== index) // Remove the edited plan from the list
    );
    setActiveStep(0); // Go back to the first step
  };

  // Delete handler
  const handleDelete = (index) => {
    console.log("Delete clicked for index:", index);
    setpartyplan((prevPlans) =>
      prevPlans.filter((_, idx) => idx !== index) // Remove the plan at the specified index
    );
  };

  // Add more handler
  const handleAddMore = () => {
    setActiveStep(0); // Redirect to the first step
  };

  return (
    <>
      {partyplan.map((plan, index) => (
        <Paper sx={{ width: "100%", overflow: "hidden", mb: 2 }} key={index}>
          <TableContainer >
            <Table stickyHeader aria-label="Event Planning Details">
              {/* Event Planning Section */}
              <TableHead>
                <TableRow>
                  <StyledTableCell>Event ID</StyledTableCell>
                  <StyledTableCell>Event Name</StyledTableCell>
                  <StyledTableCell>Type</StyledTableCell>
                  <StyledTableCell>Theme</StyledTableCell>
                  <StyledTableCell>Description</StyledTableCell>
                  <StyledTableCell>Start Date</StyledTableCell>
                  <StyledTableCell>Start Time</StyledTableCell>
                  <StyledTableCell>End Date</StyledTableCell>
                  <StyledTableCell>End Time</StyledTableCell>
                  <StyledTableCell>Venue Name</StyledTableCell>
                  <StyledTableCell>Address</StyledTableCell>
                  <StyledTableCell>Longitude</StyledTableCell>
                  <StyledTableCell>Latitude</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {plan?.EventPlanning?.map((row) => (
                  <StyledTableRow key={row.EventId}>
                    <StyledTableCell>{row.EventId}</StyledTableCell>
                    <StyledTableCell>{row.eventname}</StyledTableCell>
                    <StyledTableCell>{row.EventType}</StyledTableCell>
                    <StyledTableCell>{row.EventTheme}</StyledTableCell>
                    <StyledTableCell>{row.EventDescription}</StyledTableCell>
                    <StyledTableCell>{row.EventStartDate}</StyledTableCell>
                    <StyledTableCell>{row.EventStartTime}</StyledTableCell>
                    <StyledTableCell>{row.EventEndDate}</StyledTableCell>
                    <StyledTableCell>{row.EventEndTime}</StyledTableCell>
                    <StyledTableCell>{row.EventVenueName}</StyledTableCell>
                    <StyledTableCell>{row.EventVeneueAddress}</StyledTableCell>
                    <StyledTableCell>{row.EventLongitude}</StyledTableCell>
                    <StyledTableCell>{row.EventLatitude}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
              </Table>
            <Table stickyHeader aria-label="Event Planning Details">

              {/* Guest Planning Section */}
              <TableHead>
                <TableRow>
                  <StyledTableCell>Guest ID</StyledTableCell>
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell>Email</StyledTableCell>
                  <StyledTableCell>Phone</StyledTableCell>
                  <StyledTableCell>RSVP</StyledTableCell>
                  <StyledTableCell>Category</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {plan?.GuestPlanning?.map((guest) => (
                  <StyledTableRow key={guest.guestId}>
                    <StyledTableCell>{guest.guestId}</StyledTableCell>
                    <StyledTableCell>{guest.guestName}</StyledTableCell>
                    <StyledTableCell>{guest.email}</StyledTableCell>
                    <StyledTableCell>{guest.phone}</StyledTableCell>
                    <StyledTableCell>{guest.rsvpStatus}</StyledTableCell>
                    <StyledTableCell>{guest.guestCategory}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
</Table>
            <Table stickyHeader aria-label="Event Planning Details">

              {/* Vendor Management Section */}
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell>Vendor ID</StyledTableCell>
                  <StyledTableCell>Vendor Name</StyledTableCell>
                  <StyledTableCell>Type</StyledTableCell>
                  <StyledTableCell>Items</StyledTableCell>
                  <StyledTableCell>Contact</StyledTableCell>
                  <StyledTableCell>Email</StyledTableCell>
                  <StyledTableCell>Phone</StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {plan?.VendorManagement?.map((vendor) => (
                  <StyledTableRow key={vendor.vendorId}>
                    <StyledTableCell>{vendor.vendorId}</StyledTableCell>
                    <StyledTableCell>{vendor.vendorName}</StyledTableCell>
                    <StyledTableCell>{vendor.vendorType}</StyledTableCell>
                    <StyledTableCell>{vendor.items.join(", ")}</StyledTableCell>
                    <StyledTableCell>{vendor.contactInfo}</StyledTableCell>
                    <StyledTableCell>{vendor.email}</StyledTableCell>
                    <StyledTableCell>{vendor.phone}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
              </Table>
           
            <Table stickyHeader aria-label="Event Planning Details">

            {/* Food Items Table */}
                      <TableHead>
                        <TableRow>
                          <StyledTableCell>ID</StyledTableCell>
                          <StyledTableCell>Food Name</StyledTableCell>
                          <StyledTableCell>Discount</StyledTableCell>
                          <StyledTableCell>Cuisine</StyledTableCell>
                          <StyledTableCell>Price</StyledTableCell>
                          <StyledTableCell>Ratings</StyledTableCell>
                          <StyledTableCell>Tags</StyledTableCell>
                          <StyledTableCell>Quantity</StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {plan?.FoodItemsandMovieItems?.FoodItems?.map((data) => (
                          <StyledTableRow  key={data.food._id} hover>
                            <StyledTableCell>{data.food._id}</StyledTableCell>
                            <StyledTableCell>
                              <div className="flex items-center space-x-2">
                                <img
                                  src={data.food.CloudanaryImageId}
                                  alt="Food"
                                  className="h-10 w-10 rounded-full"
                                />
                                <span>{data.food.FOODNAME}</span>
                              </div>
                            </StyledTableCell>
                            <StyledTableCell>{data.food.DISCOUNT}</StyledTableCell>
                            <StyledTableCell>{data.food.CUSSINE}</StyledTableCell>
                            <StyledTableCell>{data.food.PRICE}</StyledTableCell>
                            <StyledTableCell>{data.food.RATINGS}</StyledTableCell>
                            <StyledTableCell>{data.food.TAGS.join(', ')}</StyledTableCell>
                            <StyledTableCell>
                              <input
                                type="number"
                                className="w-16 text-center bg-gray-100 border rounded"
                                value={data.count
                                }
                                readOnly
                              />
                            </StyledTableCell>
                          </StyledTableRow>
                        ))}
                      </TableBody>
                        </Table>
                        <Table stickyHeader aria-label="Movie Items Table">
                      <TableHead>
                        <TableRow>
                          <StyledTableCell>ID</StyledTableCell>
                          <StyledTableCell>Movie Name</StyledTableCell>
                          <StyledTableCell>certificate</StyledTableCell>
                          <StyledTableCell>Total Ratting</StyledTableCell>
                          <StyledTableCell>Vote Count</StyledTableCell>
                          <StyledTableCell>releaseYear</StyledTableCell>
                          <StyledTableCell>runtime</StyledTableCell>
                          <StyledTableCell>Tags</StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {
                          <StyledTableRow  key={plan?.FoodItemsandMovieItems?.Movie?.id} hover>
                            <StyledTableCell>{plan?.FoodItemsandMovieItems?.Movie?.id}</StyledTableCell>
                            <StyledTableCell>
                              <div className="flex items-center space-x-2">
                                <img
                                  src={plan?.FoodItemsandMovieItems?.Movie?.movieImage}
                                  alt={plan?.FoodItemsandMovieItems?.Movie?.imageCaption}
                                                       className="h-10 w-10 rounded-full"
                                />
                                <span>{plan?.FoodItemsandMovieItems?.Movie?.title}</span>
                              </div>
                            </StyledTableCell>
                            <StyledTableCell>{plan?.FoodItemsandMovieItems?.Movie?.certificate?.rating}</StyledTableCell>
                            <StyledTableCell>{plan?.FoodItemsandMovieItems?.Movie?.ratingsSummary?.aggregateRating}</StyledTableCell>
                            <StyledTableCell>{plan?.FoodItemsandMovieItems?.Movie?.ratingsSummary?.voteCount}</StyledTableCell>
                            <StyledTableCell>{plan?.FoodItemsandMovieItems?.Movie?.releaseYear}</StyledTableCell>
                            <StyledTableCell>{plan?.FoodItemsandMovieItems?.Movie?.runtime}</StyledTableCell>
                            <StyledTableCell>{plan?.FoodItemsandMovieItems?.Movie?.tags.join(', ')}</StyledTableCell>
                            
                          </StyledTableRow>
                        }
                      </TableBody>
                        </Table>
                        <Table stickyHeader aria-label="Movie hall Table">
                       <TableHead>
                        <TableRow>
                          <StyledTableCell>Image</StyledTableCell>
                          <StyledTableCell>Price</StyledTableCell>
                          <StyledTableCell>caption</StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {
                          <StyledTableRow  key={plan?.FoodItemsandMovieItems?.Movie?.id} hover>
                            <StyledTableCell>
                              <div className="flex items-center space-x-2">
                                <img
                                  src={plan?.FoodItemsandMovieItems?.Moviehall?.Imageurl}
                                  alt={""}
                                                       className="h-[100%] w-[100%]"
                                />
                              </div>
                            </StyledTableCell>
                            <StyledTableCell>{plan?.FoodItemsandMovieItems?.Moviehall?.Price}</StyledTableCell>
                            <StyledTableCell>{plan?.FoodItemsandMovieItems?.Moviehall?.caption}</StyledTableCell>
                            
                          </StyledTableRow>
                        }
                      </TableBody>
                      
            </Table>
            <Table stickyHeader aria-label="Event Planning Details">

            <TableHead>
            <StyledTableRow>
              <StyledTableCell>Task ID</StyledTableCell>
              <StyledTableCell>Task Name</StyledTableCell>
              <StyledTableCell>Due Date</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell>Description</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {plan.TaskandTimelineManagement.map((task, index) => (
              <StyledTableRow key={task.taskId}>
                <StyledTableCell>{task.taskId}</StyledTableCell>
                <StyledTableCell>{task.taskName}</StyledTableCell>
                <StyledTableCell>{task.dueDate}</StyledTableCell>
                <StyledTableCell>{task.taskStatus}</StyledTableCell>
                <StyledTableCell>{task.taskDescription}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
          </Table>
           <Table stickyHeader aria-label="Notification table Table">
                     <TableHead>
                      <TableRow>
                        <StyledTableCell>notificationId</StyledTableCell>
                        <StyledTableCell>guestName</StyledTableCell>
                        <StyledTableCell>Address</StyledTableCell>
                        <StyledTableCell>email</StyledTableCell>
                        <StyledTableCell>phone</StyledTableCell>
                        <StyledTableCell>invitationType</StyledTableCell>
                        <StyledTableCell>messageContent</StyledTableCell>
                        <StyledTableCell>scheduledTime</StyledTableCell>
          
                      </TableRow>
                    </TableHead>
                    <TableBody>
                    {plan?.CommunicationandNotificationsCard?.map((data) => (
                      <StyledTableRow  key={data.notificationId} hover>
                        <StyledTableCell>{data.notificationId}</StyledTableCell>
                        <StyledTableCell>{data.guestName}</StyledTableCell>
                        <StyledTableCell>{data.Address}</StyledTableCell>
                        <StyledTableCell>{data?.email}</StyledTableCell>
                        <StyledTableCell>{data?.phone}</StyledTableCell>
                        <StyledTableCell>{data?.invitationType}</StyledTableCell>
                        <StyledTableCell>{data?.messageContent}</StyledTableCell>
                        <StyledTableCell>{data?.scheduledTime}</StyledTableCell>
                      </StyledTableRow>
                    ))}
                    </TableBody>
                  </Table>
                  <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Budget ID</TableCell>
                      <TableCell>Expense Category</TableCell>
                      <TableCell>Allocated Budget</TableCell>
                      <TableCell>Actual Expense</TableCell>
                      <TableCell>Notes</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {plan?.BudgetandExpenseManagement?.map((budget) => (
                      <TableRow key={budget.budgetId}>
                        <TableCell>{budget.budgetId}</TableCell>
                        <TableCell>{budget.expenseCategory}</TableCell>
                        <TableCell>{budget.allocatedBudget}</TableCell>
                        <TableCell>{budget.actualExpense}</TableCell>
                        <TableCell>{budget.notes}</TableCell>
                        
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
            {/* Action Buttons */}
            <div style={{ padding: "1rem" }}>
              <Button
                variant="contained"
                color="success"
                endIcon={<Edit />}
                onClick={() => handleEdit(plan, index)}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                color="error"
                endIcon={<Delete />}
                onClick={() => handleDelete(index)}
                sx={{ ml: 1 }}
              >
                Delete
              </Button>
            </div>
          </TableContainer>
        </Paper>
      ))}
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddMore}
        sx={{ mt: 2 }}
      >
        Add More
      </Button>
    </>
  );
}

export default Preview;
