import { DataRow } from "./DataRow.js";
import { Nullable } from "../types/Nullable.js";
export declare class DataPivot<T> {
    private columns;
    private rows;
    constructor();
    addColumn(...columnName: string[]): void;
    addRow(rowKey: string, row: DataRow): void;
    newRow(): DataRow;
    get(rowKey: string, columnKey: string): Nullable<T>;
    clear(): void;
}
