"use client"
import React, { useEffect, useState } from 'react'
import { useUser } from "@clerk/nextjs"
import { db } from '@/utils/dbConfig';
import { desc, eq, getTableColumns, sql } from 'drizzle-orm';
import { Budgets, Expenses } from '@/utils/schema';
import ExpenseInfoTable from './_components/ExpenseInfoTable';  // Adjusted path
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

function ExpensePage() {

  const { user } = useUser();
  const [budgetList, setBudgetList] = useState([]);
  const [expensesInfo, setExpensesInfo] = useState([]);
  const router=useRouter();

  const getBudgetList = async () => {
    try {
      const res = await db.select({
        ...getTableColumns(Budgets),
        totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
        totalItem: sql`count(${Expenses.id})`.mapWith(Number),
      })
        .from(Budgets)
        .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
        .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
        .groupBy(Budgets.id)
        .orderBy(desc(Budgets.id));

      setBudgetList(res);
      getAllExpenses();
    } catch (error) {
      console.error('Failed to fetch budget list:', error);
    }
  };

  useEffect(() => {
    if (user) {
      getBudgetList();
    }
  }, [user]);

  const getAllExpenses = async () => {
    try {
      const res = await db.select({
        id: Expenses.id,
        name: Expenses.name,
        amount: Expenses.amount,
        createdAt: Expenses.createdAt
      }).from(Budgets)
        .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
        .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
        .orderBy(desc(Expenses.id));

      setExpensesInfo(res);
    } catch (error) {
      console.error('Failed to fetch expenses:', error);
    }
  };

  return (
    <div className='p-4'>
      <div className='mt-4 gap-4'>
        <div className='md:col-span-3'>
          <h2 className='font-bold text-xl md:text-3xl'>
            <div className='flex items-center gap-2'>
              <FaArrowLeft
                className='cursor-pointer rounded-full bg-slate-400 w-6 h-6 md:w-7 md:h-7 hover:bg-white'
                onClick={() => router.push('/dashboard/budgets')}
                size={20}
              />
              All Expenses
              <FaArrowRight 
              className='cursor-pointer rounded-full bg-slate-400 w-6 h-6 md:w-7 md:h-7 hover:bg-white' 
              onClick={() => router.push(`/dashboard/upgrade`)} 
              size={20} 
              />
            </div>
          </h2>
          <ExpenseInfoTable expensesInfo={expensesInfo} refreshData={() => getBudgetList()} />
        </div>
      </div>
    </div>
  );
}

export default ExpensePage;
