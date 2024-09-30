'use client'
import { useEffect, useRef } from 'react'
import { Provider } from 'react-redux'
import { makeStore, AppStore } from '../lib/store'
import React from 'react'
import { fetchUserThunk } from '../lib/features/user/userSlice'

export default function StoreProvider({
  children
}: {
  children: React.ReactNode
}) {
  const storeRef = useRef<AppStore>()
  if (!storeRef.current) {
      storeRef.current = makeStore()
  } 
  useEffect(() => {
    if (storeRef.current) {
      storeRef.current.dispatch(fetchUserThunk());
    }
  }, []); // Empty dependency array ensures this runs once on mount

  return <Provider store={storeRef.current}>{children}</Provider>
}
