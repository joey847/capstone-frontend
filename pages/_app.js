import Layout from '../components/layout/Layout'
import '../styles/globals.css'
import { Toaster } from 'react-hot-toast';
import ErrorBoundary from '../components/ErrorBoundary';

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <ErrorBoundary>
        <Component {...pageProps} />
      </ErrorBoundary>
      <Toaster />
    </Layout>
  )
}

export default MyApp
