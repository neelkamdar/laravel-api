import LanguageContext from "@/helper/languageContext";
import request from "@/utils/axiosUtils";
import { AllLanguageApi } from "@/utils/axiosUtils/API";
import useOutsideDropdown from "@/utils/hooks/customHooks/useOutsideDropdown";
import { useQuery } from "@tanstack/react-query";
import i18next from "i18next";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { RiTranslate2 } from "react-icons/ri";

const Language = () => {
  const { ref, isComponentVisible, setIsComponentVisible } = useOutsideDropdown(false);
  const { i18n } = useTranslation("common");
  const currentLanguage = i18n.resolvedLanguage;
  const { setLocalLanguage, setFormLanguage } = useContext(LanguageContext);
  const { localLanguage } = useContext(LanguageContext);
  const selectedLang = useMemo(() => ({ lang: localLanguage || i18n.language }), [localLanguage, i18n.language]);

  const router = useRouter();
  
  // To change Language
  const handleChangeLang = (value) => {
    setLocalLanguage(value.lang);
    setFormLanguage(value.lang);
    i18next.changeLanguage(value.lang);
    Cookies.set("i18next", value.lang);
    window.localStorage.setItem("selectedLanguage", value.lang);
    router.refresh();
  };

  const { data } = useQuery({ queryKey: ["newLang"], queryFn: () => request({ url: AllLanguageApi }), enabled: true,
    refetchOnWindowFocus: false,
    refetchOnMount: false, select: (res) => res.data.data });

    const langData = data
    ?.filter((item) => item.status === 1) // ✅ filter active languages
    .map((item) => ({
      LanguageName: item.name,
      lang: item.locale,
      icon: item.flag,
    }));  

  useEffect(() => {
    if (data?.length) {
      const activeLanguages = data.filter((item) => item.status === 1);
      const availableLocales = activeLanguages.map((item) => item.locale);

      // If current localLanguage is not in available list
      if (!availableLocales.includes(localLanguage)) {
        const fallbackLang = activeLanguages.find((item) => item.system_reserve === 1)?.locale || "en";

        setLocalLanguage(fallbackLang);
        setFormLanguage(fallbackLang);
        i18next.changeLanguage(fallbackLang);
        Cookies.set("i18next", fallbackLang);
        localStorage.setItem("selectedLanguage", fallbackLang);

        // Update stored language context as well
        const contextData = JSON.parse(localStorage.getItem("languageContext")) || {};
        contextData.localLanguage = fallbackLang;
        contextData.formLanguage = fallbackLang;
        localStorage.setItem("languageContext", JSON.stringify(contextData));
      }
    }
  }, [data]);

  return (
    <li className="profile-nav onhover-dropdown">
      <div className="language-box">
        <RiTranslate2 onClick={() => setIsComponentVisible((prev) => (prev !== "language" ? "language" : ""))} />
      </div>
      <ul ref={ref} className={`language-dropdown profile-dropdown onhover-show-div ${isComponentVisible == "language" ? "active" : ""}`}>
        {langData?.map((data, i) => {
          return (
            <li key={i} onClick={() => handleChangeLang(data)} className={`${selectedLang?.lang == data.lang ? "active" : ""}`}>
              <a>
                {data.LanguageName}
              </a>
            </li>
          );
        })}
      </ul>
    </li>
  );
};

export default Language;
