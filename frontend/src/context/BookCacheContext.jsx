import React, { createContext, useState, useCallback } from 'react';

export const BookCacheContext = createContext();

export const BookCacheProvider = ({ children }) => {
  const [cache, setCache] = useState({});

  const getCache = useCallback((key) => {
    const entry = cache[key];
    if (!entry) return null;
    
    // Cache remains valid for 5 minutes (300,000 ms) before requiring a refresh
    const isExpired = Date.now() - entry.timestamp > 300000;
    if (isExpired) return null;
    
    return entry.data;
  }, [cache]);

  const setCacheValue = useCallback((key, data) => {
    setCache(prev => ({
      ...prev,
      [key]: {
        data,
        timestamp: Date.now()
      }
    }));
  }, []);

  const clearCache = useCallback(() => {
    setCache({});
  }, []);

  return (
    <BookCacheContext.Provider value={{ getCache, setCacheValue, clearCache }}>
      {children}
    </BookCacheContext.Provider>
  );
};
