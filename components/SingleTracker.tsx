'use client'

import React, { useEffect, useRef, useState } from 'react';
import { TrashIcon } from '@heroicons/react/20/solid';
import { useUpdateTrackerMutation, useDeleteTrackerMutation } from '@/lib/features/trackers/trackersApi';
import { Method, Tracker as TrackerClass } from '@/types';


const PaymentMethod = ({method}: {method: Method}) => {
  return (
    <div className="relative inline-block bg-gray-200 text-gray-700 px-4 py-1 m-1 rounded-full shadow-sm overflow-hidden">
      {method.Name || method.Id}
      { method.Outbided
          ?
      <div
        className="absolute bg-gray-700"
        style={{
          width: '150%',
          height: '3px',
          top: '50%',
          left: '-25%',
          transform: 'rotate(-30deg)',
        }}
      ></div>
          :
      null
      }
    </div>
  );
};

const PaymentMethodsList = ({methods}: {methods: Method[]}) => {
  return (
    <div className="flex-wrap">
      {methods.map((method, index) => (
        <PaymentMethod key={index} method={method} />
      ))}
    </div>
  );
};

const Tracker = ({ tracker, isTelegramConnected} : {tracker: TrackerClass, isTelegramConnected: boolean}) => {
  const [updateTracker] = useUpdateTrackerMutation();
  const [deleteTracker] = useDeleteTrackerMutation();

  const [notifications, setNotifications] = useState(tracker.notify);

  const handleNotificationToggle = () => {
      setNotifications(!notifications);
      updateTracker({id: tracker.id, notify: !notifications});
  };

  

  const handleRemove = () => {
    console.log('removing tracker');
    deleteTracker(tracker.id);
  }



  const notificationsToggle = useRef<HTMLInputElement | null>(null);
  // Disable notifications toggle if telegram is not connected
  useEffect(() => {
    if (!isTelegramConnected && notificationsToggle.current) {
      notificationsToggle.current.disabled = true;
    }
  }, [isTelegramConnected]);


  const cardColor = tracker.side === 'SELL'
    ? 'bg-red-500'
    : 'bg-green-500';

  return (
    <div  className={`grid w-full p-5 rounded-lg shadow-lg transition-all ${cardColor}`}>
      {/* Tracker Information */}
      <div className="container">
      <div className="flex self-start justify-between items-center mb-4">
        <h2 className="text-3xl font-bold text-gray-100 capitalize"> {tracker.exchange}</h2>
        <h2 className="font-bold text-gray-100">{tracker.username}</h2>
      </div>

      {/* Price */}
      <div className="mb-4">
        <p className="text-lg font-semibold text-white">
        {tracker.price} {tracker.currency} / USDT
        </p>
      </div>

      <PaymentMethodsList methods={tracker.payment_methods} />
      </div>
      {/* Notification Toggle */}
      <div className="self-end mt-4 flex justify-between items-center">
        <label className="inline-flex items-center cursor-pointer">
          <input 
            ref={notificationsToggle}
            type="checkbox"
            id={tracker.id.toString()}
            onChange={handleNotificationToggle}
            checked={notifications}
            className="sr-only peer"/>
          <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-700"></div>
          <span className="ms-3 text-sm font-medium text-gray-100 ">Telegram notifications</span>
        </label>
        <button type="button" onClick={handleRemove}>
          <TrashIcon className="h-6 w-6 text-gray-100 cursor-pointer" />
        </button>
      </div>
    </div>
  );
};


export default Tracker; 
