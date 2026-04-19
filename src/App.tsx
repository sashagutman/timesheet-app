import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import TimeSheetForm from "./components/timesheet/TimeSheetForm";
import TimesheetPage from "./components/timesheet/TimesheetPage";
import AppHeader from "./components/layout/AppHeader";

import type { TimesheetData } from "./types/timesheet";
import i18n from "./i18n";

const TIMESHEET_STORAGE_KEY = "timesheetData_v1";

function App() {
  // 1) Загружаем один раз при старте приложения
  const [timesheetData, setTimesheetData] = useState<TimesheetData | null>(() => {
    try {
      const raw = localStorage.getItem(TIMESHEET_STORAGE_KEY);
      return raw ? (JSON.parse(raw) as TimesheetData) : null;
    } catch {
      return null;
    }
  });

  // 2) Любое изменение timesheetData сохраняем в localStorage
  useEffect(() => {
    try {
      if (timesheetData) {
        localStorage.setItem(TIMESHEET_STORAGE_KEY, JSON.stringify(timesheetData));
      } else {
        localStorage.removeItem(TIMESHEET_STORAGE_KEY);
      }
    } catch {
      // если localStorage недоступен — просто игнор
    }
  }, [timesheetData]);

  useEffect(() => {
    const updateDirection = (language: string) => {
      const isHebrew = language === "he";
      document.documentElement.dir = isHebrew ? "rtl" : "ltr";
      document.documentElement.lang = language;
    };

    updateDirection(i18n.language);
    i18n.on("languageChanged", updateDirection);

    return () => i18n.off("languageChanged", updateDirection);
  }, []);

  return (
    <div className="container">
      <Routes>
        <Route path="/" element={
          <>
            <AppHeader />
            <TimeSheetForm onCreateTimesheet={setTimesheetData} />
          </>
        }
        />

        <Route path="/table" element={
          <TimesheetPage
            timesheetData={timesheetData}
            setTimesheetData={setTimesheetData}
          />
        }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;

