import { Col, TabContent, TabPane } from "reactstrap";
import HomeBanner4 from "./HomeBanner4";
import CategoriesImageList from "./CategoriesImageList";
import ValueBanners from "./ValueBanners";
import CategoryProductTab from "./CategoryProductTab";
import TwoColumnBanner from "./TwoColumnBanner";
import SliderProductTab from "../homePage3/SliderProductTab";
import FullWidthBanner4 from "./FullWidthBanner4";
import ProductListTab from "./ProductListTab";
import FeatureBlog4 from "./FeatureBlog4";
import NewsLetter4 from "./NewsLetter4";
import { useQuery } from "@tanstack/react-query";
import { BrandAPI, Category, product, store } from "../../../utils/axiosUtils/API";
import request from "../../../utils/axiosUtils";
import placeHolderImage from "../../../../public/assets/images/placeholder.png";
import Loader from "../../commonComponent/Loader";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import BrandsTab from "../homePage1/BrandsTab";
import SellerPage from "../homePage3/SellerPage";
import { useRouter } from "next/navigation";


const AllTabsHomePage4 = forwardRef(({ activeTab, values, setFieldValue }, ref) => {
 const [search, setSearch] = useState(false);
 const [customSearch, setCustomSearch] = useState("")
 const [tc, setTc] = useState(null);
 const [brandSearch, setBrandSearch] = useState(false);
 const [brandCustomSearch, setBrandCustomSearch] = useState("");
 const [brandTc, setBrandTc] = useState(null); 
 const [storeSearch, setStoreSearch] = useState(false);
 const [storeCustomSearch, setStoreCustomSearch] = useState("");
 const [storeTc, setStoreTc] = useState(null);
 const router = useRouter()
 const { data: storeData ,refetch: storeRefetch  } = useQuery({ queryKey: [store], queryFn: ()=>request({url:store,params:{status:1,search: storeCustomSearch ? storeCustomSearch : '',}},router), refetchOnWindowFocus:false, select:(res)=> res?.data?.data?.map((elem)=> {return{ id:elem.id,name:elem?.store_name,slug:elem?.slug }})})

  // Added debouncing
  useEffect(() => {
      if (storeTc) clearTimeout(storeTc);
      setStoreTc(setTimeout(() => setStoreCustomSearch(storeSearch), 500));
  }, [storeSearch])
  // Getting users data on searching users
  useEffect(() => {
      storeRefetch()
  }, [storeCustomSearch])   
   
    const { data: brandData, refetch: brandRefetch } = useQuery({ queryKey: [BrandAPI], queryFn: () =>request({url: BrandAPI,params: {status: 1,search: brandCustomSearch ? brandCustomSearch : "",},},router), refetchOnWindowFocus: false,select: (res) =>res?.data?.data?.map((elem) => {return { id: elem.id, name: elem?.name, slug: elem?.slug };})});
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
    const { data: categoryData, isLoading: categoryLoader } = useQuery({ queryKey: [Category], queryFn: () => request({ url: Category, params: { status: 1, type: 'product' } },router),
        refetchOnWindowFocus: false, select: (res) => res?.data?.data.map((elem) => { return { id: elem.id, name: elem.name, image: elem?.category_icon?.original_url || placeHolderImage, slug: elem?.slug } })
    });
    useImperativeHandle(ref, () => ({
        call() {
            refetch();
        }
    }));

    // Added debouncing
    useEffect(() => {
        if (tc) clearTimeout(tc);
        setTc(setTimeout(() => setCustomSearch(search), 500));
    }, [search])
    // Getting users data on searching users
    useEffect(() => {
        refetch()
    }, [customSearch])
    if (productLoader || categoryLoader) return <Loader />
    return (
        <Col xl="7" lg="8">
            <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                    <HomeBanner4 values={values} setFieldValue={setFieldValue} productData={productData} categoryData={categoryData} setSearch={setSearch} />
                </TabPane>
                <TabPane tabId="2">
                    <CategoriesImageList values={values} setFieldValue={setFieldValue} categoryData={categoryData} />
                </TabPane>
                <TabPane tabId="3">
                    <ValueBanners values={values} setFieldValue={setFieldValue} productData={productData} categoryData={categoryData} setSearch={setSearch} />
                </TabPane>
                <TabPane tabId="4">
                    <CategoryProductTab values={values} setFieldValue={setFieldValue} categoryData={categoryData} />
                </TabPane>
                <TabPane tabId="5">
                    <SellerPage setStoreSearch={setStoreSearch} storeData={storeData} />
                </TabPane>
                <TabPane tabId="6">
                    <TwoColumnBanner values={values} setFieldValue={setFieldValue} productData={productData} categoryData={categoryData} setSearch={setSearch} />
                </TabPane>
                <TabPane tabId="7">
                    <SliderProductTab values={values} setFieldValue={setFieldValue} description={true} productData={productData} setSearch={setSearch} />
                </TabPane>
                <TabPane tabId="8">
                    <FullWidthBanner4 values={values} setFieldValue={setFieldValue} productData={productData} categoryData={categoryData} setSearch={setSearch} />
                </TabPane>
                <TabPane tabId="9">
                    <ProductListTab values={values} setFieldValue={setFieldValue} productData={productData} setSearch={setSearch} />
                </TabPane>
                <TabPane tabId="10">
                    <FeatureBlog4 values={values} setFieldValue={setFieldValue} />
                </TabPane>
                <TabPane tabId="11">
                 <BrandsTab name={"brandIds"} setBrandSearch={setBrandSearch} brandData={brandData}  />
                </TabPane>
                <TabPane tabId="12">
                    <NewsLetter4 values={values} setFieldValue={setFieldValue} />
                </TabPane>
            </TabContent>
        </Col>
    )
})

export default AllTabsHomePage4