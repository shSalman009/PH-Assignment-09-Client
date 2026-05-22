"use server";
import { getToken } from "../serverUtils";

// toggle bookmark action
export const toggleBookmarkAction = async (ideaId) => {
  try {
    const token = await getToken();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/bookmarks/toggle`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ideaId }),
      },
    );
    const data = await res.json();

    return data;
  } catch (error) {
  } finally {
  }
};
