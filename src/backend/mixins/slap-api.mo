import List "mo:core/List";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import AccessControl "mo:caffeineai-authorization/access-control";
import Types "../types/slap";
import SlapLib "../lib/slap";

mixin (
  accessControlState : AccessControl.AccessControlState,
  slaps : List.List<Types.Slap>,
  nextSlapId : { var value : Nat },
) {
  /// Post a new slap (status update) — caller must be authenticated
  public shared ({ caller }) func postSlap(text : Text, moodEmoji : ?Text) : async { #ok : Types.Slap; #err : Text } {
    if (caller.isAnonymous()) {
      return #err("Must be logged in to post a slap");
    };
    if (text.size() == 0) {
      return #err("Slap text cannot be empty");
    };
    if (text.size() > 280) {
      return #err("Slap text cannot exceed 280 characters");
    };
    let id = nextSlapId.value;
    nextSlapId.value += 1;
    let slap = SlapLib.createSlap(slaps, id, text, moodEmoji, caller, Time.now());
    #ok(slap);
  };

  /// List all slaps, newest first — public
  public query func listSlaps() : async [Types.Slap] {
    SlapLib.listSlaps(slaps);
  };

  /// Get a single slap by ID — public
  public query func getSlap(id : Nat) : async ?Types.Slap {
    SlapLib.getSlap(slaps, id);
  };

  /// Delete a slap — only the author can delete their own slap
  public shared ({ caller }) func deleteSlap(id : Nat) : async { #ok : Bool; #err : Text } {
    if (caller.isAnonymous()) {
      return #err("Must be logged in to delete a slap");
    };
    switch (SlapLib.getSlap(slaps, id)) {
      case null { #err("Slap not found") };
      case (?slap) {
        if (not Principal.equal(slap.authorPrincipal, caller) and not AccessControl.isAdmin(accessControlState, caller)) {
          return #err("Only the author can delete their slap");
        };
        let sizeBefore = slaps.size();
        let filtered = slaps.filter(func(s) { s.id != id });
        slaps.clear();
        slaps.append(filtered);
        #ok(slaps.size() < sizeBefore);
      };
    };
  };
};
