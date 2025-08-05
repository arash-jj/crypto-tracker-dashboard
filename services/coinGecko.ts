import { Coin, PricePoint } from "@/type/type";

export const fetchCionChart  = async (coinId: string, days:number = 7) :Promise<PricePoint[]> => {
    const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`
    )
    const data = res.json()
    return data.prices.map(([timestamp, price]: [number, number]) => ({
    timestamp,
    price
    }));
}

export const fetchCoinList = async (): Promise<Coin[]> => {
    const res = await fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1'
    )
    return res.json();
}