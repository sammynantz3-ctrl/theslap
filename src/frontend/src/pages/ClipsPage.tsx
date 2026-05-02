import { LoadingSpinner } from "@/components/LoadingSpinner";
import { VideoCard } from "@/components/VideoCard";
import { VideoDetail } from "@/components/VideoDetail";
import { VideoUploadForm } from "@/components/VideoUploadForm";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { type Video, useListVideos } from "@/hooks/use-backend";
import { Film, UploadCloud } from "lucide-react";
import { useState } from "react";

export default function ClipsPage() {
  const { data: videos, isLoading } = useListVideos();
  const { isLoggedIn, login } = useAuth();
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [showUpload, setShowUpload] = useState(false);

  const isEmpty = !isLoading && (!videos || videos.length === 0);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6" data-ocid="clips.page">
      {/* Section header */}
      <div
        className="rounded-2xl p-6 mb-6 flex items-center justify-between shadow-elevated"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.65 0.24 195) 0%, oklch(0.55 0.22 195) 100%)",
        }}
      >
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center">
            <Film className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1
              className="font-display font-black text-white text-3xl uppercase tracking-wider"
              style={{ textShadow: "2px 2px 0px rgba(0,0,0,0.3)" }}
            >
              CLIPS
            </h1>
            <p className="text-white/80 text-sm font-body">
              Watch the latest videos from Hollywood Arts
            </p>
          </div>
        </div>
        {isLoggedIn ? (
          <Button
            type="button"
            onClick={() => setShowUpload((v) => !v)}
            className="font-black uppercase shrink-0"
            style={{ background: "oklch(0.6 0.28 15)", color: "white" }}
            data-ocid="clips.upload_button"
          >
            <UploadCloud className="w-4 h-4 mr-1.5" />
            {showUpload ? "CANCEL" : "UPLOAD CLIP"}
          </Button>
        ) : (
          <Button
            type="button"
            variant="outline"
            onClick={login}
            className="font-black uppercase shrink-0 border-white/40 text-white hover:bg-white/20"
            data-ocid="clips.login_to_upload_button"
          >
            Login to Upload
          </Button>
        )}
      </div>

      {/* Upload form (inline, collapsible) */}
      {showUpload && isLoggedIn && (
        <div className="mb-6">
          <VideoUploadForm onClose={() => setShowUpload(false)} />
        </div>
      )}

      {/* Content */}
      {isLoading ? (
        <LoadingSpinner label="Loading clips..." />
      ) : isEmpty ? (
        <div
          className="text-center py-20 rounded-2xl border-2 border-dashed border-border bg-muted/30"
          data-ocid="clips.empty_state"
        >
          <Film className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
          <h3 className="font-display font-black text-foreground text-xl uppercase tracking-wide mb-2">
            NO CLIPS YET
          </h3>
          <p className="text-muted-foreground text-sm font-body mb-6">
            Be the first to post a clip from Hollywood Arts!
          </p>
          {isLoggedIn ? (
            <Button
              type="button"
              onClick={() => setShowUpload(true)}
              className="font-black uppercase"
              style={{ background: "oklch(0.6 0.28 15)", color: "white" }}
              data-ocid="clips.empty_upload_button"
            >
              <UploadCloud className="w-4 h-4 mr-1.5" />
              UPLOAD FIRST CLIP
            </Button>
          ) : (
            <Button
              type="button"
              variant="outline"
              onClick={login}
              data-ocid="clips.empty_login_button"
            >
              Login to Upload
            </Button>
          )}
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-black text-foreground uppercase tracking-wide">
              LATEST CLIPS
            </h2>
            <span className="text-sm text-muted-foreground">
              {videos?.length ?? 0} videos
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {videos?.map((video, i) => (
              <VideoCard
                key={video.id}
                video={video}
                index={i + 1}
                onClick={() => setSelectedVideo(video)}
              />
            ))}
          </div>
        </>
      )}

      {/* Video detail modal */}
      <VideoDetail
        video={selectedVideo}
        open={selectedVideo !== null}
        onClose={() => setSelectedVideo(null)}
      />
    </div>
  );
}
