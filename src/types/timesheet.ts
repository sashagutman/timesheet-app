export type DayStatus = "work" | "weekend" | "sick" | "vacation";

export interface EmployeeData {
    fullName: string;
    idNumber: string;
    office: string;
}

export interface TimesheetSettings {
    monthYYYYMM: string;
    hoursPerDay: number;
    startTime: string;
    weekendDays: number[];
    notes: string;
}

export interface DayEntry {
    dateISO: string;
    dateLabel: string;
    dayIndex: number;
    status: DayStatus;
    fromTime?: string;
    toTime?: string;
    hours: number;
}

export interface TimesheetData {
    employee: EmployeeData;
    settings: TimesheetSettings;
    days: DayEntry[];
}