import { Button } from '@/components/ui/button';
import FavoriteButton from '@/components/ui/favorite-button';
import { Image } from '@/components/ui/image';
import { useBookmarks, useDeleteBookmark } from '@/hooks/api-hooks/use-bookmark';
import { Heart, Home, Loader2, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

export default function FavoritesPage() {
  // Use the bookmarks API hook to fetch bookmarks
  const { data: bookmarks, isLoading, isError } = useBookmarks();
  const deleteBookmarkMutation = useDeleteBookmark();

  // Handle bookmark deletion
  const handleDeleteBookmark = async (id: string) => {
    try {
      await deleteBookmarkMutation.mutateAsync(id);
      toast.success('Bookmark berhasil dihapus');
    } catch (error) {
      console.error('Error deleting bookmark:', error);
      toast.error('Gagal menghapus bookmark');
    }
  };

  return (
    <div className="">
      <div className="px-4 py-2 border-b">
        <h1 className="text-md font-bold tracking-tight">Properti Favorits</h1>
        <p className="text-muted-foreground text-sm">Kelola properti favorit Anda.</p>
      </div>
      <div className="px-4 py-4">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground">Memuat daftar favorit...</p>
          </div>
        ) : isError ? (
          <div className="flex flex-col items-center justify-center bg-red-50 py-16 px-4 rounded-lg text-center">
            <p className="text-red-500 font-medium">Gagal memuat daftar favorit</p>
            <p className="text-muted-foreground max-w-md mt-2">
              Terjadi kesalahan saat memuat daftar favorit Anda. Silakan coba lagi nanti.
            </p>
          </div>
        ) : !bookmarks || bookmarks.length === 0 ? (
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookmarks.map(bookmark => (
              <div
                key={bookmark.id}
                className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="relative">
                  <Image
                    src={bookmark.kost.image_url}
                    alt={bookmark.kost.title}
                    aspectRatio="16:9"
                    fallback="Tidak ada foto"
                    containerClassName="w-full h-48"
                  />
                  <div className="absolute top-3 right-3">
                    <FavoriteButton
                      propertyId={bookmark.kost.url}
                      property={{
                        title: bookmark.kost.title,
                        address: bookmark.kost.address,
                        city: bookmark.kost.city,
                        province: bookmark.kost.province,
                        description: bookmark.kost.description,
                        price: bookmark.kost.price,
                        facilities: bookmark.kost.facilities.join(', '),
                        rules: bookmark.kost.rules.join(', '),
                        contact: bookmark.kost.contact,
                        url: bookmark.kost.url,
                        image_url: bookmark.kost.image_url,
                        gender: bookmark.kost.gender,
                        source: 'bookmark',
                      }}
                    />
                  </div>
                </div>

                <div className="p-4">
                  <h2 className="font-medium text-lg mb-1">{bookmark.kost.title}</h2>
                  <div className="text-sm text-muted-foreground mb-2">{bookmark.kost.address}</div>
                  <div className="font-semibold text-primary mb-2">
                    {new Intl.NumberFormat('id-ID', {
                      style: 'currency',
                      currency: 'IDR',
                      maximumFractionDigits: 0,
                    }).format(bookmark.kost.price)}
                  </div>
                  <div className="text-sm mb-3">
                    {bookmark.kost.city}, {bookmark.kost.province}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {bookmark.kost.facilities.map((facility: string, index: number) => (
                      <span key={index} className="bg-muted text-xs px-2 py-1 rounded">
                        {facility}
                      </span>
                    ))}
                  </div>

                  <p className="text-sm text-muted-foreground mb-4 line-clamp-4">
                    {bookmark.kost.description}
                  </p>

                  <div className="flex justify-between">
                    <Link
                      to={`/bookmark/${bookmark.id}`}
                      className="text-sm text-primary hover:underline"
                    >
                      Lihat Detail
                    </Link>
                    <button
                      className="flex items-center text-sm text-red-500 hover:text-red-600"
                      onClick={() => handleDeleteBookmark(bookmark.id)}
                      disabled={deleteBookmarkMutation.isPending}
                    >
                      {deleteBookmarkMutation.isPending ? (
                        <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4 mr-1" />
                      )}
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
