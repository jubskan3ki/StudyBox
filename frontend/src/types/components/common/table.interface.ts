// ~/types/tabs.interface.ts
import type { User } from '~/types/table/userTable.interface';

export interface TabsProps {
    data: User[]; // Les données à afficher dans la table
    headers: string[]; // Les en-têtes des colonnes
    onRowClick: (user: User) => void; // Callback lors du clic sur une ligne
}

export interface Tab {
    label: string;
    dataLoader: () => Promise<any[]>;
}
export interface TabsDataProps {
    tabs: Tab[];
    headers: string[];
    DataTableComponent: (props: { data: any[]; headers: string[] }) => JSX.Element;
    mapData: (data: any[]) => any[];
    filterKey: string;
}
