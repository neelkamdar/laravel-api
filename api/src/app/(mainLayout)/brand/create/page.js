'use client'
import BrandForm from "@/components/brand/BrandForm";
import { BrandAPI } from "@/utils/axiosUtils/API";
import FormWrapper from "@/utils/hoc/FormWrapper";
import useCreate from "@/utils/hooks/useCreate";

const CreateBrand = () => {
  const { mutate, isLoading } = useCreate(BrandAPI, false, "/brand");
  return (
    <FormWrapper title="create_brand">
      <BrandForm loading={isLoading} mutate={mutate} buttonName="save"/>
    </FormWrapper>
  );
};

export default CreateBrand;
