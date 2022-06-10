// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { sanityClient } from '../../lib/sanity';
import { Post } from '../../typings';
import { groq } from 'next-sanity';

// Get Trending Posts from Sanity into App

const feedQuery = groq`
*[_type == "post" && slug.current == $slug][0]{
        _id,
        _createdAt,
        title,
        author -> {
        name,
        image
      },
      'comments': *[
        _type=="comment" &&
        post._ref == ^._id &&
        approved == true
      ],
      description,
      mainImage,
      slug,
      body
      }`;

type Data = {
  post: Post;
};

//Make a fetch to the backend on sanity to get tweets. Here we use GROQ to query on sanity CMS
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { slug } = req.query; // req.query contains the URL query parameters (after the ? in the URL). It is in a key-value format.
  const post: Post = await sanityClient.fetch(feedQuery, {
    slug,
  });
  if (!post) {
    return {
      notFound: true,
    };
  }
  console.log({ post });

  res.status(200).json({ post });
}
