"use client";
import { db } from '@/utils/dbConfig';
import { Budgets, Expenses } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { desc, eq, getTableColumns, sql } from 'drizzle-orm';
import React, { useEffect, useState } from 'react';
import BudgetItem from '../../budgets/_components/BudgetItem';
import AddExpense from '../_components/AddExpense';
import ExpenseInfoTable from '../_components/ExpenseInfoTable';
import { Button } from '@/components/ui/button';
import { PenBox, Trash } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import EditBudget from '../_components/EditBudget';
import { FaArrowLeft } from "react-icons/fa";

function ExpensesScreen({ params }) {
  const { user } = useUser();
  const [budgetInfo, setBudgetInfo] = useState(null);
  const [expensesInfo, setExpensesInfo] = useState([]);
  const router = useRouter(); // Initialize the router

  useEffect(() => {
    if (user) {
      getBudgetInfo();
    }
  }, [user]);

  const getBudgetInfo = async () => {
    try {
      const res = await db
        .select({
          ...getTableColumns(Budgets),
          totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
          totalItem: sql`count(${Expenses.id})`.mapWith(Number),
        })
        .from(Budgets)
        .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
        .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
        .where(eq(Budgets.id, params.id))
        .groupBy(Budgets.id);

      setBudgetInfo(res[0]);
      getExpenseInfo();
    } catch (error) {
      console.error('Failed to fetch budget info:', error);
    }
  };

  const getExpenseInfo = async () => {
    try {
      const res = await db
        .select()
        .from(Expenses)
        .where(eq(Expenses.budgetId, params.id))
        .orderBy(desc(Expenses.id));

      setExpensesInfo(res);
    } catch (error) {
      console.error('Failed to fetch expenses:', error);
    }
  };

  const deleteBudget = async () => {
    const deleteExpenseResult = await db.delete(Expenses)
      .where(eq(Expenses.budgetId, params.id))
      .returning();
    if (deleteExpenseResult) {
      const res = await db.delete(Budgets)
        .where(eq(Budgets.id, params.id))
        .returning();
      console.log(res);
    }
    toast('Budget Deleted!');
    router.replace('/dashboard/budgets/');
  };

  return (
    <div className='p-2 md:p-8'>
      <h2 className='font-bold text-xl md:text-3xl flex flex-col md:flex-row justify-between items-start md:items-center'>
        <div className='flex items-center gap-2 mb-4 md:mb-0'>
          <FaArrowLeft 
            className='cursor-pointer rounded-full bg-slate-400 w-6 h-6 md:w-7 md:h-7 hover:bg-white' 
            onClick={() => router.push('/dashboard/expenses')} 
            size={20} 
          />
          My Expenses
        </div>
        <div className='flex gap-2'>
          <EditBudget budgetInfo={budgetInfo} refreshData={() => getBudgetInfo()} />
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button className='flex gap-2 bg-red-500 text-sm md:text-base p-2 md:p-3'><Trash />Delete</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your budget database
                  and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => deleteBudget()}>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </h2>
      <div className='grid grid-cols-1 md:grid-cols-2 mt-5 gap-4'>
        {budgetInfo ? (
          <BudgetItem budget={budgetInfo} />
        ) : (
          <div className='h-[130px] w-full rounded-lg bg-slate-200 animate-pulse'></div>
        )}
        <AddExpense budgetId={params.id} user={user} refreshData={getBudgetInfo} />
      </div>
      <div className='mt-3'>
        <ExpenseInfoTable expensesInfo={expensesInfo} refreshData={getBudgetInfo} />
      </div>
    </div>
  );
  
}

export default ExpensesScreen;
