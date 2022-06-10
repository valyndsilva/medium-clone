import Link from 'next/link';
import Image from 'next/image';
import logoPic from '../public/medium-logo.png';
function Footer() {
  return (
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
  );
}

export default Footer;
