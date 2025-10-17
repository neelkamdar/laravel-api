import { useTranslation } from "react-i18next";
import NoMediaImage from '../../../public/assets/svg/no-media.svg';

const NoDataFound = ({ title, noImage, customImage }) => {
    
    const { t } = useTranslation("common");
    return (
        <div className="no-data-added w-100">
            {!noImage && <img className="img-fluid" src={customImage ? customImage : "/assets/svg/no-media.svg"} alt="" />}
            <h4>{title ? t(title) : t("no_data_found")}</h4>
        </div>
    )
}

export default NoDataFound