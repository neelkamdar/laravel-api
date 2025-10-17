import Avatar from '@/components/common/Avatar';
import ConfirmationModal from '@/components/common/ConfirmationModal';
import AccountContext from '@/helper/accountContext';
import { LogoutAPI } from '@/utils/axiosUtils/API';
import useCreate from '@/utils/hooks/useCreate';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react';
import { useTranslation } from "react-i18next";
import { RiLogoutBoxRLine, RiUserLine } from 'react-icons/ri';

const HeaderProfile = ({ extraClass }) => {

  const router = useRouter();
  const { accountData, setAccountData } = useContext(AccountContext);
  const [modal, setModal] = useState(false);
  const isAuthenticated = Cookies.get('uaf');
  const { t } = useTranslation('common');
  const { mutate, isLoading } = useCreate(LogoutAPI, false, false, 'No', () => {
    setAccountData();
    Cookies.remove('uaf');
    Cookies.remove('ue');
    Cookies.remove('account');
    Cookies.remove('CookieAccept');
    localStorage.removeItem('account');
    localStorage.removeItem('role');
    Cookies.remove("CallBackUrl") 
    router.push(`/`);
    setModal(false);
  });

  const handleLogout = () => {
    mutate({});
  };
  return (
    <li className='right-side onhover-dropdown'>
      <div className='delivery-login-box'>
        <div className={`delivery-icon ${extraClass ? extraClass : ""}`}>
          {accountData?.profile_image?.original_url ? (
            <Avatar data={accountData?.profile_image} customeClass='user-box me-2' customImageClass='img-fluid' />
          ) : accountData?.name ? (
            <div className='user-box'>
              <h3>{accountData?.name?.charAt(0)?.toString()?.toUpperCase()}</h3>
            </div>
          ) : (
            <RiUserLine />
          )}
        </div>
        <div className='delivery-detail'>
          <h6>
            {' '}
            {t('hi')}, {accountData?.name ?? t('guest')}
          </h6>
          <h5>{t('my_account')}</h5>
        </div>
      </div>

      <div className='onhover-div onhover-div-login'>
        <ul className='user-box-name'>
          {isAuthenticated ? (
            <>
              <li className='product-box-contain'>
                <Link href={`/account/dashboard`}>
                  <RiUserLine className='me-2' /> {t('my_account')}
                </Link>
              </li>
              <li className='product-box-contain' onClick={() => setModal(true)}>
                <a>
                  <RiLogoutBoxRLine className='me-2' /> {t('log_out')}
                </a>
              </li>
            </>
          ) : (
            <>
              <li className='product-box-contain'>
                <Link href={`/auth/login`}>{t('log_in')}</Link>
              </li>

              <li className='product-box-contain'>
                <Link href={`/auth/register`}>{t('register')}</Link>
              </li>
            </>
          )}
          <ConfirmationModal modal={modal} setModal={setModal} confirmFunction={handleLogout} isLoading={isLoading} />
        </ul>
      </div>
    </li>
  );
};

export default HeaderProfile;
