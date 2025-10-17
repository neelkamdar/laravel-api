"use client";
import HomePageOneForm from "@/components/homePages/homePage1";
import LanguageContext from "@/helper/languageContext";
import { useParams } from "next/navigation";
import { useContext, useEffect } from "react";

const ThemeOne = () => {
  const params = useParams();
  const { setFormLanguage } = useContext(LanguageContext);
  const { lang } = params;

  useEffect(() => {
    if (lang) {
      setFormLanguage(lang);
    }
  }, [lang, setFormLanguage]);

  return <HomePageOneForm title={"theme_paris_settings"} buttonName="save" />;
};

export default ThemeOne;
