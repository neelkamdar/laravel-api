import React, { useContext } from 'react';
import ThemeOptionContext from '@/helper/themeOptionsContext';
import { useTranslation } from "react-i18next";
import supportImage from '../../../../public/assets/images/icon/support.png';
import Image from 'next/image';

const SupportBox = () => {
  const { themeOption } = useContext(ThemeOptionContext);
  const { t } = useTranslation('common');
  return (
    <div className='rightside-menu support-sidemenu'>
        {themeOption?.header?.support_number &&
      <div className='support-box'>
        <div className='support-image'>
          {supportImage && <Image src={supportImage} className='img-fluid' alt='support image' height={33} width={33} />}
        </div>
        <div className='support-number'>
        
            <>
              <h2> {themeOption?.header?.support_number}</h2>
              <h4>{t('24_7_support_center')}</h4>
            </>
         
        </div>
      </div>
       }
    </div >
  );
};

export default SupportBox;
