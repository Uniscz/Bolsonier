type AdminTableProps = {
  title: string;
  description?: string;
  columns: string[];
  rows: React.ReactNode[][];
};

export function AdminTable({ title, description, columns, rows }: AdminTableProps) {
  return (
    <div className="panel overflow-hidden">
      <div className="border-b border-white/10 px-6 py-5">
        <h2 className="font-display text-2xl font-semibold">{title}</h2>
        {description ? <p className="mt-2 text-sm text-zinc-400">{description}</p> : null}
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 text-zinc-400">
              {columns.map((column) => (
                <th key={column} className="px-6 py-4 font-medium">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-b border-white/5 align-top last:border-0">
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="px-6 py-4 text-zinc-200">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
