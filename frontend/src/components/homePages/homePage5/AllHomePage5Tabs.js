import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { TabPane } from 'reactstrap'
import HomeBanner5Tab from './HomeBanner5Tab'
import FeatureBannerTab from '../homePage1/FeatureBannerTab'
import CategoriesImageList from '../homePage4/CategoriesImageList'
import ProductListCategory6Tab from './ProductListCategory6Tab'
import OrderTabs from './OrderTabs'
import { useQuery } from '@tanstack/react-query'
import { BrandAPI, Category, product, store } from '../../../utils/axiosUtils/API'
import request from '../../../utils/axiosUtils'
import placeHolderImage from "../../../../public/assets/images/placeholder.png";
import Loader from '../../commonComponent/Loader'
import { useRouter } from 'next/navigation'

const AllHomePage5Tabs = forwardRef(({ values, setFieldValue }, ref) => {
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
 const { data:storeData ,refetch:storeRefetch  } =useQuery({ queryKey: [store], queryFn: ()=>request({url:store,params:{status:1,search: storeCustomSearch ? storeCustomSearch : '',}}), refetchOnWindowFocus:false, select:(res)=> res?.data?.data?.map((elem)=> {return{ id:elem.id,name:elem?.store_name,slug:elem?.slug }})})

  // Added debouncing
  useEffect(() => {
      if (storeTc) clearTimeout(storeTc);
      setStoreTc(setTimeout(() => setStoreCustomSearch(storeSearch), 500));
  }, [storeSearch])
  // Getting users data on searching users
  useEffect(() => {
      storeRefetch()
  }, [storeCustomSearch])   
   
    const { data: brandData, refetch: brandRefetch } = useQuery({ queryKey: [BrandAPI], queryFn: () =>request({url: BrandAPI,params: {status: 1,search: brandCustomSearch ? brandCustomSearch : "",},}), refetchOnWindowFocus: false,select: (res) =>res?.data?.data?.map((elem) => {return { id: elem.id, name: elem?.name, slug: elem?.slug };}),});
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
        <>
            <TabPane tabId="1">
                <HomeBanner5Tab values={values} setFieldValue={setFieldValue} productData={productData} categoryData={categoryData} setSearch={setSearch} />
            </TabPane>
            <TabPane tabId="2">
                <FeatureBannerTab values={values} setFieldValue={setFieldValue} isDiscount={false} isButtonText={true} productData={productData} categoryData={categoryData} setSearch={setSearch} />
            </TabPane>
            <TabPane tabId="3">
                <CategoriesImageList values={values} setFieldValue={setFieldValue} categoryData={categoryData} />
            </TabPane>
            <TabPane tabId="4">
                <ProductListCategory6Tab values={values} setFieldValue={setFieldValue} productName={'product1ProductIds'} nameKey={'products_list_1'} productData={productData} setSearch={setSearch} />
            </TabPane>
            <OrderTabs storeData={storeData} brandData={brandData} setBrandSearch={setBrandSearch} setStoreSearch={setStoreSearch}  values={values} setFieldValue={setFieldValue} productData={productData} categoryData={categoryData} setSearch={setSearch} />
        </>
    )
})
export default AllHomePage5Tabs