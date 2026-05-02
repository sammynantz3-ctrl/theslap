import type { backendInterface, Video, Slap, Photo, Comment, Favorite, UserProfile, ExternalBlob, FavoriteType, TargetType, UserRole, _ImmutableObjectStorageCreateCertificateResult, _ImmutableObjectStorageRefillInformation, _ImmutableObjectStorageRefillResult } from "../backend";
import type { Principal } from "@icp-sdk/core/principal";

const fakePrincipal = { toText: () => "aaaaa-aa", toString: () => "aaaaa-aa" } as unknown as Principal;

const makeBlob = (url: string): ExternalBlob =>
  ({
    getDirectURL: () => url,
    getBytes: async () => new Uint8Array(),
    withUploadProgress: function (fn: (p: number) => void) { return this; },
  } as unknown as ExternalBlob);

const sampleVideos: Video[] = [
  {
    id: BigInt(1),
    title: "Tori's Audition Tape",
    blob: makeBlob("https://picsum.photos/seed/v1/640/360"),
    createdAt: BigInt(Date.now() - 1000 * 60 * 60 * 24 * 2),
    description: "Check out my audition for Hollywood Arts!",
    viewCount: BigInt(1234),
    uploaderPrincipal: fakePrincipal,
  },
  {
    id: BigInt(2),
    title: "Jade's One-Woman Show",
    blob: makeBlob("https://picsum.photos/seed/v2/640/360"),
    createdAt: BigInt(Date.now() - 1000 * 60 * 60 * 24),
    description: "My dark and twisted masterpiece. Don't steal it.",
    viewCount: BigInt(876),
    uploaderPrincipal: fakePrincipal,
  },
  {
    id: BigInt(3),
    title: "Beck's Guitar Cover",
    blob: makeBlob("https://picsum.photos/seed/v3/640/360"),
    createdAt: BigInt(Date.now() - 1000 * 60 * 60 * 3),
    description: "Just me and my guitar on a chill afternoon.",
    viewCount: BigInt(543),
    uploaderPrincipal: fakePrincipal,
  },
];

const sampleSlaps: Slap[] = [
  {
    id: BigInt(1),
    createdAt: BigInt(Date.now() - 1000 * 60 * 15),
    text: "Just nailed my vocal warm-ups! Ready for the showcase 🎤",
    moodEmoji: "🎶",
    authorPrincipal: fakePrincipal,
  },
  {
    id: BigInt(2),
    createdAt: BigInt(Date.now() - 1000 * 60 * 45),
    text: "Why does everyone think scissors are a great gift? They're not.",
    moodEmoji: "✂️",
    authorPrincipal: fakePrincipal,
  },
  {
    id: BigInt(3),
    createdAt: BigInt(Date.now() - 1000 * 60 * 120),
    text: "Robbie asked Rex if he wanted to be in my music video. Rex said no.",
    moodEmoji: "🎭",
    authorPrincipal: fakePrincipal,
  },
  {
    id: BigInt(4),
    createdAt: BigInt(Date.now() - 1000 * 60 * 200),
    text: "Cat made me try her weird red velvet pancakes. Actually amazing?? 😮",
    moodEmoji: "🥞",
    authorPrincipal: fakePrincipal,
  },
];

const samplePhotos: Photo[] = [
  {
    id: BigInt(1),
    title: "Backstage at Hollywood Arts",
    blob: makeBlob("https://picsum.photos/seed/p1/400/400"),
    createdAt: BigInt(Date.now() - 1000 * 60 * 60 * 5),
    uploaderPrincipal: fakePrincipal,
    caption: "Getting ready for the big performance!",
  },
  {
    id: BigInt(2),
    title: "Friday lunch at school",
    blob: makeBlob("https://picsum.photos/seed/p2/400/400"),
    createdAt: BigInt(Date.now() - 1000 * 60 * 60 * 10),
    uploaderPrincipal: fakePrincipal,
    caption: "Lunch with the crew. Tori spilled her smoothie again.",
  },
];

const sampleProfiles: Array<[Principal, UserProfile]> = [
  [fakePrincipal, { bio: "Singer, actress, aspiring superstar 🌟", username: "ToriVega", createdAt: BigInt(0), avatarConfig: "" }],
  [fakePrincipal, { bio: "I write plays. They're dark. Don't ask.", username: "JadeWest", createdAt: BigInt(0), avatarConfig: "" }],
  [fakePrincipal, { bio: "I love my cat Mr. Purple! 💜", username: "CatValentine", createdAt: BigInt(0), avatarConfig: "" }],
  [fakePrincipal, { bio: "Cool and collected. Also in a band.", username: "BeckOliver", createdAt: BigInt(0), avatarConfig: "" }],
];

export const mockBackend: backendInterface = {
  addFavorite: async (targetId, favoriteType) => ({
    __kind__: "ok",
    ok: { id: BigInt(99), ownerPrincipal: fakePrincipal, createdAt: BigInt(Date.now()), favoriteType, targetId },
  }),
  assignCallerUserRole: async () => undefined,
  deleteComment: async () => ({ __kind__: "ok", ok: true }),
  deletePhoto: async () => ({ __kind__: "ok", ok: true }),
  deleteSlap: async () => ({ __kind__: "ok", ok: true }),
  deleteVideo: async () => ({ __kind__: "ok", ok: true }),
  getCallerUserProfile: async () => ({
    bio: "Singer, actress, aspiring superstar 🌟",
    username: "ToriVega",
    createdAt: BigInt(0),
    avatarConfig: "",
  }),
  getCallerUserRole: async () => "user" as unknown as UserRole,
  getPhoto: async (id) => samplePhotos.find((p) => p.id === id) ?? null,
  getSlap: async (id) => sampleSlaps.find((s) => s.id === id) ?? null,
  getUserProfile: async () => ({ bio: "Hollywood Arts student", username: "ToriVega", createdAt: BigInt(0), avatarConfig: "" }),
  getVideo: async (id) => sampleVideos.find((v) => v.id === id) ?? null,
  isCallerAdmin: async () => false,
  listComments: async () => [
    { id: BigInt(1), createdAt: BigInt(Date.now() - 60000), text: "This is so good!! 😍", targetType: "video" as unknown as TargetType, targetId: BigInt(1), authorPrincipal: fakePrincipal },
    { id: BigInt(2), createdAt: BigInt(Date.now() - 120000), text: "You're amazing Tori!", targetType: "video" as unknown as TargetType, targetId: BigInt(1), authorPrincipal: fakePrincipal },
  ],
  listFavorites: async () => [],
  listPhotos: async () => samplePhotos,
  listPhotosByUser: async () => samplePhotos,
  listProfiles: async () => sampleProfiles,
  listSlaps: async () => sampleSlaps,
  listVideos: async () => sampleVideos,
  postComment: async (targetId, targetType, text) => ({
    __kind__: "ok",
    ok: { id: BigInt(99), createdAt: BigInt(Date.now()), text, targetType, targetId, authorPrincipal: fakePrincipal },
  }),
  postPhoto: async (title, caption, blob, galleryId) => ({
    __kind__: "ok",
    ok: { id: BigInt(99), title, caption, blob, createdAt: BigInt(Date.now()), uploaderPrincipal: fakePrincipal },
  }),
  postSlap: async (text, moodEmoji) => ({
    __kind__: "ok",
    ok: { id: BigInt(99), createdAt: BigInt(Date.now()), text, moodEmoji: moodEmoji ?? undefined, authorPrincipal: fakePrincipal },
  }),
  postVideo: async (title, description, blob) => ({
    __kind__: "ok",
    ok: { id: BigInt(99), title, description, blob, createdAt: BigInt(Date.now()), viewCount: BigInt(0), uploaderPrincipal: fakePrincipal },
  }),
  removeFavorite: async () => ({ __kind__: "ok", ok: true }),
  saveCallerUserProfile: async (username, bio, avatarConfig) => ({
    __kind__: "ok",
    ok: { username, bio, avatarConfig, createdAt: BigInt(Date.now()) },
  }),
  seedSampleComments: async () => undefined,
  _immutableObjectStorageBlobsAreLive: async (_hashes: Array<Uint8Array>) => [] as boolean[],
  _immutableObjectStorageBlobsToDelete: async () => [] as Uint8Array[],
  _immutableObjectStorageConfirmBlobDeletion: async (_blobs: Array<Uint8Array>) => undefined,
  _immutableObjectStorageCreateCertificate: async (_blobHash: string): Promise<_ImmutableObjectStorageCreateCertificateResult> => ({ method: "", blob_hash: "" }),
  _immutableObjectStorageRefillCashier: async (_info: _ImmutableObjectStorageRefillInformation | null): Promise<_ImmutableObjectStorageRefillResult> => ({}),
  _immutableObjectStorageUpdateGatewayPrincipals: async () => undefined,
  _initializeAccessControl: async () => undefined,
};
