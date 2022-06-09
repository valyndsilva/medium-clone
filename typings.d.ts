export interface Post {
  // Refer to sanity query result to get the properties of the post
  _id: string;
  _createdAt: string;
  title: string;
  author: {
    name: string;
    image: string;
  };
  comments: Comment[];
  description: string;
  mainImage: { asset: { url: string } };
  slug: {
    current: string;
  };
  body: [object];
  trending: boolean;
  trendings: Trending[];
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

// export interface Trending {
//   _createdAt: string;
//   _id: string;
//   title: string;
//   slug: {
//     current: string;
//   };
//   author: {
//     name: string;
//     image: string;
//   };
//   description: string;
//   mainImage: { asset: { url: string } };
//   body: [object];
//   comments: Comment[];
// }
