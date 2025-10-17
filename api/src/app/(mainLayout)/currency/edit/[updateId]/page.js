'use client'
import CurrencyForm from "@/components/currency/CurrencyForm";
import { currency } from "@/utils/axiosUtils/API";
import FormWrapper from "@/utils/hoc/FormWrapper";
import useUpdate from "@/utils/hooks/useUpdate";
import { useParams } from "next/navigation";

const UpdateCurrency = () => {
    const params = useParams();
    const { mutate, isLoading } = useUpdate(currency, params?.updateId, currency, "Currency updated successfully");
    return (
        params?.updateId && (
            <FormWrapper title="edit_currency">
                <CurrencyForm mutate={mutate} updateId={params?.updateId} loading={isLoading} buttonName="update"/>
            </FormWrapper>
        )
    )
}

export default UpdateCurrency