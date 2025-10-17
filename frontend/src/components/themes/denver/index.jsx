"use client";
import CustomHeading from "@/components/common/CustomHeading";
import WrapperComponent from "@/components/common/WrapperComponent";
import BannerData from "@/components/themes/common/bannerData";
import BrandData from "@/components/themes/common/brandData";
import CategoryStyle from "@/components/themes/common/categoryData/CategoryStyle";
import FourColProduct from "@/components/themes/common/fourColProduct";
import DenverBanner from "@/components/themes/common/homeBanner/DenverBanner";
import ImageLink from "@/components/themes/common/imageLink";
import NewsLetter from "@/components/themes/common/newsletter";
import ProductData from "@/components/themes/common/productData";
import TopSeller from "@/components/themes/common/topSeller";
import BrandIdsContext from "@/helper/brandIdsContext";
import ProductIdsContext from "@/helper/productIdsContext";
import SellerContext from '@/helper/sellerContext';
import ThemeOptionContext from "@/helper/themeOptionsContext";
import Loader from "@/layout/loader";
import StickyCart from "@/layout/stickyCart";
import request from "@/utils/axiosUtils";
import { HomePageAPI } from "@/utils/axiosUtils/API";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import { SliderCategoryOption7, osakaSliderOption, } from "../../../data/SliderSettingsData";

const DenverTheme = () => {
  const router = useRouter();
  const [sliderOptions, setSliderOptions] = useState(osakaSliderOption);
  const { themeOption } = useContext(ThemeOptionContext);
  const path = useSearchParams()
  const theme = path.get('theme')
  const { setGetBrandIds, brandIdsLoader } = useContext(BrandIdsContext);
  const {  isLoading:sellerContextLoader } = useContext(SellerContext);  
  const {setGetProductIds,isLoading: productLoader,filteredProduct,} = useContext(ProductIdsContext);
  const { data, isLoading, refetch } = useQuery({queryKey: ["denver"], queryFn: () => request({ url: HomePageAPI, params: { slug: "denver" } }), enabled: false,refetchOnWindowFocus: false,select: (res) => res?.data,});
  useEffect(() => {
   refetch();
  }, [isLoading]);

  useEffect(() => {
    if (data?.content?.products_ids?.length > 0) {
      setGetProductIds({ ids: Array.from(new Set(data?.content?.products_ids))?.join(","),paginate:data?.content?.products_ids.length });
    }
    if (data?.content?.brands?.brand_ids?.length > 0) {
      setGetBrandIds({ids: Array.from(new Set(data?.content?.brands?.brand_ids))?.join(","),});
    }
  }, [isLoading]);
  useEffect(() => {
    if ((theme == "denver") == false && themeOption?.product?.product_box_variant == "digital") {
      if (sliderOptions && sliderOptions?.slidesToShow) {
        setSliderOptions({
          ...sliderOptions,
          slidesToShow: 4, // Update for digital products
        });
      }
    } else {
      if (sliderOptions && sliderOptions?.slidesToShow) {
        setSliderOptions({
          ...sliderOptions,
          slidesToShow: 6, // Update for digital products
        });
      }
    }
  }, [themeOption?.product?.product_box_variant, theme]);

  useEffect(()=>{
    if (!isLoading) { 
      if (productLoader ||  ( data?.content?.brands?.status  && data?.content?.brands?.brand_ids?.length > 0 && brandIdsLoader) || (data?.content?.seller?.status && data?.content?.seller?.store_ids?.length > 0 && sellerContextLoader) ) {
        document.body.classList.add("skeleton-body");
      } else {
        document.body.classList.remove("skeleton-body");
      }
    }
  },[isLoading ,productLoader,brandIdsLoader ,sellerContextLoader ])
  if (isLoading) return <Loader />;

  return (
    <>
      {/* Home Banner Section*/}
      <DenverBanner dataAPI={data?.content} />

      {/* Horizontal Category Section*/}
      {data?.content?.categories_icon_list.status && (
        <WrapperComponent>
          <CategoryStyle theme="paris" style="horizontal" categoryIds={data?.content?.categories_icon_list?.category_ids} classes={{ noCustomClass: true, sliderOption: SliderCategoryOption7(data?.content?.categories_icon_list?.category_ids?.length) }} sliderKey="SliderCategoryOption7"/>
        </WrapperComponent>
      )}

      {/* Horizontal Product Section*/}
      {data?.content?.products_list_1?.status && (
        <WrapperComponent classes={{ sectionClass: "product-section-3" }}>
          <CustomHeading title={data?.content?.products_list_1?.title} noCustomClass={true} />
          <ProductData
            style="horizontal"
            slider={true}
            customSliderOption={sliderOptions}
            products={filteredProduct}
            dataAPI={data?.content?.products_list_1}
            noSectionClass={true}
            noWrapperRowCol={true}
            News
            Letter
            noCustomClass={true}
            classObj={{
              productStyle: "product-standard",
              productBoxClass: "product-box-bg",
            }}
            spaceClass={false}
          />
        </WrapperComponent>
      )}

      {/* Two Column Banner Section*/}
      {data?.content?.two_column_banners.status && (
        <WrapperComponent classes={{ sectionClass: "banner-section" }} noRowCol={true}>
          <Row className="g-sm-4 g-3">
            <Col lg={8}>
              <ImageLink classes={{ customHoverClass: "banner-contain  hover-effect" }} imgUrl={data?.content?.two_column_banners?.banner_1?.image_url} ratioImage={false} link={data?.content?.two_column_banners?.banner_1} height={248} width={1049} />
            </Col>
            <Col lg={4}>
              <ImageLink classes={{ customHoverClass: "banner-contain  hover-effect" }} imgUrl={data?.content?.two_column_banners?.banner_2?.image_url} ratioImage={false} link={data?.content?.two_column_banners?.banner_1} height={248} width={512} />
            </Col>
          </Row>
        </WrapperComponent>
      )}

      {/* Seller Section*/}
      {data?.content?.seller?.status && (
        <WrapperComponent>
          <div>
            <TopSeller dataAPI={data?.content?.seller?.store_ids} />
          </div>
        </WrapperComponent>
      )}

      <WrapperComponent classes={{ sectionClass: "top-selling-section" }} customCol={true}>
        {/* Seller Section*/}
        {data?.content?.slider_product_with_banner?.left_side_banners?.status && (
          <Col xl={3} lg={4} className="d-lg-block d-none">
            <ImageLink classes={{ customClass: "ratio_156", customHoverClass: "banner-contain hover-effect" }} imgUrl={data?.content?.slider_product_with_banner?.left_side_banners?.banner_1.image_url}  link={data?.content?.slider_product_with_banner1?.left_side_banners.banner_1} height={590} width={378} />
          </Col>
        )}

        {/* Four Column Product Section*/}
        {data?.content?.slider_product_with_banner?.slider_products?.status && (
          <Col xxl={!data?.content?.slider_product_with_banner?.left_side_banners?.status && 12} xl={data?.content?.slider_product_with_banner?.left_side_banners?.status && 9} lg={data?.content?.slider_product_with_banner?.left_side_banners?.status ? 8 : 12}>
            <FourColProduct
              dataAPI={data?.content?.slider_product_with_banner?.slider_products}
              classes={{
                colClass: { sm: 6, xl: 4 },
                customClass: "top-selling-box-section",
                fluidClass: "p-0",
                boxClass: "category-menu",
              }}
              customRow={true}
            />
          </Col>
        )}
      </WrapperComponent>

      {/* Banner Data*/}
      {data?.content?.coupon_banner?.status && (
        <WrapperComponent noRowCol={true}>
          <BannerData bannersData={data?.content?.coupon_banner} style="full_width" height={138} width={1585} />
        </WrapperComponent>
      )}

      {/* Horizontal Product Data*/}
      {data?.content?.products_list_2?.status && (
        <WrapperComponent classes={{ sectionClass: "product-section-3" }}>
          <CustomHeading title={data?.content?.products_list_2?.title} noCustomClass={true} />
          <ProductData
            style="horizontal"
            slider={true}
            customSliderOption={sliderOptions}
            products={filteredProduct}
            dataAPI={data?.content?.products_list_2}
            noSectionClass={true}
            noWrapperRowCol={true}
            noCustomClass={true}
            classObj={{
              productStyle: "product-solid",
              productBoxClass: "product-box-bg",
            }}
            spaceClass={false}
          />
        </WrapperComponent>
      )}

      {/* Horizontal Product Data*/}
      {data?.content?.products_list_3?.status && (
        <WrapperComponent classes={{ sectionClass: "product-section-3" }}>
          <CustomHeading title={data?.content?.products_list_3?.title} noCustomClass={true} />
          <ProductData
            style="horizontal"
            slider={true}
            customSliderOption={sliderOptions}
            products={filteredProduct}
            dataAPI={data?.content?.products_list_3}
            noSectionClass={true}
            noWrapperRowCol={true}
            noCustomClass={true}
            classObj={{
              productStyle: "product-solid",
              productBoxClass: "product-box-bg",
            }}
            spaceClass={false}
          />
        </WrapperComponent>
      )}

      {/* Horizontal Product Data*/}
      {data?.content?.brands?.brand_ids && data?.content?.brands?.status && (
        <div className="brand-effect ">
          <div className="container-fluid-lg">
            <BrandData dataAPI={data?.content?.brands?.brand_ids} height={113} width={70} />
          </div>
        </div>
      )}

      {/* News Letter Data*/}
      {data?.content?.news_letter?.status && <NewsLetter dataAPI={data?.content?.news_letter} />}

      {/* Sticky Cart Data*/}
      {themeOption?.general?.sticky_cart_enable && themeOption?.general?.cart_style !== "cart_sidebar" && <StickyCart />}
    </>
  );
};

export default DenverTheme;
