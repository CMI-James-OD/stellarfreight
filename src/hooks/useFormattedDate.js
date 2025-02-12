import { useCallback } from "react";

const useFormattedDate = () => {
  // Format full timestamp (08 Mar 2024 06:08:37 pm)
  const formatTimestamp = useCallback((timestamp) => {
    if (!timestamp || !timestamp.seconds) return "Invalid Date";

    const date = new Date(timestamp.seconds * 1000);

    const options = { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit', 
      hour12: true 
    };

    return date.toLocaleString('en-GB', options).replace(',', '');
  }, []);

  // Format date only (08 Mar 2024)
  const formatDate = useCallback((timestamp) => {
    if (!timestamp || !timestamp.seconds) return "Invalid Date";

    const date = new Date(timestamp.seconds * 1000);

    const options = { day: '2-digit', month: 'short', year: 'numeric' };

    return date.toLocaleDateString('en-GB', options);
  }, []);

  return { formatTimestamp, formatDate };
};

export default useFormattedDate;
