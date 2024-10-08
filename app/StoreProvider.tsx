'use client'
import { useEffect, useRef } from 'react'
import { Provider } from 'react-redux'
import { makeStore, AppStore } from '../lib/store'
import React from 'react'
import { fetchUserThunk } from '../lib/features/user/userSlice'
import { useUser } from '@auth0/nextjs-auth0/client'

export default function StoreProvider({
  children
}: {
  children: React.ReactNode
}) {
  const storeRef = useRef<AppStore>()
  if (!storeRef.current) {
      storeRef.current = makeStore()
  } 
  const { user } = useUser()
  useEffect(() => {
    if (storeRef.current && user) {
      storeRef.current.dispatch(fetchUserThunk());
    }
  }, [user]);

  return <Provider store={storeRef.current}>{children}</Provider>
}
