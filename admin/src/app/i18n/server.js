import acceptLanguage from "accept-language";
import { createInstance } from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { cookies as getCookies, headers as getHeaders } from "next/headers";
import { cache } from "react";
import { initReactI18next } from "react-i18next/initReactI18next";
import "server-only";
import { fallbackLng, getOptions, languages } from "./settings";
import request from "@/utils/axiosUtils";

// Helper function to load translations dynamically
const loadResources = async (language, namespace) => {
  try {
    const response = await request({ url: `${process.env.URL}/translation/front` }, false);
    return response.data;
  } catch (error) {
    console.error("Error loading translations:", error);
    return null;
  }
};

const initServerI18next = async (language, ns) => {
  const i18nInstance = createInstance();
  await i18nInstance
    .use(initReactI18next)
    .use(resourcesToBackend((language, ns) => loadResources(language, ns)))
    .init({...getOptions(language, ns), debug:false});
  return i18nInstance;
};

acceptLanguage.languages(languages);

const cookieName = "i18next";

export async function detectLanguage() {
  const cookies = await getCookies();
  const headers = await getHeaders();

  let language;
  if (!language && cookies.has(cookieName)) {
    language = acceptLanguage.get(cookies.get(cookieName)?.value);
  }
  if (!language) {
    language = acceptLanguage.get(headers.get("Accept-Lang"));
  }
  if (!language) {
    language = fallbackLng;
  }
  return language;
}

export const getServerTranslations = cache(async (ns, options = {}) => {
  const language = await detectLanguage();
  const i18nextInstance = await initServerI18next(language, ns);
  return {
    t: i18nextInstance.getFixedT(language, Array.isArray(ns) ? ns[0] : ns, options.keyPrefix),
    i18n: i18nextInstance,
  };
});
