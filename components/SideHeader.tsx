import Link from 'next/link';
import Image from 'next/image';
import iconPic from '../public/medium-icon.png';
import { urlFor } from '../lib/sanity';
import { Post } from '../typings';
import {
  HomeOutlined,
  NotificationsNoneOutlined,
  BookmarksOutlined,
  ArticleOutlined,
  ModeEditOutlineOutlined,
} from '@mui/icons-material';

function SideHeader() {
  return (
    <header className={'flex flex-col justify-between mx-auto border-r h-full'}>
      <div className="space-x-5 ">
        <Link href="/">
          <div className="w-10 h-20  mx-auto cursor-pointer relative">
            <Image
              src={iconPic}
              alt="Medium icon"
              layout="fill" // required
              objectFit="contain" // change to suit your needs
            />
          </div>
        </Link>
      </div>
      <div className=" flex flex-col justify-between text-gray-400 text-sm">
        <div className="flex-col  mx-auto  cursor-pointer space-y-4 ">
          <div className="">
            <HomeOutlined />
          </div>
          <div className="">
            <NotificationsNoneOutlined />
          </div>
          <div className="">
            <BookmarksOutlined />
          </div>
          <div className="">
            <ArticleOutlined />
          </div>
          <hr className="my-2" />
          <div className="">
            <ModeEditOutlineOutlined />
          </div>
        </div>
      </div>
      <div className="mx-auto pb-10 sm:inline cursor-pointer ">
        <img
          className="h-14 w-14 rounded-full"
          src="/profile-img.png"
          // src={urlFor(post.author.image).url()!}
          alt="author avatar image"
        />
      </div>
    </header>
  );
}

export default SideHeader;
