import { useTranslation } from "react-i18next";

const TitleDetails = ({ params, data }) => {
  const { t } = useTranslation("common");

  return (
    <div className="title-header">
      <div className="d-flex align-items-center flex-wrap gap-2">
        <h5>{`${t("order_number")}: #${params}`}</h5>
      </div>
    </div>
  );
};

export default TitleDetails;
