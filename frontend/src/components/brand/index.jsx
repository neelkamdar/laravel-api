"use client";
import Loader from "@/layout/loader";
import request from "@/utils/axiosUtils";
import { BrandAPI } from "@/utils/axiosUtils/API";
import { useCustomSearchParams } from "@/utils/hooks/useCustomSearchParams";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Breadcrumb from "../common/Breadcrumb";
import WrapperComponent from "../common/WrapperComponent";
import BrandCollection from "./brandCollection";

const BrandContainer = ({ brandSlug }) => {
  const router = useRouter();
  const { t } = useTranslation("common");
  const [filter, setFilter] = useState({ category: [], price: [], attribute: [], rating: [], sortBy: "", field: "" });
  const [category, attribute, price, rating, sortBy, field, layout] = useCustomSearchParams(["category", "attribute", "price", "rating", "sortBy", "field", "layout"]);

  const { data: Brand, isLoading, refetch } = useQuery({queryKey: [BrandAPI], queryFn: () => request({ url: `${BrandAPI}/slug/${brandSlug}` }, router), enabled: false, refetchOnWindowFocus: false, select: (res) => res?.data });
  useEffect(() => {
    refetch();
  }, [isLoading]);

  useEffect(() => {
    setFilter((prev) => {
      return {
        ...prev,
        category: category ? category?.category?.split(",") : [],
        attribute: attribute ? attribute?.attribute?.split(",") : [],
        price: price ? price?.price?.split(",") : [],
        rating: rating ? rating?.rating?.split(",") : [],
        sortBy: sortBy ? sortBy?.sortBy : "",
        field: field ? field?.field : "",
      };
    });
  }, [category, attribute, price, rating, sortBy, field]);

  if (isLoading) return <Loader />;
  return (
    <>
      <Breadcrumb title={`Brand : ${brandSlug}`} subNavigation={[{ name: brandSlug }]} />
      <WrapperComponent colProps={{ xs: 12 }}>
        <div className="brand-box">{Brand?.brand_banner && Brand?.brand_banner?.original_url ? <Image src={Brand.brand_banner.original_url} className="img-fluid" height={286} width={1444} alt={Brand?.name || ""} /> : <h2>{Brand?.name}</h2>}</div>
      </WrapperComponent>
      <WrapperComponent classes={{ sectionClass: "section-b-space shop-section" }} customCol={true}>
        <BrandCollection filter={filter} setFilter={setFilter} initialGrid={5} noSidebar={true} />
      </WrapperComponent>
    </>
  );
};

export default BrandContainer;
