"use client";
import dynamic from "next/dynamic";
import { Notice } from "@/utils/axiosUtils/API";
import useCreate from "@/utils/hooks/useCreate";

const NoticeForm = dynamic(() => import("@/components/notice/NoticeForm"), {
  ssr: false,
});
const FormWrapper = dynamic(() => import("@/utils/hoc/FormWrapper"), {
  ssr: false,
});

const NoticeCreate = () => {
  const { mutate, isLoading } = useCreate(Notice, false, "/notice");

  return (
    <FormWrapper title="add_notice">
      <NoticeForm mutate={mutate} loading={isLoading} buttonName="save" />
    </FormWrapper>
  );
};

export default NoticeCreate;
