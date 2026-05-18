// Get all ideas from the API
export const fetchIdeas = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/ideas`);
  const data = await res.json();
  return data || [];
};
