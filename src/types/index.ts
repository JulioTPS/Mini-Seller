// export type GenericRow = { [key: string]: string | number };

export type TableProps<T extends object> = {
  values: T[];
  keys?: (keyof T)[];
};
