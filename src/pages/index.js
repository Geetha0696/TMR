import LoginUser from '@/component/LoginUser'
import Head from 'next/head'


export default function Home() {
  return (
    <>
      <Head>
        <title>Time Sheet</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='mainpage'>
      <LoginUser/>
      </div>
         </>
  )
}
