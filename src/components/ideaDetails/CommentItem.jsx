"use client";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Edit2, Loader2, MoreVertical, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { Textarea } from "../ui/textarea";
import toast from "react-hot-toast";
import { format } from "timeago.js";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

export default function CommentItem({
  comment,
  editCommentAction,
  deleteCommentAction,
}) {
  // Get current user session
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  // Check if current user is comment owner
  const isOwner = user && comment.userId === user.id;

  // State for edit mode and edited text
  const [editMode, setEditMode] = useState(false);
  const [editedText, setEditedText] = useState(comment.text);

  const [loading, setLoading] = useState(false);

  // Handle save edited comment
  const handleSave = async () => {
    if (!isOwner) return;
    try {
      setLoading(true);
      await editCommentAction(comment._id, editedText, comment.ideaId);
      setEditMode(false);
      toast.success("Comment updated successfully!", {
        position: "bottom-center",
      });
    } catch (error) {
      console.error("Error saving comment:", error);
      toast.error("Failed to update comment.", {
        position: "bottom-center",
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle delete comment
  const handleDelete = async () => {
    if (!isOwner) return;

    try {
      setLoading(true);
      await deleteCommentAction(comment._id, comment.ideaId);
      toast.success("Comment deleted successfully!", {
        position: "bottom-center",
      });
    } catch (error) {
      toast.error("Failed to delete comment.", {
        position: "bottom-center",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div key={comment._id} className="flex gap-4 group">
      <Avatar className="h-10 w-10">
        <AvatarImage src={comment.userPhoto} />
        <AvatarFallback>{comment.userName[0]}</AvatarFallback>
      </Avatar>
      <div className="grow bg-muted/20 px-4 rounded-2xl relative">
        <div className="flex justify-between items-start">
          <div>
            <p className={"font-bold text-sm"}>
              {comment.userName} {isOwner && "(You)"}
            </p>
            <p className="text-xs text-muted-foreground mb-2">
              {format(comment.createdAt)} {comment?.edited && "(Edited)"}
            </p>
          </div>

          {/* Edit and Delete Actions */}
          {isOwner && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  className="gap-2"
                  onClick={() => setEditMode(true)}
                >
                  <Edit2 className="h-4 w-4" /> Edit
                </DropdownMenuItem>

                <Dialog>
                  <DialogTrigger asChild>
                    <DropdownMenuItem
                      className="gap-2 text-destructive"
                      onSelect={(e) => e.preventDefault()}
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DialogTrigger>

                  <DialogContent className="sm:max-w-sm">
                    <DialogHeader>
                      <DialogTitle>Delete comment?</DialogTitle>

                      <DialogDescription>
                        This action cannot be undone.
                      </DialogDescription>
                    </DialogHeader>

                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DialogClose>

                      <Button
                        disabled={loading}
                        variant="destructive"
                        onClick={handleDelete}
                      >
                        {loading ? (
                          <div className="flex items-center justify-center gap-2">
                            <Loader2 className="h-5 w-5 animate-spin" />
                            <span>Deleting...</span>
                          </div>
                        ) : (
                          "Delete"
                        )}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
        {editMode ? (
          <div>
            <Textarea
              placeholder="Edit your comment..."
              className="min-h-16"
              defaultValue={comment.text}
              onChange={(e) => setEditedText(e.target.value)}
            />
            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => setEditMode(false)}
              >
                Cancel
              </Button>
              <Button
                disabled={loading || editedText.trim() === comment.text}
                size="sm"
                className="mt-2"
                onClick={handleSave}
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Saving...</span>
                  </div>
                ) : (
                  "Save"
                )}
              </Button>
            </div>
          </div>
        ) : (
          <p className="text-sm leading-relaxed">{comment.text}</p>
        )}
      </div>
    </div>
  );
}
