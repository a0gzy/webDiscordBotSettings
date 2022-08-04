import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import NavItem from './NavItem';

const NavImage = ({data}) => {
  return (
    <div>
      {data ? (
        <div className="flex m-1 cursor-pointer w-14 h-14 rounded-sm">
          <Link href="/profile">
            <Image
              key={"asd"}
              src={data.avaUrl}
              alt="/"
              width="64"
              height="64"
            />
          </Link>
        </div>
      ) : (
        <>
          <NavItem link={"/profile"} title={"Profile"} />
        </>

        //     <div className="drop-shadow-none hover:border-cyan-500 rounded-xl border-l-4 h-12 w-20 m-2 cursor-pointer transition-all duration-300 delay-75">
        //   <Link href="/profile">
        //     <div className="p-2 flex justify-center text-slate-100">
        //       <a>Profile</a>
        //     </div>
        //   </Link>
        // </div>
      )}
    </div>
  );
}


export default NavImage