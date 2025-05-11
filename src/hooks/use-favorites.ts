import { useState, useEffect, useCallback } from 'react';

export function useFavorites() {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      try {
        setFavoriteIds(JSON.parse(storedFavorites));
      } catch (error) {
        console.error('Error parsing favorites from localStorage', error);
        localStorage.setItem('favorites', JSON.stringify([]));
      }
    }
  }, []);

  // Add property to favorites
  const addFavorite = useCallback((propertyId: string) => {
    setFavoriteIds(prev => {
      if (prev.includes(propertyId)) return prev;
      const newFavorites = [...prev, propertyId];
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  }, []);

  // Remove property from favorites
  const removeFavorite = useCallback((propertyId: string) => {
    setFavoriteIds(prev => {
      const newFavorites = prev.filter(id => id !== propertyId);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  }, []);

  // Toggle favorite status
  const toggleFavorite = useCallback((propertyId: string) => {
    setFavoriteIds(prev => {
      const newFavorites = prev.includes(propertyId)
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId];
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  }, []);

  // Check if a property is in favorites
  const isFavorite = useCallback((propertyId: string) => {
    return favoriteIds.includes(propertyId);
  }, [favoriteIds]);

  return {
    favoriteIds,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite
  };
} 