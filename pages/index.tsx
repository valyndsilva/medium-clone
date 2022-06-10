import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Header from '../components/Header';
import Trending from '../components/Trending';
import Jumbotron from '../components/Jumbotron';
import { sanityClient, urlFor } from '../lib/sanity';
import { Post } from '../typings';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import Moment from 'react-moment';
import 'moment-timezone';
import { BookmarkAddOutlined, MoreHorizRounded } from '@mui/icons-material';
import Posts from '../components/Posts';
interface Props {
  posts: [Post]; // array of type Post: Post[] or [Post]
}

export default function Home({ posts }: Props) {
  // console.log(posts);

  return (
    <>
      <Head>
        <title>Medium Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-medium">
        <Header color="bg-medium" />
      </div>
      <div className="bg-medium border-y border-black ">
        <Jumbotron />
      </div>

      <div className="flex flex-col font-bold text-sm border-b px-20 py-10 max-w-7xl mx-auto">
        <h3>
          <TrendingUpRoundedIcon className="rounded-3xl border border-gray-500 text-gray-500 pr-1 mr-2" />
          TRENDING ON MEDIUM
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2  max-w-7xl mt-5 mx-auto lg:p-6">
          <Trending posts={posts} />
        </div>
      </div>

      <Posts posts={posts} />

      <footer className="flex h-24 w-full items-center justify-center border-t">
        <a
          className="flex items-center justify-center gap-2"
          href=""
          target="_blank"
        >
          Powered by
          <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        </a>
      </footer>
    </>
  );
}

// Implementing SSR
export const getServerSideProps = async () => {
  //This is where the server pre-builds the pages
  // It changes the homepage route to SSR route
  const query = `*[_type == "post"]{
    _id,
   title,
  slug,
  author -> {
  name,
  image
  },
  description,
  mainImage
  }`;

  const posts = await sanityClient.fetch(query);
  return {
    props: {
      posts,
    },
  };
};
