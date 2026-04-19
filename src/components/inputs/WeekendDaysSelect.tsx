import type { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import Select from "react-select";

type WeekdayOption = { value: number; label: string };

interface WeekendDaysSelectProps {
  value: number[];
  onChange: (value: number[]) => void;
  label?: string;
}

const WeekendDaysSelect: FunctionComponent<WeekendDaysSelectProps> = ({ value, onChange, label }) => {
  const { t } = useTranslation();

  const weekdayOptions: WeekdayOption[] = [
    { value: 0, label: t("weekdays.0") },
    { value: 1, label: t("weekdays.1") },
    { value: 2, label: t("weekdays.2") },
    { value: 3, label: t("weekdays.3") },
    { value: 4, label: t("weekdays.4") },
    { value: 5, label: t("weekdays.5") },
    { value: 6, label: t("weekdays.6") }
  ];

  const selectedOptions = weekdayOptions.filter((option) => value.includes(option.value));

  const handleChange = (selected: readonly WeekdayOption[] | null) => {
    onChange((selected ?? []).map((option) => option.value));
  };

  const safeLabel = label ?? t("form.weekendDays");

  return (
    <div className="form-group form-group--full">
      <label className="form-group__label">
        <span>{safeLabel}</span>
      </label>

      <Select<WeekdayOption, true>
        isMulti
        closeMenuOnSelect={false}
        options={weekdayOptions}
        value={selectedOptions}
        onChange={handleChange}
        placeholder={t("form.weekendDays")}
        classNamePrefix="rs"
      />
    </div>
  );
};

export default WeekendDaysSelect;