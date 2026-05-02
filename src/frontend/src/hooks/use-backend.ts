import {
  type Video as BackendVideo,
  type ExternalBlob,
  FavoriteType,
  createActor,
} from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export interface Slap {
  id: string;
  author: string;
  authorHandle: string;
  avatarColor: string;
  content: string;
  timestamp: string;
  slaps: number;
  comments: number;
  emoji?: string;
}

export interface Video {
  id: string;
  title: string;
  description?: string;
  author: string;
  thumbnailUrl: string;
  videoUrl?: string;
  views: number;
  slaps: number;
  comments: number;
  duration: string;
  blob?: ExternalBlob;
}

export interface Photo {
  id: string;
  title: string;
  author: string;
  imageUrl: string;
  caption?: string;
  slaps: number;
  comments: number;
}

export interface UserProfile {
  id: string;
  name: string;
  handle: string;
  bio: string;
  avatarColor: string;
  slaps: number;
  followers: number;
  isOnline: boolean;
}

const SAMPLE_SLAPS: Slap[] = [
  {
    id: "1",
    author: "Tori Vega",
    authorHandle: "torivega",
    avatarColor: "#e84e0f",
    content:
      "JUST SLAPPED! Check out my new song tonight at Hollywood Arts! Total smash! 🎤💥",
    timestamp: "3m ago",
    slaps: 22,
    comments: 45,
    emoji: "🤩",
  },
  {
    id: "2",
    author: "Jade West",
    authorHandle: "jadewest",
    avatarColor: "#1a1a2e",
    content: "Ugh, Trina's singing again. Someone make it stop. 😩",
    timestamp: "12m ago",
    slaps: 147,
    comments: 5,
    emoji: "😒",
  },
  {
    id: "3",
    author: "Beck Oliver",
    authorHandle: "beck",
    avatarColor: "#2d6a4f",
    content:
      "New film project dropping this Friday. It's gonna be epic. Trust me on this one. 🎬",
    timestamp: "1h ago",
    slaps: 89,
    comments: 23,
    emoji: "😎",
  },
  {
    id: "4",
    author: "Cat Valentine",
    authorHandle: "catvalen",
    avatarColor: "#d63384",
    content:
      "My brother made me a sandwich today and it was SO good! He put little stars on it! ⭐🥪",
    timestamp: "2h ago",
    slaps: 201,
    comments: 67,
    emoji: "🐱",
  },
  {
    id: "5",
    author: "Andre Harris",
    authorHandle: "andre",
    avatarColor: "#5c3d11",
    content:
      "Just finished recording a new track. This one's for real though. Hollywood is gonna hear from me! 🎹🔥",
    timestamp: "3h ago",
    slaps: 312,
    comments: 45,
    emoji: "🎵",
  },
  {
    id: "6",
    author: "Robbie Shapiro",
    authorHandle: "robbie",
    avatarColor: "#6a0dad",
    content:
      "Rex says I'm the funniest person at Hollywood Arts. He's right, obviously. 🎭",
    timestamp: "4h ago",
    slaps: 14,
    comments: 88,
    emoji: "🤓",
  },
];

const SAMPLE_VIDEOS: Video[] = [
  {
    id: "1",
    title: "Andre's Latest Track",
    author: "Andre Harris",
    thumbnailUrl: "/assets/generated/theslap-hero-bg.dim_1200x400.jpg",
    views: 4521,
    slaps: 312,
    comments: 45,
    duration: "3:24",
  },
  {
    id: "2",
    title: "Tori's Acoustic Cover",
    author: "Tori Vega",
    thumbnailUrl: "/assets/generated/theslap-hero-bg.dim_1200x400.jpg",
    views: 8120,
    slaps: 505,
    comments: 92,
    duration: "2:58",
  },
  {
    id: "3",
    title: "Beck's Short Film Teaser",
    author: "Beck Oliver",
    thumbnailUrl: "/assets/generated/theslap-hero-bg.dim_1200x400.jpg",
    views: 2300,
    slaps: 140,
    comments: 30,
    duration: "1:15",
  },
  {
    id: "4",
    title: "Hollywood Arts Showcase 2011",
    author: "Erwin Sikowitz",
    thumbnailUrl: "/assets/generated/theslap-hero-bg.dim_1200x400.jpg",
    views: 15000,
    slaps: 890,
    comments: 210,
    duration: "8:42",
  },
  {
    id: "5",
    title: "Cat's Dance Tutorial",
    author: "Cat Valentine",
    thumbnailUrl: "/assets/generated/theslap-hero-bg.dim_1200x400.jpg",
    views: 6700,
    slaps: 430,
    comments: 76,
    duration: "4:11",
  },
  {
    id: "6",
    title: "Jade Reads Her Play",
    author: "Jade West",
    thumbnailUrl: "/assets/generated/theslap-hero-bg.dim_1200x400.jpg",
    views: 1100,
    slaps: 77,
    comments: 120,
    duration: "5:50",
  },
];

const SAMPLE_PHOTOS: Photo[] = [
  {
    id: "1",
    title: "Backstage at the Showcase!",
    author: "Tori Vega",
    imageUrl: "/assets/generated/theslap-hero-bg.dim_1200x400.jpg",
    slaps: 88,
    comments: 12,
  },
  {
    id: "2",
    title: "Rex's new outfit 😂",
    author: "Robbie Shapiro",
    imageUrl: "/assets/generated/theslap-hero-bg.dim_1200x400.jpg",
    slaps: 55,
    comments: 34,
  },
  {
    id: "3",
    title: "Hollywood Arts hallway vibes",
    author: "Beck Oliver",
    imageUrl: "/assets/generated/theslap-hero-bg.dim_1200x400.jpg",
    slaps: 120,
    comments: 8,
  },
  {
    id: "4",
    title: "My new hair 💕",
    author: "Cat Valentine",
    imageUrl: "/assets/generated/theslap-hero-bg.dim_1200x400.jpg",
    slaps: 299,
    comments: 67,
  },
  {
    id: "5",
    title: "Sikowitz class today...",
    author: "Tori Vega",
    imageUrl: "/assets/generated/theslap-hero-bg.dim_1200x400.jpg",
    slaps: 44,
    comments: 15,
  },
  {
    id: "6",
    title: "Dark Clouds premiere night",
    author: "Jade West",
    imageUrl: "/assets/generated/theslap-hero-bg.dim_1200x400.jpg",
    slaps: 190,
    comments: 42,
  },
];

const SAMPLE_PROFILES: UserProfile[] = [
  {
    id: "1",
    name: "Tori Vega",
    handle: "torivega",
    bio: "Singer. Actress. Hollywood Arts student. I love performing! 🎤",
    avatarColor: "#e84e0f",
    slaps: 892,
    followers: 1204,
    isOnline: true,
  },
  {
    id: "2",
    name: "Jade West",
    handle: "jadewest",
    bio: "Playwright. Dark artiste. Don't annoy me.",
    avatarColor: "#1a1a2e",
    slaps: 1247,
    followers: 987,
    isOnline: true,
  },
  {
    id: "3",
    name: "Beck Oliver",
    handle: "beck",
    bio: "Actor. Filmmaker. Living in my van by choice. 🎬",
    avatarColor: "#2d6a4f",
    slaps: 654,
    followers: 1560,
    isOnline: false,
  },
  {
    id: "4",
    name: "Cat Valentine",
    handle: "catvalen",
    bio: "I like red velvet cake and my brother! 🐱",
    avatarColor: "#d63384",
    slaps: 2103,
    followers: 2341,
    isOnline: true,
  },
  {
    id: "5",
    name: "Andre Harris",
    handle: "andre",
    bio: "Music is my life. Producer. Songwriter. Future Grammy winner. 🎹",
    avatarColor: "#5c3d11",
    slaps: 781,
    followers: 1890,
    isOnline: false,
  },
  {
    id: "6",
    name: "Robbie Shapiro",
    handle: "robbie",
    bio: "Actor. Ventriloquist. Rex is my best friend. 🎭",
    avatarColor: "#6a0dad",
    slaps: 423,
    followers: 512,
    isOnline: true,
  },
];

export function useListSlaps() {
  const { isFetching } = useActor(createActor);
  return useQuery<Slap[]>({
    queryKey: ["slaps"],
    queryFn: async () => SAMPLE_SLAPS,
    enabled: !isFetching,
    staleTime: 30_000,
  });
}

export function useListVideos() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Video[]>({
    queryKey: ["videos"],
    queryFn: async () => {
      if (!actor) return SAMPLE_VIDEOS;
      try {
        const raw = await actor.listVideos();
        if (!raw.length) return SAMPLE_VIDEOS;
        return raw.map((v: BackendVideo, i: number) => ({
          id: String(v.id),
          title: v.title,
          description: v.description,
          author: `${v.uploaderPrincipal.toText().slice(0, 12)}...`,
          thumbnailUrl: "/assets/generated/theslap-hero-bg.dim_1200x400.jpg",
          videoUrl: v.blob.getDirectURL(),
          views: Number(v.viewCount),
          slaps: 0,
          comments: 0,
          duration: "0:00",
          blob: v.blob,
          index: i,
        }));
      } catch {
        return SAMPLE_VIDEOS;
      }
    },
    enabled: !isFetching,
    staleTime: 30_000,
  });
}

export function useListPhotos() {
  const { isFetching } = useActor(createActor);
  return useQuery<Photo[]>({
    queryKey: ["photos"],
    queryFn: async () => SAMPLE_PHOTOS,
    enabled: !isFetching,
    staleTime: 30_000,
  });
}

export function useUserProfiles() {
  const { isFetching } = useActor(createActor);
  return useQuery<UserProfile[]>({
    queryKey: ["profiles"],
    queryFn: async () => SAMPLE_PROFILES,
    enabled: !isFetching,
    staleTime: 30_000,
  });
}

export function usePostVideo() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      title,
      description,
      blob,
    }: {
      title: string;
      description: string;
      blob: ExternalBlob;
    }) => {
      if (!actor) throw new Error("Not connected");
      const result = await actor.postVideo(title, description, blob);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["videos"] });
    },
  });
}

export function useGetVideo(id: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Video | null>({
    queryKey: ["video", id],
    queryFn: async () => {
      if (!actor || !id) return null;
      try {
        const v = await actor.getVideo(BigInt(id));
        if (!v) return null;
        return {
          id: String(v.id),
          title: v.title,
          description: v.description,
          author: `${v.uploaderPrincipal.toText().slice(0, 12)}...`,
          thumbnailUrl: "/assets/generated/theslap-hero-bg.dim_1200x400.jpg",
          videoUrl: v.blob.getDirectURL(),
          views: Number(v.viewCount),
          slaps: 0,
          comments: 0,
          duration: "0:00",
          blob: v.blob,
        };
      } catch {
        return null;
      }
    },
    enabled: !!id && !isFetching,
    staleTime: 30_000,
  });
}

export function useGetUserProfile(userId: string) {
  const { isFetching } = useActor(createActor);
  return useQuery<UserProfile | null>({
    queryKey: ["profile", userId],
    queryFn: async () => SAMPLE_PROFILES.find((p) => p.id === userId) ?? null,
    enabled: !!userId && !isFetching,
    staleTime: 30_000,
  });
}
export function useCallerProfile() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["caller-profile"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !isFetching,
    staleTime: 0,
  });
}

export function useGetBackendUserProfile(userId: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["backend-profile", userId],
    queryFn: async () => {
      if (!actor || !userId) return null;
      // userId is principal text - import Principal
      const { Principal } = await import("@icp-sdk/core/principal");
      return actor.getUserProfile(Principal.fromText(userId));
    },
    enabled: !!actor && !isFetching && !!userId,
    staleTime: 30_000,
  });
}

export function useListBackendProfiles() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["backend-profiles"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listProfiles();
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

export function useListFavorites() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["favorites"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listFavorites();
    },
    enabled: !!actor && !isFetching,
    staleTime: 15_000,
  });
}

export { FavoriteType };
