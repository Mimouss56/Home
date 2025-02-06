import { JSX } from "react";

export interface TableColumn<T> {
  header: string | React.ReactNode;
  accessor: string | ((row: T) => React.ReactNode) | ((row: T) => void);
  className?: string;
}

export interface TableAction<T> {
  header: string | React.ReactNode;
  accessor: string | ((row: T) => void);
  action: (() => Promise<void> | void) | ((row: T) => Promise<void> | void);
  className?: string;
}

interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  footer?: React.ReactNode;
  rowAction?: TableAction<T>[];
}
/**
 * Table component
 * @template T - The type of the data
 * @param {TableProps} { columns, data, footer }
 * @returns {JSX.Element}
 */
export function Table<T extends Record<string, any>>({
  columns,
  data,
  footer,
  rowAction,
}: TableProps<T>): JSX.Element {
  return (
    <table className="table table-striped table-hover table-bordered">
      <thead>
        <tr className="text-center ">
          {rowAction && <th>#</th>}
          {columns.map((column, index) => (
            <th key={index}>{column.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr className="text-center" key={index}>
            {rowAction && (
              <td className="d-flex justify-content-center">
                {rowAction.map((action, rowIndex) => (
                  <button
                    key={rowIndex}
                    type="button"
                    className={`btn m-1 p-1 ${action.className}`}
                    onClick={() =>
                      typeof action.accessor === 'function' &&
                      action.accessor(row)
                    }
                  >
                    {action.header}
                  </button>
                ))}
              </td>
            )}
            {columns.map((column, columnIndex) => (
              <td key={columnIndex} className={column.className}>
                {typeof column.accessor === 'function'
                  ? column.accessor(row)
                  : row[column.accessor]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
      {footer && <tfoot>{footer}</tfoot>}
    </table>
  );
}