'use client';

import { useEffect, useState, useRef } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    ChartOptions,
    ChartData
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { format } from 'date-fns';
import { MultiCurrencyChartProps } from '@/type/type';
import { TriangleAlert } from 'lucide-react';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);


const MultiCurrencyChart = ({
    currencies = [],
    days = 30,
    customization = {},
    width = '100%',
    height = '500px'
}: MultiCurrencyChartProps) => {
    const chartRef = useRef<any>(null);
    const [chartData, setChartData] = useState<ChartData<'line'>>({ datasets: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [priceChanges, setPriceChanges] = useState<Record<string, number>>({});
    const {
    title = '',
    titleColor = '#CECEEA',
    backgroundColor = 'transparent',
    gridColor = '#23214C',
    textColor = '#CECEEA',
    borderColor = 'transparent',
    showLegend = true,
    legendPosition = 'top',
    showTooltip = true,
    timeFormat = 'auto',
    aspectRatio = 2.5,
    showPercentageChange = true
    } = customization;
    useEffect(() => {
        if (!currencies.length) return;
        const fetchData = async () => {
        setLoading(true);
        setError(null);
        
        try {
            const priceChangeMap: Record<string, number> = {};
            const allData: Record<string, [number, number][]> = {};
            const promises = currencies.map(async (currency) => {
            const response = await fetch(
                `https://api.coingecko.com/api/v3/coins/${currency.id}/market_chart?vs_currency=usd&days=${days}`
            );
            if (!response.ok) {
                throw new Error(`Failed to fetch data for ${currency.label}`);
            }
            const data = await response.json();
            allData[currency.id] = data.prices;
            if (data.prices.length > 1) {
                const startPrice = data.prices[0][1];
                const endPrice = data.prices[data.prices.length - 1][1];
                const change = ((endPrice - startPrice) / startPrice) * 100;
                priceChangeMap[currency.id] = Number(change.toFixed(2));
            }
            });
            await Promise.all(promises);
            setPriceChanges(priceChangeMap);
            const datasets = currencies.map((currency, index) => {
            const prices = allData[currency.id];
            const startColor = currency.gradient?.[0] || currency.color;
            const endColor = currency.gradient?.[1] || currency.color;
            let gradient: CanvasGradient | null = null;
            if (chartRef.current) {
                const ctx = chartRef.current.ctx;
                const chartArea = chartRef.current.chartArea;
                if (chartArea) {
                gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
                gradient.addColorStop(0, startColor);
                gradient.addColorStop(1, endColor);
                }
            }
            return {
                label: currency.label,
                data: prices.map(price => price[1]),
                borderColor: gradient || currency.color,
                backgroundColor: currency.fill ? `${currency.color}10` : 'transparent',
                pointBackgroundColor: currency.color,
                pointBorderColor: 'transparent',
                pointStyle: currency.pointStyle || 'circle',
                borderWidth: currency.lineWidth || 2,
                tension: currency.tension ?? 0.4,
                fill: currency.fill ? 'origin' : false,
                pointRadius: 0,
                pointHoverRadius: 6
            };
            });
            
            const formatDate = (timestamp: number) => {
            if (timeFormat === 'hourly') {
                return format(new Date(timestamp), 'HH:mm');
            } else if (timeFormat === 'daily') {
                return format(new Date(timestamp), 'MMM dd');
            } else if (timeFormat === 'monthly') {
                return format(new Date(timestamp), 'MMM yyyy');
            } else {
                if (days <= 1) return format(new Date(timestamp), 'HH:mm');
                if (days <= 30) return format(new Date(timestamp), 'MMM dd');
                return format(new Date(timestamp), 'MMM yyyy');
            }
            };
            const labels = allData[currencies[0].id].map(price => formatDate(price[0]));
            setChartData({
            labels,
            datasets
            });
        } catch (err) {
            console.error(err);
            setError(err instanceof Error ? err.message : 'Failed to load chart data');
        } finally {
            setLoading(false);
        }
        };
        fetchData();
    }, [currencies, days, timeFormat]);
    const chartOptions: ChartOptions<'line'> = {
        responsive: true,
        maintainAspectRatio: false,
        aspectRatio: aspectRatio,
        plugins: {
        legend: {
            display: showLegend,
            position: legendPosition,
            labels: {
            color: textColor,
            usePointStyle: true,
            boxWidth: 10,
            padding: 20,
            font: {
                size: 12,
                weight: 'normal'
            }
            }
        },
        title: {
            display: !!title,
            text: title,
            color: titleColor,
            font: {
            size: 18,
            weight: 'bold'
            },
            padding: {
            top: 10,
            bottom: 20
            }
        },
        tooltip: {
            enabled: showTooltip,
            mode: 'index',
            intersect: false,
            backgroundColor: backgroundColor,
            titleColor: titleColor,
            bodyColor: textColor,
            borderColor: borderColor,
            borderWidth: 1,
            padding: 12,
            usePointStyle: true,
            callbacks: {
            label: (context) => {
                const label = context.dataset.label || '';
                const value = context.parsed.y || 0;
                const currencyId = currencies.find(c => c.label === label)?.id;
                const change = currencyId ? priceChanges[currencyId] : null;
                
                const formattedValue = `$${value.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
                })}`;
                
                if (showPercentageChange && change !== undefined) {
                return `${label}: ${formattedValue} (${change > 0 ? '+' : ''}${change}%)`;
                }
                
                return `${label}: ${formattedValue}`;
            }
            }
        }
        },
        scales: {
        x: {
            grid: {
            color: gridColor,
            drawBorder: false
            },
            ticks: {
            color: textColor,
            maxTicksLimit: 10,
            autoSkip: true
            }
        },
        y: {
            grid: {
            color: gridColor,
            drawBorder: false
            },
            ticks: {
            color: textColor,
            callback: (value) => `$${Number(value).toLocaleString()}`
            }
        }
        },
        interaction: {
        mode: 'index',
        intersect: false
        },
        elements: {
        point: {
            radius: 0,
            hoverRadius: 6
        }
        }
    };
    return (
        <div className="w-full rounded-xl border" style={{ backgroundColor, borderColor }}>
            <div className="p-4" style={{ width, height }}>
                {loading ? (
                <div className="h-full flex flex-col items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    <p className="mt-4 text-gray-500">Loading chart data...</p>
                </div>
                ) : error ? (
                <div className="h-full flex flex-col items-center justify-center text-red-400">
                    <TriangleAlert size={50}/>
                    <p className="text-lg">{error}</p>
                    <button 
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    onClick={() => window.location.reload()}
                    >
                    Reload Chart
                    </button>
                </div>
                ) : (
                <Line 
                    ref={chartRef} 
                    data={chartData} 
                    options={chartOptions} 
                />
                )}
            </div>
        </div>
    );
};

export default MultiCurrencyChart;