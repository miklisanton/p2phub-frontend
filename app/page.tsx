import Image from 'next/image';
import React from 'react';
import iphoneImage from '../public/iphone.png';
import arrowImage from '../public/arrow.png';
import  { Roboto_Condensed } from "next/font/google";

const robotoCondensed = Roboto_Condensed({
  subsets: ['latin'],
  weight: ["500"],
});

export default function Page() {
  return (
    <main className="">
      <div className="grid md:grid-cols-3 lg:grid-cols-4 lg:grid-rows-3 gap-4 p-4">
        <div className={`${robotoCondensed.className}  lg:row-start-2 md:col-start-2 lg:col-start-2 md:flex-row md:pt-12 lg:pt-0 drop-shadow-md`}>
          <h1  className="text-2xl">Track your P2P advertisements</h1>
          <ul className="list-disc ml-6 self-end ">
            <li>Get notified when your ad is outbidded</li>
            <li>No sensitive data required</li>
            <li>Maximize your profits</li>
            <li className="lg:hidden">3 days free trial</li>
          </ul>
        </div>
        <div className="mx-auto lg:row-span-3  max-w-48 md:max-w-40 lg:max-w-64 md:col-start-3 lg:col-start-3 max-h-fit self-center">
          <Image
            className="object-scale-down lg:max-h-[85%]"
            src={iphoneImage}
            alt="creative"
            style={{WebkitFilter: 'drop-shadow(3px 3px 3px #888)', filter: 'drop-shadow(3px 3px 3px #888)'}}
            quality={100}/>
        </div>
        <div className={`${robotoCondensed.className} hidden lg:flex container `}>
          <ul className="text-right self-center w-full text-orange-800 capitalize">
            <li>Create account</li>
            <li>Get 3 days free trial</li>
          </ul>
          <Image 
            className="self-start mr-2 h-1/2 rotate-[-10deg]"
            style={{filter: 'invert(21%) sepia(20%) saturate(7000%) hue-rotate(357deg) brightness(98%) contrast(89%)'}}
            alt="arrow"
            src={arrowImage}/>
        </div>
      </div>
    </main>
  );
}
