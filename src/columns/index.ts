import { ColumnOptions, Column } from "typeorm";

export function RelationalColumn(options?: ColumnOptions) {
  return Column({ nullable: true, ...options });
}