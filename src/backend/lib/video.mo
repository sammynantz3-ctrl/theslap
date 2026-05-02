import List "mo:core/List";
import Storage "mo:caffeineai-object-storage/Storage";
import Types "../types/video";

module {
  public func createVideo(
    videos : List.List<Types.Video>,
    nextId : Nat,
    title : Text,
    description : Text,
    blob : Storage.ExternalBlob,
    uploader : Principal,
    now : Int,
  ) : Types.Video {
    let video : Types.Video = {
      id = nextId;
      title;
      description;
      blob;
      uploaderPrincipal = uploader;
      viewCount = 0;
      createdAt = now;
    };
    videos.add(video);
    video;
  };

  public func listVideos(
    videos : List.List<Types.Video>,
  ) : [Types.Video] {
    videos.reverseValues() |> _.toArray();
  };

  public func getVideo(
    videos : List.List<Types.Video>,
    id : Nat,
  ) : ?Types.Video {
    videos.find(func(v) { v.id == id });
  };

  public func incrementViewCount(
    videos : List.List<Types.Video>,
    id : Nat,
  ) : Bool {
    switch (videos.findIndex(func(v) { v.id == id })) {
      case null { false };
      case (?idx) {
        let v = videos.at(idx);
        videos.put(idx, { v with viewCount = v.viewCount + 1 });
        true;
      };
    };
  };
};
