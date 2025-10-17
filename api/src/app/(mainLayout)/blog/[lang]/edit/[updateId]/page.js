'use client'

import BlogForm from "@/components/blog/BlogForm";
import LanguageContext from "@/helper/languageContext";
import { blog } from "@/utils/axiosUtils/API";
import FormWrapper from "@/utils/hoc/FormWrapper";
import useCreate from "@/utils/hooks/useCreate";
import { useParams } from "next/navigation";
import { useContext, useEffect } from "react";

const BlogUpdate = () => {
  const params = useParams();
  const { setFormLanguage } = useContext(LanguageContext);
  const { lang, updateId } = params;

  useEffect(() => {
    if (lang) {
      setFormLanguage(lang);
    }
  }, [lang, setFormLanguage]);

  const { mutate, isLoading } = useCreate(blog, updateId, "/blog", "Blog Updated Successfully");
  return (
    updateId && (
      <FormWrapper title="edit_blog" lang={lang}>
        <BlogForm mutate={mutate} updateId={updateId} loading={isLoading} buttonName="update" language={lang} />
      </FormWrapper>
    )
  );
};

export default BlogUpdate;
