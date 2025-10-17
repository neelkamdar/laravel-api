import request from "@/utils/axiosUtils";
import { StoreAPI } from "@/utils/axiosUtils/API";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SellerContext from ".";

const SellerProvider = (props) => {
  const [getSellerIds, setGetSellerIds] = useState({});
  const router = useRouter();
  const [filterStore, setFilteredStore] = useState([]);
  const { data, isLoading, refetch } = useQuery({queryKey: [StoreAPI, getSellerIds.ids], queryFn: () => request({ url: StoreAPI, params: { ...getSellerIds, status: 1 } }, router), enabled: false, refetchOnWindowFocus: false, select: (res) => res?.data?.data });

  useEffect(() => {
    Object.keys(getSellerIds).length > 0 && refetch();
  }, [getSellerIds?.ids]);

  useEffect(() => {
    if (data) {
      setFilteredStore((prev) => data);
    }
  }, [isLoading, getSellerIds]);

  return <SellerContext.Provider value={{ ...props, filterStore, setGetSellerIds, isLoading }}>{props.children}</SellerContext.Provider>;
};

export default SellerProvider;
