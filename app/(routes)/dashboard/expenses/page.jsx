"use client";
import React, { useEffect, useState } from 'react';
import { db } from '@/utils/dbConfig';
import { Expenses } from '@/utils/schema';
import { desc, eq } from 'drizzle-orm';
import ExpenseInfoTable from './_components/ExpenseInfoTable';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

function ExpensesPage() {
    const [expenses, setExpenses] = useState([]);
    const router = useRouter();

    useEffect(() => {
        fetchExpenses();
    }, []);

    const fetchExpenses = async () => {
        try {
            const res = await db.select()
                .from(Expenses)
                .orderBy(desc(Expenses.id));
            setExpenses(res);
        } catch (error) {
            console.error('Failed to fetch expenses:', error);
        }
    };

    return (
        <div className="p-4 md:p-8">
          <h2 className="font-bold text-xl md:text-3xl mb-4">
            <div className='flex items-center gap-2'>
              <FaArrowLeft 
                className='cursor-pointer rounded-full bg-slate-400 w-6 h-6 md:w-7 md:h-7 hover:bg-white' 
                onClick={() => router.push('/dashboard/budgets')} 
                size={20} 
              />
              All Expenses
              <FaArrowRight 
                className='cursor-pointer rounded-full bg-slate-400 w-6 h-6 md:w-7 md:h-7 hover:bg-white' 
                onClick={() => router.push(`/dashboard/expenses/${3}`)} 
                size={20} 
              />
            </div>
          </h2>
          <ExpenseInfoTable expensesInfo={expenses} refreshData={fetchExpenses} />
        </div>
      );
      
}

export default ExpensesPage;