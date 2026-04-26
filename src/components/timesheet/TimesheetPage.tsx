import type { TimesheetData } from "../../types/timesheet";
import { useRef, type FunctionComponent } from "react";
import { toPng } from "html-to-image";
import { Link } from "react-router-dom";

import TimesheetTopBar from "./TimesheetTopBar";
import WeekendRangeBar from "./WeekendRangeBar";
import EmployeeInfo from "./table/EmployeeInfo";
import TimesheetTable from "./table/TimesheetTable";
import TimesheetSummary from "./table/TimesheetSummary";

import "../../styles/print.css";
import { t } from "i18next";

interface TimesheetPageProps {
  timesheetData: TimesheetData | null;
  setTimesheetData: React.Dispatch<React.SetStateAction<TimesheetData | null>>;
}

const TimesheetPage: FunctionComponent<TimesheetPageProps> = ({
  timesheetData,
  setTimesheetData,
}) => {
  const exportRef = useRef<HTMLDivElement | null>(null);

  const handleExportPng = async () => {
    if (!exportRef.current) return;
     // включаем режим экспорта
    exportRef.current.classList.add("export-mode", "desktop-export")
    exportRef.current.style.width = "1120px";
    exportRef.current.style.minWidth = "1120px"

    const dataUrl = await toPng(exportRef.current, {
      cacheBust: true,
      pixelRatio: 2,
      backgroundColor: "rgb(255, 255, 255)",
    });
    // выключаем режим
    exportRef.current.classList.remove("export-mode", "desktop-export");
    exportRef.current.style.width = " ";
    exportRef.current.style.minWidth = " "

    const link = document.createElement("a");
    link.download = "timesheet.png";
    link.href = dataUrl;
    link.click();
  };

  if (!timesheetData) {
    return (
      <div className="error-message">
        {t("app.noData")}
        <br />
        <Link className="link error-link" to="/">
          {t("app.backHome")}
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="no-print">
        <TimesheetTopBar
          onClearTimesheet={() => setTimesheetData(null)}
          onExportPng={handleExportPng}
        />

        <WeekendRangeBar
          days={timesheetData.days}
          settings={timesheetData.settings}
          onChangeDays={(nextDays) =>
            setTimesheetData((previousTimesheetData) =>
              previousTimesheetData
                ? { ...previousTimesheetData, days: nextDays }
                : previousTimesheetData
            )
          }
        />
      </div>

      <div ref={exportRef} className="export-area print-area">
        <div className="table-container">
          <EmployeeInfo employee={timesheetData.employee} />

          <TimesheetTable
            days={timesheetData.days}
            settings={timesheetData.settings}
            onChangeDays={(nextDays) =>
              setTimesheetData((previousTimesheetData) =>
                previousTimesheetData
                  ? { ...previousTimesheetData, days: nextDays }
                  : previousTimesheetData
              )
            }
          />

          <TimesheetSummary
            days={timesheetData.days}
            settings={timesheetData.settings}
          />
        </div>
      </div>
    </>
  );
};

export default TimesheetPage;