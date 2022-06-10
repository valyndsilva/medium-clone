import Link from 'next/link';
import Image from 'next/image';
import logoPic from '../public/medium-logo.png';
function Jumbotron({ color = '' }) {
  return (
    <div className="flex justify-between  max-w-7xl mx-auto items-center  px-20 py-10 lg:py-0 ">
      <div className="px-10 space-y-5">
        <h1 className="text-6xl max-w-xl font-serif">
          <span className="underline decoration-black decoration-4 ">
            Medium
          </span>
          &nbsp;is a place to write, read and connect.
        </h1>
        <h2>
          Discover stories, thinking, and expertise from writers on any topic.
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
  );
}

export default Jumbotron;
