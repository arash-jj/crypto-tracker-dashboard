import { randomNumGenerator } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const UserProfile = () => {
    const gradients = ['green-gradient', 'purple-gradient']
    const names = ['Josh', 'Allen', 'Adam', 'Mark']
    const randomGradient = randomNumGenerator(0,gradients.length)
    const randomName = randomNumGenerator(0,names.length)
    return (
        <div className='flex flex-row items-center gap-2.5'>
            <Link href="/account" className={`w-9 h-9 rounded-full text-white flex-center ${gradients[randomGradient]}`}>
                <span>
                    {names[randomName].charAt(0)}
                </span>
            </Link>
            <div className="">
                <p>{names[randomName]}</p>
            </div>
            <ChevronDown size={15}/>
        </div>
    )
}

export default UserProfile