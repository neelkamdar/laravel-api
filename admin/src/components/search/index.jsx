"use client";
import Btn from "@/elements/buttons/Btn";
import Loader from "@/layout/loader";
import request from "@/utils/axiosUtils";
import { ProductAPI } from "@/utils/axiosUtils/API";
import { useCustomSearchParams } from "@/utils/hooks/useCustomSearchParams";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Input, InputGroup } from "reactstrap";
import Breadcrumb from "../common/Breadcrumb";
import { LeafSVG } from "../common/CommonSVG";
import WrapperComponent from "../common/WrapperComponent";
import SearchedData from "./SearchedData";

const SearchModule = () => {
  const { t } = useTranslation("common");
  const [search] = useCustomSearchParams(["search"]);
  const [searchState, setSearchState] = useState("");
  const router = useRouter();
  const { data, refetch, isLoading } = useQuery({queryKey: [ProductAPI, "search"], queryFn: () => request({ url: ProductAPI, params: { search: search?.search ?? searchState, paginate: 12, status: 1 } }, router),
    enabled: false,
    refetchOnWindowFocus: false,
    select: (data) => data.data.data,
  });
  
  useEffect(() => {
    setSearchState(search?.search ?? "");
    if (search?.search) refetch();
  }, [search, search?.search]);

  useEffect(() => {
    search?.search == undefined && isLoading && refetch();
  }, [isLoading])
  
    if (isLoading) return <Loader />;
  return (
    <>
      <Breadcrumb title={"search"} subNavigation={[{ name: "search" }]} />
      <WrapperComponent classes={{ sectionClass: "search-section", col: "mx-auto" }} colProps={{ xxl: 6, xl: 8 }}>
        <div className="title d-block text-center">
          <h2>{t("search_for_products")}</h2>
          <span className="title-leaf">
            <LeafSVG />
          </span>
        </div>

        <div className="search-box">
          <InputGroup>
            <Input type='text' className='form-control' value={searchState} onChange={(e) => setSearchState(e.target.value)} />
            <Btn className='theme-bg-color text-white m-0' type='button' title='search' onClick={()=>  router.push(`/search?search=${searchState}`)} />
          </InputGroup>
        </div>
      </WrapperComponent>
      <SearchedData data={data} />
    </>
  );
};

export default SearchModule;
