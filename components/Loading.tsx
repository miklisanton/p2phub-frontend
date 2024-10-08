'use client';
import { Bars } from "react-loader-spinner";

function LoadingPage() {
  return (
    <div className="flex items-center justify-center h-screen mx-auto">
      <Bars color="#DFEF87" />
    </div>
  );
}

export default LoadingPage;
