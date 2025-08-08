import React from 'react'
import MiniCryptoChart from './MiniCryptoChart'

const CurrencyCard = ({currency, amount, color} : {currency: string, amount?: string, color?: string}) => {
  return (
    <div className="inline-block">
      <div className="w-[200px] h-[75px] p-2 flex flex-row items-center gap-1.5 border border-stroke rounded-2xl cursor-pointer hover:blue-gradient overflow-hidden">
      <div className="w-2/6 h-full flex justify-center items-center">
        <img src={`/currencyImages/${currency}.svg`} alt={`${currency}`}/>
      </div>
      <div className="w-3/6 h-full flex flex-col justify-evenly">
        <p className='text-white text-center'>{amount}</p>
        <MiniCryptoChart coinId={currency} lineColor={color}/>
      </div>
    </div>
    </div>
  )
}

export default CurrencyCard