import { Nullable } from "../types/Nullable.js";
export declare class DateFormat {
    private _date;
    constructor(date?: string | Date, format?: string);
    date(): Nullable<Date>;
    dateString(format?: string): string;
    timeString(format?: string): string;
    dateTimeString(format?: string): string;
    customString(format: string): string;
    private parseDate;
    private formatDate;
    private padZero;
}
