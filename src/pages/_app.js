import AppProvider from '@/component/Context/AppProvider';
import Layout from '@/component/Layout';
import '@/styles/globals.css';

export default function App({ Component, pageProps }) {
  
  return <AppProvider>
  <Layout {...pageProps}>
    <Component {...pageProps} />
  </Layout>
</AppProvider>
}
