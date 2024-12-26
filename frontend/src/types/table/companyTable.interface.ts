export interface Company {
    user_id: number;
    profile_image: string;
    name: string;
    role_name: string;
    status: string;
    is_validated: boolean;
    is_activated: boolean;
    is_pending: boolean;
}

export interface CompanyTableProps {
    data: Company[];
    headers: string[];
    onRowClick: (company: Company) => void;
}
