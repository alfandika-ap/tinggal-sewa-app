import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

export default function Home() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-background">
      <div className="text-center space-y-4 max-w-3xl px-4">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          TinggalSewa
        </h1>
        <p className="text-xl text-muted-foreground">
          Temukan tempat tinggal ideal Anda dengan mudah dan cepat. 
          TinggalSewa menawarkan berbagai pilihan properti berkualitas untuk 
          kebutuhan sewa jangka pendek maupun panjang.
        </p>
        <div className="flex gap-4 justify-center mt-8">
          <Button asChild size="lg">
            <Link to="/login">Login</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/register">Daftar</Link>
          </Button>
          <Button asChild variant="ghost" size="lg">
            <Link to="/favorites" className="flex items-center gap-2">
              <Heart className="h-5 w-5" /> Favorit
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
