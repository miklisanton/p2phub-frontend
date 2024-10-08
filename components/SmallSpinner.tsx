'use Client'
import { Circles } from "react-loader-spinner";
import React from "react";

export default function SmallSpinner() {
  return (
    <div className="flex items-center justify-center mx-auto mt-auto">
      <Circles 
      color="#DFEF87"
      height={40}
      />
    </div>
  );
}
