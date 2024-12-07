export interface Menu {
    path: string;
    title: string;
    icon?: string;
    children?: Menu[];
}

export default function useMenu(): { menuList: Menu[] };