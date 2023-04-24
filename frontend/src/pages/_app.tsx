import '@/styles/globals.css';
import { createConnectTransport } from '@bufbuild/connect-web';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';
import 'bootstrap/dist/css/bootstrap.css';
import { TransportProvider } from '@bufbuild/connect-query';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const transport = createConnectTransport({
    baseUrl: 'https://backend-service-2ybjkij5qq-uc.a.run.app/'
  });

  return (
    <TransportProvider transport={transport}>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </TransportProvider>
  );
}
