// Mock API service to simulate communication with backend
class ApiService {
  constructor() {
    this.simulationMode = 'normal'; // 'normal', 'escalating', 'critical'
    this.threatLevel = 'LOW';
    this.peopleCount = 3;
    this.criticalTriggered = false;
  }

  // Set simulation mode for demo purposes
  setSimulationMode(mode) {
    this.simulationMode = mode;
    if (mode === 'critical') {
      this.threatLevel = 'HIGH';
      this.peopleCount = 15;
    }
  }

  // Simulate fetching safety data with more realistic patterns
  async getSafetyData() {
    // In a real app, this would fetch from the Python backend
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate escalating threat levels for demo
        if (this.simulationMode === 'escalating') {
          // Progressively increase threat level
          const threatLevels = ['LOW', 'LOW', 'MEDIUM', 'MEDIUM', 'HIGH'];
          this.threatLevel = threatLevels[Math.min(threatLevels.length - 1, Math.floor(Date.now() / 5000) % threatLevels.length)];
          
          // Increase people count as threat escalates
          this.peopleCount = Math.min(20, 3 + Math.floor(Date.now() / 3000) % 15);
        } else if (this.simulationMode === 'critical') {
          this.threatLevel = 'HIGH';
          this.peopleCount = 15;
        }

        // Simulate different emotions based on threat level
        let emotions, motionStatuses, poseRisks;
        
        switch (this.threatLevel) {
          case 'HIGH':
            emotions = ['Fearful', 'Angry', 'Surprised', 'Disgust'];
            motionStatuses = ['Rapid', 'Erratic', 'High'];
            poseRisks = ['High Risk', 'Critical', 'Danger'];
            break;
          case 'MEDIUM':
            emotions = ['Concerned', 'Neutral', 'Sad', 'Surprised'];
            motionStatuses = ['Moderate', 'Increased', 'Active'];
            poseRisks = ['Low Risk', 'Moderate', 'Elevated'];
            break;
          default: // LOW
            emotions = ['Happy', 'Neutral', 'Calm', 'Sad'];
            motionStatuses = ['Normal', 'Low', 'Steady'];
            poseRisks = ['Safe', 'Low Risk', 'Stable'];
        }

        resolve({
          peopleCount: this.peopleCount,
          currentEmotion: emotions[Math.floor(Math.random() * emotions.length)],
          motionStatus: motionStatuses[Math.floor(Math.random() * motionStatuses.length)],
          poseRisk: poseRisks[Math.floor(Math.random() * poseRisks.length)],
          threatLevel: this.threatLevel,
          lastAlert: this.threatLevel === 'HIGH' ? `High threat detected at ${new Date().toLocaleTimeString()}` : 'No Alerts'
        });
      }, 500);
    });
  }

  // Simulate triggering emergency with auto-trigger for critical threats
  async triggerEmergency(autoTriggered = false) {
    // In a real app, this would communicate with the Python emergency system
    return new Promise((resolve) => {
      setTimeout(() => {
        const triggerType = autoTriggered ? 'AUTOMATIC' : 'MANUAL';
        const timestamp = new Date().toLocaleTimeString();
        
        resolve({
          success: true,
          message: `${triggerType} emergency response initiated`,
          contactsNotified: [
            { name: 'Emergency Contact 1', status: 'SMS sent', time: timestamp },
            { name: 'Emergency Contact 2', status: 'Call in progress', time: timestamp },
            { name: 'Emergency Services (112)', status: 'Connecting...', time: timestamp }
          ],
          evidenceCollected: [
            { type: 'Photo', name: `snapshot_${Date.now()}.jpg`, time: timestamp },
            { type: 'Audio', name: `audio_${Date.now()}.wav`, time: timestamp },
            { type: 'Location', name: `gps_${Date.now()}.json`, time: timestamp }
          ]
        });
      }, 1000);
    });
  }

  // Simulate fetching emergency contacts
  async getEmergencyContacts() {
    // In a real app, this would fetch from a database or config file
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: 1, name: 'Mother', phone: '+1 (555) 123-4567', relationship: 'Family' },
          { id: 2, name: 'Close Friend', phone: '+1 (555) 987-6543', relationship: 'Friend' },
          { id: 3, name: 'Work Colleague', phone: '+1 (555) 456-7890', relationship: 'Work' }
        ]);
      }, 300);
    });
  }

  // Simulate saving settings
  async saveSettings(settings) {
    // In a real app, this would save to a database or config file
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: 'Settings saved successfully'
        });
      }, 500);
    });
  }
}

export default new ApiService();