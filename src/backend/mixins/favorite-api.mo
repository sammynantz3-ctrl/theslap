import List "mo:core/List";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import AccessControl "mo:caffeineai-authorization/access-control";
import Types "../types/favorite";
import FavoriteLib "../lib/favorite";

mixin (
  accessControlState : AccessControl.AccessControlState,
  favorites : List.List<Types.Favorite>,
  nextFavoriteId : { var value : Nat },
) {
  /// Add content to the caller's favorites
  public shared ({ caller }) func addFavorite(
    targetId : Nat,
    favoriteType : Types.FavoriteType,
  ) : async { #ok : Types.Favorite; #err : Text } {
    if (caller.isAnonymous()) {
      return #err("Must be logged in to add favorites");
    };
    // Prevent duplicates
    let exists = favorites.find(func(f) {
      Principal.equal(f.ownerPrincipal, caller) and f.targetId == targetId and f.favoriteType == favoriteType
    });
    switch (exists) {
      case (?f) { #ok(f) };
      case null {
        let id = nextFavoriteId.value;
        nextFavoriteId.value += 1;
        let fav = FavoriteLib.addFavorite(favorites, id, caller, targetId, favoriteType, Time.now());
        #ok(fav);
      };
    };
  };

  /// Remove content from the caller's favorites
  public shared ({ caller }) func removeFavorite(
    targetId : Nat,
    favoriteType : Types.FavoriteType,
  ) : async { #ok : Bool; #err : Text } {
    if (caller.isAnonymous()) {
      return #err("Must be logged in to remove favorites");
    };
    let removed = FavoriteLib.removeFavorite(favorites, caller, targetId, favoriteType);
    #ok(removed);
  };

  /// List the calling user's own favorites
  public query ({ caller }) func listFavorites() : async [Types.Favorite] {
    FavoriteLib.listFavoritesByUser(favorites, caller);
  };
};
