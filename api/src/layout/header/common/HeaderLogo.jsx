'use client';
import Btn from '@/elements/buttons/Btn';
import ThemeOptionContext from '@/helper/themeOptionsContext';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { RiAlignLeft, RiMenuLine } from 'react-icons/ri';
import { default as ParisLogo, default as logoImage } from '../../../../public/assets/images/logo/1.png';
import TokyoLogo from '../../../../public/assets/images/logo/2.png';
import RomeLogo from '../../../../public/assets/images/logo/3.png';
import MadridLogo from '../../../../public/assets/images/logo/4.png';
import OtherLogo from '../../../../public/assets/images/logo/6.png';
import CairoLogo from '../../../../public/assets/images/logo/7.png';
import SettingContext from '@/helper/settingContext';
import Image from 'next/image';

const HeaderLogo = ({extraClass}) => {
  const [logo, setLogo] = useState('');
  const { settingData } = useContext(SettingContext);
  const { themeOption, mobileSideBar, setMobileSideBar } = useContext(ThemeOptionContext);
  const path = useSearchParams()
  const theme = path.get('theme')

  useEffect(() => {
    let logo = themeOption?.logo?.header_logo;
    if (theme == `paris`) {
      logo = { original_url: ParisLogo };
    } else if (theme == `tokyo`) {
      logo = { original_url: TokyoLogo };
    } else if (theme == `rome`) {
      logo = { original_url: RomeLogo };
    } else if (theme == `madrid`) {
      logo = { original_url: MadridLogo };
    }
    else if (theme == `cairo`) {
      logo = { original_url: CairoLogo };
    } else if (theme == `berlin` || theme == `denver` || theme == `moscow`) {
      logo = { original_url: OtherLogo };
    } else {
      logo = themeOption?.logo?.header_logo;
    }
    setLogo(logo);
  }, [theme, themeOption?.logo?.header_logo]);

  return (
    <>
      <Btn className='navbar-toggler d-xl-none d-inline navbar-menu-button me-2' type='button'>
        <span className='navbar-toggler-icon' onClick={() => setMobileSideBar(!mobileSideBar)}>
          <RiAlignLeft className='f-w-600 me-md-3' />
        </span>
      </Btn>
      <Link href='/' className={`web-logo ${extraClass? extraClass :""}`}>
        {logo?.original_url ? (
          <Image src={logo?.original_url} height={28} width={160} alt={`${settingData?.general?.site_name || ""}`} />
        ) : settingData?.general?.site_name &&
        <h2 className="f-w-600">
          {settingData?.general?.site_name ? settingData?.general?.site_name.split(' ')[0] : 'Logo Here'}
        </h2>}
      </Link>
    </>
  );
};

export default HeaderLogo;
