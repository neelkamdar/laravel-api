"use client";
import HomePageSixForm from "@/components/homePages/homePage6";
import LanguageContext from "@/helper/languageContext";
import { useParams } from "next/navigation";
import { useContext, useEffect } from "react";

const ThemeSix = () => {
  const params = useParams();
  const { setFormLanguage } = useContext(LanguageContext);
  const { lang } = params;

  useEffect(() => {
    if (lang) {
      setFormLanguage(lang);
    }
  }, [lang, setFormLanguage]);

  return <HomePageSixForm title={"theme_berlin_settings"} />;
};

export default ThemeSix;
