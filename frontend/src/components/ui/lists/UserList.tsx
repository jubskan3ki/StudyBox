import Tabs from '~/components/common/tables/Tabs';
import type { User } from '~/types/table/userTable.interface';

interface UserListProps {
    data: User[]; // Les données des utilisateurs passées via props
    headers: string[]; // Les en-têtes du tableau
    onRowClick: (id: number, name: string) => void; // Fonction de callback lors du clic sur une ligne
}

function UserList({ data, headers, onRowClick }: UserListProps) {
    const handleClick = (user: User) => {
        onRowClick(user.id, user.name); // Appeler la fonction onRowClick avec l'ID et le nom de l'utilisateur
    };

    return (
        <Tabs
            data={data} // Propriété data passée à Tabs
            headers={headers} // Propriété headers passée à Tabs
            onRowClick={handleClick} // Callback pour le clic sur une ligne
        />
    );
}

export default UserList;
