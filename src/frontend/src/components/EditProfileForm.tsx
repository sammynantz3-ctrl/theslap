import { createActor } from "@/backend";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CheckCircle, Save } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { AvatarBuilder } from "./AvatarBuilder";
import {
  type AvatarConfig,
  DEFAULT_AVATAR_CONFIG,
  parseAvatarConfig,
} from "./AvatarRenderer";

interface EditProfileFormProps {
  initialUsername: string;
  initialBio: string;
  initialAvatarConfig: string;
  onSaved?: () => void;
}

export function EditProfileForm({
  initialUsername,
  initialBio,
  initialAvatarConfig,
  onSaved,
}: EditProfileFormProps) {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  const [username, setUsername] = useState(initialUsername);
  const [bio, setBio] = useState(initialBio);
  const [avatarCfg, setAvatarCfg] = useState<AvatarConfig>(
    initialAvatarConfig
      ? parseAvatarConfig(initialAvatarConfig)
      : DEFAULT_AVATAR_CONFIG,
  );

  const mutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.saveCallerUserProfile(
        username.trim(),
        bio.trim(),
        JSON.stringify(avatarCfg),
      );
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["caller-profile"] });
      queryClient.invalidateQueries({ queryKey: ["profiles"] });
      toast.success("Profile saved! 🎉", {
        description: "Your profile has been updated.",
        duration: 4000,
      });
      onSaved?.();
    },
    onError: (err: Error) => {
      toast.error("Save failed", { description: err.message });
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        mutation.mutate();
      }}
      className="space-y-6"
      data-ocid="edit_profile.form"
    >
      {/* Avatar Builder */}
      <div className="bg-muted/40 rounded-xl border border-border p-4">
        <h3 className="font-display font-black text-foreground uppercase tracking-wide text-sm mb-4">
          🎨 CUSTOMIZE YOUR AVATAR
        </h3>
        <AvatarBuilder config={avatarCfg} onChange={setAvatarCfg} />
      </div>

      {/* Username */}
      <div className="space-y-1.5">
        <Label
          htmlFor="username"
          className="text-xs font-black uppercase tracking-wider"
        >
          Username
        </Label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          maxLength={30}
          placeholder="yourname"
          required
          data-ocid="edit_profile.username_input"
          className="w-full px-3 py-2 rounded-lg border-2 border-input bg-background text-foreground font-body text-sm focus:outline-none focus:border-primary transition-smooth"
        />
      </div>

      {/* Bio */}
      <div className="space-y-1.5">
        <Label
          htmlFor="bio"
          className="text-xs font-black uppercase tracking-wider"
        >
          Bio
        </Label>
        <Textarea
          id="bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          maxLength={200}
          rows={3}
          placeholder="Tell the world who you are..."
          data-ocid="edit_profile.bio_textarea"
          className="resize-none"
        />
        <p className="text-xs text-muted-foreground text-right">
          {bio.length}/200
        </p>
      </div>

      {/* Submit */}
      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={mutation.isPending || !username.trim()}
          data-ocid="edit_profile.save_button"
          className="btn-chunky font-display font-black uppercase tracking-wide gap-2"
        >
          {mutation.isSuccess ? (
            <>
              <CheckCircle className="w-4 h-4" />
              SAVED!
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              {mutation.isPending ? "SAVING..." : "SAVE PROFILE"}
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
