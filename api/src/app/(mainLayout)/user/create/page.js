"use client";

import UserForm from "@/components/user/UserForm";
import { user } from "@/utils/axiosUtils/API";
import FormWrapper from "@/utils/hoc/FormWrapper";
import useCreate from "@/utils/hooks/useCreate";

const AddNewUser = () => {
  
  const { mutate, isLoading } = useCreate(user, false, `/user`);
  return (
    <FormWrapper title="add_user">
      <UserForm mutate={mutate} loading={isLoading} buttonName="save" />
    </FormWrapper>
  );
};

export default AddNewUser;
