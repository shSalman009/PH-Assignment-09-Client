"use server";

import { getToken } from "../serverUtils";

// Get all ideas from the API
export const fetchIdeas = async (searchValue) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/ideas?title=${searchValue}`,
  );
  const data = await res.json();
  return data || [];
};

// Get Trending Ideas
export const fetchTrendingIdeas = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/ideas/trending`,
  );
  const data = await res.json();
  return data || [];
};

// Get a single idea by ID (Private)
export const fetchIdeaById = async (id) => {
  try {
    const token = await getToken();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/ideas/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const data = await res.json();
    return data || null;
  } catch (error) {
    return null;
  }
};

// Get ideas by user email (Private)
export const fetchIdeasByEmail = async (email) => {
  try {
    const token = await getToken();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/ideas/private?authorEmail=${email}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const data = await res.json();
    return data || [];
  } catch (error) {
    console.log(error);
    return [];
  }
};
