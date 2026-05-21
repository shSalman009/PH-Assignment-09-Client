"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import toast from "react-hot-toast";

export default function AddComments({ ideaId, ideaTitle, addCommentAction }) {
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(false);

  // Get Current User Session
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  // Handle Comment Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user && commentText.trim() !== "" && !isPending) {
      const payload = {
        ideaId,
        ideaTitle,
        userId: user.id,
        userName: user.name,
        userPhoto: user.image || "",
        createdAt: new Date().toISOString(),
        text: commentText,
      };

      setLoading(true);
      await addCommentAction(payload);
      setCommentText("");
      toast.success("Comment added successfully!", {
        position: "bottom-center",
      });
      setLoading(false);
    } else {
      toast.error("Something went wrong. Please try again.", {
        position: "bottom-center",
      });
    }
  };

  return (
    <div className="flex gap-4">
      <Avatar className="h-10 w-10">
        <AvatarImage src={user?.image || ""} />
        <AvatarFallback>
          {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
        </AvatarFallback>
      </Avatar>
      <form onSubmit={handleSubmit} className="grow space-y-2">
        <Textarea
          placeholder="Share your feedback or ask a question..."
          className="min-h-25"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <Button
          className="sm:float-start float-end"
          type="submit"
          disabled={loading || commentText.trim() === ""}
        >
          {loading ? "Posting..." : "Post Comment"}
        </Button>
      </form>
    </div>
  );
}
