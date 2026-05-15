import { useState, useEffect } from 'react';

/**
 * useRealtime hook manages the background state and listens for external signals.
 * @param {string} initialImage - The initial background image URL.
 * @returns {Object} - The current background image and signal status.
 */
export const useRealtime = (initialImage) => {
  const [currentImage, setCurrentImage] = useState(initialImage);
  const [status, setStatus] = useState('STABLE');
  const [isProcessing, setIsProcessing] = useState(false);

  // Simulated signal listener (Placeholder for Supabase/Pusher)
  useEffect(() => {
    // In a real scenario, this would be a subscription to a real-time database or websocket
    // For demonstration, we'll simulate an update after 10 seconds
    const timer = setTimeout(() => {
      // simulateProcessing();
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const simulateProcessing = () => {
    setIsProcessing(true);
    setStatus('PROCESSING SIGNAL...');
    
    // Simulate n8n processing time
    setTimeout(() => {
      const nextImage = 'https://images.unsplash.com/photo-1603584173870-7f3ef99538aa?auto=format&fit=crop&q=80&w=2070';
      setCurrentImage(nextImage);
      setIsProcessing(false);
      setStatus('STABLE');
    }, 3000);
  };

  return {
    currentImage,
    status,
    isProcessing,
    triggerUpdate: simulateProcessing // For testing purposes
  };
};
