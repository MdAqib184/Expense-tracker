import { db } from '@/utils/dbConfig';
import { Expenses } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { Trash } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';

function ExpenseInfoTable({ expensesInfo, refreshData }) {

  const deleteExpense = async (expense) => {
    const res = await db.delete(Expenses)
      .where(eq(Expenses.id, expense.id))
      .returning();

    if (res) {
      toast('Expense Deleted!');
      refreshData();
    }
  };

  return (
    <div className='mt-3'>
      <h2 className='font-bold text-lg mb-2'>Latest Expenses</h2>
      <div className='grid grid-cols-2 md:grid-cols-4 rounded-lg bg-slate-200 p-3'>
        <h2 className='font-bold text-sm md:text-base'>Name</h2>
        <h2 className='font-bold text-sm md:text-base'>Amount</h2>
        <h2 className='font-bold text-sm md:text-base'>Date</h2>
        <h2 className='font-bold text-sm md:text-base'>Action</h2>
      </div>
      {expensesInfo && expensesInfo.length > 0 ? (
        expensesInfo.map((expense, index) => (
          <div key={index} className='grid grid-cols-2 md:grid-cols-4 bg-slate-50 p-2'>
            <h2 className='text-sm md:text-base'>{expense.name}</h2>
            <h2 className='text-sm md:text-base'>{expense.amount}</h2>
            <h2 className='text-sm md:text-base'>{expense.createdAt}</h2>
            <h2 className='text-sm md:text-base'>
              <Trash className='text-red-500 cursor-pointer' onClick={() => deleteExpense(expense)} />
            </h2>
          </div>
        ))
      ) : (
        <div className='grid grid-cols-2 md:grid-cols-4 bg-slate-50 p-2'>
          <h2 className='col-span-2 md:col-span-4 text-center text-sm md:text-base'>No expenses available</h2>
        </div>
      )}
    </div>
  );
  
}

export default ExpenseInfoTable;
