import type { FunctionComponent } from "react";
import type { TimesheetData } from "../../types/timesheet";
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
        <TimesheetTopBar onClearTimesheet={() => setTimesheetData(null)} />
        <WeekendRangeBar
          days={timesheetData.days}
          settings={timesheetData.settings}
          onChangeDays={(nextDays) =>
            setTimesheetData((previousTimesheetData) =>
              previousTimesheetData ? { ...previousTimesheetData, days: nextDays } : previousTimesheetData
            )
          }
        />

      </div>

      <div className="print-area">
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
