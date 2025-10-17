"use client";
import { LeafSVG } from "@/components/common/CommonSVG";
import CustomHeading from "@/components/common/CustomHeading";
import WrapperComponent from "@/components/common/WrapperComponent";
import BrandData from "@/components/themes/common/brandData";
import CategoryStyle from "@/components/themes/common/categoryData/CategoryStyle";
import BerlinBanner from "@/components/themes/common/homeBanner/BerlinBanner";
import ImageLink from "@/components/themes/common/imageLink";
import NewsLetter from "@/components/themes/common/newsletter";
import ProductData from "@/components/themes/common/productData";
import ServiceBanner from "@/components/themes/common/serviceBanner";
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
import { categorySliderOption7, productSliderOptions5 } from "../../../data/SliderSettingsData";

const BerlinTheme = () => {
  const router = useRouter();
  const [sliderOptions, setSliderOptions] = useState(productSliderOptions5);
  const { themeOption } = useContext(ThemeOptionContext);
  const path = useSearchParams()
  const theme = path.get('theme')
  const { setGetProductIds, isLoading: productLoader, filteredProduct, } = useContext(ProductIdsContext);
  const { setGetBrandIds, brandIdsLoader } = useContext(BrandIdsContext);
  const {  isLoading:sellerContextLoader } = useContext(SellerContext);  
  const { data, isLoading, refetch } = useQuery({queryKey: ["berlin"], queryFn: () => request({ url: HomePageAPI, params: { slug: "berlin" } }),
    enabled: false,
    refetchOnWindowFocus: false,
    select: (res) => res?.data,
  });
  useEffect(() => {
    refetch();
  }, [isLoading]);

  useEffect(() => {
    if (data?.content?.products_ids?.length > 0) {
      setGetProductIds({ids: Array.from(new Set(data?.content?.products_ids))?.join(","),paginate:data?.content?.products_ids.length  });
    }
    if (data?.content?.brands?.brand_ids?.length > 0) {
      setGetBrandIds({ids: Array.from(new Set(data?.content?.brands?.brand_ids))?.join(","),});
    }
  }, [isLoading]);

  useEffect(() => {
    if ((theme == "berlin") == false && themeOption?.product?.product_box_variant == "digital") {
      if (sliderOptions && sliderOptions?.slidesToShow) {
        setSliderOptions({
          ...sliderOptions,
          slidesToShow: 3, // Update for digital products
        });
      }
    } else {
      if (sliderOptions && sliderOptions?.slidesToShow) {
        setSliderOptions({
          ...sliderOptions,
          slidesToShow: 5, // Update for digital products
        });
      }
    }
  }, [themeOption?.product?.product_box_variant, theme]);

  // }, [themeOption?.product?.product_box_variant,theme]);

  useEffect(()=>{
    if (!isLoading) { 
      if (productLoader  || ( data?.content?.brands?.status && data?.content?.brands?.brand_ids?.length > 0 && brandIdsLoader) || ( data?.content?.main_content?.seller?.status && data?.content?.main_content?.seller.store_ids?.length > 0 &&  sellerContextLoader) ) {
        document.body.classList.add("skeleton-body");
      } else {
        document.body.classList.remove("skeleton-body");
      }
    }
  },[isLoading ,productLoader ,brandIdsLoader,sellerContextLoader ])
  
  if (isLoading) return <Loader />;
  return (
    <>
      {/* Home Banner Section*/}
      <BerlinBanner dataAPI={data?.content?.home_banner} />

      {/* Service Banner Section*/}
      {data?.content?.services_banner?.status && <ServiceBanner serviceData={data?.content.services_banner.services} />}

      {/* Left Section*/}
      {data?.content?.main_content?.status && (
        <WrapperComponent classes={{ sectionClass: "product-section", row: "g-sm-4 g-3" }} customCol={true}>
          <Col xxl={data?.content?.main_content?.section1_products?.status ? 9 : 12} xl={data?.content?.main_content?.section1_products?.status ? 8 : 12}>
            {/* Horizontal Product Section*/}
            {data?.content?.main_content.section1_products.status && (
              <>
                <CustomHeading title={data?.content?.main_content?.section1_products?.title} svgUrl={<LeafSVG className="icon-width" />} subTitle={data?.content?.main_content?.section1_products.description} noCustomClass={true} />
                <ProductData
                  style="horizontal"
                  slider={true}
                  customSliderOption={sliderOptions}
                  products={filteredProduct}
                  dataAPI={data?.content?.main_content?.section1_products}
                  classObj={{
                    productStyle: "product-classic",
                    productBoxClass: "product-box-bg",
                  }}
                  noCustomClass={true}
                />
              </>
            )}

            {/* Horizontal Category Section*/}
            {data?.content?.main_content?.section2_categories_icon_list?.status && (
              <>
                <CustomHeading title={data?.content?.main_content?.section2_categories_icon_list?.title} svgUrl={<LeafSVG className="icon-width" />} subTitle={data?.content?.main_content?.section2_categories_icon_list?.description} noCustomClass={true} />
                <CategoryStyle theme="paris" style="horizontal" categoryIds={data?.content?.main_content?.section2_categories_icon_list?.category_ids} classes={{ sliderOption: categorySliderOption7 }} sliderKey="categorySliderOption7" />
              </>
            )}

            {/* Two Banner Section*/}
            {data?.content?.main_content?.section3_two_column_banners?.status && (
              <div className="section-t-space section-b-space">
                <Row className="g-md-4 g-3 ratio_30">
                  <Col md={6}>
                    <ImageLink
                      classes={{
                        customHoverClass: "banner-contain hover-effect b-left",
                      }}
                      imgUrl={data?.content?.main_content?.section3_two_column_banners?.banner_1?.image_url}
                      ratioImage={false}
                      link={data?.content?.main_content?.section3_two_column_banners?.banner_1}
                      height={156}
                      width={579}
                    />
                  </Col>
                  <Col md={6}>
                    <ImageLink
                      classes={{
                        customHoverClass: "banner-contain hover-effect b-left",
                      }}
                      imgUrl={data?.content?.main_content?.section3_two_column_banners?.banner_2?.image_url}
                      ratioImage={false}
                      link={data?.content?.main_content?.section3_two_column_banners?.banner_2}
                      height={156}
                      width={579}
                    />
                  </Col>
                </Row>
              </div>
            )}

            {/* Horizontal Product Section*/}
            {data?.content?.main_content.section4_products.status && (
              <>
                <CustomHeading title={data?.content?.main_content?.section4_products?.title} svgUrl={<LeafSVG className="icon-width" />} subTitle={data?.content?.main_content?.section4_products.description} noCustomClass={true} />
                <ProductData
                  style="horizontal"
                  slider={true}
                  products={filteredProduct}
                  customSliderOption={sliderOptions}
                  dataAPI={data?.content?.main_content?.section4_products}
                  classObj={{
                    productStyle: "product-classic",
                    productBoxClass: "product-box-bg",
                  }}
                  noCustomClass={true}
                />
              </>
            )}

            {/* Seller Section*/}
            {data?.content?.main_content?.seller?.status && (
              <>
                <CustomHeading title={data?.content?.main_content?.seller?.title} svgUrl={<LeafSVG className="icon-width" />} subTitle={data?.content?.main_content?.seller?.description} noCustomClass={true} />
                <TopSeller dataAPI={data?.content?.main_content?.seller.store_ids} paddingClass="p-0" />
              </>
            )}
          </Col>

          {/* Vertical Banner Section*/}
          {data?.content?.main_content?.sidebar?.status && (
            <Col xxl={3} xl={4} className="d-none d-xl-block">
              <div className="p-sticky">
                {data?.content?.main_content?.sidebar?.categories_icon_list?.status && <CategoryStyle style="vertical" categoryIds={data?.content?.main_content?.sidebar?.categories_icon_list?.category_ids} classes={{ sliderClass: "feature-panel-slider" }}></CategoryStyle>}

                {data?.content?.main_content?.sidebar?.right_side_banners?.status && (
                  <ImageLink
                    classes={{
                      customClass: "ratio_156 section-t-space",
                      customHoverClass: "home-contain hover-effect",
                    }}
                    imgUrl={data?.content?.main_content?.sidebar?.right_side_banners?.banner_1?.image_url}
                    ratioImage={true}
                    link={data?.content?.main_content?.sidebar?.right_side_banners?.banner_1}
                    height={245}
                    width={378}
                  />
                )}

                {/* Vertical Product Section*/}
                {data?.content?.main_content?.section1_products?.status && (
                  <div className="section-t-space">
                    <div className="category-menu">
                      <h3>{data?.content?.main_content?.sidebar?.sidebar_products?.title}</h3>
                      <ProductData style="vertical" products={filteredProduct} dataAPI={data?.content?.main_content?.sidebar?.sidebar_products} />
                    </div>
                  </div>
                )}
              </div>
            </Col>
          )}
        </WrapperComponent>
      )}

      {/* Full Width Banner Section*/}
      {data?.content?.full_width_banner && (
        <WrapperComponent>
          <ImageLink classes={{ customHoverClass: "banner-contain hover-effect b-left" }} imgUrl={data?.content?.full_width_banner?.image_url} ratioImage={false} link={data?.content?.full_width_banner} height={343} width={1524} />
        </WrapperComponent>
      )}

      {/* Classic Product Section*/}
      {data?.content?.product_list_1?.status && (
        <WrapperComponent>
          <CustomHeading title={data?.content?.product_list_1?.title} svgUrl={<LeafSVG className="icon-width" />} subTitle={data?.content?.product_list_1?.description} noCustomClass={true} />
          <ProductData style="classic" slider={true} customSliderOption={sliderOptions} products={filteredProduct} dataAPI={data?.content?.product_list_1} classObj={{ productStyle: "product-modern", productBoxClass: "" }} spaceClass={false} />
        </WrapperComponent>
      )}

      {/* Brand  Section*/}
      {data?.content?.brands?.brand_ids && data?.content?.brands?.status && (
        <div className="brand-effect ">
          <div className="container-fluid-lg">
            <BrandData dataAPI={data?.content?.brands?.brand_ids} height={113} width={70} />
          </div>
        </div>
      )}

      {/* News Letter  Section*/}
      {data?.content?.news_letter?.status && <NewsLetter dataAPI={data?.content?.news_letter} />}

      {/* Sticky Cart  Section*/}
      {themeOption?.general?.sticky_cart_enable && themeOption?.general?.cart_style !== "cart_sidebar" && <StickyCart />}
    </>
  );
};

export default BerlinTheme;
