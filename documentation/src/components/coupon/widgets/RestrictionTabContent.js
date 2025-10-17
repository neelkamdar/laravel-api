import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import request from "../../../utils/axiosUtils";
import { product } from "../../../utils/axiosUtils/API";
import CheckBoxField from "../../inputFields/CheckBoxField";
import SimpleInputField from "../../inputFields/SimpleInputField";
import ExcludeProducts from "./ExcludeProducts";
import IncludeProducts from "./IncludeProducts";
import placeHolderImage from '../../../../public/assets/images/placeholder.png'
import { useRouter } from "next/navigation";
const RestrictionTabContent = ({ values, setFieldValue, errors }) => {
  const [customSearch, setCustomSearch] = useState("");
  const [tc, setTc] = useState(null);
  const [search, setSearch] = useState(false);
  const router = useRouter()   

  const { t } = useTranslation("common");
  const { data: productList, refetch, isLoading } = useQuery({ queryKey: [product, +customSearch? customSearch : null], queryFn: () =>request({url: product, params: {status: 1, is_approved: 1, paginate: 15, search: customSearch ? customSearch : null,},}, router), enabled: false, refetchOnWindowFocus: false, select: (data) =>data.data.data.map((elem) => ({ id: elem.id, name: elem.name,image: elem?.product_thumbnail?.original_url || placeHolderImage, })),});
  // Added debouncing
  useEffect(() => {
    if (tc) clearTimeout(tc);
    setTc(setTimeout(() => setCustomSearch(search), 500));
  }, [search]);
  useEffect(() => {
    !isLoading && customSearch !== undefined && refetch();
  }, [customSearch]);
  useEffect(() => {
    isLoading && refetch();
  }, [isLoading]);
  return (
    <>
      <CheckBoxField name="is_apply_all" title="apply_to_all_products" />
      {values["is_apply_all"] ? <ExcludeProducts productList={productList} setSearch={setSearch}/>:<IncludeProducts productList={productList} setSearch={setSearch}/>}     
      <SimpleInputField
        nameList={[
          {
            name: "min_spend",
            type: "number",
            placeholder: t("enter_minimum_spend"),
            inputaddon: "true",
            title: "minimum_spend",
            require: "true",
            helpertext:"*Define the minimum order value needed to utilize the coupon.",
          },
        ]}
      />
    </>
  );
};

export default RestrictionTabContent;
