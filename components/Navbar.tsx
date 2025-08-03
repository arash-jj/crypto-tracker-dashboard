"use client"

import { usePathname } from 'next/navigation'
import React from 'react'
import Searchbar from './Searchbar'

const Navbar = () => {
    const pathname = usePathname().split('/')
    
    return (
        <nav className='flex flex-row gap-2 py-2'>
            <div>
                <h2 className='text-white font-bold text-3xl'>
                    {/* note: to get the path name with first letter capitalized */}
                    {pathname[1].charAt(0).toUpperCase() + pathname[1].slice(1)} 
                </h2>
                <p className='text-sm'>With all of the styling tool options available in today’s market</p>
            </div>
            <div className="">
                <Searchbar/>
            </div>
        </nav>
    )
}

export default Navbar