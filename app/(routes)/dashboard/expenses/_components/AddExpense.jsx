import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { db } from '@/utils/dbConfig';
import { Budgets, Expenses } from '@/utils/schema';
import { Loader } from 'lucide-react';
import moment from 'moment';
import React, { useState } from 'react'
import { toast } from 'sonner';

function AddExpense({budgetId,user,refreshData}) {

    const [name, setName] = useState();
    const [amount, setAmount] = useState();
    const [loading,setLoading] = useState(false);

    const addNewExpense=async()=>{
        try {
            setLoading(true);
            const res = await db.insert(Expenses)
                .values({
                    name: name,
                    amount: amount,//parseFloat(amount), // Ensure the amount is stored as a number
                    budgetId:budgetId,
                    createdAt: moment().format('DD-MM-YYYY')
                })
                .returning({ insertedId: Budgets.id });
                setName('');
                setAmount('');
                if (res) {
                    setLoading(false);
                    refreshData();
                    toast('New Expense Added');
                }
                setLoading(false);
        } catch (error) {
            toast.error('Failed to Add Expense!');
        }

    }

    return (
        <div className='border p-4 rounded-lg'>
            <h2 className='font-bold text-lg'>Add Expenses</h2>
            <div className='mt-2'>
                <h2 className='text-black font-medium my-1'>Expense Name</h2>
                <Input placeholder="e.g. Trip budget..."
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className='mt-2'>
                <h2 className='text-black font-medium my-1'>Expense Amount</h2>
                <Input
                    type='number'
                    placeholder="e.g. 1000$"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
            </div>
            <Button
                onClick={() => addNewExpense()}
                disabled={!(name && amount)||loading}
                className='mt-2 w-full bg-blue-700'>
                    {loading?<Loader className='animate-spin'/>:"Create Expense"}
            </Button>
        </div>
    )
}

export default AddExpense
