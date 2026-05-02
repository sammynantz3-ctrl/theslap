import type { Slap } from "@/hooks/use-backend";
import { HandMetal, MessageCircle } from "lucide-react";
import { useState } from "react";
import { UserAvatar } from "./UserAvatar";

interface SlapCardProps {
  slap: Slap;
  index: number;
}

export function SlapCard({ slap, index }: SlapCardProps) {
  const [slapCount, setSlapCount] = useState(slap.slaps);
  const [slapped, setSlapped] = useState(false);

  function handleSlap() {
    if (!slapped) {
      setSlapCount((c) => c + 1);
      setSlapped(true);
    }
  }

  return (
    <div
      data-ocid={`slap.item.${index}`}
      className="bg-card rounded-xl border-2 border-border shadow-subtle p-4 flex gap-3 hover:shadow-elevated transition-smooth"
    >
      <UserAvatar name={slap.author} avatarColor={slap.avatarColor} size="lg" />
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-baseline gap-2 flex-wrap">
            <span className="font-display font-black text-foreground uppercase tracking-wide text-sm">
              {slap.author}
            </span>
            <span className="text-muted-foreground text-xs">
              • {slap.timestamp}
            </span>
          </div>
          {slap.emoji && <span className="text-xl">{slap.emoji}</span>}
        </div>
        <p className="text-foreground text-sm mt-1 leading-relaxed break-words">
          {slap.content}
        </p>
        <div className="flex items-center gap-4 mt-3">
          <button
            type="button"
            data-ocid={`slap.slap_button.${index}`}
            onClick={handleSlap}
            className={`flex items-center gap-1.5 text-xs font-bold transition-smooth ${
              slapped
                ? "text-primary"
                : "text-muted-foreground hover:text-primary"
            }`}
          >
            <HandMetal className="w-4 h-4" />
            <span>{slapCount} SLAPS</span>
          </button>
          <button
            type="button"
            data-ocid={`slap.comment_button.${index}`}
            className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-accent transition-smooth"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{slap.comments} COMMENTS</span>
          </button>
        </div>
      </div>
    </div>
  );
}
