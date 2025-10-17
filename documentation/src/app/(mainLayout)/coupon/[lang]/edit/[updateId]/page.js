'use client';
import CouponForm from "@/components/coupon/CouponForm";
import LanguageContext from "@/helper/languageContext";
import { coupon } from "@/utils/axiosUtils/API";
import useUpdate from "@/utils/hooks/useUpdate";
import { useParams } from "next/navigation";
import { useContext, useEffect } from "react";

const CouponUpdate = () => {
  const params = useParams();
  const { lang, updateId } = params;
  const { setFormLanguage } = useContext(LanguageContext);

  useEffect(() => {
    if (lang) {
      setFormLanguage(lang);
    }
  }, [lang, setFormLanguage]);

  const { mutate, isLoading } = useUpdate(coupon, updateId, coupon, "Coupon Updated Successfully");

  return (
    updateId && (
      <CouponForm mutate={mutate} updateId={updateId} loading={isLoading} title={"update_coupon"} buttonName="update" language={lang} />
    )
  );
};

export default CouponUpdate;