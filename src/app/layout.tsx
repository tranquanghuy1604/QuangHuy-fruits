import ConfigProvider from '@/components/Auth/ConfigProvider';
import '@/styles/globals.css';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'QuangHuyFruits',
  description: 'QuangHuyFruits',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <link rel='shortcut icon' href='/image/home/logo.jpg' />
      <body className={inter.className}>
        <ConfigProvider>{children}</ConfigProvider>
      </body>
    </html>
  );
}
