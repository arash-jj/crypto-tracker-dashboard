"use client"

import { usePathname } from 'next/navigation'
import React from 'react'
import Searchbar from './Searchbar'
import { Bell, LayoutGrid } from 'lucide-react'
import UserProfile from './UserProfile'

const Navbar = () => {
    const pathname = usePathname().split('/')
    
    return (
        <nav className='w-full flex flex-row items-center justify-between gap-2 py-2 px-3'>
            <div>
                <h2 className='text-white font-bold text-3xl'>
                    {/* note: to get the path name with first letter capitalized */}
                    {pathname[1] == '' ? "Home" : pathname[1].charAt(0).toUpperCase() + pathname[1].slice(1)} 
                </h2>
                <p className='text-sm'>With all of the styling tool options available in today’s market</p>
            </div>
            <div className="flex flex-row items-center gap-8">
                <div>
                    <Searchbar/>
                </div>
                <LayoutGrid className='cursor-pointer '/>
                <Bell className='cursor-pointer '/>
                <UserProfile/>
            </div>
        </nav>
    )
}

export default Navbar