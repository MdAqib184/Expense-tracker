"use client"
import React from 'react'
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useUser, UserButton } from "@clerk/nextjs";
import Link from 'next/link'

function Header() {
  const { user, isSignedIn } = useUser();
  const navItems = [
    { id: 1, href: '/sign-in', label: 'Login', bgClass: 'bg-emerald-600' },
    { id: 2, href: '/sign-up', label: 'Sign Up', bgClass: 'bg-blue-600' }
  ];

  return (
    <div className="header-container p-2 flex flex-col md:flex-row justify-between items-center border shadow-md sticky top-0 bg-white z-10">
      <div className="flex items-center mb-4 md:mb-0">
        <Image src={'/logo.svg'}
          alt="logo"
          height={50}
          width={75}
          className="w-auto h-auto" />
      </div>
      {isSignedIn ? (
        <UserButton />
      ) : (
        <div className='header-buttons flex gap-2'>
          {navItems.map(item => (
            <Link key={item.id} href={item.href}>
              <Button className={`text-sm md:text-base lg:text-lg py-1 md:py-2 lg:py-3 px-2 md:px-4 lg:px-6 ${item.bgClass}`}>
                {item.label}
              </Button>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default Header
