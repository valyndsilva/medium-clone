import React, { useEffect, useState } from 'react';
import { Post } from '../typings';
import Moment from 'react-moment';
import 'moment-timezone';
import { fetchTrending } from '../utils/fetchTrending';
// import toast from 'react-hot-toast';
import Image from 'next/image';
import { sanityClient, urlFor } from '../lib/sanity';
import toast from 'react-hot-toast';
import { BookmarkAddOutlined, MoreHorizRounded } from '@mui/icons-material';

interface Props {
  posts: Post[];
}
function TrendingWidget({ posts }: Props) {
  const [trendings, setTrendings] = useState<Post[]>([]);
  console.log({ posts });
  const refreshTrending = async () => {
    const refreshToast = toast.loading('Refreshing...');
    const trendings: Post[] = await fetchTrending();
    console.log({ trendings });
    setTrendings(trendings);
    toast.success('Trending Now Updated!', {
      id: refreshToast,
    });
  };

  useEffect(() => {
    refreshTrending();
  }, []);

  return (
    <>
      {trendings.map((trending, index) => (
        <div key={trending._id} className="flex  space-x-3 p-2 items-center">
          <div className="flex flex-col grow space-x-3">
            <div className="flex items-center p-2">
              <div className="w-10 h-10 p-5 space-x-8 relative">
                <Image
                  className="rounded-full object-cover"
                  src={urlFor(trending.authorImage).url()!}
                  unoptimized
                  alt=""
                  layout="fill" // required
                  objectFit="cover" // change to suit your needs
                />
              </div>
              <p className="mr-1 items-center font-light text-sm">
                {trending.authorName}
              </p>
            </div>
            <div className="flex flex-col pr-4">
              <div className="grow space-x-1 max-w-sm">
                <p className="text-sm font-semibold">{trending.title}</p>
              </div>
              <div className="flex justify-between mt-2">
                <Moment
                  fromNow
                  className="text-sm text-gray-500 font-light p-2"
                >
                  {trending._createdAt}
                </Moment>
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
          </div>
          <div className="flex-none p-5 w-20 h-20 my-auto items-center relative">
            <Image
              className=" object-cover"
              src={urlFor(trending.mainImage).url()!}
              unoptimized
              alt=""
              layout="fill" // required
              objectFit="cover" // change to suit your needs
            />
          </div>
        </div>
      ))}
    </>
  );
}

export default TrendingWidget;
