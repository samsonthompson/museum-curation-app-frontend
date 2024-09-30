'use client'

import React, { createContext, useContext, useState, useEffect } from 'react';

const CollectionContext = createContext();

export function CollectionProvider({ children }) {
  const [collection, setCollection] = useState([]);

  // Load collection from sessionStorage when the component mounts
  useEffect(() => {
    const savedCollection = sessionStorage.getItem('userCollection');
    if (savedCollection) {
      setCollection(JSON.parse(savedCollection));
    }
  }, []);

  // Save collection to sessionStorage whenever it changes
  useEffect(() => {
    sessionStorage.setItem('userCollection', JSON.stringify(collection));
  }, [collection]);

  const addToCollection = (item) => {
    setCollection((prev) => {
      const newCollection = [...prev, item];
      return newCollection;
    });
  };

  const removeFromCollection = (itemId) => {
    setCollection((prev) => {
      const newCollection = prev.filter((item) => item.id !== itemId);
      return newCollection;
    });
  };

  const isInCollection = (itemId) => {
    return collection.some((item) => item.id === itemId);
  };

  return (
    <CollectionContext.Provider value={{ collection, addToCollection, removeFromCollection, isInCollection }}>
      {children}
    </CollectionContext.Provider>
  );
}

export function useCollection() {
  const context = useContext(CollectionContext);
  if (!context) {
    throw new Error('useCollection must be used within a CollectionProvider');
  }
  return context;
}
