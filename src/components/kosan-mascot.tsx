import { cn } from "@/lib/utils";

interface TinggalSewaMascotProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function TinggalSewaMascot({ size = "md", className }: TinggalSewaMascotProps) {
  const sizeClasses = {
    sm: "w-8 h-8 text-base",
    md: "w-12 h-12 text-xl",
    lg: "w-16 h-16 text-2xl",
  };

  // Simple SVG face embedded as background for the mascot
  const mascotFace = `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTggMTBjLTEuMSAwLTIgLjktMiAyczAgMSAuNSAxYy43NSAwIC43NS0xIC43NS0xSDhjLS41NSAwLTEtLjQ1LTEtMXMuNDUtMSAxLTFoLjI1YzAtLjI1LjI1LS43NSAxLS43NSAxLjEgMCAyIC45IDIgMnMtLjkgMi0yIDJIOHYyaDJjMi4yIDAgNC0xLjggNC00cy0xLjgtNC00LTRIOGMtMi4yIDAtNCAxLjgtNCA0czEuOCA0IDQgNGg4YzIuMiAwIDQtMS44IDQtNHMtMS44LTQtNC00aC0yYy0xLjEgMC0yIC45LTIgMnMuOSAyIDIgMmguMjVjMCAuMjUuMjUuNzUgMS4yNS43NSAxLjEgMCAyLS45IDItMnMtLjktMi0yLTJoLS4yNWMwLS4yNS0uMjUtLjc1LS43NS0uNzVzLTEgLjc1LTEgMWguNzVjLjU1IDAgMSAuNDUgMSAxcy0uNDUgMS0xIDFoLTJ2MmgyYzEuMSAwIDItLjkgMi0ycy0uOS0yLTItMmgtLjI1YzAtLjI1LS4yNS0uNzUtLjc1LS43NXMtMSAuNzUtMSAxaDFjLjU1IDAgMSAuNDUgMSAxcy0uNDUgMS0xIDFoLTh2MmMtMS4xIDAtMi0uOS0yLTJzLjktMiAyLTJoMnYtMkg4eiIgZmlsbD0id2hpdGUiIGZpbGwtb3BhY2l0eT0iMC4zIi8+PC9zdmc+`;

  return (
    <div 
      className={cn(
        "bg-gradient-to-br from-primary to-primary/70 rounded-full flex items-center justify-center text-white font-bold shadow-md relative overflow-hidden",
        sizeClasses[size],
        className
      )}
    >
      <div className="absolute inset-0 bg-[url('/src/assets/mascot-pattern.svg')] opacity-10 bg-no-repeat bg-center bg-contain" />
      <span className="relative z-10">T</span>
      <div 
        className="absolute inset-0 bg-no-repeat bg-center bg-contain opacity-30"
        style={{ backgroundImage: `url('${mascotFace}')` }}
      />
      <div className="absolute bottom-0 w-full h-1/3 bg-black/10 rounded-b-full" />
    </div>
  );
} 