import { useState, type FunctionComponent } from "react";
import { GoArrowLeft } from "react-icons/go";
import { Link } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import { LuImageDown } from "react-icons/lu";

import AlertDialog from "../../helpers/AlertDialog";
import "../../styles/top-bar.css";
import { t } from "i18next";

interface TimesheetTopBarProps {
  onClearTimesheet: () => void;
  onExportPng: () => void;
}

const TimesheetTopBar: FunctionComponent<TimesheetTopBarProps> = ({
  onClearTimesheet,
  onExportPng,
}) => {
  const [showAlert, setShowAlert] = useState(false);

  const handleDelete = () => setShowAlert(true);

  const handleConfirm = () => {
    onClearTimesheet();
    setShowAlert(false);
  };

  const handleCancel = () => setShowAlert(false);

  return (
    <>
      <div className="timesheet-top-bar">
        <Link className="link-back link" to="/">
          <GoArrowLeft />
          {t("app.backToForm")}
        </Link>

        <div className="top-bar__actions">
          <button className="btn-delete" onClick={handleDelete} type="button">
            <RiDeleteBin6Line />
          </button>

          <button className="btn btn-print" type="button" onClick={onExportPng}>
            <LuImageDown />
            <span>{t("app.savePng")}</span>
          </button>
        </div>
      </div>

      {showAlert && (
        <AlertDialog onConfirm={handleConfirm} onCancel={handleCancel} />
      )}
    </>
  );
};

export default TimesheetTopBar;