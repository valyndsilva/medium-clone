import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Header from '../components/Header';
import Trending from '../components/Trending';
import Categories from '../components/Categories';
import { sanityClient, urlFor } from '../lib/sanity';
import { Post } from '../typings';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import Moment from 'react-moment';
import 'moment-timezone';
import { BookmarkAddOutlined, MoreHorizRounded } from '@mui/icons-material';
interface Props {
  posts: [Post]; // array of type Post: Post[] or [Post]
}

export default function Home({ posts }: Props) {
  // console.log(posts);
  const footerLinks = [
    'Help',
    'Status',
    'Writers',
    'Blog',
    'Careers',
    'Privacy',
    'Terms',
    'Developers',
    'About',
    'Knowable',
  ];
  const truncateString = (string = '', maxLength = 50) =>
    string.length > maxLength ? `${string.substring(0, maxLength)}…` : string;

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
        <div className="flex justify-between  max-w-7xl mx-auto items-center  px-20 py-10 lg:py-0 ">
          <div className="px-10 space-y-5">
            <h1 className="text-6xl max-w-xl font-serif">
              <span className="underline decoration-black decoration-4 ">
                Medium
              </span>
              &nbsp;is a place to write, read and connect.
            </h1>
            <h2>
              Discover stories, thinking, and expertise from writers on any
              topic.
            </h2>
            <div className="w-44  cursor pointer items-center text-center  bg-black text-white border-black-600 px-4 py-2 rounded-full ">
              <Link href="/">Start reading</Link>
            </div>
          </div>

          <img
            className="hidden md:inline-flex h-32 lg:h-full"
            src="/medium-article-thumbnail.png"
          />
        </div>
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
      {/* Posts */}
      <div className="grid grid-cols-3 gap-12  mx-auto max-w-7xl px-20 ">
        <div className="col-span-2 my-10">
          {posts.map((post) => (
            <Link key={post._id} href={`/post/${post.slug.current}`}>
              <div className="group cursor-pointer overflow-hidden my-5">
                <div className="flex items-center">
                  <img
                    className="h-7 w-7 mr-2 rounded-full"
                    src={urlFor(post.author.image).url()!}
                    alt=""
                  />
                  <span className="text-xs">{post.author.name}</span>
                </div>
                <div className="flex justify-between  bg-white">
                  <div className="flex grow items-center space-x-2">
                    <div className="flex flex-col">
                      <h2 className="text-xl font-bold">
                        {truncateString(post.title, 40)}
                      </h2>
                      <p className="text-md text-gray-500">
                        {truncateString(post.description, 50)}
                      </p>
                      <div className="flex justify-between mt-1">
                        <Moment
                          fromNow
                          className="text-sm text-gray-500 font-light p-2"
                        >
                          {post._createdAt}
                        </Moment>
                      </div>
                    </div>
                  </div>
                  <div className="flex-none  items-center">
                    {post.mainImage && (
                      <img
                        className="object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out"
                        src={urlFor(post.mainImage).url()!}
                        alt=""
                        width={150}
                        height={134}
                      />
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="col-span-1 border-l p-5">
          <div className="">
            <h4 className="font-bold text-xs">
              DISCOVER MORE OF WHAT MATTERS TO YOU
            </h4>
            <Categories posts={posts} />
          </div>
          <hr className="mt-5" />
          <div className="flex flex-start  flex-wrap  mt-5 space-x-4 text-gray-400 text-sm">
            {footerLinks.map((footerLink) => (
              <span>{footerLink}</span>
            ))}
          </div>
        </div>
      </div>

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
