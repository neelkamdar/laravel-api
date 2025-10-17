import Loader from "@/components/commonComponent/Loader";
import request from "@/utils/axiosUtils";
import { BrandAPI, Category, product } from "@/utils/axiosUtils/API";
import { useQuery } from "@tanstack/react-query";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Col, TabContent, TabPane } from "reactstrap";
import placeHolderImage from "../../../../public/assets/images/placeholder.png";
import NewsLetterTab from "../homePage1/NewsLetterTab";
import ProductList1Tab from "../homePage5/ProductList1Tab";
import CategoryIconListTab7 from "./CategoryIconListTab7";
import FullWidthBanner7 from "./FullWidthBanner7";
import HomeBanner7Tab from "./HomeBanner7Tab";
import SliderProductTab from "./SliderProductTab";
import BrandsTab from "../homePage1/BrandsTab";
import { useRouter } from "next/navigation";

const AllTabsHomePage7 = forwardRef(
  ({ activeTab, values, setFieldValue }, ref) => {
    const [search, setSearch] = useState(false);
    const [customSearch, setCustomSearch] = useState("");
    const [tc, setTc] = useState(null);
    const [brandSearch, setBrandSearch] = useState(false);
    const [brandCustomSearch, setBrandCustomSearch] = useState("");
    const [brandTc, setBrandTc] = useState(null);
    const router = useRouter()
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
  const { data: categoryData, isLoading: categoryLoader, refetch: categoryRefetch } = useQuery({ queryKey: [Category], queryFn: () => request({ url: Category, params: { status: 1, type: 'product' } },router),
      enabled:true,refetchOnWindowFocus: false, select: (res) => res?.data?.data?.map((elem) => { return { id: elem.id, name: elem.name, image: elem?.category_icon?.original_url || placeHolderImage, slug: elem?.slug } })
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
            <HomeBanner7Tab values={values} setFieldValue={setFieldValue} productData={productData} categoryData={categoryData} setSearch={setSearch}
            />
          </TabPane>
            <TabPane tabId="2">
                <CategoryIconListTab7 values={values} setFieldValue={setFieldValue} categoryData={categoryData} />
            </TabPane>
            <TabPane tabId="3">
                <ProductList1Tab values={values} setFieldValue={setFieldValue} nameKey={'products_list_1'} productData={productData} customName={"productListImage1"} setSearch={setSearch} />
            </TabPane>
            <TabPane tabId="4">
            <FullWidthBanner7 values={values} setFieldValue={setFieldValue} productData={productData} categoryData={categoryData} setSearch={setSearch} />
            </TabPane>
            <TabPane tabId="5">
              <SliderProductTab values={values} setFieldValue={setFieldValue} productData={productData} categoryData={categoryData} setSearch={setSearch} />
            </TabPane>
            <TabPane tabId="6">
                <ProductList1Tab values={values} setFieldValue={setFieldValue} nameKey={'products_list_2'} productData={productData} customName={"productListImage2"} setSearch={setSearch} />
            </TabPane>
            <TabPane tabId="7">
              <BrandsTab name={"brandIds"}  setBrandSearch={setBrandSearch} brandData={brandData} />
            </TabPane>
            <TabPane tabId="8">
              <NewsLetterTab values={values} setFieldValue={setFieldValue} />
            </TabPane>

        </TabContent>
      </Col>
    );
  }
);

export default AllTabsHomePage7;
