'use client'
import StoreForm from "@/components/store/StoreForm";
import LanguageContext from "@/helper/languageContext";
import { store } from "@/utils/axiosUtils/API";
import FormWrapper from "@/utils/hoc/FormWrapper";
import useCreate from "@/utils/hooks/useCreate";
import { useParams } from "next/navigation";
import { useContext, useEffect } from "react";

const StoreUpdate = () => {
  const params = useParams();
  const { lang, updateId } = params;
  const { setFormLanguage } = useContext(LanguageContext);

  useEffect(() => {
    if (lang) {
      setFormLanguage(lang);
    }
  }, [lang, setFormLanguage]);

  const { mutate, isLoading } = useCreate(store, updateId, "/store", "Store Updated Successfully");
  return (
    updateId && (
      <FormWrapper title="edit_store" lang={lang}>
        <StoreForm mutate={mutate} updateId={updateId} loading={isLoading} buttonName="update" language={lang} />
      </FormWrapper>
    )
  );
};

export default StoreUpdate;
