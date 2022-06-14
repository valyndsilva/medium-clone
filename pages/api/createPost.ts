// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { PostBody } from '../../typings';
type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const data: PostBody = JSON.parse(req.body);
  // mutations sends instruction to the backend and tells the backend how to update the data
  // https://www.sanity.io/docs/http-mutations
  const mutations = {
    mutations: [
      {
        create: {
          _type: 'post',
          title: data.title,
          description: data.description,
          slug: data.slug,
          author: [data.authorName, data.authorImage],
          mainImage: data.mainImage,
          category: data.category,
          trending: false,
          _publishedAt: data._publishedAt,
          body: data.body,
        },
      },
    ],
  };
  const apiEndpoint = `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v1/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`;
  const result = await fetch(apiEndpoint, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.SANITY_API_TOKEN}`,
    },
    body: JSON.stringify(mutations),
    method: 'POST',
  });
  const json = await result.json();
  res.status(200).json({ message: 'Post Added' });
}
