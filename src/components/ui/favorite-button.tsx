import * as React from 'react';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { PropertyItem } from '@/types/property';
import { useAddBookmark, useDeleteBookmark } from '@/hooks/api-hooks/use-bookmark';
import type { BookmarkRequest } from '@/types/bookmark';
import { toast } from 'sonner';

interface FavoriteButtonProps {
  propertyId: string;
  property?: PropertyItem;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function FavoriteButton({
  propertyId,
  property,
  className,
  size = 'md',
}: FavoriteButtonProps) {
  // API hooks for adding and deleting bookmarks
  const addBookmark = useAddBookmark();
  const deleteBookmark = useDeleteBookmark();

  // Get favorites from localStorage
  const [isFavorite, setIsFavorite] = React.useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      return favorites.includes(propertyId);
    }
    return false;
  });

  // Track bookmark ID for deletion
  const [bookmarkId, setBookmarkId] = React.useState<string | null>(null);

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const toggleFavorite = async () => {
    if (!property) {
      console.error('Property data is required for API bookmark');
      return;
    }

    // Log the property data
    console.log('Property data:', property);

    // Update local state first for immediate UI feedback
    setIsFavorite(prev => {
      const newState = !prev;
      if (typeof window !== 'undefined') {
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        if (newState) {
          localStorage.setItem('favorites', JSON.stringify([...favorites, propertyId]));
        } else {
          localStorage.setItem(
            'favorites',
            JSON.stringify(favorites.filter((id: string) => id !== propertyId))
          );
        }
      }
      return newState;
    });

    try {
      if (!isFavorite) {
        // Add to bookmarks via API
        const bookmarkData: BookmarkRequest = {
          title: property.title,
          address: property.address,
          city: property.city,
          province: property.province,
          description: property.description,
          price:
            typeof property.price === 'number'
              ? property.price
              : parseFloat(String(property.price || '0')),
          facilities:
            typeof property.facilities === 'string'
              ? property.facilities.split(',').map(item => item.trim())
              : Array.isArray(property.facilities)
                ? property.facilities
                : [],
          rules:
            typeof property.rules === 'string'
              ? property.rules.split(',').map(item => item.trim())
              : Array.isArray(property.rules)
                ? property.rules
                : [],
          contact: property.contact || '',
          url: property.url,
          image_url: property.image_url || '',
          gender: property.gender,
        };

        const response = await addBookmark.mutateAsync(bookmarkData);
        setBookmarkId(response.id);
        toast.success('Added to bookmarks');
      } else if (bookmarkId) {
        // Remove from bookmarks via API
        await deleteBookmark.mutateAsync(bookmarkId);
        setBookmarkId(null);
        toast.success('Removed from bookmarks');
      }
    } catch (error) {
      console.error('Error toggling bookmark:', error);
      toast.error('Failed to update bookmark');

      // Revert local state if API call fails
      setIsFavorite(!isFavorite);
      if (typeof window !== 'undefined') {
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        if (!isFavorite) {
          // Remove from favorites if adding failed
          localStorage.setItem(
            'favorites',
            JSON.stringify(favorites.filter((id: string) => id !== propertyId))
          );
        } else {
          // Add back to favorites if removal failed
          localStorage.setItem('favorites', JSON.stringify([...favorites, propertyId]));
        }
      }
    }
  };

  return (
    <button
      onClick={e => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite();
      }}
      className={cn(
        'transition-colors rounded-full p-2',
        'hover:bg-primary-foreground focus:outline-none focus:ring-2 focus:ring-primary',
        className
      )}
      aria-label={isFavorite ? 'Hapus dari favorit' : 'Tambahkan ke favorit'}
    >
      <Heart
        className={cn(
          sizeClasses[size],
          isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'
        )}
      />
    </button>
  );
}
