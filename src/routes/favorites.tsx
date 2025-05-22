import { Button } from '@/components/ui/button';
import FavoriteButton from '@/components/ui/favorite-button';
import { Image } from '@/components/ui/image';
import { useFavorites } from '@/hooks/use-favorites';
import { Heart, Home, Trash2 } from 'lucide-react';
import * as React from 'react';
import { Link } from 'react-router-dom';

// Import the properties data
import { properties } from '@/data/properties';

export default function FavoritesPage() {
  const { favoriteIds, removeFavorite } = useFavorites();

  // Filter properties to only show favorites
  const favoriteProperties = React.useMemo(() => {
    return properties.filter(property => favoriteIds.includes(property.id));
  }, [favoriteIds]);

  return (
    <div className="">
      <div className="px-4 py-2 border-b">
        <h1 className="text-md font-bold tracking-tight">Properti Favorit</h1>
        <p className="text-muted-foreground text-sm">Kelola properti favorit Anda.</p>
      </div>
      <div className="px-4 py-4">
        {favoriteProperties.length === 0 ? (
          <div className="flex flex-col items-center justify-center bg-muted py-16 px-4 rounded-lg text-center">
            <Heart className="h-16 w-16 text-muted-foreground mb-4" />
            <h2 className="text-xl font-semibold mb-2">Belum Ada Favorit</h2>
            <p className="text-muted-foreground max-w-md">
              Anda belum menyimpan properti favorit. Jelajahi properti dan klik ikon hati untuk
              menambahkan ke favorit.
            </p>
            <Button asChild className="mt-4">
              <Link to="/" className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                Jelajahi Properti
              </Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {favoriteProperties.map(property => (
              <div
                key={property.id}
                className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="relative">
                  <Image
                    src={property.image}
                    alt={property.name}
                    aspectRatio="16:9"
                    fallback="Tidak ada foto"
                    containerClassName="w-full h-48"
                  />
                  <div className="absolute top-3 right-3">
                    <FavoriteButton propertyId={property.id} size="lg" />
                  </div>
                </div>

                <div className="p-4">
                  <h2 className="font-medium text-lg mb-1">{property.name}</h2>
                  <div className="text-sm text-muted-foreground mb-2">{property.location}</div>
                  <div className="font-semibold text-primary mb-2">{property.price}</div>
                  <div className="text-sm mb-3">{property.distance}</div>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {property.facilities.map((facility, index) => (
                      <span key={index} className="bg-muted text-xs px-2 py-1 rounded">
                        {facility}
                      </span>
                    ))}
                  </div>

                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {property.description}
                  </p>

                  <div className="flex justify-between">
                    <button
                      className="text-sm text-primary hover:underline"
                      onClick={() => {
                        /* Add view details action */
                      }}
                    >
                      Lihat Detail
                    </button>
                    <button
                      className="flex items-center text-sm text-red-500 hover:text-red-600"
                      onClick={() => removeFavorite(property.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      Hapus
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
