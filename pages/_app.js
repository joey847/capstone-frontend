import Layout from '../components/layout/Layout'
import '../styles/globals.css'
import { Toaster } from 'react-hot-toast';

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
      <Toaster />
    </Layout>
  )
}

export default MyApp
