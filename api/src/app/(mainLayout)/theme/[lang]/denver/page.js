"use client";
import HomePageNineForm from "@/components/homePages/homePage9";
import LanguageContext from "@/helper/languageContext";
import { useParams } from "next/navigation";
import { useContext, useEffect } from "react";

const ThemeNine = () => {
  const params = useParams();
  const { setFormLanguage } = useContext(LanguageContext);

  const { lang } = params;

  useEffect(() => {
    if (lang) {
      setFormLanguage(lang);
    }
  }, [lang, setFormLanguage]);

  return <HomePageNineForm title={"theme_denver_settings"} />;
};
export default ThemeNine;
