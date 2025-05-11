import { Button } from "@/components/ui/button";
import { TinggalSewaMascot } from "@/components/tinggal-sewa-mascot";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Trash2 } from "lucide-react";

export default function ChatsHeader() {
  const handleClearConversation = () => {
    console.log("Clearing conversation");
  };

  return (
    <div className="border-b p-3 px-4 flex items-center justify-between bg-gradient-to-r from-primary/5 to-transparent">
      <div className="flex items-center gap-3">
        <TinggalSewaMascot size="md" />
        <div>
          <h3 className="font-bold text-primary text-lg">TinggalSewa</h3>
          <p className="text-xs text-muted-foreground">Asisten pintar Tinggal Sewa yang siap membantu</p>
        </div>
      </div>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleClearConversation}
            className="text-xs gap-1 border-primary/20 hover:bg-primary/10 hover:text-primary"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Reset Percakapan
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Mulai percakapan baru dengan TinggalSewa</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
