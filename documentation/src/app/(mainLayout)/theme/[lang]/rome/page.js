"use client";
import HomePageFourForm from "@/components/homePages/homePage4";
import LanguageContext from "@/helper/languageContext";
import { useParams } from "next/navigation";
import { useContext, useEffect } from "react";

const ThemeFour = () => {
  const params = useParams();
  const { setFormLanguage } = useContext(LanguageContext);
  const { lang } = params;

  useEffect(() => {
    if (lang) {
      setFormLanguage(lang);
    }
  }, [lang, setFormLanguage]);

  return <HomePageFourForm title={"theme_rome_settings"} />;
};

export default ThemeFour;
