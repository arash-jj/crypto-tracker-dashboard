export type SidebarLinksType = {
    id: number | string,
    name: string,
    icon: string,
    path: string,
}
export type LucideIconType = {
    [key : string] : React.ComponentType<any>
}
export interface PricePoint {
    timestamp: number;
    price: number;
}
export interface Coin {
    id: string;
    symbol: string;
    name: string;
    image: string;
    current_price: number;
}
export interface Preferences {
    currency: string;
    trackingLines: number[];
}
export interface MiniCryptoChartProps {
    coinId: string;
    days?: number;
    lineColor?: string;
    height?: number;
    width?: number;
}
export interface CurrencyConfig {
    id: string;
    label: string;
    color: string;
    gradient?: [string, string];
    pointStyle?: 'circle' | 'rect' | 'triangle' | 'cross';
    lineWidth?: number;
    tension?: number;
    fill?: boolean;
}

export interface ChartCustomization {
    title?: string;
    titleColor?: string;
    backgroundColor?: string;
    gridColor?: string;
    textColor?: string;
    borderColor?: string;
    showLegend?: boolean;
    legendPosition?: 'top' | 'bottom' | 'left' | 'right';
    showTooltip?: boolean;
    timeFormat?: 'auto' | 'hourly' | 'daily' | 'monthly';
    aspectRatio?: number;
    showPercentageChange?: boolean;
}

export interface MultiCurrencyChartProps {
    currencies: CurrencyConfig[];
    days?: number;
    customization?: ChartCustomization;
    width?: number | string;
    height?: number | string;
}