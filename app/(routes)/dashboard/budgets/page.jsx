"use client"
import React from 'react'
import BudgetList from './_components/BudgetList'
import { useRouter } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';
import { FaArrowRight } from 'react-icons/fa';

function Budget() {
  const router = useRouter();
  return (
    <div className='p-4 md:p-8'>
      <h2 className='font-bold text-xl md:text-3xl'>
        <div className='flex items-center gap-2'>
          <FaArrowLeft 
            className='cursor-pointer rounded-full bg-slate-400 w-6 h-6 md:w-7 md:h-7 hover:bg-white' 
            onClick={() => router.push('/dashboard')} 
            size={20} 
          />
          My Budget
          <FaArrowRight 
            className='cursor-pointer rounded-full bg-slate-400 w-6 h-6 md:w-7 md:h-7 hover:bg-white' 
            onClick={() => router.push(`/dashboard/expenses`)} 
            size={20} 
          />
        </div>
      </h2>
      <BudgetList />
    </div>
  );
  
}

export default Budget
