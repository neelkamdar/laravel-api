"use client";
import AttributeForm from "@/components/attribute/AttributeForm";
import LanguageContext from "@/helper/languageContext";
import { attribute } from "@/utils/axiosUtils/API";
import FormWrapper from "@/utils/hoc/FormWrapper";
import useUpdate from "@/utils/hooks/useUpdate";
import { useParams } from "next/navigation";
import { useContext, useEffect } from "react";

const UpdateAttributes = () => {
  const params = useParams();
  const { lang, updateId } = params;
  const { setFormLanguage } = useContext(LanguageContext);

  useEffect(() => {
    if (lang) {
      setFormLanguage(lang);
    }
  }, [lang, setFormLanguage]);

  const { mutate, isLoading } = useUpdate(attribute, updateId, `/attribute`, "Attribute Updated Successfully");
  return (
    updateId && (
      <FormWrapper title="edit_attribute" lang={lang}>
        <AttributeForm
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

export default UpdateAttributes;
