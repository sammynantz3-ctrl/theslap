import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface Video {
    id: bigint;
    title: string;
    blob: ExternalBlob;
    createdAt: bigint;
    description: string;
    viewCount: bigint;
    uploaderPrincipal: Principal;
}
export interface Comment {
    id: bigint;
    createdAt: bigint;
    text: string;
    targetType: TargetType;
    targetId: bigint;
    authorPrincipal: Principal;
}
export interface Slap {
    id: bigint;
    createdAt: bigint;
    text: string;
    moodEmoji?: string;
    authorPrincipal: Principal;
}
export interface Favorite {
    id: bigint;
    ownerPrincipal: Principal;
    createdAt: bigint;
    favoriteType: FavoriteType;
    targetId: bigint;
}
export type UserId = Principal;
export type AvatarConfig = string;
export interface UserProfile {
    bio: string;
    username: string;
    avatarBlob?: ExternalBlob;
    createdAt: bigint;
    avatarConfig: AvatarConfig;
}
export interface Photo {
    id: bigint;
    title: string;
    blob: ExternalBlob;
    createdAt: bigint;
    uploaderPrincipal: Principal;
    caption: string;
    galleryId?: bigint;
}
export enum FavoriteType {
    video = "video",
    slap = "slap",
    photo = "photo"
}
export enum TargetType {
    video = "video",
    post = "post",
    photo = "photo"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addFavorite(targetId: bigint, favoriteType: FavoriteType): Promise<{
        __kind__: "ok";
        ok: Favorite;
    } | {
        __kind__: "err";
        err: string;
    }>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deleteComment(id: bigint): Promise<{
        __kind__: "ok";
        ok: boolean;
    } | {
        __kind__: "err";
        err: string;
    }>;
    deletePhoto(id: bigint): Promise<{
        __kind__: "ok";
        ok: boolean;
    } | {
        __kind__: "err";
        err: string;
    }>;
    deleteSlap(id: bigint): Promise<{
        __kind__: "ok";
        ok: boolean;
    } | {
        __kind__: "err";
        err: string;
    }>;
    deleteVideo(id: bigint): Promise<{
        __kind__: "ok";
        ok: boolean;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getPhoto(id: bigint): Promise<Photo | null>;
    getSlap(id: bigint): Promise<Slap | null>;
    getUserProfile(userId: UserId): Promise<UserProfile | null>;
    getVideo(id: bigint): Promise<Video | null>;
    isCallerAdmin(): Promise<boolean>;
    listComments(targetId: bigint, targetType: TargetType): Promise<Array<Comment>>;
    listFavorites(): Promise<Array<Favorite>>;
    listPhotos(): Promise<Array<Photo>>;
    listPhotosByUser(userId: Principal): Promise<Array<Photo>>;
    listProfiles(): Promise<Array<[UserId, UserProfile]>>;
    listSlaps(): Promise<Array<Slap>>;
    listVideos(): Promise<Array<Video>>;
    postComment(targetId: bigint, targetType: TargetType, text: string): Promise<{
        __kind__: "ok";
        ok: Comment;
    } | {
        __kind__: "err";
        err: string;
    }>;
    postPhoto(title: string, caption: string, blob: ExternalBlob, galleryId: bigint | null): Promise<{
        __kind__: "ok";
        ok: Photo;
    } | {
        __kind__: "err";
        err: string;
    }>;
    postSlap(text: string, moodEmoji: string | null): Promise<{
        __kind__: "ok";
        ok: Slap;
    } | {
        __kind__: "err";
        err: string;
    }>;
    postVideo(title: string, description: string, blob: ExternalBlob): Promise<{
        __kind__: "ok";
        ok: Video;
    } | {
        __kind__: "err";
        err: string;
    }>;
    removeFavorite(targetId: bigint, favoriteType: FavoriteType): Promise<{
        __kind__: "ok";
        ok: boolean;
    } | {
        __kind__: "err";
        err: string;
    }>;
    saveCallerUserProfile(username: string, bio: string, avatarConfig: string): Promise<{
        __kind__: "ok";
        ok: UserProfile;
    } | {
        __kind__: "err";
        err: string;
    }>;
    seedSampleComments(): Promise<void>;
}
