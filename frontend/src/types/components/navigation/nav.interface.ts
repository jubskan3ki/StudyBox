export interface NavItemProps {
    icon: string;
    label: string;
    to: string;
    isCollapsed: boolean;
    activeIcon?: string;
    onClick?: () => void;
}
