"use client";
import TranslationForm from "@/components/language/translations";
import useCreate from "@/utils/hooks/useCreate";
import i18n from 'i18next';
import { useParams } from "next/navigation";
import { useState } from "react";

const TranslationContainer = () => {
  const params = useParams();
  const [page, setPage] = useState(1);
  const [resetKey, setResetKey] = useState(false);
  const [translationModule, setTranslationModule] = useState("");
  const languageId = params?.slug;
  const { mutate, isLoading } = useCreate(
    `/translation/${translationModule}`,
    false,
    false,
    "Language translation updated successfully",
    (resDta) => {
      if (resDta?.status == 200 || resDta?.status == 201) {
        setResetKey(true);
          i18n.reloadResources(i18n.language).then(() => {
          i18n.changeLanguage(i18n.language); // <- this triggers re-render of translated components
        });
      }
    },
    false,
    false,
    "put",
    { pagination: 1, page, paginate: 15 }
  );
  return <TranslationForm languageId={languageId} currentLang={params?.slug} isLoading={isLoading} setPage={setPage} page={page} setTranslationModule={setTranslationModule} translationModule={translationModule} values={resetKey} mutate={mutate} loading={isLoading} title={"AddProduct"} key={resetKey} buttonName="save" />;
};

export default TranslationContainer;
