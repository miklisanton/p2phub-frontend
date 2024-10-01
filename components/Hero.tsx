'use client'
import ScrollIntoView from 'react-scroll-into-view'
import Link from 'next/link'
import { useAppSelector } from '@/lib/hooks'


export default function Hero() {
  
  const HeroButton = () => {
    const user = useAppSelector((state) => state.user.user);
    return (
      user 
      ?
        <ScrollIntoView selector="#TrackerForm">
          <button type="button" className="text-orange-700 hover:text-white border border-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
          Create Tracker
          </button>
        </ScrollIntoView>
      :
          <Link href="/login">
            <button type="button" className="text-orange-700 hover:text-white border border-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
            Create Tracker
            </button>
          </Link>
    )
  }
  return (
        <section className="bg-cover bg-center h-[100vh] md:h-[50vh] min-h-64" >
          <div className="h-full flex flex-col justify-center items-center text-center text-gray-100 bg-gray-900">
            <h1 className="text-4xl font-bold mb-4">Start monitoring your P2P ads</h1>
            <p className="text-xl mb-6">
      Create a tracker to receive notifications when your advertisement is no longer at the top (Binance/Bybit supported)</p>
            <HeroButton />
          </div>
        </section>
  )
}
