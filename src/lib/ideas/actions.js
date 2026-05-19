import { revalidatePath } from "next/cache";

// Create Idea
export const createIdea = async (data) => {
  "use server";
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/ideas`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error("Failed to create idea");
  }
  return res.json();
};

// Update Idea
export const updateIdea = async (id, data) => {
  "use server";
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/ideas/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  );

  if (!res.ok) {
    throw new Error("Failed to update idea");
  }
  revalidatePath("/my-ideas");
  return res.json();
};

// Delete Idea
export const deleteIdea = async (id) => {
  "use server";
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/ideas/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  if (!res.ok) {
    throw new Error("Failed to delete idea");
  }
  revalidatePath("/my-ideas");
  return res.json();
};
