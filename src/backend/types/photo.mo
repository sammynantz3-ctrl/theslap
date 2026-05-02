import Storage "mo:caffeineai-object-storage/Storage";

module {
  public type Photo = {
    id : Nat;
    title : Text;
    caption : Text;
    blob : Storage.ExternalBlob;
    uploaderPrincipal : Principal;
    galleryId : ?Nat;
    createdAt : Int;
  };
};
