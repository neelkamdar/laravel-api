import React, { useContext, useEffect } from "react";
import { AllLanguageApi } from "../../utils/axiosUtils/API";
import { useQuery } from "@tanstack/react-query";
import request from "@/utils/axiosUtils";
import LanguageContext from "@/helper/languageContext";
import { RiArrowRightUpLine } from "react-icons/ri";
import { useTranslation } from "react-i18next";

const LanguageRedirection = ({ id, theme, path, language }) => {
  const { setFormLanguage, localLanguage } = useContext(LanguageContext);
  const { t } = useTranslation("common");

  const { data } = useQuery({ queryKey: [AllLanguageApi],
    queryFn: () => request({ url: AllLanguageApi }),
      enabled: true,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      select: (res) => res.data.data,
    }
  );
  const handleLanguageChangeAndRedirect = (locale, itemPath) => {

    const contextData = JSON.parse(window.localStorage.getItem("languageContext")) || {};
    contextData.formLanguage = locale;
    window.localStorage.setItem("languageContext", JSON.stringify(contextData));

    window.open(itemPath, "_blank");
  };

  useEffect(() => {
    return () => {
      setFormLanguage(localLanguage)
    };
  }, []);


  return (
    <div>
      <div className="language-list-box">
        <h5>{t("edit_in_more_language")} :</h5>
        <ul className="language-list">
          {data?.map((item) => {
            const itemPath = theme
              ? `${theme}/${item.locale}/${path}`
              : `${path}/${item.locale}/edit/${id}`;
            return ( item.status === 1 &&
              <li key={item.id}>
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    handleLanguageChangeAndRedirect(item.locale, itemPath);
                  }}
                  className={language ===item.locale ? "active" : ""}
                >
                  {item.name}

                  <RiArrowRightUpLine />
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
export default LanguageRedirection;
