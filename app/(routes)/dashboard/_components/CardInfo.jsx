import { PiggyBank, Receipt, Wallet } from 'lucide-react'
import React, { useEffect, useState } from 'react'

function CardInfo({ budgetList }) {

    const [totalBudget, setTotalBudget] = useState(0);
    const [totalSpend, setTotalSpend] = useState(0);

    useEffect(() => {
        calcCardInfo();
    }, [budgetList])

    const calcCardInfo = () => {
        let totalBud = 0;
        let totalSpn = 0;
        budgetList.forEach(element => {
            totalBud = totalBud + Number(element.amount);
            totalSpn = totalSpn + element.totalSpend;
        });
        setTotalBudget(totalBud);
        setTotalSpend(totalSpn);
    }
    return (
        <div>
            {budgetList?.length>0?
            <div className='mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
                <div className='p-6 border rounded-lg flex justify-between items-center'>
                    <div>
                        <h2 className='text-md'>Total Budget</h2>
                        <h2 className='font-bold text-2xl'>${totalBudget}</h2>
                    </div>
                    <PiggyBank className='p-2 h-12 w-12 bg-slate-300 rounded-full' />
                </div>
                <div className='p-6 border rounded-lg flex justify-between items-center'>
                    <div>
                        <h2 className='text-md'>Total Spend</h2>
                        <h2 className='font-bold text-2xl'>${totalSpend}</h2>
                    </div>
                    <Receipt className='p-2 h-12 w-12 bg-slate-300 rounded-full' />
                </div>
                <div className='p-6 border rounded-lg flex justify-between items-center'>
                    <div>
                        <h2 className='text-md'>No. Of Budget</h2>
                        <h2 className='font-bold text-2xl'>{budgetList?.length}</h2>
                    </div>
                    <Wallet className='p-2 h-12 w-12 bg-slate-300 rounded-full' />
                </div>
            </div>:
            <div className='mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
                {[1,2,3].map((item,index)=>(
                    <div key={index} className='h-[100px] w-full bg-slate-200 animate-pulse rounded-lg'></div>
                ))}
            </div>
            }
        </div>

    )
}

export default CardInfo
