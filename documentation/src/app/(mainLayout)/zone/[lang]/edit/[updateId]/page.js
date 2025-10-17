'use client'
import ZoneForm from "@/components/zone/ZoneForm";
import LanguageContext from "@/helper/languageContext";
import { ZoneApi } from "@/utils/axiosUtils/API";
import FormWrapper from "@/utils/hoc/FormWrapper";
import useUpdate from "@/utils/hooks/useUpdate";
import { useParams } from "next/navigation";
import React, { useContext, useEffect } from "react";

const ZoneUpdate = () => {
  const params = useParams();
  const { setFormLanguage } = useContext(LanguageContext);
  const { lang, updateId } = params;

  useEffect(() => {
    if (lang) {
      setFormLanguage(lang);
    }
  }, [lang, setFormLanguage]);

  const { mutate, isLoading } = useUpdate(ZoneApi, updateId, "/zone", "Zone Updated Successfully");
  return (
    updateId && (
      <FormWrapper title="edit_zone" lang={lang}>
        <ZoneForm
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
export default ZoneUpdate;
