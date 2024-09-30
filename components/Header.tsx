'use client'

import { useAppSelector, useAppDispatch, useAppStore } from '@/lib/hooks'
import { NavLink } from './Navlink'
import { useState } from 'react'
import { links } from '../data'
import { publicFetch, privateFetch, fetchCsrf} from '../utils'
import { type User } from '../types'
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
    const user = useAppSelector((state) => state.user.user)
    if (user !== null) {
      return (
        <>
          <NavLink key="nav-login" href="/profile">
          {user.user.email}
          </NavLink>
          <hr className="border-gray-500/10 my-2"/>
          <button key="nav-logout"
            type="button"
            onClick={() => { privateFetch.post('/logout').then(()=>{window.location.reload()}) }}
            className="text-sm font-semibold leading-6 bg-transparent border-none p-0">
          Log out
          </button>
        </>
      )
    } else {
      // Not logged in
      return (
          <NavLink key="nav-login" href="/login">
          Log in
          </NavLink>
      )
    }
  }

  return (
    <header className="bg-transparent">
      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <h1 className="text-2xl font-extrabold tracking-wide">P2Phub</h1>
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          {links.map((link, index) => {
            return (
              <NavLink key={`nav-${index}`} href={link.url}>
              {link.name}
              </NavLink>
            )
          })}
        </PopoverGroup>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Profile />
        </div>
      </nav>
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <h1 className="text-2xl font-extrabold tracking-wide">P2Phub</h1>
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {links.map((link, index) => {
                  return (
                    <NavLink key={`navm-${index}`} href={link.url}>
                    {link.name}
                    </NavLink>
                  )
                })}
              </div>
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

