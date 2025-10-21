import React, { useState, useEffect } from 'react';
import { 
  Button, 
  Card, 
  CardContent, 
  Typography, 
  Grid, 
  Chip, 
  Box, 
  CircularProgress, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  DialogContentText,
  useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import WarningIcon from '@mui/icons-material/Warning';
import SecurityIcon from '@mui/icons-material/Security';
import PeopleIcon from '@mui/icons-material/People';
import MicIcon from '@mui/icons-material/Mic';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import { useSafetyData } from '../hooks/useSafetyData';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { safetyData, loading, error } = useSafetyData();
  const navigate = useNavigate();
  const [demoMode, setDemoMode] = useState('normal'); // 'normal', 'escalating', 'critical'
  const [emergencyDialog, setEmergencyDialog] = useState(false);
  const [emergencyTriggered, setEmergencyTriggered] = useState(false);
  
  const { 
    peopleCount, 
    currentEmotion, 
    motionStatus, 
    poseRisk, 
    threatLevel, 
    lastAlert 
  } = safetyData;

  // Set simulation mode based on demo mode
  useEffect(() => {
    api.setSimulationMode(demoMode);
  }, [demoMode]);

  // Auto-trigger emergency for critical threats
  useEffect(() => {
    if (threatLevel === 'HIGH' && !emergencyTriggered) {
      setEmergencyDialog(true);
      setEmergencyTriggered(true);
      
      // Auto-navigate to emergency page after 3 seconds
      const timer = setTimeout(() => {
        handleAutoEmergency();
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [threatLevel, emergencyTriggered]);

  const handleAutoEmergency = async () => {
    setEmergencyDialog(false);
    // In a real app, this would trigger the actual emergency
    navigate('/emergency');
  };

  const handleManualEmergency = () => {
    navigate('/emergency');
  };

  const getThreatColor = (level) => {
    switch (level) {
      case 'LOW': return 'success';
      case 'MEDIUM': return 'warning';
      case 'HIGH': return 'error';
      default: return 'default';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'SECURE': return 'success';
      default: return 'default';
    }
  };

  const setDemoModeEscalating = () => {
    setDemoMode('escalating');
  };

  const setDemoModeCritical = () => {
    setDemoMode('critical');
  };

  const resetDemoMode = () => {
    setDemoMode('normal');
    setEmergencyTriggered(false);
  };

  if (loading) {
    return (
      <div style={{ padding: isMobile ? '10px' : '20px', backgroundColor: '#f5f5f5', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress />
        <Typography variant="h6" style={{ marginLeft: '20px' }}>Loading safety data...</Typography>
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
      {/* Demo Controls - Only visible in demo mode */}
      <Card style={{ marginBottom: '20px', backgroundColor: '#fff3e0' }}>
        <CardContent>
          <Typography variant={isMobile ? "h6" : "h5"} gutterBottom>Demo Controls</Typography>
          <Box display="flex" flexDirection={isMobile ? "column" : "row"} gap={2} flexWrap="wrap">
            <Button 
              variant="contained" 
              color="primary" 
              onClick={setDemoModeEscalating}
              disabled={demoMode === 'escalating'}
              fullWidth={isMobile}
              style={{ margin: isMobile ? '5px 0' : '0' }}
            >
              Escalating Threat Demo
            </Button>
            <Button 
              variant="contained" 
              color="error" 
              onClick={setDemoModeCritical}
              disabled={demoMode === 'critical'}
              fullWidth={isMobile}
              style={{ margin: isMobile ? '5px 0' : '0' }}
            >
              Critical Threat Demo
            </Button>
            <Button 
              variant="outlined" 
              onClick={resetDemoMode}
              fullWidth={isMobile}
              style={{ margin: isMobile ? '5px 0' : '0' }}
            >
              Reset Demo
            </Button>
            {!isMobile && (
              <Box component="div" sx={{ alignSelf: 'center', marginLeft: '10px' }}>
                <Typography variant="body2" component="span">
                  Current Mode: <Chip label={demoMode} size="small" />
                </Typography>
              </Box>
            )}
          </Box>
          {isMobile && (
            <Box component="div" sx={{ marginTop: '10px', textAlign: 'center' }}>
              <Typography variant="body2" component="span">
                Mode: <Chip label={demoMode} size="small" />
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3} flexDirection={isMobile ? "column" : "row"} gap={2}>
        <Typography variant={isMobile ? "h5" : "h4"} component="h1" style={{ fontWeight: 'bold', color: '#333', textAlign: isMobile ? 'center' : 'left' }}>
          <SecurityIcon style={{ verticalAlign: 'middle', marginRight: '10px', fontSize: isMobile ? '1.5rem' : 'inherit' }} />
          Women Safety App
        </Typography>
        <Box display="flex" gap={1} width={isMobile ? '100%' : 'auto'}>
          <Button variant="outlined" href="/settings" fullWidth={isMobile}>
            Settings
          </Button>
          <Button 
            variant="contained" 
            color="error" 
            onClick={handleManualEmergency}
            startIcon={<WarningIcon />}
            fullWidth={isMobile}
          >
            EMERGENCY
          </Button>
        </Box>
      </Box>

      {/* Status Bar */}
      <Card style={{ marginBottom: '20px', backgroundColor: '#e3f2fd' }}>
        <CardContent>
          <Grid container spacing={isMobile ? 1 : 2}>
            <Grid item xs={12}>
              <Typography variant={isMobile ? "body1" : "h6"}>
                Status: <Chip label="SECURE" color={getStatusColor('SECURE')} size={isMobile ? "small" : "medium"} />
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant={isMobile ? "body1" : "h6"}>
                Location: Downtown Mall
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant={isMobile ? "body1" : "h6"}>
                Active Since: {new Date().toLocaleTimeString()}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Main Dashboard Grid */}
      <Grid container spacing={isMobile ? 2 : 3}>
        {/* Vision System Card */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant={isMobile ? "h6" : "h5"} gutterBottom style={{ fontWeight: 'bold', color: '#1976d2' }}>
                <PeopleIcon style={{ verticalAlign: 'middle', marginRight: '10px', fontSize: isMobile ? '1.2rem' : 'inherit' }} />
                Vision System
              </Typography>
              
              <Grid container spacing={isMobile ? 1 : 2}>
                <Grid item xs={12} sm={4}>
                  <Typography variant={isMobile ? "body2" : "body1"}>
                    <PeopleIcon style={{ verticalAlign: 'middle', marginRight: '5px', fontSize: isMobile ? '1rem' : 'inherit' }} />
                    People: {peopleCount}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography variant={isMobile ? "body2" : "body1"}>
                    <DirectionsWalkIcon style={{ verticalAlign: 'middle', marginRight: '5px', fontSize: isMobile ? '1rem' : 'inherit' }} />
                    Motion: {motionStatus}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Typography variant={isMobile ? "body2" : "body1"}>
                    <AccessibilityIcon style={{ verticalAlign: 'middle', marginRight: '5px', fontSize: isMobile ? '1rem' : 'inherit' }} />
                    Pose Risk: {poseRisk}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Audio System Card */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant={isMobile ? "h6" : "h5"} gutterBottom style={{ fontWeight: 'bold', color: '#1976d2' }}>
                <MicIcon style={{ verticalAlign: 'middle', marginRight: '10px', fontSize: isMobile ? '1.2rem' : 'inherit' }} />
                Audio Analysis
              </Typography>
              
              <Grid container spacing={isMobile ? 1 : 2}>
                <Grid xs={12} sm={4}>
                  <Typography variant={isMobile ? "body2" : "body1"}>
                    Emotion: {currentEmotion}
                  </Typography>
                </Grid>
                <Grid xs={12} sm={4}>
                  <Typography variant={isMobile ? "body2" : "body1"}>
                    Confidence: {Math.floor(Math.random() * 40 + 60)}%
                  </Typography>
                </Grid>
                <Grid xs={12} sm={4}>
                  <Typography variant={isMobile ? "body2" : "body1"}>
                    Threat: {threatLevel === 'HIGH' ? 'DETECTED' : 'None'}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Threat Level Card */}
        <Grid xs={12}>
          <Card style={{ backgroundColor: threatLevel === 'HIGH' ? '#ffebee' : threatLevel === 'MEDIUM' ? '#fff8e1' : '#e8f5e9' }}>
            <CardContent>
              <Typography variant={isMobile ? "h6" : "h5"} gutterBottom style={{ fontWeight: 'bold' }}>
                Threat Assessment
              </Typography>
              
              <Box display="flex" alignItems="center" justifyContent="space-between" flexDirection={isMobile ? "column" : "row"} gap={2}>
                <Typography variant={isMobile ? "body1" : "h6"}>
                  Threat Level: <Chip label={threatLevel} color={getThreatColor(threatLevel)} size={isMobile ? "small" : "medium"} />
                </Typography>
                
                <Box component="div" sx={{ textAlign: isMobile ? 'center' : 'right' }}>
                  <Typography variant={isMobile ? "body2" : "body1"}>
                    Last Alert: {lastAlert}
                  </Typography>
                </Box>
              </Box>
              
              <Box mt={2} display="flex" alignItems="center" flexDirection={isMobile ? "column" : "row"} gap={2}>
                <CircularProgress 
                  variant="determinate" 
                  value={threatLevel === 'HIGH' ? 90 : threatLevel === 'MEDIUM' ? 50 : 10} 
                  size={isMobile ? 50 : 60}
                  thickness={4}
                  style={{ 
                    color: threatLevel === 'HIGH' ? '#f44336' : threatLevel === 'MEDIUM' ? '#ff9800' : '#4caf50',
                  }}
                />
                <Typography variant={isMobile ? "body2" : "body1"} style={{ textAlign: 'center' }}>
                  System monitoring active
                  {threatLevel === 'HIGH' ? (
                    <span style={{ display: 'block', fontWeight: 'bold', color: '#f44336' }}>⚠️ CRITICAL THREAT DETECTED</span>
                  ) : (
                    <span style={{ display: 'block' }}>All sensors operational</span>
                  )}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Auto Emergency Dialog */}
      <Dialog
        open={emergencyDialog}
        onClose={() => setEmergencyDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullScreen={isMobile}
      >
        <DialogTitle id="alert-dialog-title" style={{ backgroundColor: '#f44336', color: 'white' }}>
          <WarningIcon style={{ verticalAlign: 'middle', marginRight: '10px' }} />
          {"CRITICAL THREAT DETECTED"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" style={{ marginTop: '20px' }}>
            A critical threat has been detected by the system. 
            Emergency response will be automatically triggered in 3 seconds.
          </DialogContentText>
          <DialogContentText style={{ marginTop: '10px', fontWeight: 'bold' }}>
            Initiating emergency protocols...
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEmergencyDialog(false)} color="primary">
            Cancel Auto-Emergency
          </Button>
          <Button onClick={handleAutoEmergency} color="error" autoFocus>
            Trigger Now
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Dashboard;