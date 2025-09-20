export type ColumnType = "string" | string[];

export interface TableColumn<T> {
  header: string;
  accessor: keyof T;
  columnFilterType?: ColumnType;
}

export interface SortAndFilterParams {
  sorts: Record<string, Sort>;
  filters: Record<string, string>;
}

export interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  filters?: SortAndFilterParams | null;
  onFiltersChange?: (params: SortAndFilterParams) => void;
  onRowClick: (row: T) => void;
}

export type Sort = "asc" | "desc" | "";
