import React, { useState, useEffect } from 'react';
import { 
  Button, 
  Card, 
  CardContent, 
  Typography, 
  Grid, 
  TextField, 
  FormControlLabel, 
  Switch, 
  Slider, 
  Box, 
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  Chip,
  CircularProgress,
  useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import RefreshIcon from '@mui/icons-material/Refresh';
import api from '../services/api';

const Settings = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [emergencyContacts, setEmergencyContacts] = useState([]);
  const [newContact, setNewContact] = useState({ name: '', phone: '', relationship: '' });
  const [locationSharing, setLocationSharing] = useState(true);
  const [geofencing, setGeofencing] = useState(true);
  const [soundAlarm, setSoundAlarm] = useState(true);
  const [vibrate, setVibrate] = useState(true);
  const [flashLED, setFlashLED] = useState(true);
  const [threatSensitivity, setThreatSensitivity] = useState(2); // 1=Low, 2=Medium, 3=High
  const [faceBlur, setFaceBlur] = useState(true);
  const [autoDelete, setAutoDelete] = useState(true);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const contacts = await api.getEmergencyContacts();
        setEmergencyContacts(contacts);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleAddContact = () => {
    if (newContact.name && newContact.phone) {
      setEmergencyContacts([
        ...emergencyContacts,
        {
          id: Date.now(),
          ...newContact
        }
      ]);
      setNewContact({ name: '', phone: '', relationship: '' });
    }
  };

  const handleDeleteContact = (id) => {
    setEmergencyContacts(emergencyContacts.filter(contact => contact.id !== id));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const settings = {
        emergencyContacts,
        locationSharing,
        geofencing,
        soundAlarm,
        vibrate,
        flashLED,
        threatSensitivity,
        faceBlur,
        autoDelete
      };
      
      const response = await api.saveSettings(settings);
      if (response.success) {
        alert('Settings saved successfully!');
      } else {
        throw new Error(response.message || 'Failed to save settings');
      }
    } catch (err) {
      setError(err.message);
      alert(`Error saving settings: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    // Reset to default values
    setEmergencyContacts([
      { id: 1, name: 'Mom', phone: '+1234567890', relationship: 'Family' },
      { id: 2, name: 'Friend', phone: '+1987654321', relationship: 'Friend' }
    ]);
    setLocationSharing(true);
    setGeofencing(true);
    setSoundAlarm(true);
    setVibrate(true);
    setFlashLED(true);
    setThreatSensitivity(2);
    setFaceBlur(true);
    setAutoDelete(true);
    alert('Settings reset to defaults!');
  };

  if (loading) {
    return (
      <div style={{ padding: isMobile ? '10px' : '20px', backgroundColor: '#f5f5f5', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress />
        <Typography variant="h6" style={{ marginLeft: '20px' }}>Loading settings...</Typography>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: isMobile ? '10px' : '20px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
        <Card style={{ margin: isMobile ? '10px' : '20px', padding: '20px', backgroundColor: '#ffebee' }}>
          <Typography variant="h6" color="error">Error: {error}</Typography>
          <Button onClick={() => window.location.reload()} style={{ marginTop: '10px' }}>Retry</Button>
        </Card>
      </div>
    );
  }

  return (
    <div style={{ padding: isMobile ? '10px' : '20px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3} flexDirection={isMobile ? "column" : "row"} gap={2}>
        <Typography variant={isMobile ? "h5" : "h4"} component="h1" style={{ fontWeight: 'bold', color: '#333' }}>
          Settings
        </Typography>
        <Box display="flex" gap={1} width={isMobile ? '100%' : 'auto'}>
          <Button 
            variant="outlined" 
            startIcon={<RefreshIcon />}
            onClick={handleReset}
            disabled={saving}
            fullWidth={isMobile}
          >
            Reset
          </Button>
          <Button 
            variant="contained" 
            startIcon={saving ? <CircularProgress size={20} /> : <SaveIcon />}
            onClick={handleSave}
            disabled={saving}
            fullWidth={isMobile}
          >
            {saving ? 'Saving...' : 'Save'}
          </Button>
        </Box>
      </Box>

      <Grid container spacing={isMobile ? 2 : 3}>
        {/* Emergency Contacts */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant={isMobile ? "h6" : "h5"} gutterBottom style={{ fontWeight: 'bold', color: '#1976d2' }}>
                Emergency Contacts
              </Typography>
              
              <List>
                {emergencyContacts.map((contact) => (
                  <React.Fragment key={contact.id}>
                    <ListItem>
                      <ListItemText 
                        primary={contact.name} 
                        secondary={`${contact.phone} (${contact.relationship})`}
                      />
                      <ListItemSecondaryAction>
                        <IconButton 
                          edge="end" 
                          aria-label="delete"
                          onClick={() => handleDeleteContact(contact.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
              
              {/* Add new contact form */}
              <Box mt={2}>
                <Typography variant={isMobile ? "h6" : "h5"} gutterBottom>
                  Add New Contact
                </Typography>
                <Grid container spacing={isMobile ? 1 : 2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Name"
                      value={newContact.name}
                      onChange={(e) => setNewContact({...newContact, name: e.target.value})}
                      size={isMobile ? "small" : "medium"}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Phone Number"
                      value={newContact.phone}
                      onChange={(e) => setNewContact({...newContact, phone: e.target.value})}
                      size={isMobile ? "small" : "medium"}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Relationship"
                      value={newContact.relationship}
                      onChange={(e) => setNewContact({...newContact, relationship: e.target.value})}
                      size={isMobile ? "small" : "medium"}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      startIcon={<AddIcon />}
                      onClick={handleAddContact}
                      fullWidth={isMobile}
                    >
                      Add Contact
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Location Services */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant={isMobile ? "h6" : "h5"} gutterBottom style={{ fontWeight: 'bold', color: '#1976d2' }}>
                Location Services
              </Typography>
              
              <FormControlLabel
                control={
                  <Switch
                    checked={locationSharing}
                    onChange={(e) => setLocationSharing(e.target.checked)}
                    color="primary"
                  />
                }
                label="Share Location"
              />
              
              <Box mt={2}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={geofencing}
                      onChange={(e) => setGeofencing(e.target.checked)}
                      color="primary"
                    />
                  }
                  label="Geofencing"
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Alert Preferences */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant={isMobile ? "h6" : "h5"} gutterBottom style={{ fontWeight: 'bold', color: '#1976d2' }}>
                Alert Preferences
              </Typography>
              
              <FormControlLabel
                control={
                  <Switch
                    checked={soundAlarm}
                    onChange={(e) => setSoundAlarm(e.target.checked)}
                    color="primary"
                  />
                }
                label="Sound Alarm"
              />
              
              <Box mt={1}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={vibrate}
                      onChange={(e) => setVibrate(e.target.checked)}
                      color="primary"
                    />
                  }
                  label="Vibrate"
                />
              </Box>
              
              <Box mt={1}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={flashLED}
                      onChange={(e) => setFlashLED(e.target.checked)}
                      color="primary"
                    />
                  }
                  label="Flash LED"
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Threat Sensitivity */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant={isMobile ? "h6" : "h5"} gutterBottom style={{ fontWeight: 'bold', color: '#1976d2' }}>
                Threat Sensitivity
              </Typography>
              
              <Box mt={2}>
                <Typography gutterBottom variant={isMobile ? "body2" : "body1"}>
                  Sensitivity Level: {threatSensitivity === 1 ? 'Low' : threatSensitivity === 2 ? 'Medium' : 'High'}
                </Typography>
                <Slider
                  value={threatSensitivity}
                  onChange={(e, newValue) => setThreatSensitivity(newValue)}
                  step={1}
                  marks={[
                    { value: 1, label: 'Low' },
                    { value: 2, label: 'Med' },
                    { value: 3, label: 'High' }
                  ]}
                  min={1}
                  max={3}
                  valueLabelDisplay="auto"
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Privacy */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant={isMobile ? "h6" : "h5"} gutterBottom style={{ fontWeight: 'bold', color: '#1976d2' }}>
                Privacy
              </Typography>
              
              <FormControlLabel
                control={
                  <Switch
                    checked={faceBlur}
                    onChange={(e) => setFaceBlur(e.target.checked)}
                    color="primary"
                  />
                }
                label="Face Blur in Snapshots"
              />
              
              <Box mt={2}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={autoDelete}
                      onChange={(e) => setAutoDelete(e.target.checked)}
                      color="primary"
                    />
                  }
                  label="Auto-delete Evidence (7 days)"
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Settings;