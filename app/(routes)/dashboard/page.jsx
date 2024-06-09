"use client"
import React, { useEffect, useState } from 'react'
import { UserButton, useUser } from "@clerk/nextjs"
import CardInfo from './_components/CardInfo';
import { db } from '@/utils/dbConfig';
import { desc, eq, getTableColumns, sql } from 'drizzle-orm';
import { Budgets, Expenses } from '@/utils/schema';
import BarChartDash from './_components/BarChartDash';
import LineChartDash from './_components/LineChartDash';
import PieChartDash from './_components/PieChartDash';
import BudgetItem from './budgets/_components/BudgetItem';
import ExpenseInfoTable from './expenses/_components/ExpenseInfoTable';
import { FaArrowRight } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { useAuth } from "@clerk/nextjs";

function Dashboard() {

  const { user } = useUser();

  const { isLoaded, userId, sessionId, getToken } = useAuth();

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
      <h2 className='text-3xl font-bold text-emerald-900'>
        <div className='flex items-center gap-2 justify-between'>
          Hi, {user?.username} 🖐
          {/* Hi {sessionId} */}
          <FaArrowRight className='cursor-pointer rounded-full
          bg-slate-400 w-9 h-9 hover:bg-white'
            onClick={() => router.push(`/dashboard/budgets`)} size={20} />
        </div>
      </h2>
      <p className='text-gray-500'>Let's Manage Your Money & Keep Track Of Budgets 😎👌🔥</p>
      <CardInfo budgetList={budgetList} />
      <div className='grid grid-cols-1 md:grid-cols-3 mt-4 gap-4'>
        <div className='md:col-span-2'>
          <PieChartDash budgetList={budgetList} />
          <h2 className='font-bold text-lg mt-3'>Latest Expenses</h2>
          <ExpenseInfoTable expensesInfo={expensesInfo} refreshData={() => getBudgetList()} />
        </div>
        <div className='grid gap-3'>
          <h2 className='font-bold text-lg'>Latest Budgets</h2>
          {budgetList.map((budget, index) => (
            <BudgetItem budget={budget} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
