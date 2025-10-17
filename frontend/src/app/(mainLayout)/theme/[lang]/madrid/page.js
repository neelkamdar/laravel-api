"use client";
import HomePageFiveForm from "@/components/homePages/homePage5";
import LanguageContext from "@/helper/languageContext";
import { useParams } from "next/navigation";
import { useContext, useEffect } from "react";

const ThemeFive = () => {
  const params = useParams();
  const { setFormLanguage } = useContext(LanguageContext);

  const { lang } = params;

  useEffect(() => {
    if (lang) {
      setFormLanguage(lang);
    }
  }, [lang, setFormLanguage]);

  return <HomePageFiveForm title={"theme_madrid_settings"} />;
};

export default ThemeFive;
