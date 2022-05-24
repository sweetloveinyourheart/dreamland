import '../styles/globals.scss'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../lib/apolloClient';
import AddressProvider from '../contexts/address';

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps)

  return (
    <ApolloProvider client={apolloClient}>
      <AddressProvider>
        <Component {...pageProps} />
      </AddressProvider>
    </ApolloProvider>
  )
}

export default MyApp
