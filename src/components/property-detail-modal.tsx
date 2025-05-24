import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Image } from '@/components/ui/image';
import type { PropertyItem } from '@/types/property';
import { HomeIcon, MapPinIcon, PhoneIcon, ScrollTextIcon, TagIcon } from 'lucide-react';
import React, { useState } from 'react';
import { Button } from './ui/button';
import FavoriteButton from './ui/favorite-button';

interface PropertyDetailModalProps {
  property: PropertyItem;
  trigger?: React.ReactNode;
}

export function PropertyDetailModal({ property, trigger }: PropertyDetailModalProps) {
  const [open, setOpen] = useState(false);
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || <div className="sr-only">Open property details</div>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto p-0">
        {/* Property Image */}
        <div className="relative w-full h-64 sm:h-80">
          <Image
            src={property.image_url}
            alt={property.title}
            aspectRatio="wide"
            containerClassName="w-full h-full rounded-t-lg"
            className="rounded-t-lg"
          />
          <div className="absolute top-4 right-4 z-10">
            <FavoriteButton propertyId={property.url} property={property} />
          </div>
        </div>

        <div className="p-6">
          <DialogHeader className="mb-4">
            <DialogTitle className="text-2xl font-bold">{property.title}</DialogTitle>
            <div className="flex items-center gap-1 mt-2 text-muted-foreground">
              <MapPinIcon className="w-4 h-4" />
              <span className="text-sm">{property.address}, {property.city}, {property.province}</span>
            </div>
          </DialogHeader>

          {/* Price and CTA */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 border-b pb-6">
            <div>
              <p className="text-sm text-muted-foreground">Harga Sewa</p>
              <p className="text-2xl font-bold text-primary">{formatPrice(property.price)}</p>
            </div>
            {property.contact && (
              <Button className="flex items-center gap-2">
                <PhoneIcon className="w-4 h-4" />
                <span>Hubungi Pemilik</span>
              </Button>
            )}
          </div>

          {/* Property Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                <HomeIcon className="w-5 h-5" />
                <span>Fasilitas</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {property.facilities.split(',').map((facility, index) => (
                  <span key={index} className="bg-muted px-2 py-1 rounded-md text-xs">
                    {facility.trim()}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                <TagIcon className="w-5 h-5" />
                <span>Informasi</span>
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex gap-2">
                  <span className="font-medium">Gender:</span>
                  <span>{property.gender}</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-medium">Sumber:</span>
                  <span>{property.source}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
              <ScrollTextIcon className="w-5 h-5" />
              <span>Deskripsi</span>
            </h3>
            <p className="text-sm text-muted-foreground whitespace-pre-line">
              {property.description}
            </p>
          </div>

          {/* Rules if available */}
          {property.rules && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Peraturan</h3>
              <p className="text-sm text-muted-foreground whitespace-pre-line">
                {property.rules}
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default PropertyDetailModal; 