'use client'

import PaymentDetailsForm from "@/components/paymentDetails"
import FormWrapper from "@/utils/hoc/FormWrapper"

const PaymentDetails = () => {
    return (
        <FormWrapper title="payment_details">
            <PaymentDetailsForm />
        </FormWrapper>
    )
}
export default PaymentDetails