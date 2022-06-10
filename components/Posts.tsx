import Link from 'next/link';
import Image from 'next/image';
import logoPic from '../public/medium-logo.png';
import { urlFor } from '../lib/sanity';
import { Post } from '../typings';
import Moment from 'react-moment';
import 'moment-timezone';
import Categories from '../components/Categories';
interface Props {
  posts: [Post]; // array of type Post: Post[] or [Post]
}

function Posts({ posts }: Props) {
  const truncateString = (string = '', maxLength = 50) =>
    string.length > maxLength ? `${string.substring(0, maxLength)}…` : string;

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
  return (
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
                <div className="flex grow items-center mr-2">
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
          {footerLinks.map((footerLink, index) => (
            <span key={index}>{footerLink}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Posts;
