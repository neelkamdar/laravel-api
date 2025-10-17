"use client";
import HomePageThreeForm from "@/components/homePages/homePage3";
import LanguageContext from "@/helper/languageContext";
import { useParams } from "next/navigation";
import { useContext, useEffect } from "react";

const ThemeThree = () => {
  const params = useParams();
  const { setFormLanguage } = useContext(LanguageContext);

  const { lang } = params;

  useEffect(() => {
    if (lang) {
      setFormLanguage(lang);
    }
  }, [lang, setFormLanguage]);

  return <HomePageThreeForm title={"theme_osaka_settings"} />;
};

export default ThemeThree;
