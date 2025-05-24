import { Button } from '@/components/ui/button';
import FavoriteButton from '@/components/ui/favorite-button';
import { Image } from '@/components/ui/image';
import { useBookmark, useDeleteBookmark } from '@/hooks/api-hooks/use-bookmark';
import { capitalizeWords } from '@/lib/utils';
import {
  Heart,
  Home,
  Loader2,
  Trash2,
  ArrowLeft,
  MapPin,
  Phone,
  Tag,
  Info,
  Calendar,
  User,
} from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

export default function BookmarkDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Use the bookmark API hook to fetch bookmark details
  const { data: bookmark, isLoading, isError } = useBookmark(id || '');
  const deleteBookmarkMutation = useDeleteBookmark();

  // Handle bookmark deletion
  const handleDeleteBookmark = async () => {
    if (!bookmark) return;

    try {
      await deleteBookmarkMutation.mutateAsync(bookmark.id);
      toast.success('Bookmark berhasil dihapus');
      navigate('/favorites');
    } catch (error) {
      console.error('Error deleting bookmark:', error);
      toast.error('Gagal menghapus bookmark');
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">Memuat detail properti...</p>
      </div>
    );
  }

  if (isError || !bookmark) {
    return (
      <div className="flex flex-col items-center justify-center bg-red-50 py-16 px-4 rounded-lg text-center">
        <p className="text-red-500 font-medium">Gagal memuat detail properti</p>
        <p className="text-muted-foreground max-w-md mt-2">
          Terjadi kesalahan saat memuat detail properti. Silakan coba lagi nanti.
        </p>
        <Button asChild className="mt-4">
          <Link to="/favorites" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Favorit
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="mb-6">
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link to="/favorites" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Favorit
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">{bookmark.kost.title}</h1>
        <div className="flex items-center text-muted-foreground mt-1">
          <MapPin className="h-4 w-4 mr-1" />
          <span>
            {bookmark.kost.address}, {bookmark.kost.city}, {bookmark.kost.province}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="relative rounded-lg overflow-hidden mb-6">
            <Image
              src={bookmark.kost.image_url}
              alt={bookmark.kost.title}
              aspectRatio="16:9"
              fallback="Tidak ada foto"
              containerClassName="w-full h-[300px] md:h-[400px]"
            />
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Deskripsi</h2>
            <p className="text-muted-foreground whitespace-pre-line">
              {capitalizeWords(bookmark.kost.description)}
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Fasilitas</h2>
            <div className="flex flex-wrap gap-2">
              {bookmark.kost.facilities.map((facility, index) => (
                <span
                  key={index}
                  className="bg-muted text-sm px-3 py-1.5 rounded-full flex items-center"
                >
                  <Tag className="h-4 w-4 mr-1.5" />
                  {capitalizeWords(facility)}
                </span>
              ))}
            </div>
          </div>

          {bookmark.kost.rules && bookmark.kost.rules.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Peraturan</h2>
              <div className="flex flex-wrap gap-2">
                {bookmark.kost.rules.map((rule, index) => (
                  <span
                    key={index}
                    className="bg-muted text-sm px-3 py-1.5 rounded-full flex items-center"
                  >
                    <Info className="h-4 w-4 mr-1.5" />
                    {capitalizeWords(rule)}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6 sticky top-4">
            <div className="font-bold text-2xl text-primary mb-2">
              {new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                maximumFractionDigits: 0,
              }).format(bookmark.kost.price)}
            </div>
            <div className="text-sm text-muted-foreground mb-6">per bulan</div>

            <div className="space-y-4 mb-6">
              <div className="flex items-start">
                <User className="h-5 w-5 mr-3 text-muted-foreground mt-0.5" />
                <div>
                  <div className="font-medium">Tipe Kamar</div>
                  <div className="text-sm text-muted-foreground">
                    {bookmark.kost.gender === 'male'
                      ? 'Putra'
                      : bookmark.kost.gender === 'female'
                        ? 'Putri'
                        : 'Campuran'}
                  </div>
                </div>
              </div>

              <div className="flex items-start">
                <Phone className="h-5 w-5 mr-3 text-muted-foreground mt-0.5" />
                <div>
                  <div className="font-medium">Kontak</div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    {bookmark.kost.contact}
                    {bookmark.kost.contact &&
                      (() => {
                        // Format the phone number for wa.me (remove spaces, dashes, parentheses, and ensure country code)
                        let raw = bookmark.kost.contact.replace(/[^\d]/g, '');
                        if (raw.startsWith('0')) {
                          raw = '62' + raw.slice(1);
                        }
                        return (
                          <a
                            href={`https://wa.me/${raw}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition text-xs ml-2"
                            aria-label="Chat via WhatsApp"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              className="h-4 w-4 mr-1"
                            >
                              <path
                                fill="currentColor"
                                d="M12 2C6.477 2 2 6.262 2 11.19c0 1.85.51 3.63 1.48 5.18L2 22l5.78-1.51A10.23 10.23 0 0 0 12 20.38c5.523 0 10-4.262 10-9.19C22 6.262 17.523 2 12 2Zm0 16.38c-1.52 0-3.02-.41-4.3-1.18l-.31-.18-3.43.9.92-3.34-.2-.32A7.09 7.09 0 0 1 4 11.19c0-4.03 3.589-7.3 8-7.3s8 3.27 8 7.3-3.589 7.3-8 7.3Zm4.36-5.14c-.24-.12-1.43-.7-1.65-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.01-.37-1.93-1.18-.71-.63-1.19-1.41-1.33-1.65-.14-.24-.02-.36.1-.48.11-.12.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.31-.74-1.8-.2-.48-.4-.42-.54-.43-.14-.01-.3-.01-.46-.01-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2 0 1.18.86 2.32 1 2.48.14.16 1.7 2.59 4.12 3.53.58.2 1.03.32 1.38.41.58.15 1.1.13 1.52.08.46-.07 1.43-.58 1.64-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28Z"
                              />
                            </svg>
                            WhatsApp
                          </a>
                        );
                      })()}
                  </div>
                </div>
              </div>

              <div className="flex items-start">
                <Calendar className="h-5 w-5 mr-3 text-muted-foreground mt-0.5" />
                <div>
                  <div className="font-medium">Ditambahkan pada</div>
                  <div className="text-sm text-muted-foreground">
                    {new Date(bookmark.created_at).toLocaleDateString('id-ID', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Button className="w-full" asChild>
                <a href={bookmark.kost.url} target="_blank" rel="noopener noreferrer">
                  Lihat Sumber Asli
                </a>
              </Button>

              <Button
                variant="outline"
                className="w-full text-red-500 hover:text-red-600 hover:bg-red-50"
                onClick={handleDeleteBookmark}
                disabled={deleteBookmarkMutation.isPending}
              >
                {deleteBookmarkMutation.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Menghapus...
                  </>
                ) : (
                  <>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Hapus dari Favorit
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
