import request from "@/utils/axiosUtils";
import { BrandAPI } from "@/utils/axiosUtils/API";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import BrandContext from ".";

const BrandProvider = (props) => {
  const router = useRouter();
  const [brandState, setBrandState] = useState([]);
  const [brandParams, setBrandParams] = useState("");
  const { data: BrandData, isLoading, refetch } = useQuery({queryKey: [BrandAPI], queryFn: () => request({ url: BrandAPI, params: { status: 1 } }, router), enabled: true, refetchOnWindowFocus: false, select: (res) => res?.data?.data });
  
  useEffect(() => {
    BrandData && setBrandState(BrandData);
  }, [isLoading]);

  const handleSetQueryParams = (value) => {
    setBrandParams(value);
  };

  return (
    <>
      <BrandContext.Provider value={{isLoading ,refetch, handleSetQueryParams, brandParams, brandState, setBrandParams, brandContextLoader: isLoading, ...props }}>{props.children}</BrandContext.Provider>
    </>
  );
};

export default BrandProvider;
