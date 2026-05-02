import List "mo:core/List";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import AccessControl "mo:caffeineai-authorization/access-control";
import Types "../types/comment";
import CommentLib "../lib/comment";

mixin (
  accessControlState : AccessControl.AccessControlState,
  comments : List.List<Types.Comment>,
  nextCommentId : { var value : Nat },
) {
  /// Post a comment on a piece of content (max 500 chars)
  public shared ({ caller }) func postComment(
    targetId : Nat,
    targetType : Types.TargetType,
    text : Text,
  ) : async { #ok : Types.Comment; #err : Text } {
    if (caller.isAnonymous()) {
      return #err("Must be logged in to comment");
    };
    if (text.size() == 0) {
      return #err("Comment cannot be empty");
    };
    if (text.size() > 500) {
      return #err("Comment exceeds 500 character limit");
    };
    let id = nextCommentId.value;
    nextCommentId.value += 1;
    let comment = CommentLib.createComment(
      comments, id, targetId, targetType, text, caller, Time.now()
    );
    #ok(comment);
  };

  /// List comments for specific content, newest first
  public query func listComments(
    targetId : Nat,
    targetType : Types.TargetType,
  ) : async [Types.Comment] {
    CommentLib.listCommentsByTarget(comments, targetId, targetType);
  };

  /// Delete a comment — only the author can delete
  public shared ({ caller }) func deleteComment(id : Nat) : async { #ok : Bool; #err : Text } {
    if (caller.isAnonymous()) {
      return #err("Must be logged in to delete a comment");
    };
    switch (comments.find(func(c) { c.id == id })) {
      case null { #err("Comment not found") };
      case (?comment) {
        if (not Principal.equal(comment.authorPrincipal, caller)) {
          return #err("Only the author can delete this comment");
        };
        let before = comments.size();
        let keep = comments.filter(func(c) { c.id != id });
        comments.clear();
        comments.append(keep);
        #ok(comments.size() < before);
      };
    };
  };

  /// Seed sample comments on first deploy
  public shared func seedSampleComments() : async () {
    if (comments.size() > 0) { return };
    let sampleTargetId : Nat = 0;
    let sampleTargetType : Types.TargetType = #video;
    let anon = Principal.anonymous();
    let _ = CommentLib.createComment(comments, 0, sampleTargetId, sampleTargetType, "OMG this is SO amazing! Tori Vega is literally the best!", anon, 1_700_000_000_000_000_000);
    nextCommentId.value := 1;
    let _ = CommentLib.createComment(comments, 1, sampleTargetId, sampleTargetType, "Jade is so mean but I can't stop watching lol 😂", anon, 1_700_000_001_000_000_000);
    nextCommentId.value := 2;
    let _ = CommentLib.createComment(comments, 2, sampleTargetId, sampleTargetType, "Beck and Tori are my OTP forever!! #TheSlap", anon, 1_700_000_002_000_000_000);
    nextCommentId.value := 3;
  };
};
