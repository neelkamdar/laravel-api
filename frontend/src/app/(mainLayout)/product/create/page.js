"use client";
import dynamic from "next/dynamic";
import { product } from "@/utils/axiosUtils/API";
import useCreate from "@/utils/hooks/useCreate";
import { useState } from "react";

const ProductForm = dynamic(() => import("@/components/product/ProductForm"), {
  ssr: false,
});

const ProductCreate = () => {
  const [resetKey, setResetKey] = useState(false);
  const { mutate, isLoading } = useCreate(
    product,
    false,
    product,
    false,
    (resDta) => {
      if (resDta?.status == 200 || resDta?.status == 201) {
        setResetKey(true);
      }
    }
  );
  return (
    <ProductForm
      values={resetKey}
      mutate={mutate}
      loading={isLoading}
      title={"add_product"}
      key={resetKey}
      buttonName="save"
    />
  );
};

export default ProductCreate;
