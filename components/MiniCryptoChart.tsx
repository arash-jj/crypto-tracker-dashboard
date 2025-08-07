"use client"

import { useEffect, useState, useRef } from 'react';
import { 
    Chart as ChartJS, 
    CategoryScale, 
    LinearScale, 
    PointElement, 
    LineElement,
    Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { MiniCryptoChartProps } from '@/type/type';
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler);

const MiniCryptoChart = ({
    coinId = 'bitcoin',
    days = 7,
    lineColor,
    height = 40,
    width = 100
}: MiniCryptoChartProps) => {
    const [prices, setPrices] = useState<number[]>([]);
    const [percentChange, setPercentChange] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const chartRef = useRef<any>(null);
    const fetchCoinData = async () => {
        try {
        setLoading(true);
        const response = await fetch(
            `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${days}&interval=daily`
        );
        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();
        const priceData = data.prices.map((p: [number, number]) => p[1]);
        
        setPrices(priceData);
        if (priceData.length > 1) {
            const change = ((priceData[priceData.length - 1] - priceData[0]) / priceData[0]) * 100;
            setPercentChange(Number(change.toFixed(2)));
        }
        } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        console.error(err);
        } finally {
        setLoading(false);
        }
    };
    useEffect(() => {
        fetchCoinData();
    }, [coinId, days]);
    const getLineColor = () => {
        if (lineColor) return lineColor;
        return percentChange && percentChange >= 0 ? '#10B981' : '#EF4444';
    };
    const chartData = {
        labels: prices.map((_, i) => i),
        datasets: [
        {
            data: prices,
            borderColor: getLineColor(),
            backgroundColor: 'transparent',
            borderWidth: 2,
            pointRadius: 0,
            tension: 0.4,
            fill: false
        }
        ]
    };
    const options = {
        responsive: false,
        maintainAspectRatio: false,
        plugins: {
        legend: { display: false },
        tooltip: { enabled: false }
        },
        scales: {
        x: { display: false },
        y: { display: false }
        },
        animation: { duration: 0 }
    };
    if (loading) {
        return (
        <div className="flex items-center justify-center" style={{ width, height }}>
            <div className="animate-pulse bg-gray-200 rounded-full w-4 h-4" />
        </div>
        );
    }
    if (error) {
        return (
        <div 
            className="flex items-center justify-center bg-red-50 rounded"
            style={{ width, height }}
            title={error}
        >
            <span className="text-red-500 text-xs">⚠️</span>
        </div>
        );
    }
    return (
        <div className="flex items-center justify-center space-x-2">
        <div>
            <Line
            ref={chartRef}
            data={chartData}
            options={options}
            width={60}
            height={20}
            />
        </div>
        {percentChange !== null && (
            <span 
            className={`text-xs font-medium flex items-center justify-center gap-1 ${
                percentChange >= 0 ? 'text-green-500' : 'text-red-500'
            }`}
            >
            {percentChange > 0 ? <ArrowUpRight size={15}/> : <ArrowDownLeft size={15}/>} {Math.abs(percentChange)}%
            </span>
        )}
        </div>
    );
};

export default MiniCryptoChart;