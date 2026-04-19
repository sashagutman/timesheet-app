import { useState, type FunctionComponent } from "react";
import "../../styles/app-header.css";
import { LuClipboardList } from "react-icons/lu";
import { useTranslation } from "react-i18next";
import HelpModal from "../../helpers/HelpModal";
interface AppHeaderProps {

}

const AppHeader: FunctionComponent<AppHeaderProps> = () => {
    const [isHelpOpen, setIsHelpOpen] = useState(false)
    const { i18n, t } = useTranslation();
    const changeLanguage = (language: "ru" | "en" | "he") => {
        localStorage.setItem("lang", language);
        i18n.changeLanguage(language);
    };
    return (
        <>
            <div className="header__inner">
                <div className="header__icon">
                    <LuClipboardList />
                </div>
                <h1 className="header__title">{t("form.title")}</h1>
                <h2 className="header__subtitle">{t("form.subtitle")}</h2>
                <HelpModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
                    <button type="button" className="help-btn" onClick={() => setIsHelpOpen(true)}>
                    {t("help.title")} 
                    </button>
                <div className="t-actions">
                    <button className="btn t-btn" onClick={() => changeLanguage("ru")}>RU</button>
                    <button className="btn t-btn" onClick={() => changeLanguage("en")}>EN</button>
                    <button className="btn t-btn" onClick={() => changeLanguage("he")}>HE</button>
                </div>
            </div>
        </>
    );
}

export default AppHeader;