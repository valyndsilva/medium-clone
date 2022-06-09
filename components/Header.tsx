import Link from 'next/link';
import Image from 'next/image';
import logoPic from '../public/medium-logo.png';
function Header({ color = '' }) {
  return (
    <header
      className={'flex w-full justify-between py-4 px-4 ' + (color ?? '')}
    >
      <div className="flex space-x-5 ">
        <Link href="/">
          <div className="w-40 h-20 md:w-30  lg:w-44 cursor-pointer relative">
            <Image
              src={logoPic}
              alt="Medium icon"
              layout="fill" // required
              objectFit="contain" // change to suit your needs
            />
          </div>
        </Link>
      </div>
      <div className=" flex items-center space-x-6 text-black text-sm">
        <div className="hidden md:inline-flex  space-x-4 ">
          <div className="cursor-pointer">Our Story</div>
          <div className="cursor-pointer">Membership</div>
          <div className="cursor-pointer">Write</div>
        </div>
        <div className=" sm:inline cursor-pointer ">Sign in</div>
        <div className="bg-black text-white border-black-600 px-4 py-2 rounded-full ">
          Get Started
        </div>
      </div>
    </header>
  );
}

export default Header;
