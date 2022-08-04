import Image from 'next/image';
import {getUser,refreshData,refreshTokenCli} from "../utils/DiscordUtils"
import { deleteCookie, getCookie } from 'cookies-next';
import LoginButton from '../components/LoginButton';
import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default  function Profile({user}) {

  if(!user) {
    return (
      <div className="m-24">
        <LoginButton />
      </div>
    )
  }
  let arr = new Array();
  for(let i = 0;i<Object.keys(user).length;i++){
    arr.push(Object.keys(user)[i] + ": " + Object.values(user)[i])
  }
  
  
  return (
    <div className="w-full">
      <div className=" flex-col flex m-2 md:m-24 justify-center">
        <div className="w-full inline-flex">
          <button
            onClick={() => {
              deleteCookie("accessData");
              deleteCookie("userData");
              window.location.reload();
            }}
            className="p-2 bg-slate-400 w-20 h-20 m-1 border rounded-full content-center text-center grid gap-3 cursor-pointer hover:bg-slate-200 hover:drop-shadow-md transition-all duration-300 delay-75"
          >
            LogOut
          </button>

          <button
            className="m-2 bg-slate-400 rounded-md hover:bg-slate-200"
            onClick={async () => {
              // console.log(process.env.DISCORD_CLIENT_ID)
              console.log(await refreshTokenCli(getCookie("accessData")));
            }}
          >
            refresh_token
          </button>
        </div>

        <div className="m-1 flex flex-col">
          {arr?.map((item, index) => (
              <p
                key={index}
                onClick={() => {
                  navigator.clipboard.writeText(item.split(": ")[1]);
                }}
                className='p-2 w-full hover:text-orange-600 bg-slate-300 border rounded-md text-center text-black break-words'
              >
                {item}
              </p>
          ))}

        <div className='cursor-pointer my-2 p-2'>
          <Image
          src={user.avaUrl + "?size=256"}
          alt="/"
          width="256"
          height="256"
          key={"asssd"}
        /></div>
        </div>

        
      </div>
    </div>
  );
}


export async function getServerSideProps({ req, res }) {

  const user = await getUser(req,res)

  if (!user) {
    return {
      props: {}
    }
  }

  return {
    props: { user },
  }
}