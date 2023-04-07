import 'bootstrap/dist/css/bootstrap.min.css'
import Head from 'next/head'
// components
import Navbar from '@/components/Navbar'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>W Invest</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Navbar />
      <div className="container">
        <Component {...pageProps} />
      </div>
    </>
  )
}
