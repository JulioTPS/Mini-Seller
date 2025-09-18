import type { TableProps } from "./types";

const Table = <T extends object>({ columns, data }: TableProps<T>) => {
  return (
    <table className="border-collapse border border-gray-300 w-full">
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={String(col.accessor)} className="border p-2 text-left">
              {col.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={i} className="even:bg-gray-900">
            {columns.map((col) => (
              <td key={String(col.accessor)} className="border p-2">
                {String(row[col.accessor])}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
