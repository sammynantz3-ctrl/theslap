import {
  AvatarRenderer,
  DEFAULT_AVATAR_CONFIG,
  parseAvatarConfig,
} from "@/components/AvatarRenderer";
import { EditProfileForm } from "@/components/EditProfileForm";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { UserAvatar } from "@/components/UserAvatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/use-auth";
import {
  useCallerProfile,
  useGetUserProfile,
  useListFavorites,
  useListPhotos,
  useListSlaps,
  useListVideos,
} from "@/hooks/use-backend";
import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  Bookmark,
  Camera,
  Film,
  HandMetal,
  MessageCircle,
  Pencil,
  Users,
} from "lucide-react";
import { useState } from "react";

function ContentCard({
  title,
  author,
  meta,
  thumbnail,
  index,
  ocidPrefix,
}: {
  title: string;
  author: string;
  meta: string;
  thumbnail?: string;
  index: number;
  ocidPrefix: string;
}) {
  return (
    <div
      data-ocid={`${ocidPrefix}.item.${index}`}
      className="bg-card rounded-xl border-2 border-border shadow-subtle overflow-hidden hover:shadow-elevated hover:border-primary/40 transition-smooth"
    >
      {thumbnail && (
        <div className="h-28 overflow-hidden">
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-3">
        <h4 className="font-display font-black text-foreground text-xs uppercase tracking-wide truncate">
          {title}
        </h4>
        <p className="text-muted-foreground text-xs">{author}</p>
        <p className="text-primary text-xs font-bold mt-0.5">{meta}</p>
      </div>
    </div>
  );
}

function EmptyState({ emoji, text }: { emoji: string; text: string }) {
  return (
    <div
      className="bg-card rounded-xl border-2 border-dashed border-border p-8 text-center"
      data-ocid="profile.empty_state"
    >
      <p className="text-4xl mb-2">{emoji}</p>
      <p className="text-muted-foreground text-sm">{text}</p>
    </div>
  );
}

function ContentTabs({
  userSlaps,
  videos,
  photos,
  favorites,
}: {
  userSlaps: {
    id: string;
    content: string;
    timestamp: string;
    slaps: number;
    comments: number;
  }[];
  videos: {
    id: string;
    title: string;
    author: string;
    thumbnailUrl: string;
    duration: string;
    views: number;
  }[];
  photos: {
    id: string;
    title: string;
    author: string;
    imageUrl: string;
    slaps: number;
  }[];
  favorites: {
    id: string;
    label: string;
    type: string;
  }[];
}) {
  return (
    <Tabs defaultValue="slaps" data-ocid="profile.content_tabs">
      <TabsList
        className="w-full grid grid-cols-4 mb-4"
        data-ocid="profile.tabs"
      >
        <TabsTrigger
          value="slaps"
          className="font-black uppercase text-xs gap-1.5"
          data-ocid="profile.slaps_tab"
        >
          <HandMetal className="w-3.5 h-3.5" /> SLAPS
        </TabsTrigger>
        <TabsTrigger
          value="clips"
          className="font-black uppercase text-xs gap-1.5"
          data-ocid="profile.clips_tab"
        >
          <Film className="w-3.5 h-3.5" /> CLIPS
        </TabsTrigger>
        <TabsTrigger
          value="pix"
          className="font-black uppercase text-xs gap-1.5"
          data-ocid="profile.pix_tab"
        >
          <Camera className="w-3.5 h-3.5" /> PIX
        </TabsTrigger>
        <TabsTrigger
          value="library"
          className="font-black uppercase text-xs gap-1.5"
          data-ocid="profile.library_tab"
        >
          <Bookmark className="w-3.5 h-3.5" /> LIBRARY
        </TabsTrigger>
      </TabsList>

      <TabsContent value="slaps">
        {userSlaps.length === 0 ? (
          <EmptyState emoji="🤫" text="No slaps yet. Silence speaks volumes." />
        ) : (
          <div className="space-y-3" data-ocid="profile.slaps_list">
            {userSlaps.map((slap, i) => (
              <div
                key={slap.id}
                data-ocid={`profile.slap.item.${i + 1}`}
                className="bg-card rounded-xl border-2 border-border p-4 shadow-subtle"
              >
                <p className="text-sm text-foreground leading-relaxed">
                  {slap.content}
                </p>
                <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                  <span>{slap.timestamp}</span>
                  <span className="text-primary font-bold">
                    {slap.slaps} SLAPS
                  </span>
                  <span>{slap.comments} COMMENTS</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </TabsContent>

      <TabsContent value="clips">
        {videos.length === 0 ? (
          <EmptyState emoji="🎬" text="No video clips uploaded yet." />
        ) : (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            data-ocid="profile.clips_list"
          >
            {videos.map((v, i) => (
              <ContentCard
                key={v.id}
                title={v.title}
                author={v.author}
                meta={`${v.duration} · ${v.views.toLocaleString()} views`}
                thumbnail={v.thumbnailUrl}
                index={i + 1}
                ocidPrefix="profile.clip"
              />
            ))}
          </div>
        )}
      </TabsContent>

      <TabsContent value="pix">
        {photos.length === 0 ? (
          <EmptyState emoji="📷" text="No photos uploaded yet." />
        ) : (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            data-ocid="profile.pix_list"
          >
            {photos.map((p, i) => (
              <ContentCard
                key={p.id}
                title={p.title}
                author={p.author}
                meta={`${p.slaps} slaps`}
                thumbnail={p.imageUrl}
                index={i + 1}
                ocidPrefix="profile.photo"
              />
            ))}
          </div>
        )}
      </TabsContent>

      <TabsContent value="library">
        {favorites.length === 0 ? (
          <EmptyState
            emoji="🔖"
            text="No favorited content yet. Start saving slaps, clips, and pix!"
          />
        ) : (
          <div className="space-y-3" data-ocid="profile.library_list">
            {favorites.map((fav, i) => (
              <div
                key={fav.id}
                data-ocid={`profile.library.item.${i + 1}`}
                className="bg-card rounded-xl border-2 border-border p-4 shadow-subtle flex items-center gap-3"
              >
                <Bookmark className="w-4 h-4 text-primary shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm font-bold text-foreground truncate">
                    {fav.label}
                  </p>
                  <p className="text-xs text-muted-foreground uppercase">
                    {fav.type}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
}

export default function ProfilePage() {
  const { userId } = useParams({ from: "/profiles/$userId" });
  const { isLoggedIn, principal } = useAuth();
  const { data: callerProfile } = useCallerProfile();
  const { data: profile, isLoading } = useGetUserProfile(userId);
  const { data: slaps } = useListSlaps();
  const { data: videos } = useListVideos();
  const { data: photos } = useListPhotos();
  const { data: favoritesRaw } = useListFavorites();
  const [editOpen, setEditOpen] = useState(false);

  const isOwnProfile = isLoggedIn && principal === userId;
  const isPrincipalId = userId.includes("-");

  const userSlaps =
    slaps?.filter((s) => s.authorHandle === profile?.handle) ?? [];

  // Filter videos and photos by uploader matching the profile user
  const featuredVideos =
    videos?.filter((v) => v.author === profile?.name) ?? [];
  const featuredPhotos =
    photos?.filter((p) => p.author === profile?.name) ?? [];

  // Map raw backend favorites into display items
  const favorites = (favoritesRaw ?? []).map((fav) => ({
    id: String(fav.id),
    label: `${fav.favoriteType} #${String(fav.targetId)}`,
    type: fav.favoriteType as string,
  }));

  if (isLoading) return <LoadingSpinner label="Loading profile..." />;

  // Own backend profile view
  if (isPrincipalId && isOwnProfile) {
    const avatarCfg = callerProfile?.avatarConfig
      ? parseAvatarConfig(callerProfile.avatarConfig)
      : DEFAULT_AVATAR_CONFIG;

    return (
      <div className="max-w-4xl mx-auto px-4 py-6" data-ocid="profile.page">
        <Link
          to="/profiles"
          data-ocid="profile.back_link"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-smooth mb-4 font-bold"
        >
          <ArrowLeft className="w-4 h-4" />
          ALL PROFILES
        </Link>

        {/* Own profile hero */}
        <div
          className="rounded-2xl p-6 mb-6 shadow-elevated"
          style={{
            background: `linear-gradient(135deg, ${avatarCfg.bgColor}cc 0%, oklch(0.55 0.22 270 / 0.85) 100%)`,
          }}
        >
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
            <div className="rounded-full overflow-hidden border-4 border-white shadow-elevated">
              <AvatarRenderer config={avatarCfg} size={100} />
            </div>
            <div className="flex-1 min-w-0 text-center sm:text-left">
              <h1
                className="font-display font-black text-white text-2xl md:text-3xl uppercase tracking-wide"
                style={{ textShadow: "2px 2px 0px rgba(0,0,0,0.3)" }}
              >
                {callerProfile?.username || "Your Profile"}
              </h1>
              {callerProfile?.bio && (
                <p className="text-white/90 text-sm mt-1">
                  {callerProfile.bio}
                </p>
              )}
            </div>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => setEditOpen(!editOpen)}
              data-ocid="profile.edit_button"
              className="font-black uppercase text-xs gap-1 shrink-0"
            >
              <Pencil className="w-3.5 h-3.5" />
              {editOpen ? "CANCEL" : "EDIT PROFILE"}
            </Button>
          </div>
        </div>

        {/* Edit panel */}
        {editOpen && (
          <div
            className="bg-card rounded-2xl border-2 border-primary/40 p-5 mb-6 shadow-elevated"
            data-ocid="profile.edit_panel"
          >
            <h2 className="font-display font-black text-foreground uppercase tracking-wide mb-4">
              ✏️ EDIT YOUR PROFILE
            </h2>
            <EditProfileForm
              initialUsername={callerProfile?.username ?? ""}
              initialBio={callerProfile?.bio ?? ""}
              initialAvatarConfig={callerProfile?.avatarConfig ?? ""}
              onSaved={() => setEditOpen(false)}
            />
          </div>
        )}

        {/* No profile yet */}
        {!callerProfile && !editOpen && (
          <div
            className="bg-card rounded-xl border-2 border-dashed border-primary/40 p-8 text-center mb-6"
            data-ocid="profile.empty_state"
          >
            <p className="text-5xl mb-3">🎭</p>
            <h3 className="font-display font-black text-foreground uppercase text-lg mb-1">
              Set Up Your Profile!
            </h3>
            <p className="text-muted-foreground text-sm mb-4">
              You haven't set up your TheSlap profile yet. Build your avatar and
              introduce yourself!
            </p>
            <Button
              type="button"
              onClick={() => setEditOpen(true)}
              data-ocid="profile.setup_button"
              className="font-display font-black uppercase"
            >
              GET STARTED
            </Button>
          </div>
        )}

        <ContentTabs
          userSlaps={userSlaps}
          videos={featuredVideos}
          photos={featuredPhotos}
          favorites={favorites}
        />
      </div>
    );
  }

  // Sample/cast profile
  if (!profile) {
    return (
      <div
        className="max-w-2xl mx-auto px-4 py-16 text-center"
        data-ocid="profile.error_state"
      >
        <p className="text-5xl mb-4">👀</p>
        <h2 className="font-display font-black text-foreground text-2xl uppercase mb-2">
          Profile Not Found
        </h2>
        <p className="text-muted-foreground mb-4">
          This person hasn't joined TheSlap yet.
        </p>
        <Link
          to="/profiles"
          data-ocid="profile.back_link"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary font-bold"
        >
          <ArrowLeft className="w-4 h-4" /> BACK TO PROFILES
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6" data-ocid="profile.page">
      <Link
        to="/profiles"
        data-ocid="profile.back_link"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-smooth mb-4 font-bold"
      >
        <ArrowLeft className="w-4 h-4" />
        ALL PROFILES
      </Link>

      {/* Profile Hero */}
      <div
        className="rounded-2xl p-6 mb-6 shadow-elevated"
        style={{
          background: `linear-gradient(135deg, ${profile.avatarColor}cc 0%, oklch(0.65 0.24 195 / 0.8) 100%)`,
        }}
      >
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
          <UserAvatar
            name={profile.name}
            avatarColor={profile.avatarColor}
            size="xl"
            isOnline={profile.isOnline}
          />
          <div className="flex-1 min-w-0 text-center sm:text-left">
            <h1
              className="font-display font-black text-white text-2xl md:text-3xl uppercase tracking-wide"
              style={{ textShadow: "2px 2px 0px rgba(0,0,0,0.3)" }}
            >
              {profile.name}
            </h1>
            <p className="text-white/70 text-sm">@{profile.handle}</p>
            {profile.isOnline && (
              <Badge
                variant="outline"
                className="border-green-400 text-green-200 text-xs mt-0.5"
              >
                ● ONLINE NOW
              </Badge>
            )}
            <p className="text-white/90 text-sm mt-2 leading-relaxed">
              {profile.bio}
            </p>
          </div>
        </div>

        <div className="flex gap-6 mt-5 pt-5 border-t border-white/20">
          <div className="flex items-center gap-2">
            <HandMetal className="w-5 h-5 text-white/80" />
            <div>
              <span className="font-black text-white text-lg">
                {profile.slaps.toLocaleString()}
              </span>
              <span className="text-white/60 text-xs ml-1">SLAPS</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-white/80" />
            <div>
              <span className="font-black text-white text-lg">
                {profile.followers.toLocaleString()}
              </span>
              <span className="text-white/60 text-xs ml-1">FOLLOWERS</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-white/80" />
            <div>
              <span className="font-black text-white text-lg">
                {userSlaps.length}
              </span>
              <span className="text-white/60 text-xs ml-1">POSTS</span>
            </div>
          </div>
        </div>
      </div>

      <ContentTabs
        userSlaps={userSlaps}
        videos={featuredVideos}
        photos={featuredPhotos}
        favorites={favorites}
      />
    </div>
  );
}
