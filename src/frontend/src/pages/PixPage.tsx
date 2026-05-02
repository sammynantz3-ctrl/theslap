import { LoadingSpinner } from "@/components/LoadingSpinner";
import { PhotoCard } from "@/components/PhotoCard";
import { PhotoLightbox } from "@/components/PhotoLightbox";
import { PhotoUploadForm } from "@/components/PhotoUploadForm";
import { useListPhotos } from "@/hooks/use-backend";
import { Camera } from "lucide-react";
import { useState } from "react";

export default function PixPage() {
  const { data: photos, isLoading, refetch } = useListPhotos();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6" data-ocid="pix.page">
      {/* Header */}
      <div
        className="rounded-2xl p-8 mb-6 flex items-center gap-4 shadow-elevated"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.6 0.28 15) 0%, oklch(0.72 0.22 50) 100%)",
        }}
      >
        <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center">
          <Camera className="w-8 h-8 text-white" />
        </div>
        <div>
          <h1
            className="font-display font-black text-white text-5xl uppercase tracking-wider leading-none"
            style={{ textShadow: "3px 3px 0px rgba(0,0,0,0.35)" }}
          >
            PIX
          </h1>
          <p className="text-white/80 text-sm font-body">
            Photo gallery from Hollywood Arts
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upload form sidebar */}
        <div className="lg:col-span-1">
          <PhotoUploadForm
            onSuccess={() => {
              refetch();
            }}
          />
        </div>

        {/* Photo grid */}
        <div className="lg:col-span-2">
          {isLoading ? (
            <LoadingSpinner label="Loading pix..." />
          ) : (
            <>
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display font-black text-foreground uppercase tracking-wide">
                  LATEST PIX
                </h2>
                <span className="text-sm text-muted-foreground">
                  {photos?.length ?? 0} photos
                </span>
              </div>

              {!photos?.length ? (
                <div
                  data-ocid="pix.empty_state"
                  className="bg-card rounded-2xl border-4 border-dashed border-border p-12 text-center"
                >
                  <Camera className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                  <h3 className="font-display font-black text-foreground text-xl uppercase tracking-wide mb-2">
                    No Pix Yet!
                  </h3>
                  <p className="text-muted-foreground font-body">
                    Be the first to share a photo with Hollywood Arts!
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {photos.map((photo, i) => (
                    <button
                      key={photo.id}
                      type="button"
                      data-ocid={`pix.item.${i + 1}`}
                      className="text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl"
                      onClick={() => openLightbox(i)}
                      aria-label={`View photo: ${photo.title}`}
                    >
                      <PhotoCard photo={photo} index={i + 1} />
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && photos && (
        <PhotoLightbox
          photos={photos}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onNavigate={setLightboxIndex}
        />
      )}
    </div>
  );
}
