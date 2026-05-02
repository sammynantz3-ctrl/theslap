interface UserAvatarProps {
  name: string;
  avatarColor?: string;
  imageUrl?: string;
  size?: "sm" | "md" | "lg" | "xl";
  isOnline?: boolean;
}

const sizeMap = {
  sm: "w-8 h-8 text-xs",
  md: "w-10 h-10 text-sm",
  lg: "w-14 h-14 text-lg",
  xl: "w-20 h-20 text-2xl",
};

export function UserAvatar({
  name,
  avatarColor = "#e84e0f",
  imageUrl,
  size = "md",
  isOnline,
}: UserAvatarProps) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="relative inline-flex shrink-0">
      <div
        className={`${sizeMap[size]} rounded-full flex items-center justify-center font-display font-black text-white border-2 border-white shadow-subtle overflow-hidden`}
        style={{ backgroundColor: avatarColor }}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover"
          />
        ) : (
          <span>{initials}</span>
        )}
      </div>
      {isOnline !== undefined && (
        <span
          className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
            isOnline ? "bg-green-500" : "bg-muted-foreground"
          }`}
        />
      )}
    </div>
  );
}
