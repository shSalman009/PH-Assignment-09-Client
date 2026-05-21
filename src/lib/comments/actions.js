import { revalidatePath } from "next/cache";
import { getToken } from "../serverUtils";

// Add Comment (Private)
export const addComment = async (payload) => {
  "use server";

  const token = await getToken();
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  if (res.ok) {
    revalidatePath(`/ideas/${payload.ideaId}`);
    return await res.json();
  } else {
    throw new Error("Failed to add comment");
  }
};

// Edit Comment (Private)
export const editComment = async (commentId, updatedText, ideaId) => {
  "use server";
  const token = await getToken();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/comments/${commentId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ text: updatedText }),
    },
  );
  if (res.ok) {
    revalidatePath(`/ideas/${ideaId}`);
    return await res.json();
  } else {
    throw new Error("Failed to edit comment");
  }
};

// Delete Comment (Private)
export const deleteComment = async (commentId, ideaId) => {
  "use server";
  const token = await getToken();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/comments/${commentId}?ideaId=${ideaId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  if (res.ok) {
    revalidatePath(`/ideas/${ideaId}`);
    return await res.json();
  } else {
    throw new Error("Failed to delete comment");
  }
};
