import acceptLanguage from "accept-language";
import { createInstance } from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { cookies as getCookies, headers as getHeaders } from "next/headers";
import { cache } from "react";
import { initReactI18next } from "react-i18next/initReactI18next";
import request from "@/utils/axiosUtils"; // Import AxiosUtils
import "server-only";
import {fallbackLng, getOptions, languages } from "./settings";

// Helper function to load translations dynamically
const loadResources = async (language, namespace) => {
  try {
    const response = await request({ url: `${process.env.URL}/translation/admin` }, false);
    return response.data;
  } catch (error) {
    console.error("Error loading translations:", error);
    return null;
  }
};

// Initialize i18next instance for server
const initServerI18next = async (language, ns) => {
  const i18nInstance = createInstance();
  await i18nInstance
    .use(initReactI18next) // Initialize with react-i18next
    .use(resourcesToBackend((language, ns) => loadResources(language, ns))) // Use API-based loader
    .init({...getOptions(language, ns),debug:false});
  return i18nInstance;
};

// Configure accepted languages
acceptLanguage.languages(languages);

const cookieName = "i18next";

// Function to detect user's preferred language
export async function detectLanguage() {
  const cookies = await getCookies();
  const headers = await getHeaders();

  let language;
  // Check for language in cookies
  if (!language && cookies.has(cookieName)) {
    language = acceptLanguage.get(cookies.get(cookieName)?.value);
  }
  // Check for language in headers
  if (!language) {
    language = acceptLanguage.get(headers.get("Accept-Lang"));
  }
  // Fallback to default language if none found
  if (!language) {
    language = fallbackLng;
  }
  return language;
}

// Server-side translations handler
export const getServerTranslations = cache(async (ns, options = {}) => {
  const language = await detectLanguage(); // Detect language
  const i18nextInstance = await initServerI18next(language, ns); // Initialize i18next
  return {
    t: i18nextInstance.getFixedT(language, Array.isArray(ns) ? ns[0] : ns, options.keyPrefix),
    i18n: i18nextInstance,
  };
});