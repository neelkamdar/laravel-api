import request from "@/utils/axiosUtils";
import { Category, product } from "@/utils/axiosUtils/API";
import { useQuery } from "@tanstack/react-query";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { useTranslation } from "react-i18next";
import { Col, TabContent, TabPane } from "reactstrap";
import placeHolderImage from "../../../public/assets/images/placeholder.png";
import Loader from "../commonComponent/Loader";
import CheckBoxField from "../inputFields/CheckBoxField";
import SimpleInputField from "../inputFields/SimpleInputField";
import AppSettingsProductListTab from "./AppSettingsProductListTab";
import CategoriesImageList from "./CategoriesImageList";
import CouponTab from "./CouponTab";
import HomeBannerTab from "./HomeBannerTab";
import { useRouter } from "next/navigation";

const AppSettingHomePage = forwardRef(
  ({ activeTab, values, setFieldValue }, ref) => {
    
    const { t } = useTranslation("common");
    const [search, setSearch] = useState(false);
    const [customSearch, setCustomSearch] = useState("");
    const [tc, setTc] = useState(null);
    const router =useRouter()

    const {data: productData,isLoading: productLoader,refetch,} = useQuery({ queryKey: [product], queryFn: () =>request({url: product,params: {status: 1,search: customSearch ? customSearch : "",paginate:values["values"]?.["products_ids"]?.length > 15? values["values"]?.["products_ids"]?.length: 15,ids: customSearch? null: values["values"]["products_ids"].join() || null, with_union_products: values["values"]?.["products_ids"]?.length? values["values"]?.["products_ids"]?.length >= 15 ? 0 : 1 : 0,},},router),
      refetchOnWindowFocus: false,select: (res) => res?.data?.data.map((elem) => { return { id: elem.id, name: elem.name, image: elem?.product_thumbnail?.original_url || placeHolderImage, slug: elem?.slug,};}),});
    const { data: categoryData, isLoading: categoryLoader } = useQuery({ queryKey: [Category], queryFn: () => request({ url: Category, params: { status: 1, type: "product" } },router), refetchOnWindowFocus: false, select: (res) => res?.data?.data.map((elem) => { return { id: elem.id, name: elem.name, image: elem?.category_icon?.original_url || placeHolderImage, slug: elem?.slug,};})});

    useImperativeHandle(ref, () => ({ call() { refetch()},}));

    // Added debouncing
    useEffect(() => {
      if (tc) clearTimeout(tc);
      setTc(setTimeout(() => setCustomSearch(search), 500));
    }, [search]);
    // Getting users data on searching users
    useEffect(() => {
      refetch();
    }, [customSearch]);
    if (productLoader || categoryLoader) return <Loader />;
    return (
      <Col xl="7" lg="8">
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <HomeBannerTab values={values} setFieldValue={setFieldValue} productData={productData} categoryData={categoryData} setSearch={setSearch}/>
          </TabPane>
          <TabPane tabId="2">
            <CategoriesImageList values={values} setFieldValue={setFieldValue} categoryData={categoryData}/>
          </TabPane>
          <TabPane tabId="3">
            <AppSettingsProductListTab values={values} setFieldValue={setFieldValue} nameKey={"offer_products"} productData={productData} customName={"offer_productsImage"} setSearch={setSearch} description/>
          </TabPane>
          <TabPane tabId="4">
            <AppSettingsProductListTab values={values} setFieldValue={setFieldValue} nameKey={"section_1_products"} productData={productData} customName={"productListImage1"} setSearch={setSearch} description/>
          </TabPane>
          <TabPane tabId="5">
            <AppSettingsProductListTab values={values} setFieldValue={setFieldValue} nameKey={"section_2_products"} productData={productData} customName={"productListImage2"} setSearch={setSearch} description/>
          </TabPane>
          <TabPane tabId="6">
            <CouponTab values={values} setFieldValue={setFieldValue} />
          </TabPane>
          <TabPane tabId="7">
            <AppSettingsProductListTab values={values} setFieldValue={setFieldValue} nameKey={"section_3_products"} productData={productData} customName={"productListImage3"} setSearch={setSearch} description/>
          </TabPane>
          <TabPane tabId="8">
            <SimpleInputField nameList={[{ name: `[values][navigate_button][title]`, placeholder: t("enter_title"), title: "title",},{ name: `[values][navigate_button][button_text]`, placeholder: t("enter_button_text"),title: "button_text",},{ name: `[values][navigate_button][path]`, placeholder: t("enter_path"), title: "path",},]}/>
            <CheckBoxField name={`[values][navigate_button][status]`} title="status"/>
          </TabPane>
        </TabContent>
      </Col>
    );
  }
);

export default AppSettingHomePage;
