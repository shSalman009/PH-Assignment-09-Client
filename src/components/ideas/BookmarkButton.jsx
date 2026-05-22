"use client";
import { useState } from "react";
import { Bookmark } from "lucide-react";

export default function BookmarkButton({
  toggleBookmarkAction,
  ideaId,
  isBookmarkedInitially,
}) {
  const [isBookmarked, setIsBookmarked] = useState(isBookmarkedInitially);
  const [loading, setLoading] = useState(false);

  const toggleBookmark = async () => {
    setIsBookmarked(!isBookmarked);
    setLoading(true);

    try {
      const data = await toggleBookmarkAction(ideaId);

      console.log(data);

      setIsBookmarked(data?.bookmarked);
    } catch (error) {
      setIsBookmarked(isBookmarked);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={toggleBookmark}
      disabled={loading}
      className="p-2 rounded-full transition-colors group"
    >
      <Bookmark
        className={`h-6 w-6 transition-all",
          ${isBookmarked ? "fill-primary text-primary scale-110" : "text-primary"}
            
            `}
      />
    </button>
  );
}
