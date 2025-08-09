import MultiCurrencyChart from '@/components/MultiCurrencyChart'
import Wallets from '@/components/Wallets'
import React from 'react'

const page = () => {
    return (
        <section className='px-3'>
            <section>
                <Wallets/>
            </section>
            <section>
                <MultiCurrencyChart
                    currencies={[
                    { id: 'bitcoin', label: 'Bitcoin', color: '#FB49C0' },
                    { id: 'ethereum', label: 'Ethereum', color: '#31AFD6' }
                    ]}
                    days={90}
                />
            </section>
        </section>
    )
}

export default page