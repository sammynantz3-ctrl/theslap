import List "mo:core/List";
import Types "../types/favorite";
import Principal "mo:core/Principal";

module {
  public func addFavorite(
    favorites : List.List<Types.Favorite>,
    nextId : Nat,
    owner : Principal,
    targetId : Nat,
    favoriteType : Types.FavoriteType,
    now : Int,
  ) : Types.Favorite {
    let fav : Types.Favorite = {
      id = nextId;
      ownerPrincipal = owner;
      targetId;
      favoriteType;
      createdAt = now;
    };
    favorites.add(fav);
    fav;
  };

  public func removeFavorite(
    favorites : List.List<Types.Favorite>,
    owner : Principal,
    targetId : Nat,
    favoriteType : Types.FavoriteType,
  ) : Bool {
    let before = favorites.size();
    let keep = favorites.filter(func(f) {
      not (Principal.equal(f.ownerPrincipal, owner) and f.targetId == targetId and f.favoriteType == favoriteType)
    });
    if (keep.size() < before) {
      favorites.clear();
      favorites.append(keep);
      true;
    } else {
      false;
    };
  };

  public func listFavoritesByUser(
    favorites : List.List<Types.Favorite>,
    owner : Principal,
  ) : [Types.Favorite] {
    favorites.filter(func(f) { Principal.equal(f.ownerPrincipal, owner) }).toArray();
  };
};
