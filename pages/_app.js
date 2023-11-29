import '@/styles/globals.css';
import Head from 'next/head';
import Script from 'next/script';
import { AuthProvider } from '@/component/Auth/AuthContext';



export default function App({ Component, pageProps }) {
  return (
    <div>
      <AuthProvider>
        <Head>
        </Head>
        <Script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js" />
        <Script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js" />
        <Component {...pageProps} />
      </AuthProvider>
    </div>
  );
}
