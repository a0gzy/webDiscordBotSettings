import React from 'react'
import Link from 'next/link';
import { getCookies, getCookie, setCookie, deleteCookie } from 'cookies-next';
import {getData, getUser,getUserGuilds} from "../utils/DiscordUtils"
import LoginButton from '../components/LoginButton';


export default function dash({guilds}) {
  // console.log(guildNames)
  if (!guilds) {
    return (
      <div className="m-24">
        <LoginButton />
      </div>
    );
  }
  return (
    <div className='w-full flex justify-center'>

      <div className="w-fit m-auto mt-2 md:m-24">
        {guilds?.map((item,index) => (
          <div key={index} className="m-1 p-1 bg-slate-300 rounded-xl m cursor-pointer hover:text-orange-600 text-center">
            <Link href={"/guilds/" + item.id}>
              {item.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};


export async function getServerSideProps({ req, res }){
  const data = JSON.stringify(await getData(req,res));
  //console.log(data)
  if(!data || data.includes("error")) {
  //  console.log("getData")
  //  console.log(data)
    return { props: {} };
  }
 // console.log(data)
 // console.log("сверху")

 // const userData = await getUser(req,res);
  const userGuilds = await getUserGuilds(req,res);

 // console.log(userData)
  // console.log(userGuilds[0])
  // console.log("userGuilds[0]")
  
  let guilds = new Array()
  
  for (let i = 0; i < userGuilds?.length; i++) { 
    let guildNames = {}
    guildNames.id = userGuilds[i].id
    guildNames.name = userGuilds[i].name

    guilds.push(guildNames)
  }

  return { props: {guilds} };
};
