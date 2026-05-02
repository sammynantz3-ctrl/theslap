import List "mo:core/List";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import AccessControl "mo:caffeineai-authorization/access-control";
import Storage "mo:caffeineai-object-storage/Storage";
import Types "../types/photo";
import PhotoLib "../lib/photo";

mixin (
  accessControlState : AccessControl.AccessControlState,
  photos : List.List<Types.Photo>,
  nextPhotoId : { var value : Nat },
  photoSeeded : { var value : Bool },
) {
  /// Seed sample photos on first deploy
  func seedPhotos() {
    if (photoSeeded.value) return;
    photoSeeded.value := true;
    let sampleBlob : Storage.ExternalBlob = "";
    let sysTime = Time.now();
    ignore PhotoLib.createPhoto(photos, nextPhotoId.value, "Hollywood Arts Hallway", "The famous hallway where it all goes down 🎭", sampleBlob, Principal.fromText("aaaaa-aa"), ?1, sysTime);
    nextPhotoId.value += 1;
    ignore PhotoLib.createPhoto(photos, nextPhotoId.value, "Sikowitz's Class", "Today's exercise: speak in only movie quotes. Classic.", sampleBlob, Principal.fromText("aaaaa-aa"), ?1, sysTime - 86_400_000_000_000);
    nextPhotoId.value += 1;
    ignore PhotoLib.createPhoto(photos, nextPhotoId.value, "Jade's Art Installation", "My latest masterpiece. If you don't get it, that's on you.", sampleBlob, Principal.fromText("aaaaa-aa"), ?2, sysTime - 172_800_000_000_000);
    nextPhotoId.value += 1;
    ignore PhotoLib.createPhoto(photos, nextPhotoId.value, "The Slap Rooftop", "Sunset from the roof. Gang's all here 🌅", sampleBlob, Principal.fromText("aaaaa-aa"), ?1, sysTime - 259_200_000_000_000);
    nextPhotoId.value += 1;
  };

  seedPhotos();

  /// Post a new photo (authenticated)
  public shared ({ caller }) func postPhoto(
    title : Text,
    caption : Text,
    blob : Storage.ExternalBlob,
    galleryId : ?Nat,
  ) : async { #ok : Types.Photo; #err : Text } {
    if (caller.isAnonymous()) {
      return #err("Authentication required to post a photo");
    };
    let photo = PhotoLib.createPhoto(photos, nextPhotoId.value, title, caption, blob, caller, galleryId, Time.now());
    nextPhotoId.value += 1;
    #ok(photo);
  };

  /// List all photos, newest first
  public query func listPhotos() : async [Types.Photo] {
    PhotoLib.listPhotos(photos);
  };

  /// Get a single photo by ID
  public query func getPhoto(id : Nat) : async ?Types.Photo {
    PhotoLib.getPhoto(photos, id);
  };

  /// List all photos uploaded by a specific user (their gallery)
  public query func listPhotosByUser(userId : Principal) : async [Types.Photo] {
    PhotoLib.listPhotosByUser(photos, userId);
  };

  /// Delete a photo (only the uploader can delete)
  public shared ({ caller }) func deletePhoto(id : Nat) : async { #ok : Bool; #err : Text } {
    switch (PhotoLib.getPhoto(photos, id)) {
      case null { #err("Photo not found") };
      case (?p) {
        if (not Principal.equal(p.uploaderPrincipal, caller)) {
          return #err("Only the uploader can delete this photo");
        };
        let filtered = photos.filter(func(x) { x.id != id });
        photos.clear();
        photos.append(filtered);
        #ok(true);
      };
    };
  };
};
