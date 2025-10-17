"use client";

import NoticeForm from "@/components/notice/NoticeForm";
import LanguageContext from "@/helper/languageContext";
import { Notice } from "@/utils/axiosUtils/API";
import FormWrapper from "@/utils/hoc/FormWrapper";
import useUpdate from "@/utils/hooks/useUpdate";
import { useParams } from "next/navigation";
import { useContext, useEffect } from "react";

const NoticeUpdate = () => {
  const params = useParams();
  const { lang, updateId } = params;
  const { setFormLanguage } = useContext(LanguageContext);

  useEffect(() => {
    if (lang) {
      setFormLanguage(lang);
    }
  }, [lang, setFormLanguage]);

  const { mutate, isLoading } = useUpdate(Notice, updateId, `/notice`, "Notice Updated Successfully");
  return (
    updateId && (
      <FormWrapper title="update_notice" lang={lang}>
        <NoticeForm
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

export default NoticeUpdate;
