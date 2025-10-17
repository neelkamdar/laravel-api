"use client";
import UserForm from "@/components/user/UserForm";
import { user } from "@/utils/axiosUtils/API";
import FormWrapper from "@/utils/hoc/FormWrapper";
import useUpdate from "@/utils/hooks/useUpdate";
import { useParams } from "next/navigation";

const UserUpdate = () => {
  const params = useParams();
  const { mutate, isLoading } = useUpdate(user,params?.updateId,`/user`,"User updated successfully");
  return (
    params?.updateId && (
      <FormWrapper title="edit_user">
        <UserForm
          mutate={mutate}
          updateId={params?.updateId}
          loading={isLoading}
          buttonName="update"
        />
      </FormWrapper>
    )
  );
};

export default UserUpdate;
