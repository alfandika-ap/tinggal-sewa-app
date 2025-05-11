import { Image } from "@/components/ui/image";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInput,
} from "@/components/ui/sidebar";
import { FolderSearch, Home } from "lucide-react";
import * as React from "react";
import FavoriteButton from "@/components/ui/favorite-button";
import { properties } from "@/data/properties";

export default function ItemResults() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [isSearching, setIsSearching] = React.useState(false);
  
  const filteredProperties = React.useMemo(() => {
    if (!searchTerm.trim()) return properties;
    
    return properties.filter(property => 
      property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.facilities.some(facility => facility.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [searchTerm]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setIsSearching(true);
  };

  // Empty state component
  const EmptyState = ({ type }: { type: 'initial' | 'search' }) => (
    <div className="flex flex-col items-center justify-center h-full py-12 px-4 text-center">
      {type === 'initial' ? (
        <>
          <Home className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Belum Ada Properti</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Mulai percakapan dengan asisten untuk mendapatkan rekomendasi properti
          </p>
        </>
      ) : (
        <>
          <FolderSearch className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Properti Tidak Ditemukan</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Tidak ada properti yang sesuai dengan "{searchTerm}"
          </p>
        </>
      )}
    </div>
  );

  return (
    <Sidebar collapsible="none" className="hidden w-3xl md:flex border-l h-[100vh]">
      {properties.length > 0 && (
        <SidebarHeader className="gap-3.5 border-b p-4">
        <div className="flex w-full items-center justify-between">
          <div className="text-base font-medium text-foreground">
            {isSearching 
              ? `Menemukan ${filteredProperties.length} hasil pencarian`
              : properties.length > 0 
                ? `Menemukan ${properties.length} hasil pencarian` 
                : "Hasil Pencarian"
            }
          </div>
        </div>
        <SidebarInput 
          placeholder="Cari properti..." 
          value={searchTerm}
            onChange={handleSearch}
          />
        </SidebarHeader>
      )}
      
      <SidebarContent className="overflow-y-auto">
        {properties.length === 0 ? (
          <EmptyState type="initial" />
        ) : filteredProperties.length === 0 ? (
          <EmptyState type="search" />
        ) : (
          <SidebarGroup className="px-0">
            <SidebarGroupContent>
              {filteredProperties.map((property) => (
                <a
                  href="#"
                  key={property.id}
                  className="flex flex-col gap-3 border-b p-4 text-sm leading-tight last:border-b-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground relative"
                >
                  <div className="absolute top-6 right-6 z-10">
                    <FavoriteButton propertyId={property.id} />
                  </div>
                  <div className="w-full h-40">
                    <Image
                      src={property.image}
                      alt={property.name}
                      aspectRatio="video"
                      fallback="Tidak ada foto"
                      containerClassName="w-full h-full"
                    />
                  </div>
                  
                  <div className="flex flex-col">
                    <div className="font-medium text-base line-clamp-1">{property.name}</div>
                    <div className="text-xs text-muted-foreground">{property.location}</div>
                    <div className="font-semibold text-sm mt-1 text-primary">{property.price}</div>
                    <div className="text-xs mt-1">{property.distance}</div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    {property.facilities.map((facility, index) => (
                      <span
                        key={index}
                        className="bg-muted text-xs px-1.5 py-0.5 rounded"
                      >
                        {facility}
                      </span>
                    ))}
                  </div>
                  
                  <p className="text-xs line-clamp-2 text-muted-foreground">
                    {property.description}
                  </p>
                </a>
              ))}
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
