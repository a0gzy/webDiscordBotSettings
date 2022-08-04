import Navbar from './navbar'
import Footer from './footer'
import useSWR from 'swr'

export default function Layout({ children }) {

   const { data, error } = useSWR('/api/user', fetcher)
   
   if(!data){
    return (
        <>
          <Navbar />
          <main>{children}</main>
          {/* <Footer /> */}
        </>
      )
   }

  return (
    <>
      <Navbar user={userData}/>
      <main>{children}</main>
      {/* <Footer /> */}
    </>
  )
}