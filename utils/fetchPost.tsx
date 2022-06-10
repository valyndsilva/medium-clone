import { Post } from '../typings';
// Fetch Trending Posts from getTrending to use into App
export const fetchPost = async (slug: string) => {
  // Make a REST API call to backend
  // Call an external API endpoint to get categories
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/getPost?slug=${slug}`
  );
  const data = await res.json();
  const post: Post = data.post;
  return post;
};
