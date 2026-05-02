import type { Photo } from "@/hooks/use-backend";
import { HandMetal, MessageCircle } from "lucide-react";

interface PhotoCardProps {
  photo: Photo;
  index: number;
}

export function PhotoCard({ photo, index }: PhotoCardProps) {
  return (
    <div
      data-ocid={`photo.item.${index}`}
      className="bg-card rounded-xl border-2 border-border shadow-subtle overflow-hidden hover:shadow-elevated transition-smooth group cursor-pointer"
    >
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={photo.imageUrl}
          alt={photo.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-smooth" />
      </div>
      <div className="p-3">
        <h3 className="font-display font-black text-foreground text-sm leading-tight line-clamp-2">
          {photo.title}
        </h3>
        <p className="text-muted-foreground text-xs mt-0.5">{photo.author}</p>
        <div className="flex items-center gap-3 mt-2">
          <span className="flex items-center gap-1 text-xs font-bold text-primary">
            <HandMetal className="w-3.5 h-3.5" />
            {photo.slaps}
          </span>
          <span className="flex items-center gap-1 text-xs font-bold text-accent">
            <MessageCircle className="w-3.5 h-3.5" />
            {photo.comments}
          </span>
        </div>
      </div>
    </div>
  );
}
