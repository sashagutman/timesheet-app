import { useState, type FunctionComponent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaRegIdCard, FaRegUser } from "react-icons/fa";
import { LuCalendarClock } from "react-icons/lu";
import { MdOutlineAccessTime } from "react-icons/md";
import { BsBuildings } from "react-icons/bs";
import { GrNotes } from "react-icons/gr";
import { HiMiniArrowRight } from "react-icons/hi2";
import MonthYearSelect from "../inputs/MonthYearSelect";
import WeekendDaysSelect from "../inputs/WeekendDaysSelect";
import type { TimesheetData } from "../../types/timesheet";
import { generateDaysForMonth } from "../../utils/timesheet";

import "../../styles/form.css";
import { useTranslation } from "react-i18next";

interface TimeSheetFormProps {
  // Сюда передадим “готовый табель” наверх в App/Context. Пока без localStorage.
  onCreateTimesheet?: (timesheetData: TimesheetData) => void;
}

const TimeSheetForm: FunctionComponent<TimeSheetFormProps> = ({ onCreateTimesheet }) => {
  const navigate = useNavigate();

  const { t } = useTranslation();
  
  // Эти значения уже отдельными компонентами управляются (MonthYearSelect/WeekendDaysSelect)
  const [monthYYYYMM, setMonthYYYYMM] = useState("2026-01");
  const [weekendDays, setWeekendDays] = useState<number[]>([5, 6]); 

  // 1) Сабмит формы: собираем данные из inputs + стейты month/weekendDays
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // 2) Забираем значения из обычных input/textarea через FormData
    const formData = new FormData(event.currentTarget);

    const fullName = String(formData.get("name") ?? "");
    const idNumber = String(formData.get("idNumber") ?? "");
    const office = String(formData.get("office") ?? "");
    const hoursPerDay = Number(formData.get("hours") ?? 0);
    const startTime = String(formData.get("startTime") ?? "");
    const notes = String(formData.get("notes") ?? "");

    // 3) Собираем “шапку” табеля (employee + settings)
    const timesheetData: TimesheetData = {
      employee: { fullName, idNumber, office },
      settings: {
        monthYYYYMM,
        hoursPerDay,
        startTime,
        weekendDays,
        notes,
      },
      // 4) Список дней сгенерируем ниже
      days: [],
    };

    // 5) Генерим строки табеля на весь месяц (DayEntry[])
    timesheetData.days = generateDaysForMonth(timesheetData.settings);

    // 6) Передаём наверх (если дали колбэк) так данные переедут на страницу таблицы
    if (onCreateTimesheet) {
      onCreateTimesheet(timesheetData);
    } else {
      console.log(timesheetData);
    }

    // 7) Переходим на страницу таблицы
    navigate("/table");
  };

  return (
    <>
      <div className="timesheet__wrapper">
        <form className="timesheet-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-group__label" htmlFor="name">
              <FaRegUser />
              <span>{t("form.fullName")}</span>
            </label>
            <input type="text" id="name" name="name" required placeholder={t("form.fullNamePlaceholder")}/>
          </div>

          <div className="form-group">
            <label className="form-group__label" htmlFor="idNumber">
              <FaRegIdCard />
              <span>{t("form.idNumber")}</span>
            </label>
            <input type="text" id="idNumber" name="idNumber" required placeholder={t("form.idNumberPlaceholder")} />
          </div>

          <div className="form-group">
            <label className="form-group__label" htmlFor="office">
              <BsBuildings />
              <span>{t("form.office")}</span>
            </label>
            <input type="text" id="office" name="office" required placeholder={t("form.officePlaceholder")} />
          </div>

          <MonthYearSelect value={monthYYYYMM} onChange={setMonthYYYYMM} />

          <div className="form-group">
            <label className="form-group__label" htmlFor="hours">
              <LuCalendarClock />
              <span>{t("form.hoursPerDay")}</span>
            </label>
            <input type="number" min={0.25} max={14} step={0.25} id="hours" name="hours" required
              placeholder={t("form.hoursPerDayPlaceholder")}
            />
          </div>

          <div className="form-group">
            <label className="form-group__label" htmlFor="startTime">
              <MdOutlineAccessTime style={{ color: "green" }} />
              <span>{t("form.startTime")}</span>
            </label>
            <div className="time-input-wrapper">
                <input className="time-input" type="time" id="startTime" name="startTime" required />
            </div>
          </div>

          <WeekendDaysSelect value={weekendDays} onChange={setWeekendDays} label={t("form.weekendDays")} />

          <div className="form-group form-group--full">
            <label className="form-group__label" htmlFor="notes">
              <GrNotes />
              <span>{t("form.notes")}</span>
            </label>
            <textarea id="notes" name="notes" placeholder={t("form.notesPlaceholder")} />
          </div>

          <button className="send-button btn" type="submit">
            {t("form.submit")}
            <svg className="send-button__icon" stroke="currentColor" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                strokeWidth="1.5"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </form>
      </div>

      <div className="timesheet__bottom">
        <Link to="/table" className="timesheet__bottom-link link">
          {t("app.goToTable")} <HiMiniArrowRight />
        </Link>
      </div>
    </>
  );
};

export default TimeSheetForm;
