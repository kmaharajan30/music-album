import React from "react";
import "./styles.css";

export interface Column<T> {
  key: keyof T | "nameArtist" | "action"; // Allow custom keys
  header: string;
  width?: string;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  cellRenderer: (column: Column<T>, item: T) => React.ReactNode;
}

const Table = <T extends { id: string }>({
  columns,
  data,
  cellRenderer,
}: TableProps<T>) => {
  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key as string} style={{ width: column.width }}>
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.map((item) => (
            <tr key={item.id}>
              {columns.map((column) => (
                <React.Fragment key={column.key as string}>
                  {cellRenderer(column, item)}
                </React.Fragment>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
