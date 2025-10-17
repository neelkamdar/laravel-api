"use client";
import Breadcrumb from "@/components/common/Breadcrumb";
import ThemeOptionContext from "@/helper/themeOptionsContext";
import request from "@/utils/axiosUtils";
import { StoreAPI } from "@/utils/axiosUtils/API";
import { ModifyString } from "@/utils/customFunctions/ModifyString";
import { useCustomSearchParams } from "@/utils/hooks/useCustomSearchParams";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import SellerDetailBasic from "./SellerDetailBasic";
import SellerDetailClassic from "./SellerDetailClassic";

const SingleStoreDetail = ({ params }) => {
  const router = useRouter();
  const { data: StoreData, isLoading, refetch } = useQuery({queryKey: [params], queryFn: () => request({ url: `${StoreAPI}/slug/${params}` }, router), enabled: false, refetchOnWindowFocus: false, select: (res) => res?.data });
  useEffect(() => {
    params && refetch();
  }, [params]);

  const [filter, setFilter] = useState({ category: [], price: [], attribute: [], rating: [], sortBy: "", field: "" });
  const { themeOption } = useContext(ThemeOptionContext);
  const [category, brand, attribute, price, rating, sortBy, field, layout] = useCustomSearchParams(["category", "brand", "attribute", "price", "rating", "sortBy", "field", "layout"]);
  const sellerDetailLayout = layout?.layout ? layout?.layout : themeOption?.collection?.collection_layout;

  useEffect(() => {
    setFilter((prev) => {
      return {
        ...prev,
        category: category ? category?.category?.split(",") : [],
        brand: brand ? brand?.brand?.split(",") : [],
        attribute: attribute ? attribute?.attribute?.split(",") : [],
        price: price ? price?.price?.split(",") : [],
        rating: rating ? rating?.rating?.split(",") : [],
        sortBy: sortBy ? sortBy?.sortBy : "",
        field: field ? field?.field : "",
      };
    });
  }, [category, brand, attribute, price, rating, sortBy, field]);
  const storeName = ModifyString(params, false, "-");

  return (
    <>
      <Breadcrumb title={storeName} subNavigation={[{ name: "Seller Stores" }, { name: storeName }]} />
      {sellerDetailLayout == "basic_store_details" ? <SellerDetailBasic filter={filter} setFilter={setFilter} StoreData={StoreData} /> : sellerDetailLayout == "classic_store_details" ? <SellerDetailClassic filter={filter} setFilter={setFilter} StoreData={StoreData} /> : <SellerDetailBasic filter={filter} setFilter={setFilter} StoreData={StoreData} />}
    </>
  );
};
export default SingleStoreDetail;
