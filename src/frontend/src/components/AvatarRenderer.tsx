// Renders an avatar from avatarConfig JSON (no external images needed)
// Config shape: { skinTone, hairColor, eyeShape, mouthStyle, accessory, bgColor }

export interface AvatarConfig {
  skinTone: string;
  hairColor: string;
  eyeShape: "round" | "almond" | "wide";
  mouthStyle: "smile" | "grin" | "neutral" | "smirk";
  accessory: "none" | "glasses" | "bow" | "headband" | "hat";
  bgColor: string;
}

export const DEFAULT_AVATAR_CONFIG: AvatarConfig = {
  skinTone: "#f4c68a",
  hairColor: "#5c3d11",
  eyeShape: "round",
  mouthStyle: "smile",
  accessory: "none",
  bgColor: "#e84e0f",
};

export function parseAvatarConfig(json: string): AvatarConfig {
  try {
    const parsed = JSON.parse(json) as Partial<AvatarConfig>;
    return { ...DEFAULT_AVATAR_CONFIG, ...parsed };
  } catch {
    return DEFAULT_AVATAR_CONFIG;
  }
}

interface AvatarRendererProps {
  config: AvatarConfig | string;
  size?: number;
  className?: string;
}

function EyeShape({
  shape,
  x,
  y,
}: { shape: AvatarConfig["eyeShape"]; x: number; y: number }) {
  if (shape === "round") return <circle cx={x} cy={y} r={4.5} fill="#1a1a2e" />;
  if (shape === "almond")
    return <ellipse cx={x} cy={y} rx={5.5} ry={3.5} fill="#1a1a2e" />;
  // wide
  return <ellipse cx={x} cy={y} rx={6} ry={5} fill="#1a1a2e" />;
}

function MouthShape({
  style,
  cx,
  cy,
}: { style: AvatarConfig["mouthStyle"]; cx: number; cy: number }) {
  if (style === "smile")
    return (
      <path
        d={`M ${cx - 9} ${cy} Q ${cx} ${cy + 9} ${cx + 9} ${cy}`}
        stroke="#1a1a2e"
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
      />
    );
  if (style === "grin")
    return (
      <path
        d={`M ${cx - 10} ${cy - 1} Q ${cx} ${cy + 11} ${cx + 10} ${cy - 1}`}
        stroke="#1a1a2e"
        strokeWidth="2.5"
        fill="#fff"
        strokeLinecap="round"
      />
    );
  if (style === "neutral")
    return (
      <line
        x1={cx - 8}
        y1={cy}
        x2={cx + 8}
        y2={cy}
        stroke="#1a1a2e"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    );
  // smirk
  return (
    <path
      d={`M ${cx - 8} ${cy + 2} Q ${cx + 2} ${cy - 4} ${cx + 9} ${cy}`}
      stroke="#1a1a2e"
      strokeWidth="2.5"
      fill="none"
      strokeLinecap="round"
    />
  );
}

function AccessoryShape({
  type,
  cx,
}: { type: AvatarConfig["accessory"]; cx: number }) {
  if (type === "glasses")
    return (
      <g>
        <circle
          cx={cx - 14}
          cy={47}
          r={8}
          fill="none"
          stroke="#5c3d11"
          strokeWidth="2.5"
        />
        <circle
          cx={cx + 14}
          cy={47}
          r={8}
          fill="none"
          stroke="#5c3d11"
          strokeWidth="2.5"
        />
        <line
          x1={cx - 6}
          y1={47}
          x2={cx + 6}
          y2={47}
          stroke="#5c3d11"
          strokeWidth="2.5"
        />
        <line
          x1={cx - 22}
          y1={47}
          x2={cx - 30}
          y2={44}
          stroke="#5c3d11"
          strokeWidth="2"
        />
        <line
          x1={cx + 22}
          y1={47}
          x2={cx + 30}
          y2={44}
          stroke="#5c3d11"
          strokeWidth="2"
        />
      </g>
    );
  if (type === "bow")
    return (
      <g>
        <path d={`M ${cx} 16 L ${cx - 12} 8 L ${cx} 14 Z`} fill="#d63384" />
        <path d={`M ${cx} 16 L ${cx + 12} 8 L ${cx} 14 Z`} fill="#d63384" />
        <circle cx={cx} cy={15} r={3.5} fill="#ff69b4" />
      </g>
    );
  if (type === "headband")
    return (
      <rect
        x={cx - 26}
        y={22}
        width={52}
        height={8}
        rx={4}
        fill="#e84e0f"
        opacity="0.9"
      />
    );
  if (type === "hat")
    return (
      <g>
        <rect x={cx - 28} y={22} width={56} height={6} rx={3} fill="#1a1a2e" />
        <rect x={cx - 18} y={5} width={36} height={20} rx={4} fill="#1a1a2e" />
      </g>
    );
  return null;
}

export function AvatarRenderer({
  config,
  size = 100,
  className = "",
}: AvatarRendererProps) {
  const cfg = typeof config === "string" ? parseAvatarConfig(config) : config;
  const cx = 60;
  const cy = 60;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      className={className}
      role="img"
      aria-label="User avatar"
    >
      <title>User avatar</title>
      {/* Background circle */}
      <circle cx={60} cy={60} r={58} fill={cfg.bgColor} />

      {/* Neck */}
      <rect x={50} y={82} width={20} height={18} rx={6} fill={cfg.skinTone} />

      {/* Head */}
      <ellipse cx={cx} cy={cy} rx={34} ry={36} fill={cfg.skinTone} />

      {/* Hair blob on top */}
      <ellipse cx={cx} cy={cy - 26} rx={36} ry={18} fill={cfg.hairColor} />
      <rect
        x={cx - 36}
        y={cy - 28}
        width={72}
        height={16}
        fill={cfg.hairColor}
      />

      {/* Ear left */}
      <ellipse cx={cx - 33} cy={cy + 4} rx={6} ry={8} fill={cfg.skinTone} />
      {/* Ear right */}
      <ellipse cx={cx + 33} cy={cy + 4} rx={6} ry={8} fill={cfg.skinTone} />

      {/* Eyes */}
      <EyeShape shape={cfg.eyeShape} x={cx - 14} y={cy + 2} />
      <EyeShape shape={cfg.eyeShape} x={cx + 14} y={cy + 2} />
      {/* Eye shine */}
      <circle cx={cx - 11} cy={cy} r={1.8} fill="white" />
      <circle cx={cx + 17} cy={cy} r={1.8} fill="white" />

      {/* Nose */}
      <ellipse cx={cx} cy={cy + 14} rx={4} ry={3} fill={cfg.skinTone} />
      <path
        d={`M ${cx - 4} ${cy + 15} Q ${cx} ${cy + 18} ${cx + 4} ${cy + 15}`}
        stroke="#c8906a"
        strokeWidth="1.5"
        fill="none"
      />

      {/* Mouth */}
      <MouthShape style={cfg.mouthStyle} cx={cx} cy={cy + 25} />

      {/* Accessory */}
      <AccessoryShape type={cfg.accessory} cx={cx} />

      {/* Hair fringe over forehead */}
      <ellipse cx={cx} cy={cy - 16} rx={28} ry={12} fill={cfg.hairColor} />
    </svg>
  );
}
