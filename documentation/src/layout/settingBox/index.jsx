import Btn from "@/elements/buttons/Btn";
import ThemeOptionContext from "@/helper/themeOptionsContext";
import { usePathname, useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { RiCloseLine, RiSettings3Fill } from "react-icons/ri";
import { Form, Input, Label } from "reactstrap";
import { queryColors } from "../../data/LayoutData";

const LOCAL_STORAGE_KEYS = {
  color: "theme_color",
  mode: "theme_mode",
  dir: "theme_direction",
};

const SettingBox = () => {
  const { themeOption } = useContext(ThemeOptionContext);
  const { t } = useTranslation("common");
  const [openSetting, setOpenSetting] = useState(false);

  // Initialize from localStorage or fallback to context/defaults
  const [rtlValue, setRtlValue] = useState(
    localStorage.getItem(LOCAL_STORAGE_KEYS.dir) ||
      themeOption?.general?.language_direction ||
      "ltr"
  );
  const [lightDarkMode, setLightDarkMode] = useState(
    localStorage.getItem(LOCAL_STORAGE_KEYS.mode) ||
      themeOption?.general?.mode ||
      "light"
  );
  const [themeColor, setThemeColor] = useState(
    localStorage.getItem(LOCAL_STORAGE_KEYS.color) ||
      themeOption?.general?.primary_color ||
      "#0da487"
  );

  const path = useSearchParams();
  const theme = path.get("theme");
  const pathName = usePathname();

  // Apply themeColor from query or saved value
  useEffect(() => {
    const color =
      queryColors[theme] ||
      localStorage.getItem(LOCAL_STORAGE_KEYS.color) ||
      themeOption?.general?.primary_color;
    setThemeColor(color);
    document.documentElement.style.setProperty("--theme-color", color);
  }, [pathName, path, themeOption?.general?.primary_color]);

  // Apply light/dark mode and RTL on mount/update
  useEffect(() => {
    const mode =
      localStorage.getItem(LOCAL_STORAGE_KEYS.mode) ||
      themeOption?.general?.mode;
    const dir =
      localStorage.getItem(LOCAL_STORAGE_KEYS.dir) ||
      themeOption?.general?.language_direction;

    if (mode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    document.body.setAttribute("dir", dir || "ltr");
  }, [pathName]);

  // Set RTL & persist
  const handleRtl = (value) => {
    setRtlValue(value);
    localStorage.setItem(LOCAL_STORAGE_KEYS.dir, value);
    document.body.setAttribute("dir", value);
  };

  // Set light/dark mode & persist
  const handleLightDarkMode = (value) => {
    setLightDarkMode(value);
    localStorage.setItem(LOCAL_STORAGE_KEYS.mode, value);
    if (value === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // Set theme color & persist
  const handleColorChange = (event) => {
    const { value } = event.target;
    setThemeColor(value);
    localStorage.setItem(LOCAL_STORAGE_KEYS.color, value);
    document.documentElement.style.setProperty("--theme-color", value);
  };
  return (
    <div className="setting-box">
      <Btn className="btn setting-button theme-bg-color text-white" onClick={() => setOpenSetting((prev) => !prev)}>
        {openSetting ? <RiCloseLine /> : <RiSettings3Fill />}
      </Btn>
      <div className={`theme-setting-2 ${openSetting ? "active" : ""}`}>
        <div className="theme-box">
          <ul>
            <li>
              <div className="setting-name">
                <h4>{t("color")}</h4>
              </div>
              <div className="theme-setting-button color-picker">
                <Form className="form-control">
                  <Label htmlFor="colorPick" className="form-label mb-0">{t("ThemeColor")}</Label>
                  <Input type="color" className="form-control-color" title="Choose your color" onChange={handleColorChange} value={themeColor}/>
                </Form>
              </div>
            </li>
            <li>
              <div className="setting-name">
                <h4>{t("dark")}</h4>
              </div>
              <div className="theme-setting-button">
                <Btn className={`btn-2 ${lightDarkMode === "dark" ? "unline" : "outline"}`} onClick={() => handleLightDarkMode("dark")}>{t("dark")}</Btn>
                <Btn className={`btn-2 ${ lightDarkMode === "light" ? "unline" : "outline"}`} onClick={() => handleLightDarkMode("light")}>{t("light")}</Btn>
              </div>
            </li>
            <li>
              <div className="setting-name">
                <h4>{t("rtl")}</h4>
              </div>
              <div className="theme-setting-button rtl">
                <Btn className={`btn btn-2 ${ rtlValue === "rtl" ? "rtl-unline" : "rtl-outline"}`} onClick={() => handleRtl("rtl")}>{t("rtl")}</Btn>
                <Btn className={`btn btn-2 ${ rtlValue === "ltr" ? "rtl-unline" : "rtl-outline" }`} onClick={() => handleRtl("ltr")}>{t("ltr")}</Btn>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SettingBox;
