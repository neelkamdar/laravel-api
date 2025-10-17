
import AccountContext from '@/helper/accountContext';
import { LogoutAPI } from '@/utils/axiosUtils/API';
import useCreate from '@/utils/hooks/useCreate';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react';
import { useTranslation } from "react-i18next";
import { RiLogoutBoxLine } from 'react-icons/ri';
import { Nav, NavItem, NavLink } from 'reactstrap';
import ConfirmationModal from './ConfirmationModal';

const NavTabTitles = ({ classes = {}, activeTab, setActiveTab, titleList, isLogout, callBackFun ,notification }) => {
  const router = useRouter();
  const [modal, setModal] = useState(false);
  const { setAccountData } = useContext(AccountContext);
  const { t } = useTranslation('common');
  const checkType = (value, index) => {
    if (typeof activeTab == 'object') {
      return activeTab.id == value.id;
    } else {
      return activeTab == String(index + 1);
    }
  };
  const { mutate, isLoading } = useCreate(LogoutAPI, false, false, 'No', () => {
    setAccountData();
    Cookies.remove('uaf', { path: '/' });
    Cookies.remove('ue');
    Cookies.remove('account');
    Cookies.remove('CookieAccept');
    Cookies.remove("CallBackUrl")
    localStorage.clear()
    router.push(`/`);
    setModal(false);
  });
  const handleLogout = () => {
    mutate({});
  };

  const onNavClick = (elem, i) => {
    setActiveTab((prev) => (typeof prev == 'object' ? elem : String(i + 1)));
    elem.path && router.push(`${elem.path}`);
    callBackFun && callBackFun();
  };
  return (
    <>
      <Nav className={classes?.navClass}>
        {titleList.map((elem, i) => (
          <NavItem key={i}>
            <NavLink className={checkType(elem, i) ? 'active' : ''} onClick={() => onNavClick(elem, i)}>
              {elem.icon && elem.icon}
              {t(elem?.title) || t(elem?.name)}
              {elem.notification && notification > 0 &&  <span className="notification-count" >{notification}</span>}
            </NavLink>
          </NavItem>
        ))}
        {isLogout && (
          <NavItem className='logout-cls'>
            <a className='btn' onClick={() => setModal(true)}>
              <RiLogoutBoxLine className='me-2' />
              {t('log_out')}
            </a>
          </NavItem>
        )}
      </Nav>
      <ConfirmationModal modal={modal} setModal={setModal} confirmFunction={handleLogout} isLoading={isLoading} />
    </>
  );
};

export default NavTabTitles;
