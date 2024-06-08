"use client"
import React, { useState, useEffect, useRef } from 'react';
import Image from "next/image";
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';

function Hero() {
    const { isSignedIn } = useUser();
    const [showMessage, setShowMessage] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const messageTimerRef = useRef(null);

    const handleGetStartedClick = () => {
        if (!isSignedIn) {
            setShowMessage(true);
            startHideMessageTimer();
        }
    };

    const startHideMessageTimer = () => {
        clearTimeout(messageTimerRef.current);
        messageTimerRef.current = setTimeout(() => {
            if (!isHovered) {
                setShowMessage(false);
            }
        }, 2000);
    };

    useEffect(() => {
        if (showMessage && !isHovered) {
            startHideMessageTimer();
        }
        return () => clearTimeout(messageTimerRef.current);
    }, [showMessage, isHovered]);

    const handleMouseEnter = () => {
        setIsHovered(true);
        clearTimeout(messageTimerRef.current);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        startHideMessageTimer();
    };

    return (
        <div 
            className="relative flex h-screen items-center justify-center bg-gray-900"
            style={{
                backgroundImage: 'url(https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3RvY2slMjBtYXJrZXR8ZW58MHx8MHx8fDA%3D)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                opacity: '90%'
            }}
        >
            <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
                <div className="mx-auto max-w-xl text-center bg-gray-900 bg-opacity-50 p-8 rounded-lg ">
                    <h1 className="text-3xl font-extrabold sm:text-5xl text-white">
                        Manage Your Expense
                        <strong className="font-extrabold text-blue-700 sm:block"> Control Your Money </strong>
                    </h1>
                    <p className="mt-4 sm:text-xl text-white">
                        Start Managing your budget and save a ton of Money
                    </p>
                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                        {isSignedIn ? (
                            <Link href="/dashboard" legacyBehavior>
                                <div className="block w-full rounded bg-emerald-500 px-12 py-3 text-sm font-medium text-white shadow hover:bg-emerald-900 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto cursor-pointer">
                                    Get Started
                                </div>
                            </Link>
                        ) : (
                            <div
                                onClick={handleGetStartedClick}
                                className="block w-full rounded bg-emerald-500 px-12 py-3 text-sm font-medium text-white shadow hover:bg-emerald-900 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto cursor-pointer"
                            >
                                Get Started
                            </div>
                        )}
                    </div>
                    {showMessage && (
                        <div
                            className="mt-4 text-red-300 font-bold"
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            Please login first to continue or read the Next.js documentation.
                            <div className="mt-4 flex gap-4 justify-center">
                                <Link href="/sign-in" legacyBehavior>
                                    <div className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-gray-700">
                                        Login
                                    </div>
                                </Link>
                                <Link href="https://nextjs.org/docs" legacyBehavior>
                                    <div className="px-4 py-2 bg-emerald-500 text-white rounded cursor-pointer hover:bg-gray-700">
                                        Read Docs
                                    </div>
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Hero;
