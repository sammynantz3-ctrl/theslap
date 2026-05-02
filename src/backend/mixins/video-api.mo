import List "mo:core/List";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import AccessControl "mo:caffeineai-authorization/access-control";
import Storage "mo:caffeineai-object-storage/Storage";
import Types "../types/video";
import VideoLib "../lib/video";

mixin (
  accessControlState : AccessControl.AccessControlState,
  videos : List.List<Types.Video>,
  nextVideoId : { var value : Nat },
  videoSeeded : { var value : Bool },
) {
  /// Seed sample videos on first deploy
  func seedVideos() {
    if (videoSeeded.value) return;
    videoSeeded.value := true;
    let sampleBlob : Storage.ExternalBlob = "";
    let sysTime = Time.now();
    ignore VideoLib.createVideo(videos, nextVideoId.value, "The Slap Pilot", "The very first episode of TheSlap.com! Watch Tori Vega's first day at Hollywood Arts.", sampleBlob, Principal.fromText("aaaaa-aa"), sysTime);
    nextVideoId.value += 1;
    ignore VideoLib.createVideo(videos, nextVideoId.value, "Jade's Black Box Theater", "Jade West presents her original one-woman show. Dark, intense, and brilliant.", sampleBlob, Principal.fromText("aaaaa-aa"), sysTime - 86_400_000_000_000);
    nextVideoId.value += 1;
    ignore VideoLib.createVideo(videos, nextVideoId.value, "Beck's Short Film", "Beck Oliver's award-winning short film screened at the Hollywood Arts showcase.", sampleBlob, Principal.fromText("aaaaa-aa"), sysTime - 172_800_000_000_000);
    nextVideoId.value += 1;
    ignore VideoLib.createVideo(videos, nextVideoId.value, "Cat's Improv Class", "Cat Valentine and friends perform improv comedy. Warning: things get weird.", sampleBlob, Principal.fromText("aaaaa-aa"), sysTime - 259_200_000_000_000);
    nextVideoId.value += 1;
  };

  seedVideos();

  /// Post a new video clip (authenticated)
  public shared ({ caller }) func postVideo(
    title : Text,
    description : Text,
    blob : Storage.ExternalBlob,
  ) : async { #ok : Types.Video; #err : Text } {
    if (caller.isAnonymous()) {
      return #err("Authentication required to post a video");
    };
    let video = VideoLib.createVideo(videos, nextVideoId.value, title, description, blob, caller, Time.now());
    nextVideoId.value += 1;
    #ok(video);
  };

  /// List all videos, newest first
  public query func listVideos() : async [Types.Video] {
    VideoLib.listVideos(videos);
  };

  /// Get a single video by ID (increments view count)
  public shared func getVideo(id : Nat) : async ?Types.Video {
    ignore VideoLib.incrementViewCount(videos, id);
    VideoLib.getVideo(videos, id);
  };

  /// Delete a video (only the uploader can delete)
  public shared ({ caller }) func deleteVideo(id : Nat) : async { #ok : Bool; #err : Text } {
    switch (VideoLib.getVideo(videos, id)) {
      case null { #err("Video not found") };
      case (?v) {
        if (not Principal.equal(v.uploaderPrincipal, caller)) {
          return #err("Only the uploader can delete this video");
        };
        let filtered = videos.filter(func(x) { x.id != id });
        videos.clear();
        videos.append(filtered);
        #ok(true);
      };
    };
  };
};
