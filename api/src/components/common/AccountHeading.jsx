
import { useTranslation } from "react-i18next";
import React from "react";

const AccountHeading = ({ title }) => {
  const { t } = useTranslation("common");

  return (
    <div className="title-header">
      <div className="d-flex align-items-center">
        <h5>{t(title)}</h5>
      </div>
    </div>
  );
};

export default AccountHeading;
