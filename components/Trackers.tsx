'use client';
import Tracker from './SingleTracker';
import TrackerForm from './TrackerForm';
import { useAppSelector } from '../lib/hooks';
import { useState } from 'react';
import { useGetTrackersQuery } from '@/lib/features/trackers/trackersApi';
import LoadingPage from './Loading';

export  function Trackers() {
  // Check if telegram is connected
  const user = useAppSelector((state) => state.user.user);  // Selector for user data
  const isTelegramConnecected = user?.user.telegram !== null;

  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useGetTrackersQuery(page);
  if (isLoading) {
    return ( 
        <LoadingPage />
    )
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center">
        <h1 className="capitalize text-5xl font-bold text-center text-lime my-12">Please login to view your trackers</h1>
      </div>
    )
  }
 
  if (isError) {
    return (
      <div className="flex items-center justify-center flex-grow h-1/2">
        <h1 className="capitalize text-5xl font-bold text-center mt-6 mb-2 text-orange-800">Error fetching trackers</h1>
      </div>
    )
  }

  return (
    <>
    <hr className="mt-8 my-4 border-lime"/>
    <h1 className="capitalize text-5xl font-bold text-center my-2 text-white">My trackers</h1>
    <hr className="my-4 border-lime"/>
    <div className="container mx-auto grid  md:max-w-5xl md:grid-cols-2 sm:grid-cols-1 justify-items-center gap-4 p-4">
      <TrackerForm isTelegramConnected={isTelegramConnecected}/>
      {data?.trackers.map((tracker) => {
        return <Tracker key={tracker.id} tracker={tracker} isTelegramConnected={isTelegramConnecected} />
      })
      }
    </div>
    <div className="flex justify-center items-center text-lime my-6 text-xl font-black">
      <button type="button"
        className="mr-4"
        onClick={()=> setPage((old) => Math.max(old - 1, 1))}
        disabled={page === 0}>
      &lt;
    </button>
      <p>{page}</p>
      <button type="button"
        className="ml-4"
        onClick={()=>
          {if (data?.hasMore) {
            setPage((old) => old + 1);
          }}}
        disabled={!data?.hasMore}>
      &gt;
    </button>
    </div>
    </>
  )
}
