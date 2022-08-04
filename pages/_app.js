import {Navbar} from "../components/Navbar"
import '../styles/globals.css'
import useSWR from 'swr'
import { getUserGuilds } from "../utils/DiscordUtils";

function MyApp({
  Component,
  pageProps: { ...pageProps },
}) {

  return (
    <div className="inline-flex w-full">
      <Navbar />
      <div className='flex ml-[72px] h-full w-[calc(100%-72px)]'>
        <Component {...pageProps} />
      </div>
    </div>

  );
}


export default MyApp