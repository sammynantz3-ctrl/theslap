import List "mo:core/List";
import Types "../types/slap";

module {
  public func createSlap(
    slaps : List.List<Types.Slap>,
    nextId : Nat,
    text : Text,
    moodEmoji : ?Text,
    author : Principal,
    now : Int,
  ) : Types.Slap {
    let slap : Types.Slap = {
      id = nextId;
      text = text;
      moodEmoji = moodEmoji;
      authorPrincipal = author;
      createdAt = now;
    };
    slaps.add(slap);
    slap;
  };

  public func listSlaps(
    slaps : List.List<Types.Slap>,
  ) : [Types.Slap] {
    slaps.reverseValues().toArray();
  };

  public func getSlap(
    slaps : List.List<Types.Slap>,
    id : Nat,
  ) : ?Types.Slap {
    slaps.find(func(s) { s.id == id });
  };
};
