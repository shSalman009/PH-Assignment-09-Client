import { addComment } from "@/lib/comments/actions";
import AddComments from "./AddComments";
import AllComments from "./AllComments";

export default function CommentSystem({ ideaId, ideaTitle }) {
  return (
    <div className="space-y-8">
      <h3 className="text-2xl font-semibold">Discussion</h3>

      {/* Add Comment Input */}
      <AddComments
        ideaId={ideaId}
        addCommentAction={addComment}
        ideaTitle={ideaTitle}
      />

      {/* Comment List */}
      <AllComments ideaId={ideaId} ideaTitle={ideaTitle} />
    </div>
  );
}
