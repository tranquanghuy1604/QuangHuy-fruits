'use client';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import Header from '@/layout/Header';
import Footer from '@/layout/Footer';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';
import { Toaster } from 'react-hot-toast';
import { ConfigProvider } from 'antd';
const inter = Inter({ subsets: ['latin'] });

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function AuthProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <ConfigProvider
          theme={{
            components: {
              Button: {
                colorPrimary: '#00C42E',
                algorithm: true, // Enable algorithm
              },
            },
          }}
        >
          <RecoilRoot>
            <Toaster position='top-right' />
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
          </RecoilRoot>
        </ConfigProvider>
      </body>
    </html>
  );
}
