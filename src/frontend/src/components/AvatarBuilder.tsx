import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { AvatarRenderer } from "./AvatarRenderer";
import type { AvatarConfig } from "./AvatarRenderer";

interface AvatarBuilderProps {
  config: AvatarConfig;
  onChange: (config: AvatarConfig) => void;
}

const SKIN_TONES = [
  { label: "Light", value: "#fde5c8" },
  { label: "Warm", value: "#f4c68a" },
  { label: "Medium", value: "#d4935a" },
  { label: "Tan", value: "#b5723a" },
  { label: "Deep", value: "#7a4a28" },
  { label: "Rich", value: "#4a2910" },
];

const HAIR_COLORS = [
  { label: "Black", value: "#1a1a2e" },
  { label: "Brown", value: "#5c3d11" },
  { label: "Blonde", value: "#f0d060" },
  { label: "Red", value: "#c0392b" },
  { label: "Pink", value: "#d63384" },
  { label: "Purple", value: "#6a0dad" },
  { label: "Teal", value: "#2d6a4f" },
  { label: "White", value: "#e8e8e8" },
];

const BG_COLORS = [
  { label: "Orange", value: "#e84e0f" },
  { label: "Teal", value: "#0891b2" },
  { label: "Purple", value: "#7c3aed" },
  { label: "Pink", value: "#db2777" },
  { label: "Green", value: "#16a34a" },
  { label: "Navy", value: "#1e3a8a" },
  { label: "Gold", value: "#b45309" },
  { label: "Dark", value: "#1a1a2e" },
];

const EYE_SHAPES: { label: string; value: AvatarConfig["eyeShape"] }[] = [
  { label: "Round", value: "round" },
  { label: "Almond", value: "almond" },
  { label: "Wide", value: "wide" },
];

const MOUTH_STYLES: {
  label: string;
  value: AvatarConfig["mouthStyle"];
  emoji: string;
}[] = [
  { label: "Smile", value: "smile", emoji: "🙂" },
  { label: "Grin", value: "grin", emoji: "😄" },
  { label: "Neutral", value: "neutral", emoji: "😐" },
  { label: "Smirk", value: "smirk", emoji: "😏" },
];

const ACCESSORIES: {
  label: string;
  value: AvatarConfig["accessory"];
  emoji: string;
}[] = [
  { label: "None", value: "none", emoji: "🚫" },
  { label: "Glasses", value: "glasses", emoji: "👓" },
  { label: "Bow", value: "bow", emoji: "🎀" },
  { label: "Headband", value: "headband", emoji: "💫" },
  { label: "Hat", value: "hat", emoji: "🎩" },
];

function ColorSwatch({
  color,
  selected,
  onClick,
  label,
}: { color: string; selected: boolean; onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={cn(
        "w-9 h-9 rounded-full border-2 transition-smooth hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        selected
          ? "border-white ring-2 ring-primary scale-110"
          : "border-border",
      )}
      style={{ backgroundColor: color }}
    />
  );
}

export function AvatarBuilder({ config, onChange }: AvatarBuilderProps) {
  function update(patch: Partial<AvatarConfig>) {
    onChange({ ...config, ...patch });
  }

  return (
    <div
      className="flex flex-col lg:flex-row gap-6"
      data-ocid="avatar_builder.panel"
    >
      {/* Preview */}
      <div className="flex flex-col items-center gap-3 shrink-0">
        <div className="rounded-2xl border-4 border-primary p-3 bg-card shadow-elevated">
          <AvatarRenderer config={config} size={140} />
        </div>
        <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">
          PREVIEW
        </p>
      </div>

      {/* Controls */}
      <div className="flex-1">
        <Tabs defaultValue="skin" className="w-full">
          <TabsList
            className="grid grid-cols-5 h-10 mb-4"
            data-ocid="avatar_builder.tab"
          >
            <TabsTrigger value="skin" className="text-xs font-bold">
              SKIN
            </TabsTrigger>
            <TabsTrigger value="hair" className="text-xs font-bold">
              HAIR
            </TabsTrigger>
            <TabsTrigger value="eyes" className="text-xs font-bold">
              EYES
            </TabsTrigger>
            <TabsTrigger value="mouth" className="text-xs font-bold">
              MOUTH
            </TabsTrigger>
            <TabsTrigger value="extras" className="text-xs font-bold">
              EXTRAS
            </TabsTrigger>
          </TabsList>

          <TabsContent value="skin" className="space-y-4">
            <div>
              <Label className="text-xs font-black uppercase tracking-wider text-muted-foreground mb-2 block">
                Skin Tone
              </Label>
              <div className="flex flex-wrap gap-2">
                {SKIN_TONES.map((s) => (
                  <ColorSwatch
                    key={s.value}
                    color={s.value}
                    selected={config.skinTone === s.value}
                    onClick={() => update({ skinTone: s.value })}
                    label={s.label}
                  />
                ))}
              </div>
            </div>
            <div>
              <Label className="text-xs font-black uppercase tracking-wider text-muted-foreground mb-2 block">
                Background Color
              </Label>
              <div className="flex flex-wrap gap-2">
                {BG_COLORS.map((c) => (
                  <ColorSwatch
                    key={c.value}
                    color={c.value}
                    selected={config.bgColor === c.value}
                    onClick={() => update({ bgColor: c.value })}
                    label={c.label}
                  />
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="hair">
            <Label className="text-xs font-black uppercase tracking-wider text-muted-foreground mb-2 block">
              Hair Color
            </Label>
            <div className="flex flex-wrap gap-2">
              {HAIR_COLORS.map((h) => (
                <ColorSwatch
                  key={h.value}
                  color={h.value}
                  selected={config.hairColor === h.value}
                  onClick={() => update({ hairColor: h.value })}
                  label={h.label}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="eyes">
            <Label className="text-xs font-black uppercase tracking-wider text-muted-foreground mb-2 block">
              Eye Shape
            </Label>
            <div className="flex gap-2 flex-wrap">
              {EYE_SHAPES.map((e) => (
                <Button
                  key={e.value}
                  type="button"
                  variant={config.eyeShape === e.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => update({ eyeShape: e.value })}
                  className="font-black text-xs uppercase"
                  data-ocid={`avatar_builder.eye.${e.value}`}
                >
                  {e.label}
                </Button>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="mouth">
            <Label className="text-xs font-black uppercase tracking-wider text-muted-foreground mb-2 block">
              Mouth Style
            </Label>
            <div className="flex gap-2 flex-wrap">
              {MOUTH_STYLES.map((m) => (
                <Button
                  key={m.value}
                  type="button"
                  variant={
                    config.mouthStyle === m.value ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => update({ mouthStyle: m.value })}
                  className="font-black text-xs gap-1"
                  data-ocid={`avatar_builder.mouth.${m.value}`}
                >
                  <span>{m.emoji}</span>
                  <span>{m.label}</span>
                </Button>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="extras">
            <Label className="text-xs font-black uppercase tracking-wider text-muted-foreground mb-2 block">
              Accessory
            </Label>
            <div className="flex gap-2 flex-wrap">
              {ACCESSORIES.map((a) => (
                <Button
                  key={a.value}
                  type="button"
                  variant={config.accessory === a.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => update({ accessory: a.value })}
                  className="font-black text-xs gap-1"
                  data-ocid={`avatar_builder.accessory.${a.value}`}
                >
                  <span>{a.emoji}</span>
                  <span>{a.label}</span>
                </Button>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
