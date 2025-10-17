import { Nav, NavItem, NavLink } from 'reactstrap';
import usePermissionCheck from '../../../../utils/hooks/usePermissionCheck';
import { useTranslation } from "react-i18next";

const ModalNav = ({ tabNav, setTabNav, isattachment }) => {
    
    const { t } = useTranslation( 'common');
    const [create] = usePermissionCheck(["create"], "attachment");
    return (
        <Nav className="nav-tabs" role="tablist">
            {!isattachment && <NavItem>
                <NavLink className={tabNav === 1 ? "active" : ""} onClick={() => setTabNav(1)}>{t("select_file")} </NavLink>
            </NavItem>}
            {create && <NavItem className="nav-item">
                <NavLink className={tabNav === 2 ? "active" : ""} onClick={() => setTabNav(2)}>{t("upload_new")}</NavLink>
            </NavItem>
            }
        </Nav>
    )
}

export default ModalNav