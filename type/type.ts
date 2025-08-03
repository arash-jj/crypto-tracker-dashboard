export type SidebarLinksType = {
    id: number | string,
    name: string,
    icon: string,
    path: string,
}
export type LucideIconType = {
    [key : string] : React.ComponentType<any>
}