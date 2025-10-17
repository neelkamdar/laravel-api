"use client";
import PublicationForm from "@/components/publication/PublicationForm";
import LanguageContext from "@/helper/languageContext";
import { PublicationApi } from "@/utils/axiosUtils/API";
import FormWrapper from "@/utils/hoc/FormWrapper";
import useUpdate from "@/utils/hooks/useUpdate";
import { useParams } from "next/navigation";
import { useContext, useEffect } from "react";

const UpdatePublication = () => {
  const params = useParams();
  const { lang, updateId } = params;
  const { setFormLanguage } = useContext(LanguageContext);

  useEffect(() => {
    if (lang) {
      setFormLanguage(lang);
    }
  }, [lang, setFormLanguage]);

  const { mutate, isLoading } = useUpdate(PublicationApi, updateId, `/publication`, "Publication Updated Successfully");
  return (
    updateId && (
      <FormWrapper title="edit_publication" lang={lang}>
        <PublicationForm
          mutate={mutate}
          updateId={updateId}
          loading={isLoading}
          buttonName="update"
          language={lang}
        />
      </FormWrapper>
    )
  );
};

export default UpdatePublication;