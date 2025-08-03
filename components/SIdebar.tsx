"use client"

import { sidebarLinks } from '@/constants'
import { LucideIconType } from '@/type/type'
import * as LucideIcons from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import TrackingBall from './TrackingBall'

const Sidebar = () => {
    const pathname = usePathname()
    return (
        <div className='sidebar-gradient h-dvh w-[300px] p-5'>
            <div className="flex flex-col gap-20">
                <Link href="/">
                    <Image src="/Logo.svg" alt="logo" width={120} height={20}/>
                </Link>
                <div className="flex flex-col gap-9 pl-5">
                    {sidebarLinks.map(item => {
                        const LucideIconsTyped = LucideIcons as LucideIconType
                        const IconComponent = LucideIconsTyped[item.icon]
                        return (
                            <Link key={item.id} href={item.path} className={`sidebar-menu-item transition-all ease-in-out duration-200 relative ${pathname === item.path ? 'text-lightBLue' : ''}`}>
                                {IconComponent && <IconComponent className="w-5 h-5" />}
                                <span>{item.name}</span>
                                {pathname === item.path && 
                                    <span className='absolute -left-14 '>
                                        <TrackingBall />
                                    </span>
                                }
                            </Link>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Sidebar