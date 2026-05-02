module {
  public type FavoriteType = { #slap; #video; #photo };

  public type Favorite = {
    id : Nat;
    ownerPrincipal : Principal;
    targetId : Nat;
    favoriteType : FavoriteType;
    createdAt : Int;
  };
};
