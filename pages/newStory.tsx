import Head from 'next/head';
import {
  Header,
  Trending,
  Jumbotron,
  Posts,
  Footer,
  StoryHeader,
  StoryInput,
} from '../components';
import { sanityClient } from '../lib/sanity';
import { Post } from '../typings';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
interface Props {
  posts: [Post]; // array of type Post: Post[] or [Post]
}
export default function newStory({ posts }: Props) {
  // console.log(posts);

  return (
    <>
      <Head>
        <title>Medium Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="">
        <StoryHeader color="" />
      </div>

      <div className="flex max-w-7xl items-center font-bold text-sm border-b px-5 py-10 mx-auto">
        <StoryInput />
      </div>

      <Footer />
    </>
  );
}

// Implementing SSR:
//1. getServerSideProps:
// If you export a function called getServerSideProps (Server-Side Rendering) from a page, Next.js will pre-render this page on each request using the data returned by getServerSideProps.

//2.When does getServerSideProps run:
// getServerSideProps only runs on server-side and never runs on the browser. If a page uses getServerSideProps, then:

// When you request this page directly, getServerSideProps runs at request time, and this page will be pre-rendered with the returned props
// When you request this page on client-side page transitions through next/link or next/router, Next.js sends an API request to the server, which runs getServerSideProps
// getServerSideProps returns JSON which will be used to render the page. All this work will be handled automatically by Next.js, so you don’t need to do anything extra as long as you have getServerSideProps defined.

// getServerSideProps can only be exported from a page. You can’t export it from non-page files.

// Note that you must export getServerSideProps as a standalone function — it will not work if you add getServerSideProps as a property of the page component.

// The getServerSideProps API reference covers all parameters and props that can be used with getServerSideProps.

//3.When should I use getServerSideProps:
// You should use getServerSideProps only if you need to render a page whose data must be fetched at request time. This could be due to the nature of the data or properties of the request (such as authorization headers or geo location). Pages using getServerSideProps will be server side rendered at request time and only be cached if cache-control headers are configured.

// If you do not need to render the data during the request, then you should consider fetching data on the client side or getStaticProps.

export const getServerSideProps = async () => {
  //This is where the Server pre-builds the pages and changes the homepage route to SSR route
  const query = `*[_type == "post"]{
    _id,
   title,
   description,
  slug,
  author -> {
  name,
  image
  },
  mainImage,
  categories[]->{
    name,
    title
  },
  publishedAt,
  body,
  trending
  }`;

  const posts = await sanityClient.fetch(query); // Fetch Posts from Sanity
  return {
    // props:{} will be passed to the page component as props
    props: {
      posts,
    },
  };
};
