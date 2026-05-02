import { LoadingSpinner } from "@/components/LoadingSpinner";
import { PhotoCard } from "@/components/PhotoCard";
import { SlapCard } from "@/components/SlapCard";
import { SlapComposer } from "@/components/SlapComposer";
import { UserAvatar } from "@/components/UserAvatar";
import { VideoCard } from "@/components/VideoCard";
import {
  useListPhotos,
  useListSlaps,
  useListVideos,
  useUserProfiles,
} from "@/hooks/use-backend";
import { Link } from "@tanstack/react-router";
import { Film, HandMetal, Hash, Image, TrendingUp, Wifi } from "lucide-react";

const TRENDING_TAGS = [
  "#HAsings",
  "#CatValentine",
  "#HollywoodArts",
  "#Trina",
  "#BeckFilms",
  "#JadeWest",
];

function SectionHeader({
  icon,
  label,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
}) {
  return (
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-2">
        <div className="w-1.5 h-7 rounded-full bg-primary" />
        <span className="flex items-center gap-2 font-display font-black text-foreground uppercase tracking-widest text-base">
          {icon}
          {label}
        </span>
      </div>
      <Link
        to={href as "/" | "/clips" | "/pix" | "/profiles" | "/profiles/$userId"}
        data-ocid={`home.${label.toLowerCase().replace(/ /g, "_")}_view_all_link`}
        className="text-xs font-bold text-accent hover:text-primary transition-smooth"
      >
        SEE ALL →
      </Link>
    </div>
  );
}

export default function HomePage() {
  const { data: slaps, isLoading: slapsLoading } = useListSlaps();
  const { data: videos, isLoading: videosLoading } = useListVideos();
  const { data: photos, isLoading: photosLoading } = useListPhotos();
  const { data: profiles } = useUserProfiles();

  const onlineProfiles = profiles?.filter((p) => p.isOnline) ?? [];
  const recentSlaps = slaps?.slice(0, 4) ?? [];
  const recentVideos = videos?.slice(0, 3) ?? [];
  const recentPhotos = photos?.slice(0, 4) ?? [];

  return (
    <div className="max-w-6xl mx-auto px-4 py-6" data-ocid="home.page">
      {/* HERO BANNER */}
      <div
        className="rounded-2xl overflow-hidden mb-8 relative shadow-elevated"
        style={{ minHeight: 140 }}
      >
        <img
          src="/assets/generated/theslap-hero-bg.dim_1200x400.jpg"
          alt="TheSlap banner"
          className="w-full object-cover"
          style={{ maxHeight: 180 }}
        />
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-1"
          style={{
            background:
              "linear-gradient(105deg, oklch(0.6 0.28 15 / 0.82) 0%, oklch(0.65 0.24 195 / 0.65) 100%)",
          }}
        >
          <h1
            className="font-display font-black text-white text-4xl md:text-6xl uppercase tracking-wider"
            style={{ textShadow: "4px 4px 0px rgba(0,0,0,0.35)" }}
          >
            THE<span style={{ color: "oklch(0.95 0.18 85)" }}>SLAP</span>
          </h1>
          <p
            className="text-white/90 text-sm md:text-base font-display font-bold uppercase tracking-widest"
            style={{ textShadow: "1px 1px 3px rgba(0,0,0,0.5)" }}
          >
            What's happening at Hollywood Arts?
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* ── LEFT SIDEBAR ── */}
        <aside className="lg:col-span-1 space-y-4">
          {/* Trending */}
          <div className="bg-card rounded-xl border-2 border-border shadow-subtle p-4">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-4 h-4 text-primary" />
              <h2 className="font-display font-black text-foreground uppercase text-sm tracking-wide">
                TRENDING
              </h2>
            </div>
            <div className="flex flex-col gap-1.5">
              {TRENDING_TAGS.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  data-ocid="home.trending_tag"
                  className="text-left text-sm font-bold text-accent hover:text-primary transition-smooth px-3 py-1.5 bg-accent/10 hover:bg-primary/10 rounded-lg"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="bg-card rounded-xl border-2 border-border shadow-subtle p-4">
            <div className="flex items-center gap-2 mb-3">
              <Hash className="w-4 h-4 text-primary" />
              <h2 className="font-display font-black text-foreground uppercase text-sm tracking-wide">
                STATS
              </h2>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Slaps</span>
                <span className="font-bold text-primary">12,847</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Members</span>
                <span className="font-bold text-primary">6</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Clips</span>
                <span className="font-bold text-primary">6</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Photos</span>
                <span className="font-bold text-primary">6</span>
              </div>
            </div>
          </div>
        </aside>

        {/* ── MAIN FEED ── */}
        <main className="lg:col-span-2 space-y-8">
          {/* Compose Box */}
          <SlapComposer />

          {/* LATEST SLAPS */}
          <section data-ocid="home.slaps_section">
            <SectionHeader
              icon={<HandMetal className="w-4 h-4 text-primary" />}
              label="LATEST SLAPS"
              href="/"
            />
            {slapsLoading ? (
              <LoadingSpinner label="Loading slaps..." />
            ) : recentSlaps.length === 0 ? (
              <div
                className="bg-card rounded-xl border-2 border-dashed border-border p-8 text-center"
                data-ocid="home.slaps_empty_state"
              >
                <HandMetal className="w-10 h-10 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground font-bold">
                  No slaps yet. Be the first!
                </p>
              </div>
            ) : (
              <div className="space-y-3" data-ocid="home.slaps_list">
                {recentSlaps.map((slap, i) => (
                  <SlapCard key={slap.id} slap={slap} index={i + 1} />
                ))}
              </div>
            )}
          </section>

          {/* FRESH CLIPS */}
          <section data-ocid="home.clips_section">
            <SectionHeader
              icon={<Film className="w-4 h-4 text-accent" />}
              label="FRESH CLIPS"
              href="/clips"
            />
            {videosLoading ? (
              <LoadingSpinner label="Loading clips..." />
            ) : recentVideos.length === 0 ? (
              <div
                className="bg-card rounded-xl border-2 border-dashed border-border p-8 text-center"
                data-ocid="home.clips_empty_state"
              >
                <Film className="w-10 h-10 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground font-bold">No clips yet.</p>
              </div>
            ) : (
              <div
                className="grid grid-cols-1 sm:grid-cols-3 gap-3"
                data-ocid="home.clips_list"
              >
                {recentVideos.map((video, i) => (
                  <VideoCard key={video.id} video={video} index={i + 1} />
                ))}
              </div>
            )}
          </section>

          {/* PIX */}
          <section data-ocid="home.pix_section">
            <SectionHeader
              icon={<Image className="w-4 h-4 text-primary" />}
              label="PIX"
              href="/pix"
            />
            {photosLoading ? (
              <LoadingSpinner label="Loading pix..." />
            ) : recentPhotos.length === 0 ? (
              <div
                className="bg-card rounded-xl border-2 border-dashed border-border p-8 text-center"
                data-ocid="home.pix_empty_state"
              >
                <Image className="w-10 h-10 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground font-bold">
                  No photos yet.
                </p>
              </div>
            ) : (
              <div
                className="grid grid-cols-2 sm:grid-cols-4 gap-3"
                data-ocid="home.pix_list"
              >
                {recentPhotos.map((photo, i) => (
                  <PhotoCard key={photo.id} photo={photo} index={i + 1} />
                ))}
              </div>
            )}
          </section>
        </main>

        {/* ── RIGHT SIDEBAR ── */}
        <aside className="lg:col-span-1 space-y-4">
          {/* Who's Online */}
          <div className="bg-card rounded-xl border-2 border-border shadow-subtle p-4">
            <div className="flex items-center gap-2 mb-3">
              <Wifi className="w-4 h-4 text-green-500" />
              <h2 className="font-display font-black text-foreground uppercase text-sm tracking-wide">
                WHO'S ONLINE
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {onlineProfiles.map((profile) => (
                <div
                  key={profile.id}
                  className="flex flex-col items-center gap-1 text-center"
                >
                  <UserAvatar
                    name={profile.name}
                    avatarColor={profile.avatarColor}
                    size="lg"
                    isOnline={true}
                  />
                  <span className="text-xs font-bold text-foreground leading-tight">
                    {profile.name.split(" ")[0]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Members */}
          <div className="bg-card rounded-xl border-2 border-border shadow-subtle p-4">
            <div className="flex items-center gap-2 mb-3">
              <HandMetal className="w-4 h-4 text-primary" />
              <h2 className="font-display font-black text-foreground uppercase text-sm tracking-wide">
                MEMBERS
              </h2>
            </div>
            <p className="text-xs text-muted-foreground">
              6 Hollywood Arts students are on TheSlap.
            </p>
            <Link
              to="/profiles"
              data-ocid="home.view_profiles_link"
              className="mt-2 block text-xs font-bold text-accent hover:text-primary transition-smooth"
            >
              View all profiles →
            </Link>
          </div>

          {/* Quick links to sections */}
          <div className="bg-card rounded-xl border-2 border-border shadow-subtle p-4">
            <h2 className="font-display font-black text-foreground uppercase text-sm tracking-wide mb-3">
              EXPLORE
            </h2>
            <div className="flex flex-col gap-2">
              <Link
                to="/clips"
                data-ocid="home.explore_clips_link"
                className="flex items-center gap-2 text-sm font-bold text-foreground hover:text-primary transition-smooth px-3 py-2 bg-muted rounded-lg hover:bg-primary/10"
              >
                <Film className="w-4 h-4 text-accent" />
                Video Clips
              </Link>
              <Link
                to="/pix"
                data-ocid="home.explore_pix_link"
                className="flex items-center gap-2 text-sm font-bold text-foreground hover:text-primary transition-smooth px-3 py-2 bg-muted rounded-lg hover:bg-primary/10"
              >
                <Image className="w-4 h-4 text-primary" />
                Photo Gallery
              </Link>
              <Link
                to="/profiles"
                data-ocid="home.explore_profiles_link"
                className="flex items-center gap-2 text-sm font-bold text-foreground hover:text-primary transition-smooth px-3 py-2 bg-muted rounded-lg hover:bg-primary/10"
              >
                <HandMetal className="w-4 h-4 text-primary" />
                All Profiles
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
