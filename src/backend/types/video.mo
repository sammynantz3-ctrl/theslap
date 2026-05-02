import Storage "mo:caffeineai-object-storage/Storage";

module {
  public type Video = {
    id : Nat;
    title : Text;
    description : Text;
    blob : Storage.ExternalBlob;
    uploaderPrincipal : Principal;
    viewCount : Nat;
    createdAt : Int;
  };
};
