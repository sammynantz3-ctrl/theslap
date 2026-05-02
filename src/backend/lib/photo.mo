import List "mo:core/List";
import Storage "mo:caffeineai-object-storage/Storage";
import Types "../types/photo";
import Principal "mo:core/Principal";

module {
  public func createPhoto(
    photos : List.List<Types.Photo>,
    nextId : Nat,
    title : Text,
    caption : Text,
    blob : Storage.ExternalBlob,
    uploader : Principal,
    galleryId : ?Nat,
    now : Int,
  ) : Types.Photo {
    let photo : Types.Photo = {
      id = nextId;
      title;
      caption;
      blob;
      uploaderPrincipal = uploader;
      galleryId;
      createdAt = now;
    };
    photos.add(photo);
    photo;
  };

  public func listPhotos(
    photos : List.List<Types.Photo>,
  ) : [Types.Photo] {
    photos.reverseValues() |> _.toArray();
  };

  public func getPhoto(
    photos : List.List<Types.Photo>,
    id : Nat,
  ) : ?Types.Photo {
    photos.find(func(p) { p.id == id });
  };

  public func listPhotosByUser(
    photos : List.List<Types.Photo>,
    uploader : Principal,
  ) : [Types.Photo] {
    photos.reverseValues()
      |> _.filter(func(p) { Principal.equal(p.uploaderPrincipal, uploader) })
      |> _.toArray();
  };
};
