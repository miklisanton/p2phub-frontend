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
    <Provider>
    <html lang="en">
      <UserProvider>
      <body
        className={`${roboto.className} bg-orange-50`}
        id="root" 
      >
        <div className="flex flex-col h-screen text-gray-900">
          <Header/>
          <ToastProvider>
            {children}
          </ToastProvider>
          <Footer/>
        </div>
      </body>
      </UserProvider>
    </html>
    </Provider>
  );
}
