module {
  public type TargetType = { #post; #video; #photo };

  public type Comment = {
    id : Nat;
    targetId : Nat;
    targetType : TargetType;
    text : Text;
    authorPrincipal : Principal;
    createdAt : Int;
  };
};
