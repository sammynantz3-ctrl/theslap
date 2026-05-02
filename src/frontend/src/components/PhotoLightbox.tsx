import { Button } from "@/components/ui/button";
import type { Photo } from "@/hooks/use-backend";
import {
  ChevronLeft,
  ChevronRight,
  HandMetal,
  MessageCircle,
  X,
} from "lucide-react";
import { useEffect } from "react";

interface PhotoLightboxProps {
  photos: Photo[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function PhotoLightbox({
  photos,
  currentIndex,
  onClose,
  onNavigate,
}: PhotoLightboxProps) {
  const photo = photos[currentIndex];
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < photos.length - 1;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && hasPrev) onNavigate(currentIndex - 1);
      if (e.key === "ArrowRight" && hasNext) onNavigate(currentIndex + 1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [currentIndex, hasPrev, hasNext, onClose, onNavigate]);

  if (!photo) return null;

  return (
    <div
      data-ocid="photo.dialog"
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      {/* Backdrop */}
      <button
        type="button"
        className="absolute inset-0 bg-black/90 cursor-default border-0 p-0 m-0 w-full h-full"
        onClick={onClose}
        aria-label="Close lightbox backdrop"
      />

      {/* Close */}
      <Button
        type="button"
        data-ocid="photo.close_button"
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4 z-10 text-white hover:bg-white/20 rounded-full"
        onClick={onClose}
        aria-label="Close lightbox"
      >
        <X className="w-6 h-6" />
      </Button>

      {/* Prev */}
      {hasPrev && (
        <Button
          type="button"
          data-ocid="photo.pagination_prev"
          variant="ghost"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/20 rounded-full w-12 h-12"
          onClick={(e) => {
            e.stopPropagation();
            onNavigate(currentIndex - 1);
          }}
          aria-label="Previous photo"
        >
          <ChevronLeft className="w-8 h-8" />
        </Button>
      )}

      {/* Next */}
      {hasNext && (
        <Button
          type="button"
          data-ocid="photo.pagination_next"
          variant="ghost"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/20 rounded-full w-12 h-12"
          onClick={(e) => {
            e.stopPropagation();
            onNavigate(currentIndex + 1);
          }}
          aria-label="Next photo"
        >
          <ChevronRight className="w-8 h-8" />
        </Button>
      )}

      {/* Content */}
      <div className="relative z-10 flex flex-col lg:flex-row max-w-5xl w-full mx-4 max-h-[90vh] overflow-hidden rounded-2xl">
        {/* Image */}
        <div className="flex-1 bg-black flex items-center justify-center min-h-[300px] max-h-[70vh] lg:max-h-[90vh]">
          <img
            src={photo.imageUrl}
            alt={photo.title}
            className="max-w-full max-h-full object-contain"
          />
        </div>

        {/* Info panel */}
        <div className="w-full lg:w-72 bg-card border-l-4 border-primary flex flex-col flex-shrink-0">
          {/* Title bar */}
          <div
            className="p-4 border-b-4 border-primary"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.6 0.28 15) 0%, oklch(0.72 0.22 50) 100%)",
            }}
          >
            <h2
              className="font-display font-black text-white text-lg uppercase tracking-wide leading-tight"
              style={{ textShadow: "1px 1px 0 rgba(0,0,0,0.4)" }}
            >
              {photo.title}
            </h2>
          </div>

          <div className="p-4 flex flex-col gap-3 flex-1 overflow-y-auto">
            {/* Author */}
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white font-black text-sm flex-shrink-0"
                style={{ background: "oklch(0.6 0.28 15)" }}
              >
                {photo.author.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-body">
                  Posted by
                </p>
                <p className="font-display font-black text-foreground text-sm">
                  {photo.author}
                </p>
              </div>
            </div>

            {photo.caption && (
              <p className="text-sm text-foreground font-body leading-relaxed border-l-4 border-accent pl-3">
                {photo.caption}
              </p>
            )}

            {/* Stats */}
            <div className="flex gap-4 mt-auto pt-3 border-t-2 border-border">
              <div className="flex items-center gap-1.5">
                <HandMetal className="w-4 h-4 text-primary" />
                <span className="font-display font-black text-primary text-sm">
                  {photo.slaps}
                </span>
                <span className="text-xs text-muted-foreground font-body">
                  slaps
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <MessageCircle className="w-4 h-4 text-accent" />
                <span className="font-display font-black text-accent text-sm">
                  {photo.comments}
                </span>
                <span className="text-xs text-muted-foreground font-body">
                  comments
                </span>
              </div>
            </div>

            {/* Nav counter */}
            <p className="text-center text-xs text-muted-foreground font-body">
              {currentIndex + 1} of {photos.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
