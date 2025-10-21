import { useState, useEffect } from 'react';
import api from '../services/api';

export const useSafetyData = () => {
  const [safetyData, setSafetyData] = useState({
    peopleCount: 3,
    currentEmotion: 'Neutral',
    motionStatus: 'Normal',
    poseRisk: 'Safe',
    threatLevel: 'LOW',
    lastAlert: 'No Alerts'
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await api.getSafetyData();
        setSafetyData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    // Fetch initial data
    fetchData();

    // Set up polling for real-time updates (every 2 seconds for demo purposes)
    const interval = setInterval(fetchData, 2000);

    return () => clearInterval(interval);
  }, []);

  return { safetyData, loading, error };
};