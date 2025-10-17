import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import Avatar from '@/components/common/Avatar';
import ThemeOptionContext from '@/helper/themeOptionsContext';
import { placeHolderImage } from '../../../data/CommonPath';
import { useSearchParams } from 'next/navigation';
import ParisLogo from '../../../../public/assets/images/logo/1.png';
import TokyoLogo from '../../../../public/assets/images/logo/2.png';
import RomeLogo from '../../../../public/assets/images/logo/3.png';
import MadridLogo from '../../../../public/assets/images/logo/4.png';
import CairoLogo from '../../../../public/assets/images/logo/7.png';
import SettingContext from '@/helper/settingContext';
import Image from 'next/image';

const FooterLogo = () => {
  const { themeOption } = useContext(ThemeOptionContext);
  const { settingData } = useContext(SettingContext);
  const [logoAbc, setLogo] = useState('');
  const path = useSearchParams()
  const theme = path.get('theme')
  useEffect(() => {
    let logo = themeOption?.logo?.footer_logo;
    if ((theme == `paris`) || (theme == `osaka`)) {
      logo = { original_url: ParisLogo };
    } else if (theme == `tokyo`) {
      logo = { original_url: TokyoLogo };
    } else if (theme == `rome`) {
      logo = { original_url: RomeLogo };
    } else if (theme == `madrid` || theme == `berlin` || theme == `denver` || theme == `moscow`) {
      logo = { original_url: MadridLogo };
    }
    else if (theme == `cairo`) {
      logo = { original_url: MadridLogo };
    } else {
      logo = themeOption?.logo?.footer_logo;
    }
    setLogo(logo);
  }, [theme, themeOption?.logo?.footer_logo]);
  return (
    <div className='theme-logo'>
      <Link href='/'>
        {logoAbc?.original_url ? (
          <Image src={logoAbc?.original_url} height={28} width={160} alt={`${settingData?.general?.site_name || ""}`} />
        ) : settingData?.general?.site_name &&
        <h2 className="f-w-600">
          {settingData?.general?.site_name ? settingData?.general?.site_name.split(' ')[0] : 'Logo Here'}
        </h2>}
      </Link>
    </div>
  );
};

export default FooterLogo;
