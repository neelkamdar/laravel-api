'use client'
import TaxForm from "@/components/tax/TaxForm";
import { tax } from "@/utils/axiosUtils/API";
import FormWrapper from "@/utils/hoc/FormWrapper";
import useCreate from "@/utils/hooks/useCreate";

const TaxCreate = () => {
  const { mutate, isLoading } = useCreate(tax, false, "/tax");
  return (
    <FormWrapper title="add_tax">
      <TaxForm loading={isLoading} mutate={mutate} buttonName="save" />
    </FormWrapper>
  );
};

export default TaxCreate;
