import Header from '@/components/Header';
import './globals.css';
import { Roboto, Charis_SIL } from 'next/font/google';
import clsxm from '@/lib/clsxm';
import UnderlineLink from '@/components/links/UnderlineLink';

const roboto = Roboto({
  weight: ['100', '300', '400', '500', '700', '900'],
  subsets: ['latin'],
});

const charis = Charis_SIL({
  weight: ['400', '700'],
  subsets: ['latin'],
});

export const metadata = {
  title: 'jigsaw',
  description: 'practice',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body
        className={clsxm([
          charis.className,
          'flex flex-col justify-between items-center pb-1',
        ])}
      >
        <Header />
        <main className='flex flex-col items-center h-full grow w-full p-2'>
          {children}
        </main>
        <a href='#header'>Back to top</a>
      </body>
    </html>
  );
}
