import { Post } from '../typings';
// The following function is shared with getStaticProps and API routes from a `lib/ or utils` directory
// Fetch Trending Posts from getTrending to use into App
export const fetchTrending = async () => {
  // Make a REST API call to backend
  // Call an external API endpoint to get trending posts
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/getTrending`
  );
  const data = await res.json();
  const posts: Post[] = data.posts;
  return posts;
};
