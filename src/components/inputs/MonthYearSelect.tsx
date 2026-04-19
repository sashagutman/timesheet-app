import type { FunctionComponent } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import { useTranslation } from "react-i18next";

interface MonthYearSelectProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  startYear?: number;
  yearCount?: number;
}

const monthValues = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"] as const;

function getCurrentYYYYMM() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}`;
}

const MonthYearSelect: FunctionComponent<MonthYearSelectProps> = ({
  value,
  onChange,
  label,
  startYear,
  yearCount = 3,
}) => {
  const { t } = useTranslation();

  const safeValue = value && /^\d{4}-\d{2}$/.test(value) ? value : getCurrentYYYYMM();
  const [year, month] = safeValue.split("-");

  const baseYear = startYear ?? new Date().getFullYear() - 2;
  const years = Array.from({ length: yearCount }, (_, i) => String(baseYear + i));

  const safeLabel = label ?? t("form.monthYear");

  const handleMonthChange = (monthValue: string) => {
    onChange(`${year}-${monthValue}`);
  };

  const handleYearChange = (yearValue: string) => {
    onChange(`${yearValue}-${month}`);
  };

  return (
    <div className="form-group">
      <label className="form-group__label" htmlFor="monthYear">
        <FaRegCalendarAlt />
        <span>{safeLabel}</span>
      </label>

      <div style={{ display: "flex", gap: 4 }}>
        <select
          id="monthYear"
          value={month}
          onChange={(event) => handleMonthChange(event.target.value)}
        >
          {monthValues.map((monthValue) => (
            <option key={monthValue} value={monthValue}>
              {t(`months.${monthValue}`)}
            </option>
          ))}
        </select>

        <select value={year} onChange={(event) => handleYearChange(event.target.value)}>
          {years.map((yearValue) => (
            <option key={yearValue} value={yearValue}>
              {yearValue}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default MonthYearSelect;