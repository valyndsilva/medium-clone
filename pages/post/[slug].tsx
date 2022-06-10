import { GetStaticProps } from 'next';
import React, { useState } from 'react';
import SideHeader from '../../components/SideHeader';
import { sanityClient, urlFor } from '../../lib/sanity';
import { Post } from '../../typings';
import PortableText from 'react-portable-text';
import { useForm, SubmitHandler } from 'react-hook-form';
import Moment from 'react-moment';
import 'moment-timezone';

import {
  Twitter,
  FacebookRounded,
  LinkedIn,
  BookmarkAddOutlined,
  MoreHorizRounded,
  ThumbUp,
  ModeCommentOutlined,
  IosShare,
  TrendingUpRounded,
  Search,
  MailOutline,
} from '@mui/icons-material';
import Link from 'next/link';
import TrendingWidget from '../../components/TrendingWidget';
import Image from 'next/image';
import Categories from '../../components/Categories';
import { fetchPost } from '../../utils/fetchPost';
interface Props {
  post: Post;
  posts: [Post]; // array of type Post: Post[] or [Post]
}

// Define form fields in TS:
interface FormInput {
  _id: string;
  name: string;
  email: string;
  comment: string;
}

function Post({ post, posts }: Props) {
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
  const [submitted, setSubmitted] = useState(false);
  console.log(post);
  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>();

  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    // console.log(data);
    await fetch('/api/createComment', {
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then(() => {
        console.log(data);
        setSubmitted(true);
      })
      .catch((err) => {
        console.log(err);
        setSubmitted(false);
      });
  };

  // console.log(post);
  return (
    <>
      <main>
        <div className="grid grid-cols-7 mx-auto ">
          <div className="col-span-1">
            <SideHeader />
          </div>
          <div className="col-span-6   w-full md:col-span-4 mx-auto">
            <article className="mx-auto px-20 py-5">
              <div className="flex items-center justify-between space-x-2">
                <div className="flex items-center space-x-5">
                  <img
                    className="h-14 w-14 rounded-full"
                    src={urlFor(post.author.image).url()!}
                    alt="author avatar image"
                  />
                  <div>
                    <span className="font-light text-md">
                      {post.author.name}
                    </span>
                    <p className="font-extralight text-sm">
                      <Moment fromNow className="text-sm text-gray-500">
                        {post._createdAt}
                      </Moment>
                      &nbsp;
                    </p>
                  </div>
                </div>
                <div className="flex justify-between items-center pt-10 pb-5 space-x-8">
                  <div className="flex items-center space-x-2">
                    <div className="cursor-pointer text-gray-400 hover:text-gray-800">
                      <Twitter sx={{ fontSize: 24 }} />
                    </div>
                    <div className="cursor-pointer text-gray-400 hover:text-gray-800">
                      <FacebookRounded sx={{ fontSize: 24 }} />
                    </div>
                    <div className="cursor-pointer text-gray-400 hover:text-gray-800">
                      <LinkedIn sx={{ fontSize: 24 }} />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="cursor-pointer text-gray-400 hover:text-gray-800">
                      <BookmarkAddOutlined sx={{ fontSize: 24 }} />
                    </div>
                    <div className=" text-gray-400 cursor-pointer">
                      <MoreHorizRounded sx={{ fontSize: 24 }} />
                    </div>
                  </div>
                </div>
              </div>
              <h1 className="text-3xl mt-10 mb-3">{post.title}</h1>
              <h2 className="text-xl font-light text-gray-500 mb-2">
                {post.description}
              </h2>

              <div>
                <img
                  className="w-full object-cover"
                  src={urlFor(post.mainImage).url()!}
                  alt=""
                />
                <PortableText
                  className="mt-10"
                  dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
                  projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
                  content={post.body}
                  serializers={{
                    h1: (props: any) => (
                      <h1 className="text-2xl font-bold my-5" {...props} />
                    ),
                    h2: (props: any) => (
                      <h2 className="text-xl font-bold my-5" {...props} />
                    ),
                    li: (children: any) => (
                      <li className="ml-4 list-disc">{children}</li>
                    ),
                    link: ({ href, children }: any) => (
                      <a href={href} className="text-blue-500 hover:underline">
                        {children}
                      </a>
                    ),
                  }}
                />
              </div>

              <div className="flex justify-between items-center pt-10 pb-5 space-x-8">
                <div className="flex items-center space-x-2">
                  <div className="cursor-pointer text-gray-400 hover:text-gray-800">
                    <ThumbUp sx={{ fontSize: 24 }} />
                  </div>
                  <div className="cursor-pointer text-gray-400 hover:text-gray-800">
                    <ModeCommentOutlined sx={{ fontSize: 24 }} />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="cursor-pointer text-gray-400 hover:text-gray-800">
                    <IosShare sx={{ fontSize: 24 }} />
                  </div>
                  <div className="cursor-pointer text-gray-400 hover:text-gray-800">
                    <BookmarkAddOutlined sx={{ fontSize: 24 }} />
                  </div>
                  <div className="text-gray-400 cursor-pointer hover:text-gray-800">
                    <Link href="#comment">
                      <MoreHorizRounded sx={{ fontSize: 24 }} />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="flex items-center p-5 pb-10 pt-10 mt-5 border-t border-b border-gray-300 mx-auto">
                <img
                  className="w-28 h-28 rounded-full"
                  src={urlFor(post.author.image).url()}
                  alt="author avatar"
                />
                <div className="pl-5">
                  <h4 className="text-3xl font-bold">{post.author.name}</h4>

                  <p className="font-extralight text-md">
                    Published&nbsp;
                    <Moment fromNow className="text-sm text-gray-500">
                      {post._createdAt}
                    </Moment>
                  </p>
                </div>
              </div>
              {/* Comments */}

              <div className="flex flex-col p-10 my-10 mx-auto shadow rounded">
                <h3 className="text-3xl">Comments</h3>
                <hr className="pb-2" />
                {post.comments.length > 0 ? (
                  post.comments.map((comment) => (
                    <div key={comment._id} className="mt-3">
                      <p>
                        <span className="text-yellow-500">{comment.name}:</span>
                        &nbsp;
                        {comment.comment}
                      </p>
                    </div>
                  ))
                ) : (
                  <p>
                    <span className="text-gray-500">No comments yet.</span>
                    &nbsp;
                  </p>
                )}
              </div>
              {submitted ? (
                <div className="flex flex-col p-10 my-10 bg-yellow-500 text-white mx-auto">
                  <h3 className="text-3xl font-bold">
                    Thank you for submitting your comment!
                  </h3>
                  <p>Once it has been approved, it will apear above.</p>
                </div>
              ) : (
                <div className="mx-auto">
                  <details className="ring-1 ring-black/10  open:bg-white open:ring-1 open:ring-black/10 open:shadow-lg p-6 rounded-lg">
                    <summary className="text-sm leading-6 font-semibold select-none">
                      <span className="text-sm text-yellow-500">
                        Enjoyed this article? Click here to leave a comment.
                      </span>
                    </summary>
                    <div className="mt-3 text-sm leading-6 text-slate-600">
                      <form
                        className="flex flex-col p-5 max-w-3xl mx-auto mb-10"
                        onSubmit={handleSubmit(onSubmit)}
                      >
                        <h4 className="text-lg font-bold">
                          Leave a comment below:
                        </h4>
                        <hr className="py-3 mt-2" />
                        {/* Connects to react-hook-form by adding {...register('',{required:true})}*/}
                        <input
                          {...register('_id')}
                          type="hidden"
                          name="_id"
                          value={post._id}
                        />
                        <label className="block mb-5">
                          <span className="text-gray-700">Name</span>
                          <input
                            {...register('name', { required: true })}
                            className=" shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-yellow-500 outline-none focus:ring"
                            placeholder="Enter name"
                            type="text"
                          />
                        </label>
                        <label className="block mb-5">
                          <span className="text-gray-700">Email</span>
                          <input
                            {...register('email', { required: true })}
                            className=" shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-yellow-500 outline-none focus:ring"
                            placeholder="Enter email address"
                            type="email"
                          />
                        </label>
                        <label className="block mb-5">
                          <span className="text-gray-700">Comment</span>
                          <textarea
                            {...register('comment', { required: true })}
                            className=" shadow border rounded py-2 px-3 form-textarea mt-1 block w-full ring-yellow-500 outline-none focus:ring"
                            placeholder="Please leave a comment..."
                            rows={8}
                          />
                        </label>
                        {/* errors will return when field validation fails. */}
                        <div className="flex flex-col p-5">
                          {errors.name && (
                            <span className="text-red-500">
                              -The Name Field is required
                            </span>
                          )}
                          {errors.email && (
                            <span className="text-red-500">
                              -The Email Field is required
                            </span>
                          )}
                          {errors.comment && (
                            <span className="text-red-500">
                              -The Comment Field is required
                            </span>
                          )}
                        </div>
                        <input
                          type="submit"
                          className="shadow bg-yellow-500 hover:bg-yellow-400 focus:shadow-outline focus:outline-none text-white font-bold px-4 py-2 rounded cursor-pointer"
                        />
                      </form>
                    </div>
                  </details>
                </div>
              )}
            </article>
            <div className="flex flex-col font-bold text-sm border-b bg-gray-100 mt-5 px-20 py-10 border-t border-gray-300 mx-auto">
              <div className="grid grid-cols-1 gap-3  p-2  max-w-8xl mt-5 mx-auto">
                <h3>
                  <TrendingUpRounded className="rounded-3xl border border-gray-500 text-gray-500 pr-1 mr-2" />
                  TRENDING ON MEDIUM
                </h3>
                <TrendingWidget posts={posts} />
              </div>
            </div>
          </div>
          <div className="col-span-2 hidden md:inline">
            <div className="border-l h-full p-5">
              <div className="">
                <button className="w-full rounded-full text-white bg-black/80 hover:bg-black/100 px-6 py-2 mb-6 ">
                  Get unlimited access
                </button>
                <label className="relative block">
                  <span className="sr-only">Search</span>
                  <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                    <Search />
                  </span>
                  <input
                    className="rounded-full placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300  py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                    placeholder="Search "
                    type="text"
                    name="search"
                  />
                </label>
              </div>
              <div className="flex flex-col space-y-2 my-6">
                <img
                  className="h-14 w-14 rounded-full"
                  src={urlFor(post.author.image).url()!}
                  alt="author avatar image"
                />

                <span className="font-light text-md">{post.author.name}</span>
                <p className="font-extralight text-sm">1.97K Followers</p>
                <p className="font-extralight text-xs">
                  I'm a Front-End Developer based in Qatar.
                </p>
                <div className="space-x-2 space-y-3 text-white">
                  <button className="rounded-full bg-green-700 hover:bg-green-800 px-5 py-2 h-15">
                    Follow
                  </button>
                  <button className="rounded-full  bg-green-700 hover:bg-green-800 p-2">
                    <MailOutline />
                  </button>
                </div>
              </div>
              <hr className="my-5" />
              <h4 className="font-bold text-xs">
                DISCOVER MORE OF WHAT MATTERS TO YOU
              </h4>
              <Categories posts={posts} />
              <hr className="mt-5" />
              <div className="flex flex-start  flex-wrap  mt-5 space-x-4 text-gray-400 text-sm">
                {footerLinks.map((footerLink) => (
                  <span>{footerLink}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
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

export default Post;

// Implement ISR:  (Static Site Generation)
//1.getStaticPaths
// If a page has Dynamic Routes and uses getStaticProps, it needs to define a list of paths to be statically generated.

// When you export a function called getStaticPaths (Static Site Generation) from a page that uses dynamic routes, Next.js will statically pre-render all the paths specified by getStaticPaths.
export const getStaticPaths = async () => {
  // Lets nextJS know which routes it should pre-build /pre-fetch in advance
  const query = `*[_type == "post"]{
    _id,
  slug{
      current
  }
  }`;
  const posts = await sanityClient.fetch(query);

  // Get the paths we want to pre-render based on posts
  const paths = posts.map((post: Post) => ({
    params: { slug: post.slug.current },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: blocking } will server-render pages
  // on-demand if the path doesn't exist.
  return {
    paths,
    fallback: 'blocking', //blocks page from showing or shows 404 if page doesn't exist. fallback returns true, false or blocking.
  };
};
//2. getStaticPaths must be used with getStaticProps. You cannot use it with getServerSideProps.

// The getStaticPaths API reference covers all parameters and props that can be used with getStaticPaths.

//3.When should I use getStaticPaths?
// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes and:
// The data comes from a headless CMS
// The data comes from a database
// The data comes from the filesystem
// The data can be publicly cached (not user-specific)
// The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance
// 4.When does getStaticPaths run?:
// getStaticPaths will only run during build in production, it will not be called during runtime. You can validate code written inside getStaticPaths is removed from the client-side bundle with this tool.

// getStaticProps runs during next build for any paths returned during build
// getStaticProps runs in the background when using fallback: true
// getStaticProps is called before initial render when using fallback: blocking

//5. Where can I use getStaticPaths
// getStaticPaths can only be exported from a dynamic route that also uses getStaticProps. You cannot export it from non-page files e.g. from your components folder.

// Note that you must use export getStaticPaths as a standalone function — it will not work if you add getStaticPaths as a property of the page component.

// Implement Incremental Static generation (ISR):
// Next.js allows you to create or update static pages after you’ve built your site. Incremental Static Regeneration (ISR) enables you to use static-generation on a per-page basis, without needing to rebuild the entire site. With ISR, you can retain the benefits of static while scaling to millions of pages.

// To use ISR, add the revalidate prop to getStaticProps:

// When NextJS tries to pre-build/ pre-fetch the page we need to tell how to use the post slug or id to fetch the info.
// Go to each page and getStaticProps:

// getStaticProps
// If you export a function called getStaticProps (Static Site Generation) from a page, Next.js will pre-render this page at build time using the props returned by getStaticProps.

//When should I use getStaticProps?
// You should use getStaticProps if:

// The data required to render the page is available at build time ahead of a user’s request
// The data comes from a headless CMS
// The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance
// The data can be publicly cached (not user-specific). This condition can be bypassed in certain specific situation by using a Middleware to rewrite the path.
// When does getStaticProps run
// getStaticProps always runs on the server and never on the client. You can validate code written inside getStaticProps is removed from the client-side bundle with this tool.

// getStaticProps always runs during next build
// getStaticProps runs in the background when using revalidate
// getStaticProps runs on-demand in the background when using unstable_revalidate
// When combined with Incremental Static Regeneration, getStaticProps will run in the background while the stale page is being revalidated, and the fresh page served to the browser.

// getStaticProps does not have access to the incoming request (such as query parameters or HTTP headers) as it generates static HTML. If you need access to the request for your page, consider using Middleware in addition to getStaticProps.

// Using getStaticProps to fetch data from a CMS:

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.

//The getStaticProps API reference covers all parameters and props that can be used with getStaticProps.

//Write server-side code directly
// As getStaticProps runs only on the server-side, it will never run on the client-side. It won’t even be included in the JS bundle for the browser, so you can write direct database queries without them being sent to browsers.

// This means that instead of fetching an API route from getStaticProps (that itself fetches data from an external source), you can write the server-side code directly in getStaticProps.

// An API route is used to fetch some data from a CMS. That API route is then called directly from getStaticProps. This produces an additional call, reducing performance. Instead, the logic for fetching the data from the CMS can be shared by using a lib/ or /utils directory. Then it can be shared with getStaticProps.

// This function runs only on the server side

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `*[_type == "post" && slug.current == $slug][0]{
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

  // In the Params in sanity vision:
  //   {
  //    "slug": "test-post-1"
  //   }

  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const post = await sanityClient.fetch(query, {
    slug: params?.slug,
  });
  if (!post) {
    return {
      notFound: true,
    };
  }

  // By returning { props: { posts } }, the Post component [slug].tsx will receive `post` as a prop at build time
  return {
    props: {
      post,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 60 seconds
    revalidate: 60, // this enables ISR and updates the old cache version after 60 seconds
    // It basically server side renders the page after 60 seconds and caches it and that one gets served for the next 60 secs in a static way
  };
};

//Statically generates both HTML and JSON
// When a page with getStaticProps is pre-rendered at build time, in addition to the page HTML file, Next.js generates a JSON file holding the result of running getStaticProps.

// This JSON file will be used in client-side routing through next/link or next/router. When you navigate to a page that’s pre-rendered using getStaticProps, Next.js fetches this JSON file (pre-computed at build time) and uses it as the props for the page component. This means that client-side page transitions will not call getStaticProps as only the exported JSON is used.

// When using Incremental Static Generation, getStaticProps will be executed in the background to generate the JSON needed for client-side navigation. You may see this in the form of multiple requests being made for the same page, however, this is intended and has no impact on end-user performance.

// Where can I use getStaticProps
// getStaticProps can only be exported from a page. You cannot export it from non-page files.

// One of the reasons for this restriction is that React needs to have all the required data before the page is rendered.

// Also, you must use export getStaticProps as a standalone function — it will not work if you add getStaticProps as a property of the page component.

// Incremental Static Regeneration
// Next.js allows you to create or update static pages after you’ve built your site. Incremental Static Regeneration (ISR) enables you to use static-generation on a per-page basis, without needing to rebuild the entire site. With ISR, you can retain the benefits of static while scaling to millions of pages.

// To use ISR, add the revalidate prop to getStaticProps:
