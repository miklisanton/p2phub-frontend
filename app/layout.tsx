import type { Metadata } from "next";
import  { Roboto } from "next/font/google";
import Header from '../components/Header';
import "./globals.css";
import Provider from './StoreProvider';
import { useAppDispatch, useAppSelector} from "@/lib/hooks";
import {fetchUserThunk} from "@/lib/features/user/userSlice";
import ToastProvider from './ToastProvider';
import { fetchCsrf } from "@/utils";

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
      <body
        className={`${roboto.className} bg-orange-50`}
        id="root" 
      >
        <div className="flex flex-col min-h-screen">
          <Header/>
          <ToastProvider>
            {children}
          </ToastProvider>
        </div>
      </body>
    </html>
    </Provider>
  );
}
