import { Nullable } from "../types/Nullable.js";

export class DateFormat {

    private _date: Nullable<Date>;

    constructor(date?: string | Date, format?: string) {
        if (!date)
            this._date = new Date
        else if (typeof date === "string" && format) {
            this._date = this.parseDate(date, format);
        } else if (date instanceof Date) {
            this._date = date;
        } else {
            this._date = null;
        }
    }

    public date(): Nullable<Date> {
        return this._date;
    }

    public dateString(format: string = "YYYY/MM/DD"): string {
        if (this._date == null) return "";
        return this.formatDate(format);
    }

    public timeString(format: string = "hh:mm:ss"): string {
        if (this._date == null) return "";
        return this.formatDate(format);
    }

    public dateTimeString(format: string = "YYYY/MM/DD hh:mm:ss"): string {
        if (this._date == null) return "";
        return this.formatDate(format);
    }

    public customString(format: string): string {
        if (this._date == null) return "";
        return this.formatDate(format);
    }

    private parseDate(dateString: string, format: string): Date {
        const dayIndex = format.indexOf("DD");
        const monthIndex = format.indexOf("MM");
        const yearIndex = format.indexOf("YYYY");
        const hourIndex = format.indexOf("hh");
        const minuteIndex = format.indexOf("mm");

        const day = parseInt(dateString.slice(dayIndex, dayIndex + 2), 10);
        const month = parseInt(dateString.slice(monthIndex, monthIndex + 2), 10) - 1;
        const year = parseInt(dateString.slice(yearIndex, yearIndex + 4), 10);
        const hour = parseInt(dateString.slice(hourIndex, hourIndex + 2), 10);
        const minute = parseInt(dateString.slice(minuteIndex, minuteIndex + 2), 10);

        return new Date(year, month, day, hour, minute);
    }

    private formatDate(format: string): string {
        if (this._date == null) return "";

        const year = this._date.getFullYear();
        const month = this.padZero(this._date.getMonth() + 1);
        const day = this.padZero(this._date.getDate());
        const hour = this.padZero(this._date.getHours());
        const minute = this.padZero(this._date.getMinutes());
        const second = this.padZero(this._date.getSeconds());

        let formattedDate = format.replace("YYYY", year.toString());
        formattedDate = formattedDate.replace("MM", month);
        formattedDate = formattedDate.replace("DD", day);
        formattedDate = formattedDate.replace("hh", hour);
        formattedDate = formattedDate.replace("mm", minute);
        formattedDate = formattedDate.replace("ss", second);

        return formattedDate;
    }


    private padZero(value: number): string {
        return value.toString().padStart(2, "0");
    }

}