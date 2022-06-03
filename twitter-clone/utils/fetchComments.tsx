import { Comment, Tweet } from '../typings';

export const fetchComments = async (tweetId: string) => {
  // Make a REST API call to backend
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/getComments?tweetId=${tweetId}`
  );
  const data = await res.json();
  const comments: Comment[] = data;
  return comments;
};