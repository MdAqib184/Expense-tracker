import Link from 'next/link';
import React, { useEffect } from 'react';

function BudgetItem({ budget }) {

    const calcProgress = () => {
        const ans = (budget.totalSpend / budget.amount) * 100;
        return ans.toFixed(2);
    }

    return (
        <Link href={'/dashboard/expenses/' + budget?.id}>
            <div className='p-3 border rounded-lg hover:shadow-md cursor-pointer h-[150px]'>
                <div className='flex gap-2 items-center justify-between'>
                    <div className='flex gap-2 items-center'>
                        <h2 className='text-2xl p-3 px-3 bg-slate-200 rounded-full'>{budget?.icon || '🫠'}</h2>
                        <div>
                            <h2 className='font-bold'>{budget?.name}</h2>
                            <h2 className='text-sm'>{budget?.totalItem}</h2>
                        </div>
                    </div>
                    <h2 className='font-bold text-green-600 text-lg'>${budget.amount}</h2>
                </div>
                <div className='mt-5'>
                    <div className='flex items-center justify-between mb-1'>
                        <h2 className='text-xs text-slate-500'>${budget.totalSpend ? budget.totalSpend : 0} Spend</h2>
                        <h2 className='text-xs text-slate-500'>${budget.amount - budget.totalSpend} Remaining</h2>
                    </div>
                    <div className='h-2 bg-slate-200 w-full rounded-md'>
                        <div className='h-2 bg-blue-600 rounded-md'
                            style={{ width: `${calcProgress()}%` }}></div>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default BudgetItem;

