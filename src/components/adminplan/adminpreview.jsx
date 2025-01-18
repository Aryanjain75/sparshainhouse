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
import { NoteAddTwoTone, Delete } from "@mui/icons-material";

import { AdminPlanContext } from "../../context/AdminContext";

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

function Preview() {
  const { formData, setFormData, partyplan, setpartyplan, setActiveStep } =
    useContext(AdminPlanContext);

  // Ensure formData is added only when it's valid and non-empty
  useEffect(() => {
    if (
      formData &&
      Object.keys(formData).length > 0 &&
      formData.EventPlanning.length > 0
    ) {
      setpartyplan((prevPlans) => [...prevPlans, formData]);
      // Reset the formData to an initial state
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

  const handleEdit = (plan, index) => {
    console.log("Edit clicked for:", plan);
    setFormData(plan); // Load the selected plan into formData for editing
    setpartyplan((prevPlans) =>
      prevPlans.filter((_, idx) => idx !== index) // Remove the edited plan from the list
    );
    setActiveStep(0); // Go back to the first step
  };

  const handleDelete = (index) => {
    console.log("Delete clicked for index:", index);
    setpartyplan((prevPlans) =>
      prevPlans.filter((_, idx) => idx !== index) // Remove the plan at the specified index
    );
  };

  const handleAddMore = () => {
    setActiveStep(0); // Redirect to the first step
  };

  return (
    <>
      {partyplan.map((plan, index) => (
        <Paper sx={{ width: "100%", overflow: "hidden", mb: 2 }} key={index}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="Event Planning Details">
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
                  <StyledTableCell>Actions</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {plan?.EventPlanning?.map((row) => (
                  <StyledTableRow key={row.EventId} hover>
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
                    <StyledTableCell>
                      <Button
                        variant="contained"
                        color="success"
                        endIcon={<NoteAddTwoTone />}
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
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
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
