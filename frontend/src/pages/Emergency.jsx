import React, { useState, useEffect } from 'react';
import { 
  Button, 
  Card, 
  CardContent, 
  Typography, 
  Grid, 
  Chip, 
  Box, 
  LinearProgress, 
  List, 
  ListItem, 
  ListItemText, 
  Divider, 
  CircularProgress, 
  Alert,
  useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import WarningIcon from '@mui/icons-material/Warning';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CameraIcon from '@mui/icons-material/Camera';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import StopIcon from '@mui/icons-material/Stop';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Emergency = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);
  const [contactsNotified, setContactsNotified] = useState([]);
  const [evidenceCollected, setEvidenceCollected] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [autoTriggered, setAutoTriggered] = useState(false);

  // Initialize emergency data
  useEffect(() => {
    const initEmergency = async () => {
      try {
        setLoading(true);
        // Check if this was auto-triggered (you could pass this as state or URL param)
        const isAuto = window.location.search.includes('auto=true');
        setAutoTriggered(isAuto);
        
        const response = await api.triggerEmergency(isAuto);
        setContactsNotified(response.contactsNotified);
        setEvidenceCollected(response.evidenceCollected);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    initEmergency();
  }, []);

  // Countdown timer
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      // In a real app, this would actually call 112
      console.log("Calling 112 - This is a simulation");
    }
  }, [countdown]);

  const handleCancel = () => {
    // In a real app, this would cancel the emergency
    navigate('/');
  };

  const handleLoudAlarm = () => {
    // In a real app, this would trigger a loud alarm
    alert('LOUD ALARM ACTIVATED! This would sound an alarm in a real application.');
  };

  if (loading) {
    return (
      <div style={{ padding: isMobile ? '10px' : '20px', backgroundColor: '#ffebee', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress color="error" />
        <Typography variant="h6" style={{ marginLeft: '20px', color: '#d32f2f' }}>Initializing emergency response...</Typography>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: isMobile ? '10px' : '20px', backgroundColor: '#ffebee', minHeight: '100vh' }}>
        <Card style={{ margin: isMobile ? '10px' : '20px', padding: '20px', backgroundColor: '#ffcdd2' }}>
          <Typography variant="h6" color="error">Error: {error}</Typography>
          <Button onClick={() => window.location.reload()} style={{ marginTop: '10px' }}>Retry</Button>
        </Card>
      </div>
    );
  }

  return (
    <div style={{ padding: isMobile ? '10px' : '20px', backgroundColor: '#ffebee', minHeight: '100vh' }}>
      {/* Auto-triggered notification */}
      {autoTriggered && (
        <Alert severity="warning" style={{ marginBottom: '20px' }}>
          This emergency was automatically triggered by the system due to a critical threat detection.
        </Alert>
      )}
      
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3} flexDirection={isMobile ? "column" : "row"} gap={2}>
        <Typography variant={isMobile ? "h5" : "h4"} component="h1" style={{ fontWeight: 'bold', color: '#d32f2f', textAlign: isMobile ? 'center' : 'left' }}>
          <WarningIcon style={{ verticalAlign: 'middle', marginRight: '10px', fontSize: isMobile ? '1.5rem' : 'inherit' }} />
          EMERGENCY MODE
        </Typography>
      </Box>

      {/* Countdown Card */}
      <Card style={{ marginBottom: '20px', backgroundColor: '#ffcdd2' }}>
        <CardContent>
          <Typography variant={isMobile ? "h6" : "h5"} align="center" style={{ fontWeight: 'bold', color: '#c62828' }}>
            Calling 112 in {countdown} seconds...
          </Typography>
          <LinearProgress 
            variant="determinate" 
            value={(countdown / 10) * 100} 
            style={{ marginTop: '10px', height: '10px', borderRadius: '5px' }}
          />
          <Typography variant="body2" align="center" style={{ marginTop: '10px' }}>
            Emergency services are being notified. Stay calm and follow safety instructions.
          </Typography>
        </CardContent>
      </Card>

      <Grid container spacing={isMobile ? 2 : 3}>
        {/* Contacts Notification */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant={isMobile ? "h6" : "h5"} gutterBottom style={{ fontWeight: 'bold', color: '#1976d2' }}>
                <PhoneIcon style={{ verticalAlign: 'middle', marginRight: '10px', fontSize: isMobile ? '1.2rem' : 'inherit' }} />
                Contacts Notified
              </Typography>
              
              <List>
                {contactsNotified.map((contact, index) => (
                  <React.Fragment key={index}>
                    <ListItem>
                      <ListItemText 
                        primary={`${contact.name} (${contact.status})`} 
                        secondary={contact.time}
                      />
                      <Chip label="NOTIFIED" color="success" size="small" />
                    </ListItem>
                    {index < contactsNotified.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Location Sharing */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant={isMobile ? "h6" : "h5"} gutterBottom style={{ fontWeight: 'bold', color: '#1976d2' }}>
                <LocationOnIcon style={{ verticalAlign: 'middle', marginRight: '10px', fontSize: isMobile ? '1.2rem' : 'inherit' }} />
                Location Shared
              </Typography>
              
              <Box mt={2}>
                <Typography variant={isMobile ? "body2" : "body1"}>
                  <strong>Latitude:</strong> 40.7128
                </Typography>
                <Typography variant={isMobile ? "body2" : "body1"}>
                  <strong>Longitude:</strong> -74.0060
                </Typography>
                <Typography variant={isMobile ? "body2" : "body1"} style={{ marginTop: '10px' }}>
                  <strong>Accuracy:</strong> ±5 meters
                </Typography>
                <Typography variant={isMobile ? "body2" : "body1"}>
                  <strong>Last Updated:</strong> {new Date().toLocaleTimeString()}
                </Typography>
                <Typography variant={isMobile ? "body2" : "body2"} style={{ marginTop: '10px', color: '#4caf50' }}>
                  ✓ Location successfully shared with emergency services
                </Typography>
              </Box>
              
              {/* Map placeholder */}
              <Box 
                mt={2} 
                style={{ 
                  height: isMobile ? '100px' : '150px', 
                  backgroundColor: '#e0e0e0', 
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Typography variant="body2" color="textSecondary">
                  Map View (GPS Coordinates)
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Evidence Collected */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant={isMobile ? "h6" : "h5"} gutterBottom style={{ fontWeight: 'bold', color: '#1976d2' }}>
                <CameraIcon style={{ verticalAlign: 'middle', marginRight: '10px', fontSize: isMobile ? '1.2rem' : 'inherit' }} />
                Evidence Collected
              </Typography>
              
              <List>
                {evidenceCollected.map((item, index) => (
                  <React.Fragment key={index}>
                    <ListItem>
                      <ListItemText 
                        primary={`${item.type}: ${item.name}`} 
                        secondary={item.time}
                      />
                      <Chip label="SAVED" color="primary" size="small" />
                    </ListItem>
                    {index < evidenceCollected.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
              <Typography variant="body2" style={{ marginTop: '10px', color: '#4caf50' }}>
                ✓ All evidence securely stored and shared with authorities
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Action Buttons */}
      <Box display="flex" justifyContent="center" mt={3} gap={2} flexWrap="wrap" flexDirection={isMobile ? "column" : "row"}>
        <Button 
          variant="contained" 
          color="error" 
          size={isMobile ? "medium" : "large"}
          startIcon={<StopIcon />}
          onClick={handleCancel}
          fullWidth={isMobile}
          style={{ margin: isMobile ? '5px 0' : '10px' }}
        >
          CANCEL EMERGENCY
        </Button>
        
        <Button 
          variant="contained" 
          color="warning" 
          size={isMobile ? "medium" : "large"}
          startIcon={<VolumeUpIcon />}
          onClick={handleLoudAlarm}
          fullWidth={isMobile}
          style={{ margin: isMobile ? '5px 0' : '10px' }}
        >
          LOUD ALARM
        </Button>
      </Box>
      
      {/* Additional Info */}
      <Card style={{ marginTop: '20px', backgroundColor: '#fff3e0' }}>
        <CardContent>
          <Typography variant={isMobile ? "h6" : "h5"} gutterBottom>Emergency Instructions</Typography>
          <Typography variant={isMobile ? "body2" : "body2"}>
            1. Stay calm and move to a safe location if possible<br/>
            2. Keep your phone charged and available<br/>
            3. Follow instructions from emergency responders<br/>
            4. Do not hang up until instructed by the operator<br/>
            5. Be prepared to provide your location and description of the situation
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Emergency;