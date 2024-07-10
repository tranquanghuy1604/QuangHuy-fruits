'use client';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import Header from '@/layout/Header';
import Footer from '@/layout/Footer';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';
import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Toaster } from 'react-hot-toast';
const inter = Inter({ subsets: ['latin'] });

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const pathName = usePathname();
  // const router = useRouter();

  // useEffect(() => {
  //   const token = localStorage.getItem('authToken');

  //   if (!token && pathName !== '/login') {
  //     router.push('/login');
  //   } else if (token && pathName === '/login') {
  //     router.push('/');
  //   }
  // }, [pathName]);

  return (
    <html lang='en'>
      <body className={inter.className}>
        <RecoilRoot>
          <Toaster position='top-right' />
          <QueryClientProvider client={queryClient}>
            <div className='relative flex flex-col min-h-screen'>
              <Header />
              <div className='mt-[110px] flex-grow w-full max-w-[1440px] mx-auto px-[16px]'>{children}</div>
              <Footer />
            </div>
          </QueryClientProvider>
        </RecoilRoot>
      </body>
    </html>
  );
}
