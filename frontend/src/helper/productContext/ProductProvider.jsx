import request from "@/utils/axiosUtils";
import { ProductAPI, ProductSearchAPI } from "@/utils/axiosUtils/API";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ProductContext from ".";
import ProductData from "@/components/themes/common/productData";

const ProductProvider = (props) => {
  const [customProduct, setCustomProduct] = useState([]);
  const [searchWithCategory, setSearchWithCategory] = useState("");
  const router = useRouter();
  const [totalDealIds, setTotalDealIds] = useState("");
  const [productAPIData, setProductAPIData] = useState({ data: [], refetchProduct: "", params: { ...totalDealIds }, productIsLoading: false });
  const {
    data: productData,
    refetch: productRefetch,
    isLoading: productIsLoading,
  } = useQuery({queryKey: [ProductAPI], queryFn: () => request({ url: ProductAPI, params: { ...productAPIData.params, ids: totalDealIds, status: 1, paginate: Object.keys(totalDealIds).length > 5 ? Object.keys(totalDealIds).length : 5 } }, router),
    enabled: false,
    refetchOnWindowFocus: false,
    select: (data) => data.data.data,
  });
  const { data: searchListData, isLoading: searchListIsLoading, refetch } = useQuery({queryKey: [ProductSearchAPI], queryFn: () => request({ url: ProductSearchAPI, params: { category_id: searchWithCategory ? (searchWithCategory === "All Category" ? null : searchWithCategory) : null, status: searchWithCategory ? 1 : null } }, router), enabled: true, refetchOnWindowFocus: false, select: (data) => data.data.map((item) => ({ original_url: item?.product_thumbnail?.original_url, title: item.name, slug: item.slug, categories: item?.categories })) });

  useEffect(() => {
    if (searchWithCategory !== "" && !searchListIsLoading) {
      refetch();
    }
  }, [searchWithCategory]);

  useEffect(() => {
    if (productData) {
      setProductAPIData((prev) => ({ ...prev, data: productData, productIsLoading: productIsLoading }));
    }
  }, [productData]);

  return <ProductContext.Provider value={{ ...props, searchWithCategory, setSearchWithCategory, productAPIData, setProductAPIData, customProduct, setCustomProduct, totalDealIds, setTotalDealIds, productRefetch, searchList: searchListData }}>{props.children}</ProductContext.Provider>;
};
export default ProductProvider;
