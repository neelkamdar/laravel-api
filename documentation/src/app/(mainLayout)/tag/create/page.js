"use client";
import TagForm from "@/components/tag/TagForm";
import { tag } from "@/utils/axiosUtils/API";
import FormWrapper from "@/utils/hoc/FormWrapper";
import useCreate from "@/utils/hooks/useCreate";

const TagsCreate = () => {
  
  const { mutate, isLoading } = useCreate(tag, false, `/tag`);
  return (
    <FormWrapper title="add_tag">
      <TagForm loading={isLoading} mutate={mutate} type={"product"} buttonName="save"/>
    </FormWrapper>
  );
};

export default TagsCreate;
