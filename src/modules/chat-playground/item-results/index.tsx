import PropertyItemCard from '@/components/property-item-card';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarInput,
} from '@/components/ui/sidebar';
import { useSearchProperties } from '@/hooks/api-hooks/use-property';
import { saveParsedJson } from '@/lib/utils';
import useChatSearchResultStore from '@/store/chat-search-result-store';
import type { ChatFunctionItem } from '@/types/chat';
import type { FunctionSearchPropertiesData } from '@/types/function-type';
import { FolderSearch, Home, Loader2 } from 'lucide-react';
import * as React from 'react';
import { useMemo } from 'react';

export default function ItemResults() {
  const chat = useChatSearchResultStore(state => state.chat);
  const dataResponse = useMemo(() => {
    if (!chat) return undefined;
    const content = saveParsedJson<ChatFunctionItem<FunctionSearchPropertiesData>>(chat.content, {
      type: 'function_result',
      name: 'search_properties',
      data: {
        query_texts: [],
        where: {}
      }
    });
    return content?.data.query_texts.length > 0 ? content.data : undefined;
  }, [chat]);
  const { data: propertiesResponse, isLoading } = useSearchProperties({
    data: dataResponse,
    enabled: !!dataResponse,
    keys: ["properties", "results", dataResponse]
  });
  const [searchTerm, setSearchTerm] = React.useState('');
  const [isSearching, setIsSearching] = React.useState(false);
  const [showItems, setShowItems] = React.useState(false);
  const properties = propertiesResponse?.results || [];

  React.useEffect(() => {
    if (!isLoading && properties.length > 0) {
      const timer = setTimeout(() => {
        setShowItems(true);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setShowItems(false);
    }
  }, [isLoading, properties.length]);

  const filteredProperties = React.useMemo(() => {
    if (!searchTerm.trim()) return properties;

    return properties.filter(
      property =>
        property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.facilities.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, properties]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setIsSearching(true);
  };

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

  const LoadingState = () => (
    <div className="flex flex-col items-center justify-center h-full py-12 px-4 text-center">
      <div className="relative">
        <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
        <div className="absolute inset-0 h-12 w-12 rounded-full border-t-2 border-primary opacity-20"></div>
      </div>
      <h3 className="text-lg font-semibold mb-2">Sedang Mencari Properti</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Harap tunggu sebentar, kami sedang mencari properti terbaik untuk Anda
      </p>
    </div>
  );

  return (
    <Sidebar collapsible="none" className="hidden w-full md:flex border-l h-[100vh]">
      {properties.length > 0 && (
        <SidebarHeader className="gap-3.5 border-b p-4">
          <div className="flex w-full items-center justify-between">
            <div className="text-base font-medium text-foreground">
              {isSearching
                ? `Menemukan ${filteredProperties.length} hasil pencarian`
                : properties.length > 0
                  ? `Menemukan ${properties.length} hasil pencarian`
                  : 'Hasil Pencarian'}
            </div>
          </div>
          <SidebarInput placeholder="Cari properti..." value={searchTerm} onChange={handleSearch} />
        </SidebarHeader>
      )}

      <SidebarContent className="overflow-y-auto">
        {isLoading ? (
          <LoadingState />
        ) : !dataResponse ? (
          <EmptyState type="initial" />
        ) : filteredProperties.length === 0 ? (
          <EmptyState type="search" />
        ) : (
          <SidebarGroup className="px-0">
            <SidebarGroupContent>
              <div className="@container">
                <div 
                  className={`grid grid-cols-1 @sm:grid-cols-2 @lg:grid-cols-3 transition-all duration-500 ${
                    showItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                >
                  {filteredProperties.map((property, i) => (
                    <div 
                      key={i} 
                      className="opacity-0"
                      style={{ 
                        animation: `fadeSlideIn 500ms ${i * 50}ms forwards` 
                      }}
                    >
                      <PropertyItemCard property={property} />
                    </div>
                  ))}
                </div>
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
      <style>{`
        @keyframes fadeSlideIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </Sidebar>
  );
}
