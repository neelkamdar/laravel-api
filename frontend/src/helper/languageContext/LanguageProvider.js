"use client";
import { useState, useEffect } from "react";
import LanguageContext from ".";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";
import { fallbackLng, getOptions } from "@/app/i18n/settings";

const cookieName = "i18next";

const getLanguageContextFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    const storedData = localStorage.getItem("languageContext");
    return storedData ? JSON.parse(storedData) : {};
  }
  return {};
};
const LanguageProvider = ({ children, initialLanguage }) => {
  const { i18n } = useTranslation();
  const storedContext = getLanguageContextFromLocalStorage();
  const initialLocalLanguage = storedContext.localLanguage || initialLanguage || Cookies.get(cookieName) || fallbackLng;
  const initialFormLanguage = storedContext.formLanguage || "";
  
  const [localLanguage, setLocalLanguage] = useState(initialLocalLanguage);
  const [formLanguage, setFormLanguage] = useState(initialFormLanguage);

   // Helper to update and persist localStorage context
   const updateLanguageContext = (key, value) => {
    const currentContext = getLanguageContextFromLocalStorage();
    currentContext[key] = value;
    localStorage.setItem("languageContext", JSON.stringify(currentContext));
  };

  const updateLocalLanguage = (language) => {
    setLocalLanguage(language);
    i18n.changeLanguage(language); // Update i18next language
    Cookies.set(cookieName, language); // Update the cookie
    updateLanguageContext("localLanguage", language);
  };

  const updateFormLanguage = (language) => {
    setFormLanguage(language);
    updateLanguageContext("formLanguage", language);
  };

  useEffect(() => {
    const options = getOptions(localLanguage);
    i18n.init(options);

  }, [localLanguage, i18n]);

  return (
    <LanguageContext.Provider
      value={{
        localLanguage,
        setLocalLanguage: updateLocalLanguage,
        formLanguage,
        setFormLanguage: updateFormLanguage,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;
