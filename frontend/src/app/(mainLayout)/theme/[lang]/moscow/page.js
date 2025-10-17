"use client";
import HomePage7 from "@/components/homePages/homePage7";
import LanguageContext from "@/helper/languageContext";
import { useParams } from "next/navigation";
import { useContext, useEffect } from "react";

const ThemeSeven = () => {
  const params = useParams();
  const { setFormLanguage } = useContext(LanguageContext);

  const { lang } = params;

  useEffect(() => {
    if (lang) {
      setFormLanguage(lang);
    }
  }, [lang, setFormLanguage]);

  return <HomePage7 title={"theme_moscow_settings"} />;
};

export default ThemeSeven;
