import { getPermissionArray } from "@/components/common/getPermissionArray";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { FaChevronDown } from "react-icons/fa";
import { QuickLinksData } from "../../data/QuickLinks";
import useOutsideDropdown from "@/utils/hooks/customHooks/useOutsideDropdown";

const QuickLinks = () => {
    const { ref, isComponentVisible, setIsComponentVisible } = useOutsideDropdown(false);
    const { t } = useTranslation("common");
    return(
        <li className="d-inline-block">
            <div className="quick-dropdown-box dropdown">
                <div className={`btn btn-outline dropdown-toggle ${isComponentVisible ? 'active' : ''}`}  onClick={() => setIsComponentVisible((prev) =>!prev)}>
                    {t("quick_links")}
                    <FaChevronDown />
                </div>
                <div  className={`dropdown-menu ${isComponentVisible ? 'active' : ''}`}>
                    <div className="dropdown-title">
                        <h4>{t("quick_links")}</h4>
                    </div>
                    <ul ref={ref} className={`dropdown-list`}>
                        {getPermissionArray(QuickLinksData).map((quickLink, i) => (
                            <li key={i}>
                                <Link href={quickLink.path} index={i}>
                                    <div className="svg-box">
                                        {quickLink.icon}
                                    </div>
                                    <span>{t(quickLink.title)}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
                </div>
        </li>
    )
}

export default QuickLinks;