'use client';
import Tracker from './SingleTracker';
import TrackerForm from './TrackerForm';
import {useMutation, useQueryClient, useQuery, keepPreviousData} from '@tanstack/react-query';
import { useAppSelector } from '../lib/hooks';
import {privateFetch} from '../utils';
import { Bars } from 'react-loader-spinner';
import React from 'react';
import { FetchTrackers } from '@/types';
import { useGetTrackersQuery } from '@/lib/features/trackers/trackersApi';
import LoadingPage from './Loading';

export  function Trackers() {
  const user = useAppSelector((state) => state.user.user);
  // Check if telegram is connected
  const isTelegramConnecected = user?.user.telegram ? true : false;
  const [page, setPage] = React.useState(1);
  const { data, isLoading, isError, isSuccess} = useGetTrackersQuery(page);
  if (isLoading) {
    return ( 
        <LoadingPage />
    )
  }

  if (!user) {
    return <h1 className="capitalize text-5xl font-bold text-center mt-6 mb-2 text-orange-800">Please login to view your trackers</h1>
  }
 
  if (isError) {
    return <h1 className="capitalize text-5xl font-bold text-center mt-6 mb-2 text-orange-800">Error fetching trackers</h1>
  }

  return (
    <>
    <h1 className="capitalize text-5xl font-bold text-center mt-6 mb-2 text-orange-800">My trackers</h1>
    <div className="container mx-auto grid  md:max-w-5xl md:grid-cols-2 sm:grid-cols-1 justify-items-center gap-4 p-4">
      <TrackerForm isTelegramConnected={isTelegramConnecected}/>
      {data?.trackers.map((tracker) => {
        return <Tracker key={tracker.id} tracker={tracker} isTelegramConnected={isTelegramConnecected} />
      })
      }
    </div>
    <div className="flex justify-center items-center text-orange-800 my-6 text-xl font-black">
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
