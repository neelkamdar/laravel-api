"use client";
import TagForm from "@/components/tag/TagForm";
import LanguageContext from "@/helper/languageContext";
import { tag } from "@/utils/axiosUtils/API";
import FormWrapper from "@/utils/hoc/FormWrapper";
import useUpdate from "@/utils/hooks/useUpdate";
import { useParams } from "next/navigation";
import { useContext, useEffect } from "react";

const RoleUpdate = () => {
  const params = useParams();
  const { setFormLanguage } = useContext(LanguageContext);
  const { lang, updateId } = params;

  useEffect(() => {
    if (lang) {
      setFormLanguage(lang);
    }
  }, [lang, setFormLanguage]);

  const { mutate, isLoading } = useUpdate(tag, updateId, `/tag`, "Tag Updated Successfully");
  return (
    updateId && (
      <FormWrapper title="edit_tag" lang={lang}>
        <TagForm
          mutate={mutate}
          updateId={updateId}
          loading={isLoading}
          type={"product"}
          buttonName="update"
          language={lang}
        />
      </FormWrapper>
    )
  );
};

export default RoleUpdate;
