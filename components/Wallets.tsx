import React from 'react'
import CurrencyCard from './CurrencyCard'

const Wallets = () => {
    // random amount of currency for the UI
    const randomAmount = ['1.9625', '23.25', '20.50']
    const fameCurrencies = ['bitcoin', 'ethereum', 'litecoin']
    const randomColor = ['#5364AE', '#E3507A', '#309AFF']
    return (
        <div className='flex flex-col gap-2'>
            <h2 className='text-lightGray mt-1'>Wallets</h2>
            <div className="py-2 flex gap-2 overflow-x-scroll minimal-scroll">
                {
                    fameCurrencies.map((currency, idx) => (
                        <CurrencyCard key={idx} currency={currency} amount={randomAmount[idx]} color={randomColor[idx]}/>
                    ))
                }
            </div>
        </div>
    )
}

export default Wallets