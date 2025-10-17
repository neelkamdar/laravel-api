import Btn from '@/elements/buttons/Btn';
import AccountContext from '@/helper/accountContext';

import { useTranslation } from "react-i18next";
import { useContext } from 'react';

const ResponsiveMenuOpen = () => {
  const { mobileSideBar, setMobileSideBar } = useContext(AccountContext);
  
  const { t } = useTranslation( 'common');
  return <Btn className='btn left-dashboard-show btn-animation btn-md fw-bold d-block mb-4 d-lg-none' onClick={()=>setMobileSideBar(!mobileSideBar)}>{t('show_menu')}</Btn>;
};

export default ResponsiveMenuOpen;
