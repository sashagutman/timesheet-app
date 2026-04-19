import type { FunctionComponent } from "react";
import "../styles/alert-dialog.css"
import { t } from "i18next";

interface AlertDialogProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const AlertDialog: FunctionComponent<AlertDialogProps> = ({ onConfirm, onCancel }) => {
  return ( 
    <>
      <div className="alert-overlay" onClick={onCancel}> {/* клик по overlay закрывает */}
        <div className="alert-wrapper" onClick={(e) => e.stopPropagation()}> {/* останавливаем всплытие */}
          <div className="alert-content">
            <p className="alert-message">{t("dialog.clearForm")}</p>
            <div className="alert-buttons">
              <button className="alert_btn btn-confirm" onClick={onConfirm}>{t("dialog.yes")}</button>
              <button className="alert_btn btn-cancel" onClick={onCancel}>{t("dialog.no")}</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AlertDialog;