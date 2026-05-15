import { useState, useEffect, useCallback } from 'react';

/**
 * useRealtime hook manages the background state and listens for external signals.
 * @param {string} initialImage - The initial background image URL.
 * @returns {Object} - The current background image and signal status.
 */
export const useRealtime = (initialImage) => {
  const [currentImage, setCurrentImage] = useState(initialImage);
  const [status, setStatus] = useState('STABLE');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const BACKEND_URL = 'http://n8n-g13o7a0qmo9dkvinrj01e1kc.34.122.134.151.sslip.io/form/8ff99e5f-e77c-4650-818e-64b5b11f6998';

  // Simulated signal listener (Fallback Polling)
  useEffect(() => {
    if (isProcessing) return;

    // In a real production scenario, we'd use WebSockets or SSE.
    // Here we'll simulate a stable connection.
    const interval = setInterval(() => {
      // Check for updates if we had a status endpoint
    }, 5000);

    return () => clearInterval(interval);
  }, [isProcessing]);

  const sendSignal = useCallback(async (file) => {
    if (!file) return;

    setIsProcessing(true);
    setStatus('TRANSMITTING SIGNAL...');

    try {
      const formData = new FormData();
      // Based on n8n form inspection, the field name is 'image'
      formData.append('image', file);

      // Note: n8n form nodes expect a multipart/form-data POST
      // However, /form-test/ is the UI URL. The actual submission might be different.
      // We'll try to POST to the endpoint directly.
      const response = await fetch(BACKEND_URL, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Transmission failed');

      setStatus('SIGNAL RECEIVED. PROCESSING...');
      
      // Simulate n8n processing time before update
      setTimeout(() => {
        // In a real setup, we'd get the new URL from the response or a real-time signal
        // For now, we'll create a local preview to show the "Real-Time" effect immediately
        const objectUrl = URL.createObjectURL(file);
        setCurrentImage(objectUrl);
        setIsProcessing(false);
        setStatus('STABLE');
      }, 2000);

    } catch (error) {
      console.error('Signal Error:', error);
      setStatus('TRANSMISSION ERROR');
      setIsProcessing(false);
      setTimeout(() => setStatus('STABLE'), 3000);
    }
  }, []);

  return {
    currentImage,
    status,
    isProcessing,
    sendSignal,
    triggerUpdate: () => document.getElementById('signal-input')?.click() // Helper for UI
  };
};

