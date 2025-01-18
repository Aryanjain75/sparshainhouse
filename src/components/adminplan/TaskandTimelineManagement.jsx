import React, { useState } from 'react';
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
  Snackbar,
  Alert,
  IconButton
} from "@mui/material";
import {
  NoteAddTwoTone,
  EventNote,
  Category,
  Description,
  CalendarMonth,
  Save,
  Delete,
  Edit
} from "@mui/icons-material";
import shortid from 'shortid';

function TaskandTimelineManagement({ formData, setFormData }) {
  const [taskStatus, setTaskStatus] = useState('');
  const [taskId, setTaskId] = useState(shortid.generate());
  const [taskName, setTaskName] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // Flag for edit mode
  const [editIndex, setEditIndex] = useState(null);

  const handleTaskStatusChange = (event) => {
    setTaskStatus(event.target.value);
  };

  const handleSaveTask = () => {
    if (!taskId || !taskName || !dueDate || !taskStatus) {
      setShowAlert(true);
      return;
    }

    if (isEditing) {
      // Update task
      const updatedTasks = formData.TaskandTimelineManagement.map((task, index) =>
        index === editIndex
          ? {
              taskId,
              taskName,
              dueDate,
              taskStatus,
              taskDescription,
            }
          : task
      );
      setFormData({ ...formData, TaskandTimelineManagement: updatedTasks });
      setIsEditing(false);
      setEditIndex(null);
    } else {
      // Add new task
      setFormData({
        ...formData,
        TaskandTimelineManagement: [
          ...formData.TaskandTimelineManagement,
          {
            taskId,
            taskName,
            dueDate,
            taskStatus,
            taskDescription,
          },
        ],
      });
    }

    setTaskId(shortid.generate());
    setTaskName('');
    setDueDate('');
    setTaskStatus('');
    setTaskDescription('');
  };

  const handleEditTask = (index) => {
    const task = formData.TaskandTimelineManagement[index];
    setTaskId(task.taskId);
    setTaskName(task.taskName);
    setDueDate(task.dueDate);
    setTaskStatus(task.taskStatus);
    setTaskDescription(task.taskDescription);
    setIsEditing(true);
    setEditIndex(index);
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = formData.TaskandTimelineManagement.filter(
      (_, i) => i !== index
    );
    setFormData({ ...formData, TaskandTimelineManagement: updatedTasks });
  };

  return (
    <>
      <Card elevation={3} sx={{ mb: 4 }}>
        <CardContent>
          <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
            <EventNote fontSize="large" color="primary" />
            <Typography variant="h4" className="font-semibold">
              Task and Timeline Management
            </Typography>
          </Stack>

          <Divider sx={{ mb: 4 }} />

          <Grid container spacing={3}>
            {/* Task Form */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="task-id"
                label="Task ID"
                variant="outlined"
                value={taskId}
                onChange={(e) => setTaskId(e.target.value)}
                InputProps={{
                  startAdornment: <NoteAddTwoTone sx={{ mr: 1 }} />,
                }}
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="task-name"
                label="Task Name"
                variant="outlined"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                InputProps={{
                  startAdornment: <EventNote sx={{ mr: 1 }} />,
                }}
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="date"
                label="Due Date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                InputProps={{
                  startAdornment: <CalendarMonth sx={{ mr: 1 }} />,
                }}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel>Status</InputLabel>
                <Select
                  value={taskStatus}
                  label="Status"
                  onChange={handleTaskStatusChange}
                >
                  <MenuItem value={"Not Started"}>Not Started</MenuItem>
                  <MenuItem value={"In Progress"}>In Progress</MenuItem>
                  <MenuItem value={"Completed"}>Completed</MenuItem>
                  <MenuItem value={"Delayed"}>Delayed</MenuItem>
                  <MenuItem value={"Cancelled"}>Cancelled</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Task Description"
                variant="outlined"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <Description sx={{ mr: 1, alignSelf: "flex-start", mt: 1 }} />
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                size="large"
                startIcon={<Save />}
                onClick={handleSaveTask}
                sx={{ mt: 2 }}
              >
                {isEditing ? "Update Task" : "Save Task Details"}
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Task Table */}
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Task ID</TableCell>
                <TableCell>Task Name</TableCell>
                <TableCell>Due Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {formData.TaskandTimelineManagement.map((task, index) => (
                <TableRow key={task.taskId}>
                  <TableCell>{task.taskId}</TableCell>
                  <TableCell>{task.taskName}</TableCell>
                  <TableCell>{task.dueDate}</TableCell>
                  <TableCell>{task.taskStatus}</TableCell>
                  <TableCell>{task.taskDescription}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEditTask(index)}>
                      <Edit color="primary" />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteTask(index)}>
                      <Delete color="error" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Snackbar
        open={showAlert}
        autoHideDuration={6000}
        onClose={() => setShowAlert(false)}
      >
        <Alert severity="error" onClose={() => setShowAlert(false)}>
          Please fill in all required fields
        </Alert>
      </Snackbar>
    </>
  );
}

export default TaskandTimelineManagement;
