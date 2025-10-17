'use client'
import FaqForm from "@/components/faq/FaqForm";
import { FaqAPI } from "@/utils/axiosUtils/API";
import FormWrapper from "@/utils/hoc/FormWrapper";
import useCreate from "@/utils/hooks/useCreate";

const CreateFaq = () => {
    const { mutate, isLoading } = useCreate(FaqAPI, false, FaqAPI);
    return (
        <FormWrapper title="AddFaq">
            <FaqForm loading={isLoading} mutate={mutate} buttonName="save" />
        </FormWrapper>
    )
}

export default CreateFaq