"use server";

import { getToken } from "../serverUtils";

// Fetch Comments for an idea (Private)
export const fetchCommentsByIdeaId = async (ideaId) => {
  const token = await getToken();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/comments?ideaId=${ideaId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  const data = await res.json();
  return data || [];
};

// Fetch Comments for User (Private)
export const fetchCommentsByUserId = async (userId) => {
  const token = await getToken();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/comments?userId=${userId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  const data = await res.json();
  return data || [];
};
