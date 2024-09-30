'use client';
import { Bars } from "react-loader-spinner";

function LoadingPage() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Bars color="#9a3412" />
    </div>
  );
}

export default LoadingPage;
