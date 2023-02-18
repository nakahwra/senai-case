interface TableProps {
  headers: string[];
  children: React.ReactNode;
}

function Table({ headers, children }: TableProps) {
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {headers.map((header) => (
              <th scope="col" className="px-4 py-3">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        {children}
      </table>
    </div>
  );
}

export default Table;
