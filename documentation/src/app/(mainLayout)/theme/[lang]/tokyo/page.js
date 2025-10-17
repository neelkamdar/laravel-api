"use client";
import HomePageTwoForm from "@/components/homePages/homePage2";
import LanguageContext from "@/helper/languageContext";
import { useParams } from "next/navigation";
import { useContext, useEffect } from "react";

const ThemeTwo = () => {
  const params = useParams();
  const { setFormLanguage } = useContext(LanguageContext);
  const { lang } = params;

  useEffect(() => {
    if (lang) {
      setFormLanguage(lang);
    }
  }, [lang, setFormLanguage]);

  return <HomePageTwoForm title={"theme_tokyo_settings"} />;
};
export default ThemeTwo;
