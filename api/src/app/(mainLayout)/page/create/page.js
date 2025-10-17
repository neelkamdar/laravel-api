"use client";
import dynamic from "next/dynamic";
import useCreate from "@/utils/hooks/useCreate";
import { PagesAPI } from "@/utils/axiosUtils/API";

const PageForm = dynamic(() => import("@/components/pages/PageForm"), {
  ssr: false,
});
const FormWrapper = dynamic(() => import("@/utils/hoc/FormWrapper"), {
  ssr: false,
});

const CreatePage = () => {
  const { mutate, isLoading } = useCreate(PagesAPI, false, "/page");
  return (
    <FormWrapper title="create_page">
      <PageForm mutate={mutate} loading={isLoading} buttonName="save" />
    </FormWrapper>
  );
};

export default CreatePage;
