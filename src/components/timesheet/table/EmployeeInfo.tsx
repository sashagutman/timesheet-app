import type { FunctionComponent } from "react";
import { FaRegUser, FaRegIdCard } from "react-icons/fa";
import { BsBuildings } from "react-icons/bs";
import "../../../styles/table/employee-info.css";

import type { EmployeeData } from "../../../types/timesheet";
import { useTranslation } from "react-i18next";

interface EmployeeInfoProps {
  employee: EmployeeData;
}

const EmployeeInfo: FunctionComponent<EmployeeInfoProps> = ({ employee }) => {
  const { t } = useTranslation();

  return (
    <div className="employee-bar">
      <div className="employee-bar__item">
        <FaRegUser />
        <div>
          <p className="employee-bar__label">{t("form.fullName")}</p>
          <p className="employee-bar__value">{employee.fullName}</p>
        </div>
      </div>

      <div className="employee-bar__item">
        <FaRegIdCard />
        <div>
          <p className="employee-bar__label">{t("form.idNumber")}</p>
          <p className="employee-bar__value">{employee.idNumber}</p>
        </div>
      </div>

      <div className="employee-bar__item">
        <BsBuildings />
        <div>
          <p className="employee-bar__label">{t("form.office")}</p>
          <p className="employee-bar__value">{employee.office}</p>
        </div>
      </div>
    </div>
  );
};

export default EmployeeInfo;
