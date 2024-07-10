'use client';
import Footer from '@/layout/Footer';
import Header from '@/layout/Header';
import '@/styles/globals.css';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <div className='relative flex flex-col min-h-screen'>
        <Header />
        <div className='mt-[110px] flex-grow w-full max-w-[1440px] mx-auto px-[16px]'>{children}</div>
        <Footer />
      </div>
    </main>
  );
}
