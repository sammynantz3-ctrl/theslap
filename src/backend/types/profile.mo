import Storage "mo:caffeineai-object-storage/Storage";

module {
  /// Avatar customization stored as JSON text
  public type AvatarConfig = Text;

  public type UserProfile = {
    username : Text;
    bio : Text;
    avatarConfig : AvatarConfig;
    avatarBlob : ?Storage.ExternalBlob;
    createdAt : Int;
  };
};
