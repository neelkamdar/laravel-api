'use client';
import CouponForm from "@/components/coupon/CouponForm";
import { coupon } from "@/utils/axiosUtils/API";
import useCreate from "@/utils/hooks/useCreate";

const AddNewCoupon = () => {
  const { mutate, isLoading } = useCreate(coupon, false, '/coupon');
  return <CouponForm mutate={mutate} loading={isLoading} title={"create_coupon"} buttonName="save" />;
};

export default AddNewCoupon;
