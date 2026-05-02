import { createActor } from "@/backend";
import { useAuth } from "@/hooks/use-auth";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { HandMetal } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { MoodPicker } from "./MoodPicker";
import { UserAvatar } from "./UserAvatar";

export function SlapComposer() {
  const { isLoggedIn, login, principal } = useAuth();
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  const [text, setText] = useState("");
  const [mood, setMood] = useState<string | null>(null);

  const MAX = 280;
  const remaining = MAX - text.length;

  const { mutate: postSlap, isPending } = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.postSlap(text.trim(), mood ?? null);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () => {
      setText("");
      setMood(null);
      queryClient.invalidateQueries({ queryKey: ["slaps"] });
      toast.success("Your slap was posted! 🤙", {
        duration: 4000,
        position: "top-right",
      });
    },
    onError: (err: Error) => {
      toast.error(err.message || "Couldn't post your slap. Try again!", {
        duration: 5000,
      });
    },
  });

  function handleSubmit() {
    if (!text.trim() || remaining < 0 || isPending) return;
    postSlap();
  }

  if (!isLoggedIn) {
    return (
      <div
        className="bg-primary/10 border-2 border-primary/30 rounded-xl p-4 text-center"
        data-ocid="slap_composer.signin_prompt"
      >
        <p className="text-foreground font-bold text-sm mb-2">
          Sign in to post your Slap!
        </p>
        <button
          type="button"
          onClick={login}
          data-ocid="slap_composer.signin_button"
          className="btn-chunky bg-primary text-primary-foreground text-xs font-display"
          style={{ padding: "0.5rem 1.25rem", borderRadius: "0.5rem" }}
        >
          SIGN IN NOW
        </button>
      </div>
    );
  }

  return (
    <div
      className="bg-card rounded-xl border-2 border-primary/30 shadow-subtle p-4"
      data-ocid="slap_composer.panel"
    >
      <div className="flex gap-3">
        <UserAvatar name={principal ?? "You"} avatarColor="#e84e0f" size="lg" />
        <div className="flex-1 min-w-0">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            data-ocid="slap_composer.textarea"
            placeholder="What's your slap? Drop it here... 🤙"
            className="w-full resize-none bg-background border-2 border-input rounded-xl p-3 text-sm font-body focus:outline-none focus:border-primary transition-smooth"
            rows={3}
            maxLength={MAX + 10}
            aria-label="Compose a slap"
          />

          <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <MoodPicker selected={mood} onSelect={setMood} />

            <div className="flex items-center gap-3 justify-end">
              <span
                className={[
                  "text-xs font-bold tabular-nums",
                  remaining < 20 ? "text-destructive" : "text-muted-foreground",
                ].join(" ")}
                aria-live="polite"
              >
                {remaining}
              </span>
              <button
                type="button"
                data-ocid="slap_composer.submit_button"
                onClick={handleSubmit}
                disabled={!text.trim() || remaining < 0 || isPending}
                className="btn-chunky bg-primary text-primary-foreground text-xs font-display disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ padding: "0.5rem 1.25rem", borderRadius: "0.5rem" }}
              >
                <span className="flex items-center gap-1.5">
                  <HandMetal className="w-4 h-4" />
                  {isPending ? "POSTING..." : "SLAP IT!"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
