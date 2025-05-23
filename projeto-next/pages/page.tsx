import Image from "next/image";

import 'antd/dist/reset.css'; 
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}


