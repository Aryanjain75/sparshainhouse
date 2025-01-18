import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Stack,
  Typography,
  Divider,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton
} from '@mui/material';
import {
  EventNote,
  NoteAddTwoTone,
  Person,
  Notifications,
  AccessTime,
  Message,
  Save,
  Edit,
  Delete
} from '@mui/icons-material';
import shortid from 'shortid';

function CommunicationandNotificationsCard({ finalData, setFinalData }) {
  const [notificationType, setNotificationType] = useState('Email');
  const [formData, setFormData] = useState({
    notificationId: shortid.generate(),
    guestName: '',
    scheduledTime: '',
    messageContent: '',
    email: '',
    phone: '',
    Address:'',
    invitationType: ''
  });

  const [editing, setEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const handleNotificationTypeChange = (event) => {
    setNotificationType(event.target.value);
  };

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (editing) {
      // Update the existing notification
      const updatedData = finalData.CommunicationandNotificationsCard.map((notification, index) =>
        index === editIndex ? formData : notification
      );
      setFinalData({
        ...finalData,
        CommunicationandNotificationsCard: updatedData
      });
      setEditing(false);
      setEditIndex(null);
    } else {
      // Create a new notification
      setFinalData({
        ...finalData,
        CommunicationandNotificationsCard: [
          ...finalData.CommunicationandNotificationsCard,
          formData
        ]
      });
    }

    // Reset the form
    setFormData({
      notificationId: shortid.generate(),
      guestName: '',
      scheduledTime: '',
      messageContent: '',
      email: '',
      phone: '',
      Address:'',
      invitationType: ''
    });
  };

  const handleEdit = (index) => {
    const notification = finalData.CommunicationandNotificationsCard[index];
    setFormData(notification);
    setEditing(true);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedData = finalData.CommunicationandNotificationsCard.filter((_, i) => i !== index);
    setFinalData({
      ...finalData,
      CommunicationandNotificationsCard: updatedData
    });
  };

  return (
    <Card elevation={3} sx={{ mb: 4 }}>
      <CardContent>
        <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
          <EventNote fontSize="large" color="primary" />
          <Typography variant="h4" className="font-semibold">
            Communication and Notifications
          </Typography>
        </Stack>

        <Divider sx={{ mb: 4 }} />

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="notificationId"
                label="Notification ID"
                variant="outlined"
                value={formData.notificationId}
                onChange={handleInputChange}
                required
                InputProps={{
                  startAdornment: <NoteAddTwoTone sx={{ mr: 1 }} />
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="guestName"
                label="Guest Name"
                variant="outlined"
                value={formData.guestName}
                onChange={handleInputChange}
                required
                InputProps={{
                  startAdornment: <Person sx={{ mr: 1 }} />
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel>Notification Type</InputLabel>
                <Select
                  value={notificationType}
                  label="Notification Type"
                  onChange={handleNotificationTypeChange}
                  startAdornment={<Notifications sx={{ mr: 1 }} />}
                >
                  <MenuItem value="Email">Email</MenuItem>
                  <MenuItem value="Address to Address">Address to Address</MenuItem>
                  <MenuItem value="SMS">SMS</MenuItem>
                  <MenuItem value="Push Notification">Push Notification</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                type="datetime-local"
                id="scheduledTime"
                label="Scheduled Time"
                value={formData.scheduledTime}
                onChange={handleInputChange}
                required
                InputProps={{
                  startAdornment: <AccessTime sx={{ mr: 1 }} />
                }}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            {notificationType === 'Email' && (
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  id="email"
                  label="Email Address"
                  variant="outlined"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  type="email"
                />
              </Grid>
            )}

            {notificationType === 'SMS' && (
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  id="phone"
                  label="Phone Number"
                  variant="outlined"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  type="tel"
                />
              </Grid>
            )}
            {notificationType === 'Address to Address' && (
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  id="Address"
                  label="Address"
                  variant="outlined"
                  value={formData.Address}
                  onChange={handleInputChange}
                  required
                  type="tel"
                />
              </Grid>
            )}

            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                id="messageContent"
                label="Message Content"
                variant="outlined"
                value={formData.messageContent}
                onChange={handleInputChange}
                required
                InputProps={{
                  startAdornment: <Message sx={{ mr: 1, alignSelf: 'flex-start', mt: 1 }} />
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                startIcon={<Save />}
                sx={{ mt: 2 }}
              >
                {editing ? 'Update Notification' : 'Save Notification'}
              </Button>
            </Grid>
          </Grid>
        </form>

        {/* Table to display saved notifications */}
        <TableContainer component={Paper} sx={{ mt: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Notification ID</TableCell>
                <TableCell>Guest Name</TableCell>
                <TableCell>Notification Type</TableCell>
                <TableCell>Scheduled Time</TableCell>
                <TableCell>Contact</TableCell>
                <TableCell>Message</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {finalData?.CommunicationandNotificationsCard?.map((notification, index) => (
                <TableRow key={notification.notificationId}>
                  <TableCell>{notification.notificationId}</TableCell>
                  <TableCell>{notification.guestName}</TableCell>
                  <TableCell>{notification.notificationType}</TableCell>
                  <TableCell>{notification.scheduledTime}</TableCell>
                  <TableCell>
                    {notification.notificationType === 'Email'
                      ? notification.email
                      : notification.phone}
                  </TableCell>
                  <TableCell>{notification.messageContent}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(index)}>
                      <Edit />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(index)}>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}

export default CommunicationandNotificationsCard;
