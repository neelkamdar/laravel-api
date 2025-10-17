import React, { useContext } from 'react';
import ThemeOptionContext from '@/helper/themeOptionsContext';

import { useTranslation } from "react-i18next";
import { RiCustomerServiceLine, RiPhoneLine } from 'react-icons/ri';

const HeaderContactUs = () => {
  const { themeOption } = useContext(ThemeOptionContext);

  const { t } = useTranslation('common');
  return (
    <>
      {themeOption?.header?.support_number &&
        <li className='right-side'>

          <a className='delivery-login-box'>
            <div className='delivery-icon'>
              <RiCustomerServiceLine />
            </div>
            <div className='delivery-detail'>
              <h6>{t('24/7Delivery')}</h6>
              <h5>{themeOption?.header?.support_number}</h5>
            </div>
          </a>
        </li>
      }
    </>
  );
};

export default HeaderContactUs;
