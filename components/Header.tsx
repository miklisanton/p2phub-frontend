'use client'

import { useAppSelector } from '@/lib/hooks'
import { NavLink } from './Navlink'
import { useState } from 'react'
import { links } from '../data'
import { privateFetch } from '../utils'
import { useUser } from '@auth0/nextjs-auth0/client'
import {
  Dialog,
  DialogPanel,
  PopoverGroup,
} from '@headlessui/react'
import {
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const Profile = () => {
    const {user, isLoading, error} = useUser()
    if (isLoading) {
      return (
          <h1>Loading...</h1>
      )
    }
    if (user && !error) {
      return (
        <>
          <NavLink key="nav-login" href="/profile">
            {user.email}
          </NavLink>
          <hr className="border-gray-500/10 my-2"/>
          <NavLink key="nav-logout" href="/api/auth/logout">
            Logout
          </NavLink>
        </>
      )
    } else {
      // Not logged in
      return (
          <NavLink key="nav-login" href="/api/auth/login">
          Login | Sign up
          </NavLink>
      )
    }
  }

  return (
    <header className="bg-transparent">
      <nav aria-label="Global" className="grid grid-flow-col lg:grid-cols-5 p-6 text-white">
          <div className="flex lg:flex-1 ">
            <a href="/" className="-m-1.5 p-1.5">
              <h1 className="text-2xl font-extrabold tracking-wide">P2Phub</h1>
            </a>
          </div>
          <div className="flex lg:hidden ml-auto">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <PopoverGroup className="hidden lg:flex lg:gap-x-12 lg:col-span-3 mx-auto items-center">
            {links.map((link, index) => {
              return (
                <NavLink key={`nav-${index}`} href={link.url}>
                {link.name}
                </NavLink>
              )
            })}
          </PopoverGroup>
        <div className="hidden lg:flex  lg:flex-1 lg:justify-end items-center">
          <Profile />
        </div>
      </nav>
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-coffee px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-white"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="-mt-3 flow-root">
            <div className="my-6 divide-y divide-white/20">
                {links.map((link, index) => {
                  return (
                    <div onClick={() => {setMobileMenuOpen(false)}} key={`mobile-nav-${index}`} className="space-y-2 py-6">
                      <NavLink href={link.url}>
                      {link.name}
                      </NavLink>
                    </div>
                  )
                })}
              <div className="py-6">
                <Profile />
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}

