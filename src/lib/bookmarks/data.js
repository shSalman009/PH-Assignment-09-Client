"use server";

import { getToken } from "../serverUtils";

// Fetch Comments for an idea (Private)
export const fetchBookmarks = async () => {
  try {
    const token = await getToken();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/bookmarks`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const data = await res.json();
    return data || [];
  } catch (error) {
    return [];
  }
};
