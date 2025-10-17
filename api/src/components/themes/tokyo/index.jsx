"use client";
import { CakeSVG } from "@/components/common/CommonSVG";
import CustomHeading from "@/components/common/CustomHeading";
import WrapperComponent from "@/components/common/WrapperComponent";
import BannerData from "@/components/themes/common/bannerData/index";
import BrandData from "@/components/themes/common/brandData";
import CategoryStyle from "@/components/themes/common/categoryData/CategoryStyle";
import FourColProduct from "@/components/themes/common/fourColProduct/index";
import TokyoBanner from "@/components/themes/common/homeBanner/TokyoBanner";
import ImageLink from "@/components/themes/common/imageLink";
import NewsLetter from "@/components/themes/common/newsletter";
import ProductData from "@/components/themes/common/productData";
import SliderBanner from "@/components/themes/common/sliderBanner/index";
import BrandIdsContext from "@/helper/brandIdsContext";
import ProductIdsContext from "@/helper/productIdsContext";
import ThemeOptionContext from "@/helper/themeOptionsContext";
import Loader from "@/layout/loader";
import StickyCart from "@/layout/stickyCart";
import request from "@/utils/axiosUtils";
import { HomePageAPI } from "@/utils/axiosUtils/API";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { Col } from "reactstrap";
import { categorySliderOption9 ,productSliderOptions6} from "../../../data/SliderSettingsData";

const TokyoTheme = () => {
  const { themeOption } = useContext(ThemeOptionContext);
  const { setGetBrandIds, brandIdsLoader } = useContext(BrandIdsContext);
  const { setGetProductIds, isLoading: productLoader, filteredProduct } = useContext(ProductIdsContext);
  const productOptions = { ...productSliderOptions6 };
  const [sliderOptions, setSliderOptions] = useState(productOptions);
  const path = useSearchParams();
  const theme = path.get("theme");

  const { data, isLoading, refetch } = useQuery({queryKey: ["tokyo"], queryFn: () => request({ url: HomePageAPI, params: { slug: "tokyo" } }), enabled: true, refetchOnWindowFocus: false, select: (res) => res?.data });
  useEffect(() => {
    const headerTops = document.getElementsByClassName("header-top");

    let timer = setTimeout(() => {
      for (const headerTop of headerTops) {
        headerTop.classList.add("bg-dark");
      }
    }, 0);

    return () => {
      // document.documentElement.style.removeProperty('--theme-color');
      for (const headerTop of headerTops) {
        headerTop.classList.remove("bg-dark");
      }
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (data?.content?.products_ids?.length > 0) {
      setGetProductIds({ ids: Array.from(new Set(data?.content?.products_ids))?.join(",")});
    }
    if (data?.content?.brands?.brand_ids?.length > 0) {
      setGetBrandIds({ ids: Array.from(new Set(data?.content?.brands?.brand_ids))?.join(",") });
    }
  }, [isLoading]);

  useEffect(() => {
      if (theme !== 'tokyo' && themeOption?.product?.product_box_variant == 'digital') {
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

  // useEffect(() => {
  //   if ((theme == "tokyo") == false && themeOption?.product?.product_box_variant == "digital") {
  //     setSliderOptions({ ...productOptions, slidesToShow: 3, infinite: data?.content?.main_content?.section1_products?.product_ids?.length > productOptions.slidesToShow || data?.content?.main_content?.section2_slider_products?.product_ids?.length > productOptions.slidesToShow || data?.content?.main_content?.section3_products?.product_ids?.length > productOptions.slidesToShow || data?.content?.main_content?.section4_products?.product_ids?.length > productOptions.slidesToShow });
  //   } else {
  //     setSliderOptions({ ...productOptions, slidesToShow: 5, infinite: data?.content?.main_content?.section1_products?.product_ids?.length > productOptions.slidesToShow || data?.content?.main_content?.section2_slider_products?.product_ids?.length > productOptions.slidesToShow || data?.content?.main_content?.section3_products?.product_ids?.length > productOptions.slidesToShow || data?.content?.main_content?.section4_products?.product_ids?.length > productOptions.slidesToShow });
  //   }
  // }, [themeOption?.product?.product_box_variant, theme]);

  useEffect(() => {
    refetch();
  }, [isLoading]);

  useEffect(() => {
    if (!isLoading) {
      if ((data?.content?.products_ids?.length > 0 && productLoader) || (data?.content?.brands?.status && data?.content?.brands?.brand_ids?.length > 0 && brandIdsLoader)) {
        document.body.classList.add("skeleton-body");
      } else {
        document.body.classList.remove("skeleton-body");
      }
    }
  }, [isLoading, productLoader, brandIdsLoader]);
  if (isLoading) return <Loader />;
  return (
    <>
      {/* Home Banner Section*/}
      <TokyoBanner dataAPI={data?.content?.home_banner} />

      {/* categories Section*/}
      {data?.content?.categories_icon_list?.status && (
        <WrapperComponent>
          <CategoryStyle theme="paris" style="horizontal" categoryIds={data?.content.categories_icon_list.category_ids} classes={{ sliderOption: categorySliderOption9(data?.content.categories_icon_list?.category_ids?.length) }} sliderKey='categorySliderOption9' />
        </WrapperComponent>
      )}

      {/* Coupon Banner Section*/}
      {data?.content?.coupons.status && (
        <WrapperComponent customCol={true}>
          <BannerData bannersData={data?.content?.coupons} style="full_width" height={138} width={1585} bannerClass="sale-banner" />
        </WrapperComponent>
      )}

      {/* Slider Banner Section*/}
      {data?.content?.featured_banners?.status && data?.content?.featured_banners?.banners?.length > 0 && <SliderBanner bannersData={data?.content?.featured_banners?.banners} />}

      {/* Product Card Section*/}
      {data?.content?.main_content?.sidebar?.status && (
        <WrapperComponent classes={{ row: "g-3" }} customCol={true}>
          <Col xxl={data?.content?.main_content?.sidebar?.status ? 9 : 12} xl={data?.content?.main_content?.sidebar?.status ? 8 : 12}>
            {/* Horizontal Product  Section*/}
            {data?.content?.main_content?.section1_products?.status && (
              <>
                <CustomHeading title={data?.content?.main_content?.section1_products?.title} svgUrl={<CakeSVG className="icon-width" />} subTitle={data?.content?.main_content?.section1_products?.description} noCustomClass={true} />
                <ProductData style="horizontal" slider={true} customSliderOption={sliderOptions} products={filteredProduct} dataAPI={data?.content?.main_content?.section1_products} classObj={{ productStyle: "product-modern", productBoxClass: "" }} />
              </>
            )}
            {/* Classic Product Section*/}
            {data?.content?.main_content?.section2_slider_products?.status && (
              <>
                <CustomHeading title={data?.content?.main_content?.section2_slider_products?.title} svgUrl={<CakeSVG className="icon-width" />} subTitle={data?.content?.main_content?.section2_slider_products?.description} noCustomClass={true} />
                <div className="section-b-space">
                  <ProductData style="classic" slider={true} customSliderOption={sliderOptions} products={filteredProduct} dataAPI={data?.content?.main_content?.section2_slider_products} classObj={{ productStyle: "product-standard", productBoxClass: "product-box-bg" }} />
                </div>
              </>
            )}

            {/* Horizontal Product Section*/}
            {data?.content?.main_content?.section3_products?.status && (
              <>
                <CustomHeading title={data?.content?.main_content?.section3_products?.title} svgUrl={<CakeSVG className="icon-width" />} subTitle={data?.content?.main_content?.section3_products?.description} noCustomClass={true} />
                <ProductData style="horizontal" slider={true} customSliderOption={sliderOptions} products={filteredProduct} dataAPI={data?.content?.main_content?.section3_products} classObj={{ productStyle: "product-standard", productBoxClass: "product-box-bg" }} />
              </>
            )}
            {/* Horizontal Product Section*/}
            {data?.content?.main_content?.section4_products?.status && (
              <>
                <CustomHeading title={data?.content?.main_content?.section4_products?.title} svgUrl={<CakeSVG className="icon-width" />} subTitle={data?.content?.main_content?.section4_products?.description} noCustomClass={true} />
                <ProductData style="horizontal" slider={true} customSliderOption={sliderOptions} products={filteredProduct} dataAPI={data?.content?.main_content?.section4_products} classObj={{ productStyle: "product-standard", productBoxClass: "product-box-bg" }} paddingClass="p-0" />
              </>
            )}
          </Col>
          {/* Vertical Banner Section*/}
          {data?.content?.main_content?.sidebar?.status && (
            <Col xxl={3} xl={4} className="d-none d-xl-block">
              <div className="position-sticky top-0">
                <ImageLink classes={{ customClass: "ratio_209 rounded", customHoverClass: "banner-contain rounded hover-effect" }} imgUrl={data?.content?.main_content?.sidebar?.right_side_banners.banner_1?.image_url} link={data?.content?.main_content?.sidebar?.right_side_banners?.banner_1} height={245} width={378} />
                <ImageLink classes={{ customClass: "ratio_125 section-t-space", customHoverClass: "banner-contain rounded hover-effect" }} imgUrl={data?.content?.main_content?.sidebar?.right_side_banners.banner_1?.image_url} link={data?.content?.main_content?.sidebar?.right_side_banners?.banner_2} height={245} width={378} />
              </div>
            </Col>
          )}
        </WrapperComponent>
      )}
      {/* Full Width Banner Section*/}
      {data?.content?.full_width_banner?.status && (
        <WrapperComponent>
          <ImageLink classes={{ customHoverClass: "banner-contain hover-effect b-left" }} imgUrl={data?.content?.full_width_banner?.image_url} ratioImage={false} link={data?.content?.full_width_banner} height={343} width={1524} />
        </WrapperComponent>
      )}
      {/* Four Colum Product Section*/}
      {data?.content?.slider_products?.status && (
        <WrapperComponent>
          <FourColProduct dataAPI={data?.content?.slider_products} classes={{ colClass: { sm: 6, xl: 4, xxl: 3 } }} />
        </WrapperComponent>
      )}

      {/* Brand Section*/}
      {data?.content?.brands?.brand_ids && data?.content?.brands?.status && (
        <div className="brand-effect ">
          <div className="container-fluid-lg">
            <BrandData dataAPI={data?.content?.brands?.brand_ids} height={113} width={70} />
          </div>
        </div>
      )}

      {/* NewsLetter Section*/}
      {data?.content?.news_letter?.status && <NewsLetter dataAPI={data?.content?.news_letter} />}

      {/* Sticky Cart Section*/}
      {themeOption?.general?.sticky_cart_enable && themeOption?.general?.cart_style !== "cart_sidebar" && <StickyCart />}
    </>
  );
};

export default TokyoTheme;
