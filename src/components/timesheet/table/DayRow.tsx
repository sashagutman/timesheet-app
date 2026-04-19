import type { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";

type DayStatus = "work" | "weekend" | "sick" | "vacation";

interface DayRowProps {
  dateLabel: string;
  dayIndex: number;
  status: DayStatus;
  fromTime: string;
  toTime: string;
  hours: number;
  onStatusChange: (nextStatus: DayStatus) => void;
  onAdjustHours: (deltaHours: number) => void;
}

const DayRow: FunctionComponent<DayRowProps> = ({
  dateLabel,
  dayIndex,
  status,
  fromTime,
  toTime,
  hours,
  onStatusChange,
  onAdjustHours,
}) => {
  const { t } = useTranslation();

  const isNonWorkDay = status !== "work";

  return (
    <tr>
      <td className="col-date">
        <div className="date-cell">
          <div className="date-cell__day">{t(`weekdays.${dayIndex}`)}</div>
          <div className="date-cell__date">{dateLabel}</div>
        </div>
      </td>

      <td className="col-status">
        <span className="print-only">{t(`status.${status}`)}</span>
        <select
          value={status}
          className="status-select screen-only"
          onChange={(event) => onStatusChange(event.target.value as DayStatus)}
        >
          <option value="work">{t("status.work")}</option>
          <option value="weekend">{t("status.weekend")}</option>
          <option value="sick">{t("status.sick")}</option>
          <option value="vacation">{t("status.vocation")}</option>
        </select>
      </td>

      <td className="col-hours">
        <div className="hours-cell">
          <div className="hours-cell__value">{hours.toFixed(1)}</div>

          <div className="hours-cell__controls">
            <button
              type="button"
              className="hours-cell__btn cell-btn__minus"
              disabled={isNonWorkDay}
              onClick={() => onAdjustHours(-0.25)}
            >
              −
            </button>

            <button
              type="button"
              className="hours-cell__btn cell-btn__plus"
              disabled={isNonWorkDay}
              onClick={() => onAdjustHours(0.25)}
            >
              +
            </button>
          </div>
        </div>
      </td>

      <td className="col-fromto">
        <div className="fromto-cell">
          <div className="fromto-cell__time">{fromTime}</div>
          <div className="fromto-cell__dash">—</div>
          <div className="fromto-cell__time">{toTime}</div>
        </div>
      </td>
    </tr>
  );
};

export default DayRow;