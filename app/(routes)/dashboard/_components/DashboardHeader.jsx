import React from 'react';
import { UserButton } from '@clerk/nextjs';
import { FaBars } from 'react-icons/fa';
import Image from 'next/image';

function DashboardHeader({ onToggleSidebar, isSidebarOpen }) {
  return (
    <div className='p-4 shadow-md border-b flex justify-between items-center sticky top-0 bg-white z-10'>
      <div className='flex items-center'>
        <button
          className='block md:hidden mr-3'
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
        >
          <FaBars size={24} />
        </button>
        {!isSidebarOpen && (
          <Image src={'/logo.svg'} alt="logo" height={40} width={120} 
          />
        )}
      </div>
      <UserButton />
    </div>
  );
}

export default DashboardHeader;
