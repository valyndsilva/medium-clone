import { Post } from '../typings';
// Fetch Trending Posts from getTrending to use into App
export const fetchCategories = async () => {
  // Make a REST API call to backend
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/getCategories`
  );
  const data = await res.json();
  const posts: Post[] = data.posts;
  return posts;
};
