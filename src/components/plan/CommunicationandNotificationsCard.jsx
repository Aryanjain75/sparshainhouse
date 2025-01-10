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
  Button
} from '@mui/material';
import {
  EventNote,
  NoteAddTwoTone,
  Person,
  Notifications,
  AccessTime,
  Message,
  Save
} from '@mui/icons-material';

function CommunicationandNotificationsCard({finalData ,setFinalData}) {
  const [notificationType, setNotificationType] = useState('Email');
  const [formData, setFormData] = useState({
    notificationId: '',
    recipient: '',
    scheduledTime: '',
    messageContent: ''
  });

  const handleNotificationTypeChange = (event) => {
    setNotificationType(event.target.value );
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
    setFinalData({...finalData,CommunicationandNotificationsCard:[...finalData.CommunicationandNotificationsCard,formData]});
    setFormData({
      notificationId: '',
      recipient: '',
      scheduledTime: '',
      messageContent: ''
    });
    console.log({ ...formData, notificationType });
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
                id="recipient"
                label="Recipient"
                variant="outlined"
                value={formData.recipient}
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
                Save Notification
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
}

export default CommunicationandNotificationsCard;
