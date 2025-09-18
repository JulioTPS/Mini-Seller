export interface TableColumn<T> {
  header: string;
  accessor: keyof T;
}

export interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
}
