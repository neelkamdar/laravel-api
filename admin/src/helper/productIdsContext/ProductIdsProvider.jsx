import request from "@/utils/axiosUtils";
import { ProductAPI } from "@/utils/axiosUtils/API";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ProductIdsContext from ".";

const ProductIdsProvider = (props) => {
  const router = useRouter();
  const [getProductIds, setGetProductIds] = useState({});
  const [filteredProduct, setFilteredProduct] = useState([]);
  const { data, refetch, isLoading } = useQuery({queryKey: [ProductAPI, getProductIds?.ids], queryFn: () => request({ url: ProductAPI, params: { ...getProductIds, status: 1} }, router),
    enabled: false,
    refetchOnWindowFocus: false,
    select: (data) => data.data.data,
  });
  useEffect(() => {
    Object.keys(getProductIds).length > 0 && refetch();
  }, [getProductIds?.ids]);

  useEffect(() => {
    if (data) {
      setFilteredProduct(data);
    }
  }, [data]);
  return <ProductIdsContext.Provider value={{ ...props, filteredProduct, setGetProductIds, isLoading }}>{props.children}</ProductIdsContext.Provider>;
};

export default ProductIdsProvider;
