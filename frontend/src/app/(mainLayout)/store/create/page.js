'use client'
import StoreForm from "@/components/store/StoreForm";
import { store } from "@/utils/axiosUtils/API";
import FormWrapper from "@/utils/hoc/FormWrapper";
import useCreate from "@/utils/hooks/useCreate";

const StoreCreate = () => {
  const { mutate, isLoading } = useCreate(store, false, "/store");
  return (
    <FormWrapper title="add_store">
      <StoreForm mutate={mutate} loading={isLoading} buttonName="save"/>
    </FormWrapper>
  );
};

export default StoreCreate;
