import type { Video } from "@/hooks/use-backend";
import { HandMetal, MessageCircle, Play } from "lucide-react";

interface VideoCardProps {
  video: Video;
  index: number;
  onClick?: () => void;
}

export function VideoCard({ video, index, onClick }: VideoCardProps) {
  return (
    <button
      type="button"
      data-ocid={`video.item.${index}`}
      onClick={onClick}
      aria-label={`Watch ${video.title}`}
      className="bg-card rounded-xl border-2 border-border shadow-subtle overflow-hidden hover:shadow-elevated transition-smooth group cursor-pointer w-full text-left"
    >
      <div className="relative aspect-video overflow-hidden bg-muted">
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-smooth">
          <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-elevated">
            <Play className="w-7 h-7 text-white fill-white ml-1" />
          </div>
        </div>
        <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs font-bold px-1.5 py-0.5 rounded">
          {video.duration}
        </span>
      </div>
      <div className="p-3">
        <h3 className="font-display font-black text-foreground uppercase text-sm leading-tight line-clamp-2">
          {video.title}
        </h3>
        <p className="text-muted-foreground text-xs mt-1">{video.author}</p>
        <div className="flex items-center gap-3 mt-2">
          <span className="flex items-center gap-1 text-xs font-bold text-primary">
            <HandMetal className="w-3.5 h-3.5" />
            {video.slaps.toLocaleString()}
          </span>
          <span className="flex items-center gap-1 text-xs font-bold text-accent">
            <MessageCircle className="w-3.5 h-3.5" />
            {video.comments}
          </span>
          <span className="text-xs text-muted-foreground ml-auto">
            {video.views.toLocaleString()} views
          </span>
        </div>
      </div>
    </button>
  );
}
