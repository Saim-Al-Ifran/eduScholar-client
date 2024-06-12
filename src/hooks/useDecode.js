import { useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";

 
const useJwtDecode = (token) => {
  const [decodedToken, setDecodedToken] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setDecodedToken(decoded);
      } catch (err) {
        setError('Invalid token');
      }
    }
  }, [token]);

  return { decodedToken, error };
};

export default useJwtDecode;
