"use client";
import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import resourcesToBackend from "i18next-resources-to-backend";
import React, { useEffect, useMemo, useState } from "react";
import { I18nextProvider as Provider, initReactI18next } from "react-i18next";

import { getOptions } from "./settings";
import request from "@/utils/axiosUtils";

const loadResources = async (language, namespace) => {

  try {
    const response = await request({url:`${process.env.URL}/translation/admin`}, false);
    return response.data;
  } catch (error) {
    console.error("Error loading translations:", error);
    return {};
  }
};

// Initialize i18next
i18next
  .use(initReactI18next) // Initialize with react-i18next
  .use(LanguageDetector) // Detect the user's language
  .use(resourcesToBackend((language, namespace) => loadResources(language, namespace)))
  .init({
    ...getOptions(),
    detection: {
      caches: ["cookie"], // Store detected language in a cookie
    },
    debug: false, // Debugging flag
    interpolation: {
      escapeValue: false, // React already escapes by default
    },
  });

export function I18nProvider({ children, language }) {
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const loadTranslations = async () => {
      try {
        // Fetch translations explicitly to ensure success before rendering children
        await loadResources(language, "admin");
        setIsLoaded(true);
      } catch (error) {
        console.error("Failed to load translations");
        setIsLoaded(false);
      }
    };

    loadTranslations();
  }, [language]);

useEffect(() => {
    if (i18next.language !== language) {
      i18next.changeLanguage(language);
    }
  }, [language]);

  if (!isLoaded) {
    return ( 
      <div className='loader-wrapper'>
        <div>
          <div className="loader" />
        </div>
      </div>
    );
  }

  return <Provider i18n={i18next}>{children}</Provider>;
}
