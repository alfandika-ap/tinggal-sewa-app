import * as React from "react";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface FavoriteButtonProps {
  propertyId: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function FavoriteButton({
  propertyId,
  className,
  size = "md",
}: FavoriteButtonProps) {
  // Get favorites from localStorage
  const [isFavorite, setIsFavorite] = React.useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
      return favorites.includes(propertyId);
    }
    return false;
  });

  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const toggleFavorite = () => {
    setIsFavorite((prev) => {
      const newState = !prev;
      if (typeof window !== "undefined") {
        const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
        if (newState) {
          localStorage.setItem(
            "favorites",
            JSON.stringify([...favorites, propertyId])
          );
        } else {
          localStorage.setItem(
            "favorites",
            JSON.stringify(favorites.filter((id: string) => id !== propertyId))
          );
        }
      }
      return newState;
    });
  };

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite();
      }}
      className={cn(
        "transition-colors rounded-full p-2",
        "hover:bg-primary-foreground focus:outline-none focus:ring-2 focus:ring-primary",
        className
      )}
      aria-label={isFavorite ? "Hapus dari favorit" : "Tambahkan ke favorit"}
    >
      <Heart
        className={cn(
          sizeClasses[size],
          isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"
        )}
      />
    </button>
  );
} 