import { Card, CardContent } from "@/components/ui/card";
import { useSearchProperties } from "@/hooks/api-hooks/use-property";
import type { ChatContent, ChatFunctionItem } from "@/types/chat";
import type { FunctionSearchPropertiesData } from "@/types/function-type";
import { Loader2 } from "lucide-react";

export default function SearchPropertiesFunction({ chat }: { chat: ChatContent }) {
  const chatFunction = chat as unknown as ChatFunctionItem<FunctionSearchPropertiesData>;
  const properties = chatFunction.data;
  const { data, isLoading } = useSearchProperties({
    data: properties,
  });
  if (isLoading) {
    return (
      <Card className="w-full overflow-hidden bg-gradient-to-br from-blue-50 to-sky-100 dark:from-slate-800 dark:to-slate-900 border-0 shadow-md">
        <CardContent className="flex items-center justify-center p-4">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
          <span className="ml-2">Mencari properti...</span>
        </CardContent>
      </Card>
    );
  }

  if (!data?.results || data.results.length === 0) {
    return (
      <Card className="w-full overflow-hidden bg-gradient-to-br from-blue-50 to-sky-100 dark:from-slate-800 dark:to-slate-900 border-0 shadow-md">
        <CardContent className="flex flex-col items-center justify-center p-4">
          <p className="text-base font-medium mb-1">Tidak ada properti ditemukan</p>
          <p className="text-sm text-muted-foreground">
            Coba ubah kriteria pencarian Anda
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <p className="mb-3 text-sm">Menampilkan {data.results.length} properti untuk pencarian "{properties.query_texts[0]}"</p>
  );
}
