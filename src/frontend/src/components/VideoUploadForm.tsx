import { ExternalBlob } from "@/backend";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { usePostVideo } from "@/hooks/use-backend";
import { Upload, Video, X } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

interface VideoUploadFormProps {
  onClose: () => void;
}

export function VideoUploadForm({ onClose }: VideoUploadFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutateAsync, isPending } = usePostVideo();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!file || !title.trim()) return;

    try {
      setProgress(0);
      const bytes = new Uint8Array(await file.arrayBuffer());
      const blob = ExternalBlob.fromBytes(bytes).withUploadProgress((pct) => {
        setProgress(pct);
      });
      await mutateAsync({
        title: title.trim(),
        description: description.trim(),
        blob,
      });
      toast.success("Clip uploaded! 🎬 It'll appear in the grid shortly.");
      onClose();
    } catch (err) {
      setProgress(null);
      toast.error(
        `Upload failed: ${err instanceof Error ? err.message : "Unknown error"}`,
      );
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const picked = e.target.files?.[0];
    if (picked) setFile(picked);
  }

  const isReady = !!file && title.trim().length > 0 && !isPending;

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-card rounded-2xl border-2 border-border shadow-elevated p-6"
      data-ocid="upload.form"
    >
      {/* Form header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center"
            style={{ background: "oklch(0.65 0.24 195)" }}
          >
            <Video className="w-5 h-5 text-white" />
          </div>
          <h3 className="font-display font-black text-foreground uppercase tracking-wide">
            UPLOAD A CLIP
          </h3>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-smooth"
          aria-label="Cancel upload"
          data-ocid="upload.cancel_button"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-4">
        {/* Title */}
        <div className="space-y-1.5">
          <Label
            htmlFor="video-title"
            className="font-bold text-xs uppercase tracking-wide"
          >
            Title *
          </Label>
          <Input
            id="video-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Give your clip a catchy name..."
            maxLength={80}
            required
            data-ocid="upload.title_input"
          />
        </div>

        {/* Description */}
        <div className="space-y-1.5">
          <Label
            htmlFor="video-desc"
            className="font-bold text-xs uppercase tracking-wide"
          >
            Description
          </Label>
          <Textarea
            id="video-desc"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What's this clip about?"
            rows={2}
            maxLength={300}
            data-ocid="upload.description_input"
          />
        </div>

        {/* File picker */}
        <div className="space-y-1.5">
          <Label className="font-bold text-xs uppercase tracking-wide">
            Video file *
          </Label>
          <input
            ref={fileInputRef}
            type="file"
            accept="video/*"
            className="hidden"
            onChange={handleFileChange}
            data-ocid="upload.file_input"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-full border-2 border-dashed border-border rounded-xl p-5 flex flex-col items-center gap-2 hover:border-primary hover:bg-primary/5 transition-smooth cursor-pointer"
            data-ocid="upload.dropzone"
          >
            {file ? (
              <>
                <Video className="w-8 h-8 text-primary" />
                <span className="font-bold text-sm text-foreground">
                  {file.name}
                </span>
                <span className="text-xs text-muted-foreground">
                  {(file.size / 1024 / 1024).toFixed(1)} MB
                </span>
              </>
            ) : (
              <>
                <Upload className="w-8 h-8 text-muted-foreground" />
                <span className="font-bold text-sm text-muted-foreground">
                  Click to choose a video file
                </span>
                <span className="text-xs text-muted-foreground">
                  MP4, MOV, WebM supported
                </span>
              </>
            )}
          </button>
        </div>

        {/* Upload progress */}
        {progress !== null && (
          <div className="space-y-1" data-ocid="upload.loading_state">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-foreground">Uploading...</span>
              <span className="text-primary">{Math.round(progress)}%</span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  width: `${progress}%`,
                  background:
                    "linear-gradient(90deg, oklch(0.6 0.28 15), oklch(0.65 0.24 195))",
                }}
              />
            </div>
          </div>
        )}

        {/* Submit */}
        <div className="flex gap-3 pt-1">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="flex-1"
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={!isReady}
            className="flex-1 font-black uppercase"
            style={
              !isReady
                ? {}
                : { background: "oklch(0.65 0.24 195)", color: "white" }
            }
            data-ocid="upload.submit_button"
          >
            {isPending ? "Uploading..." : "POST CLIP"}
          </Button>
        </div>
      </div>
    </form>
  );
}
