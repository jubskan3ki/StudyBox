import searchIcon from '~/assets/icons/searchIcon.svg';
import type { SearchBarProps } from '~/types/components/common/searchBar.interface';

function SearchBar({ onSearch }: SearchBarProps) {
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onSearch(event.target.value); // Appelle la fonction de recherche avec le terme
    };

    return (
        <div className="flex items-center mb-4 relative">
            {/* Icône de loupe */}
            <img
                src={searchIcon}
                className="absolute left-4 text-gray-400" // Positionnement de l'icône
            />

            {/* Champ de recherche */}
            <input
                type="text"
                className="pl-12 pr-4 py-2 border border-lightGray rounded-xl w-full h-14"
                placeholder="Rechercher..."
                onChange={handleInputChange}
            />
        </div>
    );
}

export default SearchBar;
