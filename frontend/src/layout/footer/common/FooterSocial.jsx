import React, { useContext } from 'react';
import ThemeOptionContext from '@/helper/themeOptionsContext';
import Link from 'next/link';
import { useTranslation } from "react-i18next";
import { RiFacebookFill, RiInstagramFill, RiPinterestFill, RiTwitterFill } from 'react-icons/ri';

const FooterSocial = () => {
  const { themeOption } = useContext(ThemeOptionContext);
  const { t } = useTranslation('common');
  return (
    <>
      {themeOption?.footer?.social_media_enable || themeOption?.footer?.facebook || themeOption?.footer?.twitter || themeOption?.footer?.instagram || themeOption?.footer?.pinterest ? (
        <div className='social-link'>
          <h6 className='text-content'>{t('stay_connected')}:</h6>
          <ul>
            {themeOption?.footer?.facebook && (
              <li>
                <Link href={themeOption?.footer?.facebook} target='_blank'>
                  <RiFacebookFill />
                </Link>
              </li>
            )}
            {themeOption?.footer?.twitter && (
              <li>
                <Link href={themeOption?.footer?.twitter} target='_blank'>
                  <RiTwitterFill />
                </Link>
              </li>
            )}
            {themeOption?.footer?.instagram && (
              <li>
                <Link href={themeOption?.footer?.instagram} target='_blank'>
                  <RiInstagramFill />
                </Link>
              </li>
            )}
            {themeOption?.footer?.pinterest && (
              <li>
                <Link href={themeOption?.footer?.pinterest} target='_blank'>
                  <RiPinterestFill />
                </Link>
              </li>
            )}
          </ul>
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default FooterSocial;
