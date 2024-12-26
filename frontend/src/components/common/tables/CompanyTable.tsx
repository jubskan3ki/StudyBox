import type { CompanyTableProps } from '~/types/table/companyTable.interface';

function CompanyTable({ data, headers, onRowClick }: CompanyTableProps) {
    const cellClasses = 'px-4 py-3 text-left text-lightBlack text-base font-medium';

    return (
        <div className="overflow-x-auto">
            {/* Autoriser le défilement horizontal */}
            <table className="w-full sm:min-w-96">
                {/* Ajout d'une largeur minimale */}
                <thead>
                    <tr>
                        {headers.map((header, index) => (
                            <th
                                key={index}
                                className={`bg-primary text-white font-helvetica font-medium px-4 py-3 text-left ${
                                    index === 0 ? 'rounded-l-lg' : ''
                                } ${index === headers.length - 1 ? 'rounded-r-lg' : ''}`}
                            >
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((company, index) => (
                        <tr
                            key={company.user_id}
                            onClick={() => onRowClick(company)}
                            className={`cursor-pointer font-helvetica font-medium hover:bg-secondary transition duration-300 ease-in-out ${
                                index % 2 === 0 ? 'bg-white' : 'bg-whiteBlack'
                            } ${index === 0 ? 'rounded-t-lg' : ''} ${index === data.length - 1 ? 'rounded-b-lg' : ''}`}
                        >
                            <td className={`${cellClasses} rounded-l-lg`}>
                                <div className="flex items-center justify-center">
                                    <img src={company.profile_image} alt="Profile" className="w-6 h-6 rounded-full" />
                                </div>
                            </td>
                            <td className={cellClasses}>{company.name}</td>
                            <td className={cellClasses}>{company.role_name}</td>
                            <td className={cellClasses}>{company.status}</td>
                            <td className={cellClasses}>0</td>

                            <td className={`${cellClasses} rounded-r-lg`}>0</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CompanyTable;
