import List "mo:core/List";
import Types "../types/comment";

module {
  public func createComment(
    comments : List.List<Types.Comment>,
    nextId : Nat,
    targetId : Nat,
    targetType : Types.TargetType,
    text : Text,
    author : Principal,
    now : Int,
  ) : Types.Comment {
    let comment : Types.Comment = {
      id = nextId;
      targetId;
      targetType;
      text;
      authorPrincipal = author;
      createdAt = now;
    };
    comments.add(comment);
    comment;
  };

  public func listCommentsByTarget(
    comments : List.List<Types.Comment>,
    targetId : Nat,
    targetType : Types.TargetType,
  ) : [Types.Comment] {
    let filtered = comments.filter(func(c) {
      c.targetId == targetId and c.targetType == targetType
    });
    filtered.reverseValues().toArray();
  };
};
