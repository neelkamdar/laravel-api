"use client";
import CairoHomePage from "@/components/homePages/cairoHomePage";
import LanguageContext from "@/helper/languageContext";
import { useParams } from "next/navigation";
import React, { useContext, useEffect } from "react";

const cairoPage = () => {
  const params = useParams();
  const { setFormLanguage } = useContext(LanguageContext);
  const { lang } = params;

  useEffect(() => {
    if (lang) {
      setFormLanguage(lang);
    }
  }, [lang, setFormLanguage]);

  return <CairoHomePage title={"theme_cairo_settings"} />;
};

export default cairoPage;
