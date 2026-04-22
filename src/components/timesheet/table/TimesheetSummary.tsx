import type { FunctionComponent } from "react";
import { LuCalendarClock } from "react-icons/lu";
import { FaRegCalendarCheck } from "react-icons/fa";
import "../../../styles/table/summary.css";
import "../../../styles/signature.css"
import { useState } from "react";
import SignatureModal from "./SignatureModal";

import type { DayEntry, TimesheetSettings } from "../../../types/timesheet";
import { t } from "i18next";

interface TimesheetSummaryProps {
  days: DayEntry[];
  settings: TimesheetSettings;
}

const TimesheetSummary: FunctionComponent<TimesheetSummaryProps> = ({ days, settings }) => {
  const standartWorkDays = days.reduce((count, day) => (
    settings.weekendDays.includes(new Date(day.dateISO).getDay()) ? count : count + 1), 0
  )
  const standardHours = standartWorkDays * settings.hoursPerDay;
  const actualHours = days.reduce((sum, day) => sum + day.hours, 0);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [signature, setSignature] = useState<string | null>(null);

  const handleSaveSignature = (dataUrl: string) => {
    setSignature(dataUrl);
    localStorage.setItem("employeeSignature", dataUrl);
  };

  return (
      <div className="timesheet-summary">
        <div className="timesheet-summary__cards">
          <div className="summary-card">
            <div className="summary-card__icon">
              <FaRegCalendarCheck />
            </div>
            <div className="summary-card__info">
              <div className="summary-card__label">{t("summary.workDays")}</div>
              <div className="summary-card__value">{standartWorkDays}</div>
            </div>
          </div>
          <div className="summary-card">
            <div className="summary-card__icon">
              <LuCalendarClock />
            </div>
            <div className="summery-card__info">
              <div className="summary-card__label">{t("summary.standardHours")}</div>
              <div className="summary-card__value">{standardHours.toFixed(1)}</div>
            </div>
          </div>
          <div className="summary-card summary-card--accent">
            <div className="summary-card__icon">
              <LuCalendarClock />
            </div>
            <div className="summery-card__info">
              <div className="summary-card__label">{t("summary.actualHours")}</div>
              <div className="summary-card__value">{actualHours.toFixed(1)}</div>
            </div>
          </div>
        </div>
        <div className="notes-block">
          <div className="notes-block__label">{t("summary.notes")}</div>
          <p className="notes-block__content">{settings.notes || "-"}</p>
        </div>
        {/* signature */}
        <div className="timesheet-signatures">
          <div className="signature-block">
            <div className="signature-block__label">
              {t("summary.employeeSign")}
            </div>
            <div
              className="signature-line"
              onClick={() => setIsModalOpen(true)}
            >
              {signature ? (
                <img src={signature} alt="signature" />
              ) : (
                <span className="signature-placeholder">
                  {t("signature.clickToSign")}
                </span>
              )}
            </div>
          </div>
          <div className="signature-block">
            <div className="signature-block__label">
              {t("summary.managerSign")}
            </div>
            <div className="signature-line" />
          </div>
          {isModalOpen && (
            <SignatureModal
              onSave={handleSaveSignature}
              onClose={() => setIsModalOpen(false)}
            />
          )}
        </div>
      </div>
  );
};

export default TimesheetSummary;
