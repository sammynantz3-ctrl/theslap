import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import type { Video } from "@/hooks/use-backend";
import { Eye, HandMetal, MessageCircle, Play, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface VideoDetailProps {
  video: Video | null;
  open: boolean;
  onClose: () => void;
}

export function VideoDetail({ video, open, onClose }: VideoDetailProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(false);

  useEffect(() => {
    if (!open) {
      setIsPlaying(false);
      setShowControls(false);
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }
  }, [open]);

  function handlePlay() {
    setShowControls(true);
    setIsPlaying(true);
    if (videoRef.current) videoRef.current.play();
  }

  if (!video) return null;

  const isSampleVideo = !video.videoUrl || video.videoUrl.includes("/assets/");

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent
        className="max-w-3xl p-0 overflow-hidden border-2 border-border"
        data-ocid="video.dialog"
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-10 w-8 h-8 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-black transition-smooth"
          data-ocid="video.close_button"
          aria-label="Close video"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Video player area */}
        <div className="relative aspect-video bg-black w-full">
          {isSampleVideo ? (
            /* Sample video: show poster + play-disabled overlay */
            <div className="w-full h-full flex flex-col items-center justify-center gap-3">
              <img
                src={video.thumbnailUrl}
                alt={video.title}
                className="absolute inset-0 w-full h-full object-cover opacity-30"
              />
              <div className="relative z-10 flex flex-col items-center gap-3">
                <div className="w-20 h-20 rounded-full bg-primary/20 border-4 border-primary flex items-center justify-center">
                  <Play className="w-10 h-10 text-primary fill-primary ml-1" />
                </div>
                <p className="text-white/80 text-sm font-body">
                  Sample video — upload a real clip to watch
                </p>
              </div>
            </div>
          ) : (
            <>
              {!showControls && (
                <button
                  type="button"
                  onClick={handlePlay}
                  className="absolute inset-0 w-full h-full flex items-center justify-center group z-10 cursor-pointer"
                  aria-label="Play video"
                  data-ocid="video.play_button"
                >
                  <img
                    src={video.thumbnailUrl}
                    alt={video.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="relative z-10 w-20 h-20 rounded-full bg-primary/90 border-4 border-white flex items-center justify-center shadow-elevated group-hover:scale-110 transition-smooth">
                    <Play className="w-10 h-10 text-white fill-white ml-1" />
                  </div>
                </button>
              )}
              {/* biome-ignore lint/a11y/useMediaCaption: video player */}
              <video
                ref={videoRef}
                src={video.videoUrl}
                controls={showControls}
                className="w-full h-full object-contain"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />
            </>
          )}
        </div>

        {/* Info panel */}
        <div className="p-5 bg-card">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div className="min-w-0">
              <h2
                className="font-display font-black text-foreground text-xl uppercase tracking-wide leading-tight"
                style={{ textShadow: "1px 1px 0 rgba(0,0,0,0.08)" }}
              >
                {video.title}
              </h2>
              {video.description && (
                <p className="text-muted-foreground text-sm mt-1 font-body">
                  {video.description}
                </p>
              )}
            </div>
            <Badge
              variant="outline"
              className="shrink-0 border-primary text-primary font-bold uppercase"
            >
              {isPlaying ? "Playing" : "Clip"}
            </Badge>
          </div>

          <div className="flex items-center gap-1 mb-3">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white"
              style={{ background: "oklch(0.6 0.28 15)" }}
            >
              {video.author[0]?.toUpperCase()}
            </div>
            <span className="text-sm font-bold text-foreground ml-1">
              {video.author}
            </span>
          </div>

          <div className="flex items-center gap-4 pt-3 border-t border-border">
            <span className="flex items-center gap-1.5 text-sm font-bold text-primary">
              <HandMetal className="w-4 h-4" />
              {video.slaps.toLocaleString()} slaps
            </span>
            <span className="flex items-center gap-1.5 text-sm font-bold text-accent">
              <MessageCircle className="w-4 h-4" />
              {video.comments} comments
            </span>
            <span className="flex items-center gap-1.5 text-sm text-muted-foreground ml-auto">
              <Eye className="w-4 h-4" />
              {video.views.toLocaleString()} views
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
