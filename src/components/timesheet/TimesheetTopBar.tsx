import { useState, type FunctionComponent } from "react";
import { GoArrowLeft } from "react-icons/go";
import { Link } from "react-router-dom";
import "../../styles/top-bar.css";
import { GrDocumentPdf } from "react-icons/gr";
import { RiDeleteBin6Line } from "react-icons/ri";
import AlertDialog from "../../helpers/AlertDialog";
import { t } from "i18next";

interface TimesheetTopBarProps {
  onClearTimesheet: () => void; // очищаем табель
}

const TimesheetTopBar: FunctionComponent<TimesheetTopBarProps> = ({ onClearTimesheet }) => {
  const [showAlert, setShowAlert] = useState(false);

  const handleDelete = () => setShowAlert(true);

  const handleConfirm = () => {
    onClearTimesheet();     //  тут очищаем state (и localStorage удалится через useEffect в App)
    setShowAlert(false);
  };

  const handleCancel = () => setShowAlert(false);

  return (
    <>
      <div className="timesheet-top-bar">
        <Link className="link-back link" to="/">
          <GoArrowLeft />{t("app.backToForm")}
        </Link>

        <div className="top-bar__actions">
          <button className="btn-delete" onClick={handleDelete} type="button">
            <RiDeleteBin6Line />
          </button>

          <button className="btn btn-print" type="button" onClick={() => window.print()}>
            <GrDocumentPdf /> <span>{t("app.print")}</span>
          </button>
        </div>
      </div>

      {showAlert && <AlertDialog onConfirm={handleConfirm} onCancel={handleCancel} />}
    </>
  );
};

export default TimesheetTopBar;
