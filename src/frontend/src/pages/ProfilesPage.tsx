import { AvatarRenderer, parseAvatarConfig } from "@/components/AvatarRenderer";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { UserAvatar } from "@/components/UserAvatar";
import { Badge } from "@/components/ui/badge";
import { useListBackendProfiles, useUserProfiles } from "@/hooks/use-backend";
import { Link } from "@tanstack/react-router";
import { Users } from "lucide-react";

function ProfileCard({
  id,
  name,
  handle,
  bio,
  avatarColor,
  isOnline,
  slaps,
  followers,
  avatarConfig,
  index,
}: {
  id: string;
  name: string;
  handle: string;
  bio: string;
  avatarColor: string;
  isOnline?: boolean;
  slaps: number;
  followers: number;
  avatarConfig?: string;
  index: number;
}) {
  const hasCustomAvatar = !!avatarConfig;
  const cfg = hasCustomAvatar ? parseAvatarConfig(avatarConfig) : null;

  return (
    <Link
      to="/profiles/$userId"
      params={{ userId: id }}
      data-ocid={`profiles.item.${index}`}
      className="block group"
    >
      <div className="bg-card rounded-xl border-2 border-border shadow-subtle p-5 hover:shadow-elevated hover:border-primary/60 transition-smooth h-full flex flex-col">
        {/* Avatar + identity */}
        <div className="flex items-center gap-4 mb-3">
          <div className="relative shrink-0">
            {cfg ? (
              <div className="rounded-full overflow-hidden border-2 border-white shadow-subtle">
                <AvatarRenderer config={cfg} size={64} />
              </div>
            ) : (
              <UserAvatar
                name={name}
                avatarColor={avatarColor}
                size="xl"
                isOnline={isOnline}
              />
            )}
            {cfg && isOnline !== undefined && (
              <span
                className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                  isOnline ? "bg-green-500" : "bg-muted-foreground"
                }`}
              />
            )}
          </div>
          <div className="min-w-0">
            <h3 className="font-display font-black text-foreground uppercase text-sm leading-tight group-hover:text-primary transition-smooth truncate">
              {name}
            </h3>
            <p className="text-muted-foreground text-xs">@{handle}</p>
            {isOnline && (
              <Badge
                variant="outline"
                className="text-green-600 border-green-400 text-xs py-0 h-4 mt-0.5"
              >
                ● ONLINE
              </Badge>
            )}
          </div>
        </div>

        {/* Bio */}
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3 flex-1">
          {bio || "No bio yet."}
        </p>

        {/* Stats */}
        <div className="flex gap-5 text-xs border-t border-border pt-3 mt-auto">
          <div className="flex flex-col items-center">
            <span className="font-black text-primary">
              {slaps.toLocaleString()}
            </span>
            <span className="text-muted-foreground">SLAPS</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-black text-accent">
              {followers.toLocaleString()}
            </span>
            <span className="text-muted-foreground">FOLLOWERS</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function ProfilesPage() {
  const { data: sampleProfiles, isLoading: sampleLoading } = useUserProfiles();
  const { data: backendProfiles, isLoading: backendLoading } =
    useListBackendProfiles();

  const isLoading = sampleLoading || backendLoading;

  const backendMap = new Map(
    (backendProfiles ?? []).map(([userId, profile]) => [
      userId.toText(),
      profile,
    ]),
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-6" data-ocid="profiles.page">
      {/* Hero banner */}
      <div
        className="rounded-2xl p-8 mb-6 flex items-center gap-4 shadow-elevated"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.55 0.22 270) 0%, oklch(0.65 0.24 195) 100%)",
        }}
      >
        <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center">
          <Users className="w-8 h-8 text-white" />
        </div>
        <div>
          <h1
            className="font-display font-black text-white text-3xl uppercase tracking-wider"
            style={{ textShadow: "2px 2px 0px rgba(0,0,0,0.3)" }}
          >
            PROFILES
          </h1>
          <p className="text-white/80 text-sm font-body">
            The students of Hollywood Arts —{" "}
            <span className="font-bold">
              {(sampleProfiles?.length ?? 0) + backendMap.size} members
            </span>
          </p>
        </div>
      </div>

      {isLoading ? (
        <LoadingSpinner label="Loading profiles..." />
      ) : (
        <div className="space-y-8">
          {/* Backend registered users */}
          {backendMap.size > 0 && (
            <section>
              <h2 className="font-display font-black text-foreground uppercase tracking-wide text-sm mb-3 flex items-center gap-2">
                <span
                  className="inline-block w-3 h-3 rounded-full"
                  style={{ background: "oklch(0.65 0.24 195)" }}
                />
                REGISTERED MEMBERS
              </h2>
              <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
                data-ocid="profiles.registered.list"
              >
                {Array.from(backendMap.entries()).map(
                  ([userId, profile], i) => (
                    <ProfileCard
                      key={userId}
                      id={userId}
                      name={profile.username || "Anonymous"}
                      handle={
                        profile.username?.toLowerCase().replace(/\s+/g, "") ||
                        "anon"
                      }
                      bio={profile.bio}
                      avatarColor="#e84e0f"
                      avatarConfig={profile.avatarConfig || undefined}
                      slaps={0}
                      followers={0}
                      index={i + 1}
                    />
                  ),
                )}
              </div>
            </section>
          )}

          {/* Sample / cast profiles */}
          <section>
            <h2 className="font-display font-black text-foreground uppercase tracking-wide text-sm mb-3 flex items-center gap-2">
              <span
                className="inline-block w-3 h-3 rounded-full"
                style={{ background: "oklch(0.6 0.28 15)" }}
              />
              CAST OF HOLLYWOOD ARTS
            </h2>
            <div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
              data-ocid="profiles.list"
            >
              {sampleProfiles?.map((profile, i) => (
                <ProfileCard
                  key={profile.id}
                  id={profile.id}
                  name={profile.name}
                  handle={profile.handle}
                  bio={profile.bio}
                  avatarColor={profile.avatarColor}
                  isOnline={profile.isOnline}
                  slaps={profile.slaps}
                  followers={profile.followers}
                  index={i + 1}
                />
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
