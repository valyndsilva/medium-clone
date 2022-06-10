// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { sanityClient } from '../../lib/sanity';
import { Post } from '../../typings';
import { groq } from 'next-sanity';

// Get Trending Posts from Sanity into App

const feedQuery = groq`
*[_type == "category"]{
    _id,
   ...
   } | order(_createdAt desc)
`;

type Data = {
  posts: Post[];
};

//Make a fetch to the backend on sanity to get tweets. Here we use GROQ to query on sanity CMS
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const posts: Post[] = await sanityClient.fetch(feedQuery);
  console.log({ posts });

  res.status(200).json({ posts });
}
