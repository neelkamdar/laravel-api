import Btn from '@/elements/buttons/Btn';

import { useTranslation } from "react-i18next";
import Cookies from 'js-cookie';
import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';
import CookiesImage from '../../../public/assets/images/cookie-bar.png';

const CookiesComponent = () => {
  
  const { t } = useTranslation( 'common');
  const [checkCookies, setCheckCookies] = useState(true);
  useEffect(() => {
    const cookieAccept = Cookies.get('CookieAccept');
    if (cookieAccept) {
      setCheckCookies(JSON.parse(cookieAccept));
    } else {
      setCheckCookies(false);
    }
  }, []);
  const handleCookie = () => {
    Cookies.set('CookieAccept', JSON.stringify(true));
    setCheckCookies(true);
  };
  return (
    <div className={`cookie-bar-box ${checkCookies ? 'd-none' : ''}`}>
      <div className='cookie-box'>
        <div className='cookie-image'>
         {CookiesImage && <Image height={22} width={22} src={CookiesImage} alt='cookie' />}
          <h2>{t('cookies')} </h2>
        </div>
        <div className='cookie-contain'>
          <h5 className='text-content'>{t('we_use_cookies_to_make_your_experience_better')}</h5>
        </div>
      </div>
      <div className='button-group'>
        <Btn className='privacy-button' title='privacy_policy' />
        <Btn className='ok-button' title='ok' onClick={handleCookie} />
      </div>
    </div>
  );
};

export default CookiesComponent;
