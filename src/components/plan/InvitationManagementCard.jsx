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
  EventAvailable,
  Person,
  Email,
  Phone,
  Save
} from '@mui/icons-material';

function InvitationManagementCard({finalData, setfinalData}) {
    const [formData, setFormData] = useState({
      guestName: '',
      email: '',
      phone: '',
      invitationType: ''
    });

    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    };
  
    const handleSaveInvitation = async () => {
      try {
        if (!formData.guestName || !formData.email || !formData.phone || !formData.invitationType) {
          throw new Error('Please fill in all required fields');
        }

        setfinalData({
          ...finalData,
          InvitationManagementCard: {
            ...finalData.InvitationManagementCard,
            formData
          }
        });
        console.log('Saving invitation:', formData);
        
      } catch (error) {
        console.error('Error saving invitation:', error);
      }
    };
  
    return (
      <Card elevation={3} sx={{ mb: 4 }}>
        <CardContent>
          <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
            <EventAvailable fontSize="large" color="primary" />
            <Typography variant="h4" className="font-semibold">
              Invitation Management
            </Typography>
          </Stack>
  
          <Divider sx={{ mb: 4 }} />
  
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="guest-name"
                name="guestName"
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
              <TextField
                fullWidth
                id="email-address"
                name="email"
                label="Email Address"
                variant="outlined"
                value={formData.email}
                onChange={handleInputChange}
                required
                type="email"
                InputProps={{
                  startAdornment: <Email sx={{ mr: 1 }} />
                }}
              />
            </Grid>
  
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="phone-number"
                name="phone"
                label="Phone Number"
                variant="outlined"
                value={formData.phone}
                onChange={handleInputChange}
                required
                InputProps={{
                  startAdornment: <Phone sx={{ mr: 1 }} />
                }}
              />
            </Grid>
  
            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel>Invitation Type</InputLabel>
                <Select
                  value={formData.invitationType}
                  name="invitationType"
                  label="Invitation Type"
                  onChange={handleInputChange}
                >
                  <MenuItem value="Wedding">Wedding</MenuItem>
                  <MenuItem value="Birthday">Birthday</MenuItem>
                  <MenuItem value="Conference">Conference</MenuItem>
                  <MenuItem value="Corporate">Corporate</MenuItem>
                  <MenuItem value="Social">Social</MenuItem>
                </Select>
              </FormControl>
            </Grid>
  
            <Grid item xs={12}>
              <Button
                variant="contained"
                size="large"
                startIcon={<Save />}
                sx={{ mt: 2 }}
                onClick={handleSaveInvitation}
              >
                Save Invitation
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
}
  
export default InvitationManagementCard;
