import ThemeOptionContext from '@/helper/themeOptionsContext';
import TabFocusChecker from '@/utils/customFunctions/TabFocus';
import Cookies from 'js-cookie';
import { usePathname, useSearchParams } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { queryColors } from '../data/LayoutData';
import CookiesComponent from './cookies';
import ExitModal from './exitModal';
import MainFooter from './footer';
import MainHeader from './header';
import MobileMenu from './mobileMenu';
import NewsLetterModal from './newsLetter/NewsLetterModal';
import RecentPurchase from './recentPurchase';
import StickyCompare from './StickyCompare';
import TapTop from './tapTop';
import SettingContext from '@/helper/settingContext';
 
const SubLayout = ({ children }) => {
  const isTabActive = TabFocusChecker();
  const { settingData } = useContext(SettingContext);
  const isNewsLetter = Cookies.get('newsLetterModal');
  const { themeOption } = useContext(ThemeOptionContext);
  const [productBox, setProductBox] = useState("")
  const path = useSearchParams()
  const theme = path.get('theme')
  const pathName = usePathname();

  useEffect(() => {
    if (queryColors[theme]) {
      document.body.classList.add("home")
      document.documentElement.style.setProperty('--theme-color', queryColors[theme]);
    }else{
      document.body.classList.remove("home")
      document.documentElement.style.setProperty('--theme-color', themeOption?.general?.primary_color ?? '#0da487');
      document.documentElement.style.setProperty('--theme-color2', themeOption?.general?.secondary_color ?? '#dc2430');
    }
  }, [pathName ,path ,themeOption?.general?.primary_color ,themeOption?.general?.secondary_color])

  useEffect(()=>{
    if(theme == 'paris' || theme == 'tokyo') {
      setProductBox('basic')
    } else if (theme == 'osaka' || theme == 'rome'){
      setProductBox('classic')
    } else if(theme == 'berlin' || theme == 'denver') {
      setProductBox('standard')
    } else if(theme == 'cairo') {
      setProductBox('digital')
    } else if(theme == 'madrid' || theme == 'moscow') {
      setProductBox('premium')
    }else {
      // document.documentElement.style.setProperty('--theme-color', '#7b4397');
    }
  },[theme,productBox])

  useEffect(() => {
    const message = themeOption?.general?.taglines;
    let timer;

    const updateTitle = (index) => {
      document.title = message[index];
      timer = setTimeout(() => {
        const nextIndex = (index + 1) % message.length;
        updateTitle(nextIndex);
      }, 500);
    };

    if (!isTabActive && themeOption?.general?.exit_tagline_enable) {
      updateTitle(0);
    } else {
      let value =
        themeOption?.general?.site_title && themeOption?.general?.site_tagline
          ? `${themeOption?.general?.site_title} | ${themeOption?.general?.site_tagline}`
          : 'FastKart Marketplace: Where Vendors Shine Together';
      document.title = value;
      clearTimeout(timer);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [isTabActive, themeOption]);

  return (
    <>
      <MainHeader />
      <MobileMenu />
      {children}
      <TapTop />
      <MainFooter />
      <CookiesComponent />
      <StickyCompare />
      <RecentPurchase />
      {themeOption?.popup?.news_letter?.is_enable &&  !isNewsLetter && <NewsLetterModal  dataApi={themeOption?.popup?.news_letter} headerLogo={themeOption?.logo?.header_logo?.original_url} />}
      {themeOption?.popup?.exit?.is_enable &&   <ExitModal dataApi={themeOption?.popup?.exit} headerLogo={themeOption?.logo?.header_logo?.original_url} />}
    </>
  );  
};

export default SubLayout;
