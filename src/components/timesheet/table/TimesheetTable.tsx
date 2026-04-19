import type { FunctionComponent } from "react";
import DayRow from "./DayRow";
import "../../../styles/table/table.css";

import type { DayEntry, DayStatus, TimesheetSettings } from "../../../types/timesheet";
import { dayEndTime } from "../../../utils/time";
import { useTranslation } from "react-i18next";

interface TimesheetTableProps {
  days: DayEntry[];
  settings: TimesheetSettings;
  onChangeDays: (nextDays: DayEntry[]) => void;
}

const TimesheetTable: FunctionComponent<TimesheetTableProps> = ({ days, settings, onChangeDays }) => {
  const updateDay = (index: number, patch: Partial<DayEntry>) => {
    const nextDays = days.map((day, i) => (i === index ? { ...day, ...patch } : day));
    onChangeDays(nextDays);
  };

  const { t } = useTranslation();
  
  const handleStatusChange = (index: number, nextStatus: DayStatus) => {
    const isWork = nextStatus === "work";

    updateDay(index, {
      status: nextStatus,
      hours: isWork ? settings.hoursPerDay : 0,
      fromTime: isWork ? settings.startTime : "",
      toTime: isWork ? dayEndTime(settings.startTime, settings.hoursPerDay) : "",
    });
  };

  const handleAdjustHours = (index: number, delta: number) => {
    const day = days[index];
    if (!day || day.status !== "work") return;

    const nextHours = Math.max(0, Math.min(14, Number((day.hours + delta).toFixed(2))));

    updateDay(index, {
      hours: nextHours,
      toTime: dayEndTime(settings.startTime, nextHours),
    });
  };

  return (
    <section className="timesheet-table__wrapper">
      <table className="timesheet-table">
        <thead>
          <tr>
            <th>{t("table.dateDay")}</th>
            <th>{t("table.status")}</th>
            <th>{t("table.hours")}</th>
            <th>{t("table.fromTo")}</th>
          </tr>
        </thead>

        <tbody>
          {days.map((day, index) => (
            <DayRow
              key={day.dateISO}
              dateLabel={day.dateLabel}
              dayIndex={day.dayIndex}
              status={day.status}
              fromTime={day.fromTime || ""}
              toTime={day.toTime || ""}
              hours={day.hours}
              onStatusChange={(nextStatus) => handleStatusChange(index, nextStatus)}
              onAdjustHours={(deltaHours) => handleAdjustHours(index, deltaHours)}
            />
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default TimesheetTable;
