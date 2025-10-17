import { useContext, useEffect, useState } from "react";
import BasicFooter from "./basicFooter";
import SubscribeFooter from "./subscribeFooter";
import { useSearchParams } from "next/navigation";
import ThemeOptionContext from "@/helper/themeOptionsContext";

const MainFooter = () => {
  const [style, setStyle] = useState("")
  const path = useSearchParams()
  const theme = path.get('theme')
  const { themeOption } = useContext(ThemeOptionContext);
  useEffect(() => {
    if (theme) {
      if (theme == 'cairo') {
        setStyle('footer_subscribe')
      } else if (theme == 'paris' ||
        theme == 'tokyo' ||
        theme == 'rome' ||
        theme == 'osaka') {
        setStyle('basic_footer')
      } else if (theme == 'madrid' ||
        theme == 'berlin' ||
        theme == 'denver' ||
        theme == 'moscow') {
        setStyle('classic_footer')
      }
    } else {
      let defaultStyle = themeOption?.footer ? themeOption?.footer?.footer_style : 'basic_footer';
      setStyle(defaultStyle)
    }

  }, [theme,style,themeOption ,path])


  return (
    <>
      <footer className={`${ style == "footer_subscribe" ? '' : 'section-t-space'} ${style ==  "footer_subscribe" ? 'footer-section-2 footer-color-3 footer-section-4 section-t-space' : ''} ${style === 'classic_footer' ? "footer-section-2 footer-color-3":""}`}>
        {style == 'footer_subscribe' &&
          <SubscribeFooter />
        }
        {style == 'basic_footer' &&
          <BasicFooter />
        }
        {style == 'classic_footer' &&
          <BasicFooter />
        }
      </footer>

    </>
  );
};

export default MainFooter;
