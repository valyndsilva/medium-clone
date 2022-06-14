import Link from 'next/link';
import Image from 'next/image';
import iconPic from '../public/medium-icon.png';
import profilePic from '../public/profile-img.png';
import { MoreHorizRounded, NotificationsOutlined } from '@mui/icons-material';
function Header({ color = '' }) {
  return (
    <header className={'flex w-full justify-between  mx-auto ' + (color ?? '')}>
      <div className="flex items-center ">
        <Link href="/">
          <div className="w-20 h-10 my-3 cursor-pointer relative">
            <Image
              src={iconPic}
              alt="Medium icon"
              layout="fill" // required
              objectFit="contain" // change to suit your needs
            />
          </div>
        </Link>
        <span className="text-xs">word count...</span>
      </div>
      <div className=" flex items-center space-x-6 m-3 text-black text-sm">
        <div className="bg-green-700 text-white px-2  py-1 rounded-full ">
          Publish
        </div>
        <div className="cursor-pointer text-gray-400 hover:text-gray-800">
          <MoreHorizRounded sx={{ fontSize: 24 }} />
        </div>
        <div className="cursor-pointer text-gray-400 hover:text-gray-800">
          <NotificationsOutlined sx={{ fontSize: 24 }} />
        </div>
        <div className="w-10 h-10 items-center relative">
          <Image
            className="rounded-full object-cover"
            // src={urlFor(trending.authorImage).url()!}
            src={profilePic}
            unoptimized
            alt=""
            layout="fill" // required
            objectFit="cover" // change to suit your needs
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
