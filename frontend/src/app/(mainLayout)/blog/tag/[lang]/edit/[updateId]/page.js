'use client'
import useUpdate from "@/utils/hooks/useUpdate";
import { blog, tag } from "@/utils/axiosUtils/API";
import TagForm from "@/components/tag/TagForm";
import FormWrapper from "@/utils/hoc/FormWrapper";
import { useContext, useEffect } from "react";
import LanguageContext from "@/helper/languageContext";
import { useParams } from "next/navigation";

const BlogTagUpdate = () => {
  const params = useParams();
  const { setFormLanguage } = useContext(LanguageContext);

  const { lang, updateId } = params;

  useEffect(() => {
    if (lang) {
      setFormLanguage(lang);
    }
  }, [lang, setFormLanguage]);

  const { mutate, isLoading } = useUpdate(tag, updateId, `${blog}${tag}`, "Blog Tag Updated Successfully");
  return (
    updateId && (
      <FormWrapper title="edit_tag" lang={lang}>
        <TagForm mutate={mutate} updateId={updateId} loading={isLoading} type={"post"}  buttonName="update" language={lang}/>
      </FormWrapper>
    )
  );
};

export default BlogTagUpdate;
