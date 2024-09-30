import {MultiSelect} from './MultiSelect';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import { Bars } from 'react-loader-spinner';
import {privateFetch, displayErrors} from '../utils';
import { toast } from 'react-toastify';
import { useEffect, useState, useRef} from 'react';
import { APIError } from '@/types';
import { useCreateTrackerMutation } from '@/lib/features/trackers/trackersApi';

const TrackerForm = ({isTelegramConnected}:{isTelegramConnected: boolean}) => {
  // Disable notifications toggle if telegram is not connected
  const notificationsToggle = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (!isTelegramConnected && notificationsToggle.current) {
      notificationsToggle.current.disabled = true;
      setNotifications(false);
    }
  }, [isTelegramConnected]);
  // Handle form submission
  const [createTracker, result] = useCreateTrackerMutation()
  useEffect(() => {
    if (result.isSuccess) {
      toast.success('Tracker added successfully');
    }
    if (result.isError) {
      console.log(result.error);
      if (typeof result.error === 'object' && result.error !== null && 'errors' in result.error) {
        const error = new APIError("", result.error.errors);
        error.displayErrors();
      }
    }   
  }, [result]);
  console.log(result);
  
  const [notifications, setNotifications] = useState(true);
  const handleNotificationToggle = () => {
    setNotifications(!notifications);
  };
  // Retreive form options
  // Get exchanges on page load
  const [exchanges, setExchanges] = useState([]);
  const [exchange, setExchange] = useState('');
  useEffect(() => {
    privateFetch.get('/trackers/options/exchanges').then((response) => {
      setExchanges(response.data.exchanges);
      setExchange(response.data.exchanges[0]);
    }).catch((error) => {
      console.error('Error fetching exchanges', error);
    }
    );
  }, []);
  // Get currencies when exchange input changes 
  const [currencies, setCurrencies] = useState([]);
  const [currency, setCurrency] = useState('');
  useEffect(() => {
    if (exchange !== '') {
      privateFetch.get('/trackers/options/currencies?exchange='+exchange).then((response) => {
        setCurrencies(response.data.options);
        setCurrency(response.data.options[0]);
      }).catch((error) => {
        console.error('Error fetching currencies', error.response.data);
      }
      );
    }
    //Reset selected methods when exchange changes
    setSelectedMethods([]);
    //Reset selected currency when exchange changes
    setCurrency('');
  }, [exchange]);
  // Get payment methods when currency input changes 
  const [payMethods, setPayMethods] = useState([]);
  useEffect(() => {
    if (currency !== '' && exchange !== '') {
      privateFetch.get('/trackers/options/methods?exchange='+exchange+'&currency='+currency).then((response) => {
        setPayMethods(response.data.options);
        console.log(response.data.options);
      }).catch((error) => {
        console.error('Error fetching payment methods', error.response.data);
      }
      );
    }
    // Reset selected methods when currency changes
    setSelectedMethods([]);
  }, [currency, exchange]);
  const [selectedMethods, setSelectedMethods] = useState([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const exchange = formData.get('exchange') as string;
    const side = formData.get('side') as string;
    const username = formData.get('username') as string;
    const currency = formData.get('currency') as string;
    const notify = notifications;
    const payment_methods = selectedMethods;
    const is_aggregated = payment_methods.length > 0 ? false : false;
    createTracker({exchange, side, username, currency, notify, payment_methods, is_aggregated});
  }

  return (
    <>
       <form onSubmit={handleSubmit} id="TrackerForm" className="bg-gray-300 p-5 grid gap-4 w-full rounded-lg shadow-lg transition-all">
        {/* Exchange and Direction */}
        <div className="w-full flex justify-between items-center mb-4">
          {/* Exchange */}
          <div className="w-1/2 pr-2">
            <label htmlFor="exchange" className="text-gray-700 font-bold">Exchange</label>
            <select
              id="exchange"
              name="exchange"
              onChange={(e) => {setExchange(e.target.value)}}
              className="block w-full bg-gray-200 text-gray-700 px-4 py-2 mt-2 rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-500"
            >
              {exchanges.map((exchange) => {
                return (
                  <option key={exchange} value={exchange} className="text-gray-800 bg-white">
                    {exchange}
                  </option>
                )
              })
              }
            </select>
          </div>

          {/* Direction */}
          <div className="w-1/2 pl-2">
            <label htmlFor="direction" className="text-gray-700 font-bold">Direction</label>
            <select
              id="side"
              name="side"
              className="block w-full bg-gray-200 text-gray-700 px-4 py-2 mt-2 rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-500">
              <option key="BUY" value="SELL">I'm selling</option>
              <option key="SELL" value="BUY">I'm buying</option>
            </select>
          </div>
        </div>

        {/* Exchange username, currency inputs */}
        <div className="w-full flex justify-between items-center mb-4">
          {/* Payment methods */}
          <div className="max-w-32">
            <label htmlFor="payment" className="text-gray-700 font-bold">Payment</label>
            <MultiSelect options={payMethods} selected={selectedMethods} setSelected={setSelectedMethods}/>
          </div>
          {/* Currency */}
          <div className="max-w-24">
            <label htmlFor="currency" className="text-gray-700 font-bold">Currency</label>
            <select
              id="currency"
              name="currency"
              onChange={(e) => {setCurrency(e.target.value)}}
              className="block w-full bg-gray-200 text-gray-700 px-4 py-2 mt-2 rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-500">
            {currencies.map((currency) => {
                return (
                  <option key={currency} value={currency} className="text-gray-800 bg-white">
                    {currency}
                  </option>
                )
            })}
            </select>
          </div>
          {/* Exchange username */}
          <div className="max-w-28">
            <label htmlFor="username" className="text-gray-700 font-bold">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              className="block w-full bg-gray-200 text-gray-700 px-4 py-1.5 mt-2 rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-500"/>
          </div>
        </div>

        <div className="flex justify-between mt-4">
          <div className="flex justify-between items-center">
            <label className="inline-flex items-center cursor-pointer">
              <input 
                ref={notificationsToggle}
                type="checkbox"
                onChange={handleNotificationToggle}
                name="notifications"
                checked={notifications}
                className="sr-only peer"/>
              <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-orange-700"></div>
            </label>
            <span className="text-sm font-medium text-gray-800 ml-2">Telegram <br/> notifications</span>
          </div>
        {/* Submit Button */}
          <button
            type="submit"
            className="bg-green-500 text-white font-bold py-2 px-4 rounded-lg shadow hover:bg-green-600 transition duration-300">
            Add Tracker
          </button>
        </div>
      </form>

    {result.isLoading &&
       <div className="bg-gray-300 p-5 grid gap-4 w-full rounded-lg shadow-lg transition-all duration-500 ease-in-out transform scale-100 opacity-100">
        <div className="grid justify-center items-center text-center self-center mx-auto">
          <Bars
          height="80"
          width="80"
          color="#9a3412"
          ariaLabel="bars-loading"
          wrapperStyle={{margin: 'auto'}}   
          wrapperClass=""
          visible={true}
          />
          <p className="text-gray-700 font-bold">Looking for your advertisements on exchange.<br/> It may take a while</p>
        </div>
       </div>
    }
    </>
  )
}

export default TrackerForm;