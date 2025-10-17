"use client";
import PermissionForm from "@/components/role/PermissionForm";
import { role } from "@/utils/axiosUtils/API";
import FormWrapper from "@/utils/hoc/FormWrapper";

import useCreate from "@/utils/hooks/useCreate";

const Role = () => {
  const { mutate, isLoading } = useCreate(role, false, `/role`, "Role Created Successfully");
  return (
    <FormWrapper title="add_role">
      <PermissionForm mutate={mutate} loading={isLoading} buttonName="save" />
    </FormWrapper>
  );
};

export default Role;
