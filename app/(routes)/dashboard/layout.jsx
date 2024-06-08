"use client"
import React, { useEffect, useState } from 'react'
import SideNav from './_components/SideNav'
import DashboardHeader from './_components/DashboardHeader'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { db } from '@/utils/dbConfig'
import { Budgets } from '@/utils/schema'
import { eq } from 'drizzle-orm'

function DashboardLayout({ children }) {
    const { user } = useUser();
    const router = useRouter();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const checkUserBudgets = async () => {
        const res = await db.select()
            .from(Budgets)
            .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
        if (res?.length == 0) {
            router.replace('/dashboard/budgets')
        }
    }

    useEffect(() => {
        user && checkUserBudgets();
    }, [user]);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        // <div className='flex h-screen'>
        //     <div className={`fixed inset-0 md:static md:w-64 bg-gray-800 text-white transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out`}>
        //         <SideNav />
        //     </div>
        //     <div className='flex-1'>
        //         <DashboardHeader onToggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        //         <div className='p-4'>
        //             {children}
        //         </div>
        //     </div>
        // </div>
        <div>
            <div className={`fixed inset-0 md:block md:w-64 bg-gray-800 text-white transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out z-10`}>
                <SideNav/>
            </div>
            <div className='md:ml-64'>
                <DashboardHeader onToggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
                {children}
            </div>
        </div>
    )
}

export default DashboardLayout;
