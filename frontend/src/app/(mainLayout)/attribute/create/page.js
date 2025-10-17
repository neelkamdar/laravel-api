"use client";
import AttributeForm from "@/components/attribute/AttributeForm";
import { attribute } from "@/utils/axiosUtils/API";
import FormWrapper from "@/utils/hoc/FormWrapper";
import useCreate from "@/utils/hooks/useCreate";

const AttributeCreate = () => {
  const { mutate, isLoading } = useCreate(attribute, false, `/attribute`);
  return (
    <FormWrapper title="add_attribute">
      <AttributeForm mutate={mutate} loading={isLoading} buttonName="save" />
    </FormWrapper>
  );
};

export default AttributeCreate;
