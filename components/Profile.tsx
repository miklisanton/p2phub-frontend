'use client'

import { privateFetch } from '../utils';
import { useAppSelector } from '@/lib/hooks';
import LoadingPage from './Loading';

export const Profile = () => {
  const handleTelegramConnect = () => {
    // Get telegram connection link
    privateFetch.post('/telegram/connect').then((res) => {
      console.log(res);
      window.open("https://" + res.data.link, "_blank");
    }
    ).catch((error) => {
      console.error(error);
    })
  }

  const user = useAppSelector((state) => state.user.user)
  const loading = useAppSelector((state) => state.user.loading) 
  const error = useAppSelector((state) => state.user.error)
  if (loading || user===null) {
    return (
      <LoadingPage />
    )
  }

  if (error !== null) {
    return (
    <div className=" mx-auto bg-white p-4 pt-6 rounded-xl shadow-xl my-auto sm:w-3/5 min-h-60">
      <h1 className="capitalize text-5xl font-semibold md:text-center ml-4 md:ml-0  mb-2 text-orange-800">Not logged in</h1>
    </div>
    )
  }
  
  return (
    <div className=" mx-auto bg-white p-4 pt-6 rounded-xl shadow-xl my-auto sm:w-3/5 min-h-60">
      <h1 className="capitalize text-5xl font-semibold md:text-center ml-4 md:ml-0  mb-2 text-orange-800">My Profile</h1>
      <hr className="my-2"/>
      <div className="grid md:max-w-5xl md:grid-cols-2 sm:grid-cols-1 sm:justify-items-start md:justify-items-center gap-4 p-4 ">
        <div className="">
          <h2 className="font-semibold text-gray-800 text-xl mb-1">Email:</h2>
          <h2 className="pl-1 font-semibold text-gray-600">{user.user.email}</h2>
        </div>
        <div className="">
          <h2 className="font-semibold text-gray-800 text-xl mb-1">Telegram:</h2>
    { user.user.telegram 
      ?
        <>
          <h2 className="pl-1 font-semibold text-gray-600 mb-2">Connected | Chat Id: {user.user.telegram}</h2>
            <button type="button"
                onClick={handleTelegramConnect}
                className="text-gray-600 hover:text-white border border-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
            Reconnect
            </button>
        </>
      :
          <div className="pl-1 grid self-center">
            <h2 className="font-semibold text-gray-600 mb-2">Clcik the button below to connect telegram,<br/> you will be redirected to telegram bot.</h2>
            <button type="button"
                onClick={handleTelegramConnect}
                className="text-orange-700 hover:text-white border border-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
            Connect Telegram
            </button>
          </div>
    }
        </div>
      </div>
    </div>
  )
}

