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
