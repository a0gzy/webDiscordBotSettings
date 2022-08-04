import React from 'react'
import Link from 'next/link';

export const NavItem = ({link,title})=> {
  return (
    <div className="w-14 h-14 m-1 flex items-center justify-center rounded-full bg-[#424549] hover:rounded-2xl transition-all ease-out duration-[.1s,.1s] cursor-pointer">
      <Link href={link}>
        <div className="p-2 flex justify-center">
          <a>{title}</a>
        </div>
      </Link>
    </div>
  );
}

export default NavItem