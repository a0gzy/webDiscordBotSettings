import React, { useEffect,useState } from 'react'
import Link from 'next/link';
import Image from 'next/image';
import Logo from '../public/assets/logo2.png'
import NavItem from './NavItem';
import NavImage from './NavImage';
import useSWR from 'swr'
import Scrollbar from 'react-scrollbars-custom';
import { useRouter } from 'next/router';

const fetcher = async (...args) => await fetch(...args).then(res => res.json())

export function Navbar() {

  //const { data: userGuilds, error: gErr } = useSWR("/api/guilds", fetcher, { refreshInterval: 20000 });
  const { data: user, error:uErr } = useSWR("/api/user", fetcher);
  const { data: guilds, error: gErr} = useSWR("/api/userbotguilds", fetcher);
  console.log(guilds);

  const router = useRouter();

  const queryId = router.query.id
  const queryPath = router.pathname

  console.log(`${queryId} queryId`);
  console.log(queryPath);



  //if(userGuilds){
//TODO//TODO//TODO//TODO//TODO//TODO//TODO//TODO//TODO
//TODO//TODO//TODO//TODO//TODO//TODO//TODO//TODO//TODO
//TODO//TODO//TODO//TODO//TODO//TODO//TODO//TODO//TODO
//TODO//TODO//TODO//TODO//TODO//TODO//TODO//TODO//TODO
//TODO//TODO//TODO//TODO//TODO//TODO//TODO//TODO//TODO
//TODO//TODO//TODO//TODO//TODO//TODO//TODO//TODO//TODO
//TODO//TODO//TODO//TODO//TODO//TODO//TODO//TODO//TODO
//  }

  
  //const { data: userGuilds, error: gErr } = useSWR("/api/guilds", fetcher);

 // setUser(user)
 // setUserGuilds(userGuilds)

  // let guilds = new Array()
  
  //   for (let i = 0; i < userGuilds?.length; i++) { 
  //       let guildNames = {}
  //       guildNames.id = userGuilds[i].id
  //       guildNames.name = userGuilds[i].name
  //       guildNames.icon = 'https://cdn.discordapp.com/icons/'+ userGuilds[i].id + '/' +userGuilds[i].icon

  //       guilds.push(guildNames)
  //   }

 // console.log("fetch guilds");
 // const { data: guilds } = useSWR("/api/guilds", fetcher2);
 // console.log(userGuilds);
  
  //console.log(guilds)

  return (
    <div className="flex bg-[#282b30] w-[72px] h-screen fixed top-0 left-0">
      <div className="flex-col justify-start w-full h-full">
        <div className="flex">
          <div
            className={
              queryPath == "/"
                ? "relative top-0 left-0 w-2 h-14"
                : "relative top-0 left-0 w-2 h-14 hidden"
            }
          >
            <span className="absolute top-4 w-1 h-6 bg-slate-200 rounded-tr-full rounded-br-full"></span>
          </div>

          <div className="w-12 h-12 m-1">
            <div className="absolute top-1 left-3 w-12 h-12  flex items-center justify-center rounded-full bg-[#424549] hover:bg-[#11bb5dcc] hover:rounded-2xl transition-all ease-out duration-[.1s,.1s] cursor-pointer">
              <Link href={"/"}>
                <Image src={Logo} alt="/" width="120" height="48" />
              </Link>
            </div>
          </div>
        </div>
        <div className="w-12 h-[2px] border-[1px] border-[#424549] rounded-lg bg-[#424549] hover:border-[#11bb5dcc] my-1 mx-auto"></div>

        {/* <NavItem link={"/"} title={"Home"} /> */}
        {/* <NavItem link={"/dash"} title={"Dash"} /> */}

        <div id="scrooling" className="h-[calc(100%-56px-56px-56px-32px+64px)]">
          <Scrollbar noScrollX 
            wrapperProps={{
              renderer: (props) => {
                const { elementRef, ...restProps } = props;
                const { ...otherStyle } = props["style"];
                return (
                  <span
                    {...restProps}
                    ref={elementRef}
                    className="MyAwesomeScrollbarsWrapper"
                    style={{ ...otherStyle, width: 64 }}
                  />
                );
              },
            }}
            trackYProps={{
              renderer: (props) => {
                const { elementRef, ...restProps } = props;
                const { ...otherStyle } = props["style"];
                return (
                  <span
                    {...restProps}
                    ref={elementRef}
                    className="trackY"
                    style={{ ...otherStyle, width: 4 }}
                  />
                );
              },
            }}
          >
            {guilds?.map((item) => (
              <div key={item.id} className="p-1 w-14 h-14 flex">
                <div
                  className={
                    queryId == item.id
                      ? "relative top-0 left-0 w-2 h-14 "
                      : "relative top-0 left-0 w-2 h-14 hidden"
                  }
                >
                  <span className="absolute top-4 left-[-4px] w-1 h-6 bg-slate-200 rounded-tr-full rounded-br-full"></span>
                </div>

                <div className="relative left-2 top-1 group">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#424549] focus:bg-[#11bb5dcc] hover:rounded-2xl transition-all ease-out duration-[.1s,.1s] cursor-pointer">
                    <Link href={"/guilds/" + item.id}>
                      <Image
                        src={item.icon}
                        alt="/"
                        width="64"
                        height="64"
                        className="rounded-full"
                      ></Image>
                    </Link>
                    
                  </div>
                  <span className='group-hover:scale-100 absolute w-auto break-words max-w-[64px] bg-gray-900 p-2 m-2 rounded-md shadow-md text-white text-xs font-bold z-40 top-12 left-[-18px] scale-0'>{item.name}</span>
                </div>
              </div>
            ))}

          </Scrollbar>
        </div>
      </div>
      <div className="fixed bottom-1 left-1">
        {/* <NavImage data={data} /> */}
        {user ? (
          <div className="w-14 h-14 m-1 flex items-center justify-center rounded-full bg-[#424549] transition-all ease-out duration-100 cursor-pointer">
            <Link href={"/profile"}>
              <Image
                src={user.avaUrl}
                alt="/"
                width="64"
                height="64"
                className="rounded-full"
              />
            </Link>
          </div>
        ) : (
          <NavItem link={"/profile"} title={"Profile"} />
        )}
      </div>
    </div>
  );
}


export default Navbar