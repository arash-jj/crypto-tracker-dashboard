import Sidebar from '@/components/SIdebar'
import React from 'react'

const layout = ({children} : {children : React.ReactNode}) => {
    return (
        <main className='flex flex-row gap-5'>
            <Sidebar/>
            <div className="">
                {children}
            </div>
        </main>
    )
}

export default layout