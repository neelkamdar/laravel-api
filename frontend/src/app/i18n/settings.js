export const fallbackLng = "en";
export const languages = [fallbackLng, "ar", "fr", "es"];
export const defaultNS = "translation";

export function getOptions(localLanguage = fallbackLng, ns = defaultNS) {
  return {
    supportedLngs: languages,
    fallbackLng,
    lng: localLanguage, // Use the localLanguage as the default
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  };
}
