'use client'
import PublicationForm from "@/components/publication/PublicationForm";
import { PublicationApi } from "@/utils/axiosUtils/API";
import FormWrapper from "@/utils/hoc/FormWrapper";
import useCreate from "@/utils/hooks/useCreate";

const CreatePublication = () => {
  const { mutate, isLoading } = useCreate(PublicationApi, false, "/publication");
  return (
    <FormWrapper title="create_publication">
      <PublicationForm loading={isLoading} mutate={mutate} buttonName="save"/>
    </FormWrapper>
  );
};

export default CreatePublication;