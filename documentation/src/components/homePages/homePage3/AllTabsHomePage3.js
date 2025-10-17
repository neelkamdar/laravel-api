import { Col, TabContent, TabPane } from 'reactstrap'
import HomeBannerTab from "./HomeBannerTab";
import CategoryIconList from "./CategoryIconList";
import CouponTab from "./CouponTab";
import ProductList1Tab from "./ProductList1Tab";
import OfferBannerTab from "./OfferBannerTab";
import ProductList2Tab from "./ProductList2Tab";
import ProductBundleTab from "./ProductBundleTab";
import NewsLetterTab from "./NewsLetterTab";
import FeatureBlogTab from "./FeatureBlogTab";
import SliderProductTab from "./SliderProductTab";
import { useQuery } from '@tanstack/react-query';
import { BrandAPI, Category, product, store } from '../../../utils/axiosUtils/API';
import request from '../../../utils/axiosUtils';
import placeHolderImage from "../../../../public/assets/images/placeholder.png";
import Loader from '../../commonComponent/Loader';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import BrandsTab from '../homePage1/BrandsTab';
import SellerPage from './SellerPage';
import { useRouter } from 'next/navigation';

const AllTabsHomePage3 = forwardRef(({ activeTab, values, setFieldValue }, ref) => {
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
    const { data:storeData ,refetch:storeRefetch  } =useQuery({ queryKey: [store], queryFn: () => request({url:store,params:{status:1,search: storeCustomSearch ? storeCustomSearch : '',}},router), refetchOnWindowFocus:false, select:(res)=> res?.data?.data?.map((elem)=> { return{ id:elem.id,name:elem?.store_name,slug:elem?.slug }})})
  
     // Added debouncing
     useEffect(() => {
         if (storeTc) clearTimeout(storeTc);
         setStoreTc(setTimeout(() => setStoreCustomSearch(storeSearch), 500));
     }, [storeSearch])
     // Getting users data on searching users
     useEffect(() => {
         storeRefetch()
     }, [storeCustomSearch])   
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
  const { data: brandData, refetch: brandRefetch } = useQuery({ queryKey: [BrandAPI], queryFn: () => request({url: BrandAPI,params: {status: 1,search: brandCustomSearch ? brandCustomSearch : "",},},router), refetchOnWindowFocus: false,select: (res) =>res?.data?.data?.map((elem) => {return { id: elem.id, name: elem?.name, slug: elem?.slug };}),});
  // Added debouncing
  useEffect(() => {
    if (brandTc) clearTimeout(brandTc);
    setBrandTc(setTimeout(() => setBrandCustomSearch(brandSearch), 500));
  }, [brandSearch]);
  // Getting users data on searching users
  useEffect(() => {
    brandRefetch();
  }, [brandCustomSearch]);
    if (productLoader || categoryLoader) return <Loader />
    return (
        <Col xl="7" lg="8">
            <TabContent activeTab={activeTab}>
                <TabPane tabId="1"><HomeBannerTab values={values} setFieldValue={setFieldValue} categoryData={categoryData} productData={productData} setSearch={setSearch} /></TabPane>
                <TabPane tabId="2"><CategoryIconList values={values} setFieldValue={setFieldValue} isTitleDescription={true} categoryData={categoryData} /></TabPane>
                <TabPane tabId="3"><CouponTab values={values} setFieldValue={setFieldValue} categoryData={categoryData} productData={productData} setSearch={setSearch} /></TabPane>
                <TabPane tabId="4"><ProductList1Tab values={values} setFieldValue={setFieldValue} productData={productData} setSearch={setSearch} /></TabPane>
                <TabPane tabId="5"><OfferBannerTab values={values} setFieldValue={setFieldValue} categoryData={categoryData} productData={productData} setSearch={setSearch} /></TabPane>
                <TabPane tabId="6"><SellerPage setStoreSearch={setStoreSearch} storeData={storeData} name={"seller_ids"}   /></TabPane>
                <TabPane tabId="7"><ProductList2Tab values={values} setFieldValue={setFieldValue} productData={productData} setSearch={setSearch} /></TabPane>
                <TabPane tabId="8"><ProductBundleTab values={values} setFieldValue={setFieldValue} /></TabPane>
                <TabPane tabId="9"><SliderProductTab values={values} setFieldValue={setFieldValue} productData={productData} setSearch={setSearch} /></TabPane>
                <TabPane tabId="10"><FeatureBlogTab values={values} setFieldValue={setFieldValue} /></TabPane>
                <TabPane tabId="11"><BrandsTab setBrandSearch={setBrandSearch} brandData={brandData} name={"brand_ids"}  /></TabPane>
                <TabPane tabId="12"><NewsLetterTab values={values} setFieldValue={setFieldValue} /></TabPane>
            </TabContent>
        </Col>
    )
})
export default AllTabsHomePage3