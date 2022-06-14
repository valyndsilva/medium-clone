export type PostBody = {
  title: string;
  description: string;
  slug: {
    current: string;
  };
  author: {
    name: string;
    image: string;
  };
  authorName: string;
  authorImage: string;
  mainImage: { asset: { url: string } };

  category: string[];
  error?: string;
  _publishedAt: string;
  body: [object];
  trending: boolean;
};
export interface Post extends PostBody {
  // Refer to sanity query result to get the properties of the post
  _id: string;
  _createdAt: string;
  comments: Comment[];
  trendings: string[];
}

export interface Comment {
  approved: boolean;
  comment: string;
  email: string;
  name: string;
  post: {
    __ref: string;
    _type: string;
  };
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
}
