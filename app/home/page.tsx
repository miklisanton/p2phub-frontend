import Image from 'next/image';
import React from 'react';
import iphoneImage from '../../public/iphone.png';

export default function Page() {
  return (
    <div className="grid bg-orange-200 grid-cols-4 grid-rows-4 grid-gap-2">
      <h1>Page</h1>
      <p>This is the page content.</p>
      <Image
        className="col-span-2 row-span-2 bg-red-200"
        src={iphoneImage}
        height={500}
        alt="creative"
        quality={100}/>
    </div>
  );
}

