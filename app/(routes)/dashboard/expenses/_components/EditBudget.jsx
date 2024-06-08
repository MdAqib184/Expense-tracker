import { Button } from '@/components/ui/button'
import { PenBox } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input';
import { db } from '@/utils/dbConfig';
import { Budgets } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { toast } from 'sonner';
import EmojiPicker from 'emoji-picker-react';

function EditBudget({budgetInfo,refreshData}) {

    const [emojiIcon, setEmojiIcon] = useState(budgetInfo?.icon);
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
    const [name, setName] = useState();
    const [amount, setAmount] = useState();

    useEffect(()=>{
        if(budgetInfo){
            setEmojiIcon(budgetInfo?.icon)
            setName(budgetInfo.name)
            setAmount(budgetInfo.amount)
        }
    },[budgetInfo])

    const onUpdateBudget=async()=>{
        const res=await db.update(Budgets).set({
            name:name,
            amount:amount,
            icon:emojiIcon,
        }).where(eq(Budgets.id,budgetInfo.id))
        .returning();
        if(res){
            refreshData();
            toast('Budget Updated Successfully !')
        }
    }

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                <Button className='flex gap-2 bg-blue-600'><PenBox />Edit</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Update Budget</DialogTitle>
                        <DialogDescription>
                            <div className='mt-5'>
                                <Button variant='outline'
                                    size='lg'
                                    className='text-lg'
                                    onClick={() => setOpenEmojiPicker(!openEmojiPicker)}>
                                    {emojiIcon}
                                </Button>
                                {openEmojiPicker && (
                                    <div className='absolute z-20'>
                                        <EmojiPicker
                                            onEmojiClick={(e) => {
                                                setEmojiIcon(e.emoji);
                                                setOpenEmojiPicker(false);
                                            }}
                                        />
                                    </div>
                                )}
                                <div className='mt-2'>
                                    <h2 className='text-black font-medium my-1'>Budget Name</h2>
                                    <Input placeholder="e.g. Trip budget..."
                                        defaultValue={budgetInfo?.name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div className='mt-2'>
                                    <h2 className='text-black font-medium my-1'>Budget Amount</h2>
                                    <Input
                                        type='number'
                                        defaultValue={budgetInfo?.amount}
                                        placeholder="e.g. 5000$"
                                        onChange={(e) => setAmount(e.target.value)}
                                    />
                                </div>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="sm:justify-start">
                        <DialogClose asChild>
                            <Button
                                onClick={() => onUpdateBudget()}
                                disabled={!(name && amount)}
                                className='mt-2 w-full bg-blue-700 p-2 sm:p-3 md:p-4 lg:p-5
                                text-xs sm:text-sm md:text-base lg:text-lg'>
                                Update Budget
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default EditBudget
