'use client'
import Checkout from "@/components/pos/checkout/Checkout";
import { checkout } from "@/utils/axiosUtils/API";
import useCreate from "@/utils/hooks/useCreate";
import { useState } from "react";

const MainCheckout = () => {
    const [errorCoupon, setErrorCoupon] = useState("")
    const [appliedCoupon, setAppliedCoupon] = useState(null)
    const [storeCoupon, setStoreCoupon] = useState("")

    const { data, mutate, isLoading } = useCreate(checkout, false, false, true, (resDta) => {
        if (resDta?.status == 200 || resDta?.status == 201) {
            setErrorCoupon("")
            storeCoupon !== '' && setAppliedCoupon("applied")
        } else {
            setErrorCoupon(resDta?.response?.data?.message)
        }
    }, false);
    return <Checkout loading={isLoading} mutate={mutate} data={data} errorCoupon={errorCoupon} appliedCoupon={appliedCoupon} setAppliedCoupon={setAppliedCoupon} storeCoupon={storeCoupon} setStoreCoupon={setStoreCoupon}  />
};
export default MainCheckout;