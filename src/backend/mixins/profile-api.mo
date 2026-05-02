import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import AccessControl "mo:caffeineai-authorization/access-control";
import Types "../types/profile";
import Common "../types/common";
import ProfileLib "../lib/profile";

mixin (
  accessControlState : AccessControl.AccessControlState,
  userProfiles : Map.Map<Common.UserId, Types.UserProfile>,
) {
  /// Get the calling user's own profile
  public query ({ caller }) func getCallerUserProfile() : async ?Types.UserProfile {
    ProfileLib.getProfile(userProfiles, caller);
  };

  /// Save/update the calling user's own profile (individual fields)
  public shared ({ caller }) func saveCallerUserProfile(
    username : Text,
    bio : Text,
    avatarConfig : Text,
  ) : async { #ok : Types.UserProfile; #err : Text } {
    if (caller.isAnonymous()) {
      return #err("Must be logged in to save a profile");
    };
    if (username.size() == 0) {
      return #err("Username cannot be empty");
    };
    let existing = ProfileLib.getProfile(userProfiles, caller);
    let createdAt = switch (existing) {
      case (?p) p.createdAt;
      case null Time.now();
    };
    let profile : Types.UserProfile = {
      username;
      bio;
      avatarConfig;
      avatarBlob = switch (existing) {
        case (?p) p.avatarBlob;
        case null null;
      };
      createdAt;
    };
    ProfileLib.saveProfile(userProfiles, caller, profile);
    #ok(profile);
  };

  /// Get any user's public profile
  public query func getUserProfile(userId : Common.UserId) : async ?Types.UserProfile {
    ProfileLib.getProfile(userProfiles, userId);
  };

  /// List all user profiles
  public query func listProfiles() : async [(Common.UserId, Types.UserProfile)] {
    ProfileLib.listProfiles(userProfiles);
  };
};
