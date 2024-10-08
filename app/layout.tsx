import type { Metadata } from "next";
import  { Roboto} from "next/font/google";
import Header from '../components/Header';
import Footer from '../components/Footer';
import "./globals.css";
import Provider from './StoreProvider';
import ToastProvider from './ToastProvider';
import { UserProvider } from '@auth0/nextjs-auth0/client';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ["500"],
});


export const metadata: Metadata = {
  title: "P2P Hub",
  description: "P2P Hub",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <UserProvider>
      <Provider>
      <body
        className={`${roboto.className} bg-gray-900`}
        id="root" 
      >
        <div className="flex flex-col h-screen text-white">
          <Header/>
          <ToastProvider>
            {children}
          </ToastProvider>
          <Footer/>
        </div>
      </body>
      </Provider>
      </UserProvider>
    </html>
  );
}
