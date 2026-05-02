import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/use-auth";
import { Camera, ImagePlus, Upload, X } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

interface PhotoUploadFormProps {
  onSuccess?: () => void;
}

export function PhotoUploadForm({ onSuccess }: PhotoUploadFormProps) {
  const { isLoggedIn, login } = useAuth();
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileRef = useRef<HTMLInputElement>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const picked = e.target.files?.[0] ?? null;
    setFile(picked);
    if (picked) {
      const url = URL.createObjectURL(picked);
      setPreview(url);
    } else {
      setPreview(null);
    }
  }

  function clearFile() {
    setFile(null);
    setPreview(null);
    if (fileRef.current) fileRef.current.value = "";
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!file || !title.trim()) return;

    setUploading(true);
    setProgress(0);

    // Simulate progress ticks while the upload runs
    const ticker = setInterval(() => {
      setProgress((p) => Math.min(p + 12, 85));
    }, 180);

    try {
      // In the real app, this would call actor.postPhoto(title, caption, blob, null)
      // For sample mode, we just simulate the upload
      await new Promise((res) => setTimeout(res, 1600));
      setProgress(100);
      clearInterval(ticker);

      toast.success("Photo uploaded! 📸", {
        description: `"${title}" is now live on TheSlap Pix!`,
        duration: 4000,
      });

      setTitle("");
      setCaption("");
      clearFile();
      setProgress(0);
      onSuccess?.();
    } catch {
      clearInterval(ticker);
      toast.error("Upload failed", { description: "Please try again." });
    } finally {
      setUploading(false);
    }
  }

  if (!isLoggedIn) {
    return (
      <div
        data-ocid="photo.upload.login_prompt"
        className="bg-card rounded-2xl border-4 border-dashed border-primary/30 p-8 text-center"
      >
        <Camera className="w-12 h-12 text-primary/50 mx-auto mb-3" />
        <h3 className="font-display font-black text-foreground text-lg uppercase tracking-wide mb-1">
          Share Your Pix!
        </h3>
        <p className="text-muted-foreground font-body text-sm mb-4">
          Log in to upload your photos to TheSlap.
        </p>
        <Button
          type="button"
          data-ocid="photo.upload.login_button"
          onClick={() => login()}
          className="font-display font-black uppercase tracking-wider btn-chunky"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.6 0.28 15) 0%, oklch(0.72 0.22 50) 100%)",
          }}
        >
          Log In to Upload
        </Button>
      </div>
    );
  }

  return (
    <div
      data-ocid="photo.upload.panel"
      className="bg-card rounded-2xl border-4 border-primary/20 overflow-hidden"
    >
      {/* Panel header */}
      <div
        className="px-5 py-3 flex items-center gap-2"
        style={{
          background:
            "linear-gradient(90deg, oklch(0.6 0.28 15) 0%, oklch(0.72 0.22 50) 100%)",
        }}
      >
        <ImagePlus className="w-5 h-5 text-white" />
        <h3
          className="font-display font-black text-white uppercase tracking-wider"
          style={{ textShadow: "1px 1px 0 rgba(0,0,0,0.3)" }}
        >
          Upload a Pix
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="p-5 space-y-4">
        {/* File picker */}
        <div>
          <Label
            htmlFor="pix-file"
            className="font-display font-bold text-foreground uppercase text-xs tracking-wider mb-1.5 block"
          >
            Photo *
          </Label>
          {preview ? (
            <div className="relative rounded-xl overflow-hidden border-2 border-primary">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-40 object-cover"
              />
              <button
                type="button"
                data-ocid="photo.upload.clear_button"
                onClick={clearFile}
                className="absolute top-2 right-2 bg-black/60 rounded-full p-1 text-white hover:bg-black/80 transition-colors"
                aria-label="Remove selected photo"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              data-ocid="photo.upload.dropzone"
              onClick={() => fileRef.current?.click()}
              className="w-full border-4 border-dashed border-primary/30 rounded-xl h-32 flex flex-col items-center justify-center gap-2 hover:border-primary/60 hover:bg-primary/5 transition-smooth cursor-pointer"
            >
              <Camera className="w-8 h-8 text-primary/50" />
              <span className="text-sm text-muted-foreground font-body">
                Click to choose a photo
              </span>
            </button>
          )}
          <input
            ref={fileRef}
            id="pix-file"
            data-ocid="photo.upload.input"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        {/* Title */}
        <div>
          <Label
            htmlFor="pix-title"
            className="font-display font-bold text-foreground uppercase text-xs tracking-wider mb-1.5 block"
          >
            Title *
          </Label>
          <Input
            id="pix-title"
            data-ocid="photo.upload.title_input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What's the story?"
            className="border-2 border-input font-body"
            maxLength={100}
            required
          />
        </div>

        {/* Caption */}
        <div>
          <Label
            htmlFor="pix-caption"
            className="font-display font-bold text-foreground uppercase text-xs tracking-wider mb-1.5 block"
          >
            Caption
          </Label>
          <Textarea
            id="pix-caption"
            data-ocid="photo.upload.textarea"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Add a caption..."
            rows={2}
            className="border-2 border-input font-body resize-none"
            maxLength={280}
          />
        </div>

        {/* Progress bar */}
        {uploading && (
          <div data-ocid="photo.upload.loading_state" className="space-y-1.5">
            <div className="flex justify-between text-xs font-display font-bold text-primary">
              <span>UPLOADING...</span>
              <span>{progress}%</span>
            </div>
            <div className="h-3 rounded-full bg-muted border-2 border-border overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-200"
                style={{
                  width: `${progress}%`,
                  background:
                    "linear-gradient(90deg, oklch(0.6 0.28 15), oklch(0.72 0.22 50))",
                }}
              />
            </div>
          </div>
        )}

        <Button
          type="submit"
          data-ocid="photo.upload.submit_button"
          disabled={uploading || !file || !title.trim()}
          className="w-full font-display font-black uppercase tracking-wider btn-chunky flex items-center justify-center gap-2"
          style={{
            background:
              uploading || !file || !title.trim()
                ? undefined
                : "linear-gradient(135deg, oklch(0.6 0.28 15) 0%, oklch(0.72 0.22 50) 100%)",
          }}
        >
          <Upload className="w-4 h-4" />
          {uploading ? "Uploading..." : "Post to Pix!"}
        </Button>
      </form>
    </div>
  );
}
