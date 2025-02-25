import AuthProvider from '@/components/Auth/AuthProvider';
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
      <link rel='shortcut icon' href='/image/home/logo.png' />
      <body className={inter.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
