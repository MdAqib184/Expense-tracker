"use client"
import React, { useState } from 'react'
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
import EmojiPicker from 'emoji-picker-react'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useUser } from '@clerk/nextjs';
import { db } from '@/utils/dbConfig';
import { Budgets } from '@/utils/schema';
import { toast } from 'sonner';

function CreateBudget({refreshData}) {
    const [emojiIcon, setEmojiIcon] = useState('🫠');
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const { user } = useUser();

    const onCreateBudget = async () => {
        try {
            const res = await db.insert(Budgets)
                .values({
                    name: name,
                    amount: parseFloat(amount), // Ensure the amount is stored as a number
                    createdBy: user?.primaryEmailAddress?.emailAddress,
                    icon: emojiIcon
                })
                .returning({ insertedId: Budgets.id });

            if (res) {
                refreshData();
                toast('New Budget Created');
            }
        } catch (error) {
            console.error('Failed to create budget:', error);
            toast.error('Failed to create budget');
        }
    }

    return (
        <div>
            <Dialog>
                <DialogTrigger>
                    <div className='bg-slate-100 p-8 rounded-md 
                        items-center flex-col border-2 border-dashed 
                        cursor-pointer hover:shadow-md'>
                        <h2 className='text-3xl'>+</h2>
                        <h2 className='text-1xl'>Add New Budget</h2>
                    </div>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create New Budget</DialogTitle>
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
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                                <div className='mt-2'>
                                    <h2 className='text-black font-medium my-1'>Budget Amount</h2>
                                    <Input
                                        type='number'
                                        placeholder="e.g. 5000$"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                    />
                                </div>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="sm:justify-start">
                        <DialogClose asChild>
                            <Button
                                onClick={() => onCreateBudget()}
                                disabled={!(name && amount)}
                                className='mt-2 w-full bg-blue-700'>
                                Create Budget
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default CreateBudget;
