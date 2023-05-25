import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import '@/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import { store, persistor } from '../store/index'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import AppProvider from '@/component/Context/AppProvider';

import { ToastContainer } from 'react-toastify'

import styles from '@/styles/global.module.css'

export default function App({ Component, pageProps }) {

  const router = useRouter()
  const [loading, setLoading] = useState('');

  useEffect(() => {
    const handleRouteChangeStart = (url) => {
      setLoading(true)
      console.log(`Loading: ${url}`);
    };

    const handleRouteChangeComplete = (url) => {
      setLoading(false)
      console.log(`Finished loading: ${url}`);
    };

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, [router]);

  return (
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>

          <AppProvider>
            <ToastContainer />
            {loading &&
              <div className={styles.loader}>
                <div /><div /><div />
              </div>
            }
            <Component {...pageProps} />
          </AppProvider>
        </PersistGate>
      </Provider>
    </React.StrictMode>)
}
