import { type FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import "../styles/help-modal.css"

interface HelpModalProps {
    isOpen: boolean;
    onClose: () => void 
}

const HelpModal: FunctionComponent<HelpModalProps> = ({isOpen, onClose}) => {
    const { t } = useTranslation();

    if(!isOpen) return null;
    
    return (
        <>
            <div className="modal-backdrop" role="presentation" onClick={onClose}>
                <div
                    className="modal"
                    role="dialog"
                    aria-modal="true"
                    aria-label={t("help.title")}
                    onClick={(event) => event.stopPropagation()}
                >
                    <div className="modal__header">
                        <h3 className="modal__title">{t("help.title")}</h3>
                        <button type="button" className="modal__close" onClick={onClose} aria-label={t("help.close")}>
                            ×
                        </button>
                    </div>

                    <div className="modal__content">
                        <ol className="help-list">
                            <li>{t("help.step1")}</li>
                            <li>{t("help.step2")}</li>
                            <li>{t("help.step3")}</li>
                            <li>{t("help.step4")}</li>
                        </ol>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HelpModal;