'use client'
import CurrencyForm from "@/components/currency/CurrencyForm";
import { currency } from "@/utils/axiosUtils/API";
import FormWrapper from "@/utils/hoc/FormWrapper";
import useCreate from "@/utils/hooks/useCreate";

const CreateCurrency = () => {
    const { mutate, isLoading } = useCreate(currency, false, "/currency");
    return (
        <FormWrapper title="add_currency">
            <CurrencyForm mutate={mutate} loading={isLoading} buttonName="save" />
        </FormWrapper>
    )
}

export default CreateCurrency
