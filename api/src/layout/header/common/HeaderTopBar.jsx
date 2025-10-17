import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Col, Row } from "reactstrap";
import TopbarLeft from "./TopbarLeft";
import TopbarSlider from "./TopbarSlider";
import TopLanguage from "./TopLanguage";
import HeaderCurrency from "./HeaderCurrency";
import ThemeOptionContext from "@/helper/themeOptionsContext";
import { usePathname, useSearchParams } from "next/navigation";
import ZoneBar from "./ZoneBar";
import SettingContext from "@/helper/settingContext";
import { RiFocus3Line } from "react-icons/ri";
import ZoneContext from "@/helper/zoneContext";

const HeaderTopBar = () => {
  const { themeOption } = useContext(ThemeOptionContext);
  const { settingData } = useContext(SettingContext);

  const addClass = useRef(null);
  const pathName = useSearchParams();
  const theme = pathName.get("theme");
  useEffect(() => {
    if (theme == `tokyo`) {
      addClass.current?.classList.add("bg-dark");
    }

    return () => {
      addClass.current?.classList.remove("bg-dark");
    };
  }, [theme]);
  return (
    <div
      className={`header-top  ${themeOption?.header?.page_top_bar_dark ? " bg-dark" : ""
        }`}
      ref={addClass}
    >
      <div className="container-fluid-lg">
        <Row>
          <TopbarLeft themeOption={themeOption} />
          <TopbarSlider />
          <Col lg={3}>
            <ul className="about-list right-nav-about">
              {settingData?.activation?.zone_enable && (
                  <ZoneBar/>
              )}
              <li className="right-nav-list">
                <TopLanguage />
              </li>
              <li className="right-nav-list">
                <HeaderCurrency />
              </li>
            </ul>
          </Col>
        </Row>
      </div>
    </div>
  );
};
export default HeaderTopBar;
