import Loader from "@/components/commonComponent/Loader";
import request from "@/utils/axiosUtils";
import { BrandAPI, Category, product, store } from "@/utils/axiosUtils/API";
import { useQuery } from "@tanstack/react-query";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Col, TabContent, TabPane } from "reactstrap";
import placeHolderImage from "../../../../public/assets/images/placeholder.png";
import HomeBannerTab from "./HomeBannerTab";
import CategoryIconListTab from "./CategoryIconListTab";
import ProductList1Tab from "../homePage5/ProductList1Tab";
import SliderProduct from "./SliderProduct";
import FeatureBlogTab from "../homePage3/FeatureBlogTab";
import NewsLetterTab from "../homePage1/NewsLetterTab";
import SellerPage from "../homePage3/SellerPage";
import BrandsTab from "../homePage1/BrandsTab";
import { useRouter } from "next/navigation";

const CairoHomePageAllTabsHomePage = forwardRef(
  ({ activeTab, values, setFieldValue }, ref) => {
    const [search, setSearch] = useState(false);
    const [customSearch, setCustomSearch] = useState("");
    const [tc, setTc] = useState(null);
    const [brandSearch, setBrandSearch] = useState(false);
    const [brandCustomSearch, setBrandCustomSearch] = useState("");
    const [brandTc, setBrandTc] = useState(null);
    const [storeSearch, setStoreSearch] = useState(false);
     const [storeCustomSearch, setStoreCustomSearch] = useState("");
     const [storeTc, setStoreTc] = useState(null);
     const router = useRouter()   
     const { data:storeData ,refetch:storeRefetch  } =useQuery({ queryKey: [store], queryFn: ()=>request({url:store,params:{status:1,search: storeCustomSearch ? storeCustomSearch : '',}},router), refetchOnWindowFocus:false, select:(res)=> res?.data?.data?.map((elem)=> {return{ id:elem.id,name:elem?.store_name,slug:elem?.slug }})})
   
      // Added debouncing
      useEffect(() => {
          if (storeTc) clearTimeout(storeTc);
          setStoreTc(setTimeout(() => setStoreCustomSearch(storeSearch), 500));
      }, [storeSearch])
      // Getting users data on searching users
      useEffect(() => {
          storeRefetch()
      }, [storeCustomSearch])   
   
    const { data: brandData, refetch: brandRefetch } = useQuery({ queryKey: [BrandAPI], queryFn: () =>request({url: BrandAPI,params: {status: 1,search: brandCustomSearch ? brandCustomSearch : "",},},router), refetchOnWindowFocus: false,select: (res) =>res?.data?.data?.map((elem) => {return { id: elem.id, name: elem?.name, slug: elem?.slug };}),});
    // Added debouncing
    useEffect(() => {
      if (brandTc) clearTimeout(brandTc);
      setBrandTc(setTimeout(() => setBrandCustomSearch(brandSearch), 500));
    }, [brandSearch]);
    // Getting users data on searching users
    useEffect(() => {
      brandRefetch();
    }, [brandCustomSearch]);

    const { data: productData, isLoading: productLoader, refetch } = useQuery({ queryKey: [product], queryFn: () => request({
      url: product, params:
      {
          status: 1,
          search: customSearch ? customSearch : '',
          paginate: values['content']?.['products_ids']?.length > 15 ? values['content']?.['products_ids']?.length : 15,
          ids: customSearch ? null : values['content']['products_ids'].join() || null,
          with_union_products: values['content']?.['products_ids']?.length ? values['content']?.['products_ids']?.length >= 15 ? 0 : 1 : 0
      }
  },router),
      refetchOnWindowFocus: false, select: (res) => res?.data?.data.map((elem) => { return { id: elem.id, name: elem.name, image: elem?.product_thumbnail?.original_url || placeHolderImage, slug: elem?.slug } })
  });
  const { data: categoryData, isLoading: categoryLoader,refetch:categoryRefetch } = useQuery({ queryKey: [Category], queryFn: () => request({ url: Category, params: {  type: 'product' } },router),
      enabled:true,refetchOnWindowFocus: false, select: (res) => res?.data?.data?.map((elem) => { return { subcategories:elem.subcategories,id: elem.id, name: elem.name, image: elem?.category_icon?.original_url || placeHolderImage, slug: elem?.slug } })
  });

    useImperativeHandle(ref, () => ({
      call() {
        refetch();
        categoryRefetch()
      },
    }));

    // Added debouncing
    useEffect(() => {
      if (tc) clearTimeout(tc);
      setTc(setTimeout(() => setCustomSearch(search), 500));
    }, [search]);
    useEffect(() => {
      refetch();
    }, [customSearch]);
    if (productLoader || categoryLoader) return <Loader />;

    return (
      <Col xl="7" lg="8">
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <HomeBannerTab values={values} setFieldValue={setFieldValue} productData={productData} categoryData={categoryData} setSearch={setSearch}
            />
          </TabPane>
            <TabPane tabId="2">
                <CategoryIconListTab status={"categories_icon_list"} category={"categoryIconList"} values={values} setFieldValue={setFieldValue} categoryData={categoryData} />
            </TabPane>
            <TabPane tabId="3">
                <ProductList1Tab values={values} setFieldValue={setFieldValue} nameKey={'products_list_1'} productData={productData} customName={"productListImage1"} setSearch={setSearch} />
            </TabPane>
            <TabPane tabId="4">
             <CategoryIconListTab status={"categories_icon_list_2"} category={"categoryIconList2"} values={values} setFieldValue={setFieldValue} categoryData={categoryData} /> 
            </TabPane>
            <TabPane tabId="5">
              <SliderProduct values={values} setFieldValue={setFieldValue} productData={productData} categoryData={categoryData} setSearch={setSearch} />
            </TabPane>
            <TabPane tabId="6">
              <SellerPage setStoreSearch={setStoreSearch} storeData={storeData} />
            </TabPane>
            <TabPane tabId="7">
            <CategoryIconListTab name="categories_products" status={"categories_products"} category={"categoriesProducts"} values={values} setFieldValue={setFieldValue} categoryData={categoryData} />
            </TabPane>
            <TabPane tabId="8">
              <FeatureBlogTab noDescription values={values} setFieldValue={setFieldValue} />
            </TabPane>
            <TabPane tabId="9">
              <BrandsTab name={"brandIds"} setBrandSearch={setBrandSearch} brandData={brandData}  />
            </TabPane>
            <TabPane tabId="10">
              <NewsLetterTab  values={values} setFieldValue={setFieldValue} />
            </TabPane>
        </TabContent>
      </Col>
    );
  }
);

export default CairoHomePageAllTabsHomePage;
