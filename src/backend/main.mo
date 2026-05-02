import Map "mo:core/Map";
import List "mo:core/List";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import MixinObjectStorage "mo:caffeineai-object-storage/Mixin";
import ProfileTypes "types/profile";
import Common "types/common";
import SlapTypes "types/slap";
import VideoTypes "types/video";
import PhotoTypes "types/photo";
import CommentTypes "types/comment";
import FavoriteTypes "types/favorite";
import ProfileMixin "mixins/profile-api";
import SlapMixin "mixins/slap-api";
import VideoMixin "mixins/video-api";
import PhotoMixin "mixins/photo-api";
import CommentMixin "mixins/comment-api";
import FavoriteMixin "mixins/favorite-api";

actor {
  // Authorization state
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Object storage infrastructure
  include MixinObjectStorage();

  // Profile state
  let userProfiles = Map.empty<Common.UserId, ProfileTypes.UserProfile>();
  include ProfileMixin(accessControlState, userProfiles);

  // Slap (status update) state
  let slaps = List.empty<SlapTypes.Slap>();
  let nextSlapId = { var value : Nat = 0 };
  include SlapMixin(accessControlState, slaps, nextSlapId);

  // Seed sample slaps on first deploy
  let sampleAuthor = Principal.fromText("2vxsx-fae"); // anonymous placeholder for sample data
  let baseTime : Int = 1_746_100_000_000_000_000;
  if (slaps.size() == 0) {
    slaps.add({ id = 0; text = "just posted a new video of me and Andre at Nozu! 🎥 you guys are gonna DIE"; moodEmoji = ?"😂"; authorPrincipal = sampleAuthor; createdAt = baseTime });
    slaps.add({ id = 1; text = "Sikowitz made us act like animals ALL class. I was a mongoose. Don't ask."; moodEmoji = ?"😩"; authorPrincipal = sampleAuthor; createdAt = baseTime + 3_600_000_000_000 });
    slaps.add({ id = 2; text = "new song dropping TONIGHT. stay tuned 🎶 #TheSlap"; moodEmoji = ?"🎵"; authorPrincipal = sampleAuthor; createdAt = baseTime + 7_200_000_000_000 });
    slaps.add({ id = 3; text = "Jade threw my backpack in the fountain AGAIN. I'm not even mad anymore, just impressed."; moodEmoji = ?"🙃"; authorPrincipal = sampleAuthor; createdAt = baseTime + 10_800_000_000_000 });
    slaps.add({ id = 4; text = "best day ever at Hollywood Arts. We literally staged a whole musical in the parking lot 🎭"; moodEmoji = ?"🌟"; authorPrincipal = sampleAuthor; createdAt = baseTime + 14_400_000_000_000 });
    nextSlapId.value := 5;
  };

  // Video state
  let videos = List.empty<VideoTypes.Video>();
  let nextVideoId = { var value : Nat = 0 };
  let videoSeeded = { var value : Bool = false };
  include VideoMixin(accessControlState, videos, nextVideoId, videoSeeded);

  // Photo state
  let photos = List.empty<PhotoTypes.Photo>();
  let nextPhotoId = { var value : Nat = 0 };
  let photoSeeded = { var value : Bool = false };
  include PhotoMixin(accessControlState, photos, nextPhotoId, photoSeeded);

  // Comment state
  let comments = List.empty<CommentTypes.Comment>();
  let nextCommentId = { var value : Nat = 0 };
  include CommentMixin(accessControlState, comments, nextCommentId);

  // Favorite state
  let favorites = List.empty<FavoriteTypes.Favorite>();
  let nextFavoriteId = { var value : Nat = 0 };
  include FavoriteMixin(accessControlState, favorites, nextFavoriteId);
};
