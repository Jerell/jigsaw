import Header from '@/components/Header';
import './globals.css';
import { Inter, Roboto } from 'next/font/google';
import Footer from '@/components/Footer';
import clsxm from '@/lib/clsxm';

const roboto = Roboto({
  weight: ['100', '300', '400', '500', '700', '900'],
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
        className={clsxm([roboto.className, 'flex flex-col justify-between'])}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
