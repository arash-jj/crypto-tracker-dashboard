"use client"

import { Search } from 'lucide-react'
import React, { useState } from 'react'

const Searchbar = () => {
    const [isSearchActive, setIsSearchActive] = useState(false)
    return (
        <div className='flex flex-row gap-5 relative'>
            <Search 
            className='cursor-pointer absolute right-0 top-1'
            onClick={()=>setIsSearchActive(prev => !prev)}
            />
            <input 
            type="search" 
            name="search" 
            id="search" 
            autoComplete='false'
            className={`w-[180px] mr-6 rounded-full text-white border outline-0 p-1 transition-all ease-in-out duration-500 origin-right  ${isSearchActive ? 'scale-x-100' : 'scale-0'}`}/>
        </div>
    )
    }

export default Searchbar