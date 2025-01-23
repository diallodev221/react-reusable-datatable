import React from "react";

export type Column<T> = {
  key: keyof T;
  header: string;
  render?: (value: T[keyof T]) => React.ReactNode;
};

type DataTableProps<T> = {
  data: T[];
  columns: Column<T>[];
};

type TableHeaderProps<T> = {
  columns: Column<T>[];
};

type TableRowProps<T> = {
  row: T;
  columns: Column<T>[];
};

type TableCellProps<T> = {
  value: T;
  render?: (value: T) => React.ReactNode;
};

function TableHeader<T>({ columns }: Readonly<TableHeaderProps<T>>) {
  return (
    <thead>
      <tr className="bg-gray-200 text-left">
        {columns.map((column) => (
          <th className="border p-4" key={String(column.key)}>
            {column.header}
          </th>
        ))}
      </tr>
    </thead>
  );
}

function TableRow<T extends { id: number | string }>({
  row,
  columns,
}: Readonly<TableRowProps<T>>) {
  return (
    <tr key={row.id} className="border p-4 hover:bg-gray-100">
      {columns.map((column) => (
        <TableCell
          key={String(column.key)}
          value={row[column.key]}
          render={column.render}
        />
      ))}
    </tr>
  );
}

function TableCell<T>({ value, render }: Readonly<TableCellProps<T>>) {
  return <td className="border p-4">{render ? render(value) : String(value)}</td>;
}

export default function DataTable<T extends { id: number | string }>({
  data,
  columns,
}: Readonly<DataTableProps<T>>) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <TableHeader columns={columns} />
        <tbody>
          {data.map((row) => (
            <TableRow key={row.id} row={row} columns={columns} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
