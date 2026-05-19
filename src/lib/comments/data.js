// Fetch Comments for an idea
export const fetchCommentsByIdeaId = async (ideaId) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/comments?ideaId=${ideaId}`,
  );
  const data = await res.json();
  return data || [];
};
