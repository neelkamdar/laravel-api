"use client";

import LanguageForm from "@/components/language/LanguageForm";
import LanguageContext from "@/helper/languageContext";
import { AllLanguageApi, store } from "@/utils/axiosUtils/API";
import FormWrapper from "@/utils/hoc/FormWrapper";
import useCreate from "@/utils/hooks/useCreate";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useContext } from "react";

const LanguageUpdate = () => {
  const params = useParams();
  const { mutate, isLoading } = useCreate(
    AllLanguageApi,
    params?.updateId,
    "/language",
    false,
    false,
    false,
    false,
    "put"
  );
  const { refetchLanguages } = useContext(LanguageContext); // Optional if you have context
  const queryClient = useQueryClient();

  const extraFunc = () => {
    queryClient.invalidateQueries(["newLang"]); // ✅ force header language list to refetch
    refetchLanguages?.(); // if you also use context (optional)
  };

  return (
    params?.updateId && (
      <FormWrapper title="EditLanguage">
        <LanguageForm
          mutate={mutate}
          updateId={params?.updateId}
          loading={isLoading}
          buttonName="update"
          extraFunc={extraFunc}
        />
      </FormWrapper>
    )
  );
};

export default LanguageUpdate;
