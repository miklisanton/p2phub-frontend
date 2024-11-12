'use client'

import { privateFetch } from '../utils';
import { useAppSelector } from '@/lib/hooks';
import LoadingPage from './Loading';

export const Profile = () => {
  const handleTelegramConnect = () => {
    // Create a new window immediately
    const newWindow = window.open('', '_blank');
    
    // Get telegram connection link
    privateFetch.post('/telegram/connect')
      .then((res) => {
        // Set the new window's location to the fetched link
        if (newWindow) {
          newWindow.location.href = "https://" + res.data.link;
        }
      })
      .catch((error) => {
        console.error(error);
        // Close the new window if an error occurs
        if (newWindow) {
          newWindow.close();
        }
      });
  }

  const handleSubscribe = () => {
    const newWindow = window.open('', '_blank');

    // Get payment link
    privateFetch.post('/subscriptions')
      .then((res) => {
        // Set the new window's location to the fetched link
        console.log(res);
        if (newWindow) {
          newWindow.location.href = res.data.invoice.url;
        }
      }).catch((error) => {
        console.error(error);
        // Close the new window if an error occurs
        if (newWindow) {
          newWindow.close();
        }
      });
  } 

  
  const user = useAppSelector((state) => state.user.user);  // Selector for user data
  const loading = useAppSelector((state) => state.user.loading);  // Selector for loading state
  const error = useAppSelector((state) => state.user.error);  // Selector for error state


  if (loading || user===null) {
    return (
        <LoadingPage />
    )
  }

  if (error !== null) {
    return (
    <div className=" mx-auto bg-white p-4 pt-6 rounded-xl shadow-xl my-auto sm:w-3/5 min-h-60">
      <h1 className="capitalize text-5xl font-semibold md:text-center ml-4 md:ml-0  mb-2 text-white">Not logged in</h1>
    </div>
    )
  }
  
  return (
    <div className=" mx-auto bg-white p-4 pt-6 rounded-xl shadow-xl my-auto sm:w-3/5 min-h-60 border-2 border-lime">
      <h1 className="capitalize text-5xl font-semibold md:text-center ml-4 md:ml-0  mb-2 text-gray-900">My Profile</h1>
      <hr className="my-2 border-lime"/>
      <div className="grid md:max-w-5xl md:grid-cols-2 sm:grid-cols-1 sm:justify-items-start md:justify-items-center gap-4 p-4 ">
        <div className="">
          <h2 className="font-semibold text-gray-900 text-xl mb-1">Email:</h2>
          <h2 className="pl-1 font-semibold text-gray-600">{user.user.email}</h2>
        </div>
        <div className="">
          <h2 className="font-semibold text-gray-900 text-xl mb-1">Telegram:</h2>
    { user.user.telegram 
      ?
        <>
          <h2 className="pl-1 font-semibold text-gray-600 mb-2">Connected | Chat Id: {user.user.telegram}</h2>
            <button type="button"
                onClick={handleTelegramConnect}
                className="text-gray-800 hover:text-black border border-lime hover:bg-lime focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
            Reconnect
            </button>
        </>
      :
          <div className="pl-1 grid self-center">
            <h2 className="font-semibold text-gray-600 mb-2">Clcik the button below to connect telegram,<br/> you will be redirected to our bot.</h2>
            <button type="button"
                onClick={handleTelegramConnect}
                className="text-gray-800 hover:text-black border border-lime hover:bg-lime focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
            Connect Telegram
            </button>
          </div>
    }
        </div>
        <div className="">
          <h2 className="font-semibold text-gray-900 text-xl mb-1">Subscription:</h2>
          <h2 className="pl-1 font-semibold text-gray-600 mb-2">Expires 12.11.2024</h2>
          <button type="button"
              onClick={handleSubscribe}
              className="text-gray-800 hover:text-black border border-lime hover:bg-lime focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
          Renew Subscription
          </button>
        </div>
      </div>
    </div>
  )
}
