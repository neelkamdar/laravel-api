'use client'
import { useContext, useEffect, useState } from "react";
import ProductForm from "@/components/product/ProductForm";
import { product } from "@/utils/axiosUtils/API";
import LanguageContext from "@/helper/languageContext";
import useUpdate from "@/utils/hooks/useUpdate";
import { useParams } from "next/navigation";

const UpdateProduct = () => {
  const params = useParams();
  const [resetKey, setResetKey] = useState(false)
  const [saveButton, setSaveButton] = useState(false)
  const { setFormLanguage } = useContext(LanguageContext);

  const { lang, updateId } = params;

  useEffect(() => {
    if (lang) {
      setFormLanguage(lang);
    }
  }, [lang, setFormLanguage]);

  const { mutate, isLoading } = useUpdate(product, updateId, !saveButton ? product : false, "Product updated successfully", (resDta) => {
    if (resDta?.status == 200 || resDta?.status == 201) {
      setResetKey((prevKey) => !prevKey);
    }
  });

  return (
    updateId && (
      <ProductForm saveButton={saveButton} setSaveButton={setSaveButton} values={mutate} mutate={mutate} updateId={updateId} loading={isLoading} title={"edit_product"} key={resetKey}  buttonName="update" language={lang} />
    )
  );
};

export default UpdateProduct;
