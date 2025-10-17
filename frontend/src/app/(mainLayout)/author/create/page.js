'use client'
import AuthorForm from "@/components/author/AuthorForm";
import { AuthorApi } from "@/utils/axiosUtils/API";
import FormWrapper from "@/utils/hoc/FormWrapper";
import useCreate from "@/utils/hooks/useCreate";

const CreateAuthor = () => {
  const { mutate, isLoading } = useCreate(AuthorApi, false, "/author");
  return (
    <FormWrapper title="create_author">
      <AuthorForm loading={isLoading} mutate={mutate} buttonName="save"/>
    </FormWrapper>
  );
};

export default CreateAuthor;
