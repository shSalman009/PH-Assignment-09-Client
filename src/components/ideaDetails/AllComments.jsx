import { fetchCommentsByIdeaId } from "@/lib/comments/data";
import CommentItem from "./CommentItem";
import { deleteComment, editComment } from "@/lib/comments/actions";

export default async function AllComments({ ideaId }) {
  const comments = await fetchCommentsByIdeaId(ideaId);

  return (
    <div className="space-y-6">
      {comments.map((comment) => (
        <CommentItem
          key={comment._id}
          comment={comment}
          deleteCommentAction={deleteComment}
          editCommentAction={editComment}
        />
      ))}
    </div>
  );
}
