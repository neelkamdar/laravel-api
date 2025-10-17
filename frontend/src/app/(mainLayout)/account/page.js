"use client";
import AccountForm from "@/components/account";
import FormWrapper from "@/utils/hoc/FormWrapper";

const Account = () => {
  return (
    <FormWrapper title='my_account'>
      <AccountForm />
    </FormWrapper>
  );
};

export default Account;
