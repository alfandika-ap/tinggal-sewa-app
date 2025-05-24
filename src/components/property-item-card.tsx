import { Image } from '@/components/ui/image';
import type { PropertyItem } from '@/types/property';
import FavoriteButton from './ui/favorite-button';

function PropertyItemCard({ property }: { property: PropertyItem }) {
  return (
    <div className="flex flex-col gap-3 border-b p-4 text-sm leading-tight last:border-b-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground relative cursor-pointer">
      <div className="absolute top-6 right-6 z-10">
        <FavoriteButton propertyId={property.url} property={property} />
      </div>
      <div className="w-full h-40">
        <Image
          src={property.image_url}
          alt={property.title}
          aspectRatio="video"
          fallback="Tidak ada foto"
          containerClassName="w-full h-full"
        />
      </div>

      <div className="flex flex-col">
        <div className="font-medium text-base line-clamp-1">{property.title}</div>
        <div className="text-xs text-muted-foreground">{property.address}</div>
        <div className="font-semibold text-sm mt-1 text-primary">{property.price}</div>
      </div>

      <div className="flex flex-wrap gap-1">
        <p className="bg-muted text-xs px-1.5 py-0.5 rounded line-clamp-2">{property.facilities}</p>
      </div>

      <p className="text-xs line-clamp-2 text-muted-foreground">{property.description}</p>
    </div>
  );
}

export default PropertyItemCard;
