import { useState, type FunctionComponent } from "react";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { FaRegCalendarAlt } from "react-icons/fa";
import "../../styles/weekend-range.css";

import type { DayEntry, DayStatus, TimesheetSettings } from "../../types/timesheet";
import { t } from "i18next";

interface WeekendRangeBarProps {
  days: DayEntry[]; // текущие дни табеля
  settings: TimesheetSettings; // нужен startTime + hoursPerDay для work
  onChangeDays: (nextDays: DayEntry[]) => void; // обновляем дни наверху
}

// helper: считаем toTime по startTime + hours
function dayEndTime(startTime: string, hours: number) {
  const [startHours, startMinutes] = startTime.split(":").map(Number);
  const totalStartMinutes = startHours * 60 + startMinutes;
  const totalEndMinutes = totalStartMinutes + Math.round(hours * 60);

  const endHours = Math.floor((totalEndMinutes / 60) % 24);
  const endMinutes = totalEndMinutes % 60;

  return `${String(endHours).padStart(2, "0")}:${String(endMinutes).padStart(2, "0")}`;
}

const WeekendRangeBar: FunctionComponent<WeekendRangeBarProps> = ({
  days,
  settings,
  onChangeDays,
}) => {
  // локально храним выбранный диапазон и статус
  const [rangeFrom, setRangeFrom] = useState(""); // "YYYY-MM-DD"
  const [rangeTo, setRangeTo] = useState("");     // "YYYY-MM-DD"
  const [rangeStatus, setRangeStatus] = useState<DayStatus>("weekend");

  const handleApply = () => {
    if (!rangeFrom || !rangeTo) return;

    // нормализуем порядок если перепутали даты местами
    const startISO = rangeFrom <= rangeTo ? rangeFrom : rangeTo;
    const endISO = rangeFrom <= rangeTo ? rangeTo : rangeFrom;

    // меняем только те дни, которые попали в диапазон
    const nextDays = days.map((day) => {
      const isInRange = day.dateISO >= startISO && day.dateISO <= endISO;
      if (!isInRange) return day;

      const isWork = rangeStatus === "work";
      // для выходных/отпусков/больничных часов нет, для работы - стандартный день
      const nextHours = isWork ? settings.hoursPerDay : 0;
      const nextFromTime = isWork ? settings.startTime : "";
      const nextToTime = isWork ? dayEndTime(settings.startTime, nextHours) : "";

      return {
        ...day,
        status: rangeStatus,
        hours: nextHours,
        fromTime: nextFromTime,
        toTime: nextToTime,
      };
    });

    onChangeDays(nextDays);
  };

  return (
    <div className="range-bar">
      <div className="range-bar__title">
        <FaRegCalendarAlt />
        <div>
          <div className="range-bar__headline">{t("range.title")}</div>
          <div className="range-bar__subtitle">
            {t("range.subtitle")}
          </div>
        </div>
      </div>

      <div className="range-bar__fields">
        <div className="range-bar__field">
          <label className="range-bar__label" htmlFor="rangeFrom">{t("range.from")}</label>
          <input
            type="date"
            id="rangeFrom"
            name="rangeFrom"
            value={rangeFrom}
            onChange={(event) => setRangeFrom(event.target.value)}
          />
        </div>

        <div className="range-bar__field">
          <label className="range-bar__label" htmlFor="rangeTo">{t("range.to")}</label>
          <input
            type="date"
            id="rangeTo"
            name="rangeTo"
            value={rangeTo}
            onChange={(event) => setRangeTo(event.target.value)}
          />
        </div>

        <div className="range-bar__field range-bar__field--status">
          <label className="range-bar__label" htmlFor="rangeStatus">{t("range.status")}</label>
          <select
            id="rangeStatus"
            name="rangeStatus"
            value={rangeStatus}
            onChange={(event) => setRangeStatus(event.target.value as DayStatus)}
          >
            <option value="weekend">{t("range.weekend")}</option>
            <option value="sick">{t("range.sick")}</option>
            <option value="vacation">{t("range.vocation")}</option>
          </select>
        </div>

        <button type="button" className="range-bar__apply btn" onClick={handleApply}>
          <BsFillPatchCheckFill />
          <span>{t("range.apply")}</span>
        </button>
      </div>
    </div>
  );
};

export default WeekendRangeBar;
