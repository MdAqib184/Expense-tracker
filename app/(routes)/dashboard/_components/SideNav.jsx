import React, { useEffect } from 'react';
import Image from "next/image";
import { LayoutGrid, PiggyBank, ReceiptText, ShieldCheck } from 'lucide-react';
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import Link from 'next/link';

function SideNav() {
    const menueList = [
        {
            id: 1,
            name: 'Dashboard',
            icon: LayoutGrid,
            path: '/dashboard'
        },
        {
            id: 2,
            name: 'Budgets',
            icon: PiggyBank,
            path: '/dashboard/budgets'
        },
        {
            id: 3,
            name: 'Expenses',
            icon: ReceiptText,
            path: '/dashboard/expenses'
        },
        {
            id: 4,
            name: 'Upgrade',
            icon: ShieldCheck,
            path: '/dashboard/upgrade'
        }
    ];

    const path = usePathname();

    useEffect(() => {
        console.log(path);
    }, [path]);

    return (
        <div className=' h-screen p-5 shadow-lg  bg-white'>
            <Image src={'/logo.svg'}
                alt="logo"
                height={50}
                width={75}
                className="w-auto h-auto" />
            <div className='mt-5'>
                {menueList.map((menue) => (
                    <Link href={menue.path} key={menue.id}>
                        <h2 className={`flex gap-2 items-center text-black font-medium
                            p-5 cursor-pointer rounded-md hover:text-primary hover:bg-slate-300 mb-1 
                            ${path === menue.path && 'text-primary bg-slate-300'}
                        `}>
                            <menue.icon />
                            {menue.name}
                        </h2>
                    </Link>
                ))}
            </div>
            <div className='fixed bottom-10 p-5 flex gap-2 items-center'>
                <UserButton />
                Profile
            </div>
        </div>
    );
}

export default SideNav;
