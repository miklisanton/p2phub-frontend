import  Link  from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

export const NavLink = ({href, children }: {href:string, children:React.ReactNode}) => {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link href={href} legacyBehavior>
      <a className={`flex justify-center text-sm font-semibold leading-6 p-0 mr-2 ${isActive ? 'text-orange-800' : 'text-gray-900'}`}>
        {children}
      </a>
    </Link>
  )
}
