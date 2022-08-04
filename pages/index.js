import Head from 'next/head'
import {About} from '../components/About'
import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function Home() {

  // const { data, error } = useSWR('/api/user', fetcher)
  // console.log(data)

  return (
    <div className='w-full'>
      <Head>
        <title>a0g | Dev</title>
        <meta name="description" content="I’m a developer." />
        <link rel="icon" href="/fav.png" />
      </Head>

      <About />

    </div>
  );
}
