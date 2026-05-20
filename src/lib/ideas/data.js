// Get all ideas from the API
export const fetchIdeas = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/ideas`);
  const data = await res.json();
  return data || [];
};

export const fetchTrendingIdeas = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/ideas/trending`,
  );
  const data = await res.json();
  return data || [];
};

// Get a single idea by ID
export const fetchIdeaById = async (id) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/ideas/${id}`,
  );
  const data = await res.json();
  return data || null;
};

// Get ideas by user email
export const fetchIdeasByEmail = async (email) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/ideas?authorEmail=${email}`,
  );
  const data = await res.json();
  return data || [];
};
