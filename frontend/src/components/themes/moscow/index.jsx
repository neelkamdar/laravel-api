import CustomHeading from "@/components/common/CustomHeading";
import WrapperComponent from "@/components/common/WrapperComponent";
import BannerData from "@/components/themes/common/bannerData";
import BrandData from "@/components/themes/common/brandData";
import CategoryStyle from "@/components/themes/common/categoryData/CategoryStyle";
import FourColProduct from "@/components/themes/common/fourColProduct";
import MoscowBanner from "@/components/themes/common/homeBanner/MoscowBanner";
import ImageLink from "@/components/themes/common/imageLink";
import NewsLetter from "@/components/themes/common/newsletter";
import ProductData from "@/components/themes/common/productData";
import ProductIdsContext from "@/helper/productIdsContext";
import ThemeOptionContext from "@/helper/themeOptionsContext";
import Loader from "@/layout/loader";
import StickyCart from "@/layout/stickyCart";
import request from "@/utils/axiosUtils";
import { HomePageAPI } from "@/utils/axiosUtils/API";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { Col } from "reactstrap";
import { categorySliderOption9, osakaSliderOption } from "../../../data/SliderSettingsData";

const MoscowDemo = () => {
  const router = useRouter();
  const [sliderOptions, setSliderOptions] = useState(osakaSliderOption);
  const { themeOption } = useContext(ThemeOptionContext);
  const path = useSearchParams();
  const theme = path.get("theme");
  const { setGetProductIds, isLoading: productLoader, filteredProduct } = useContext(ProductIdsContext);
  const { data, isLoading, refetch } = useQuery({queryKey: ["moscow"], queryFn: () => request({ url: HomePageAPI, params: { slug: "moscow" } }, router), enabled: false, refetchOnWindowFocus: false, select: (res) => res?.data });
  useEffect(() => {
    refetch();
  }, [isLoading]);

  useEffect(() => {
    if (data?.content?.products_ids?.length > 0) {
      setGetProductIds({ ids: Array.from(new Set(data?.content?.products_ids))?.join(","),paginate:data?.content?.products_ids.length });
    }
  }, [isLoading]);

  useEffect(() => {
    if ((theme == "moscow") == false && themeOption?.product?.product_box_variant == "digital") {
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

  useEffect(() => {
    if (!isLoading) {
      if (productLoader) {
        document.body.classList.add("skeleton-body");
      } else {
        document.body.classList.remove("skeleton-body");
      }
    }
  }, [isLoading, productLoader]);
  if (isLoading) return <Loader />;
  return (
    <>
      {/* Home Banner Section*/}
      <MoscowBanner dataAPI={data?.content} />

      {/* Category Section*/}
      {data?.content?.categories_icon_list?.status && (
        <WrapperComponent classes={{ sectionClass: "book-category" }} noRowCol={true}>
          <CategoryStyle theme="moscow" categoryIds={data?.content?.categories_icon_list?.category_ids} classes={{ sliderOption: categorySliderOption9(data?.content?.categories_icon_list?.category_ids?.length) }} />
        </WrapperComponent>
      )}

      {/* Horizontal Product  Section*/}
      {data?.content?.products_list_1?.status && (
        <WrapperComponent classes={{ sectionClass: "product-section-3" }}>
          <CustomHeading title={data?.content?.products_list_1?.title} noCustomClass={true} />
          <ProductData
            style="horizontal"
            slider={true}
            products={filteredProduct}
            dataAPI={data?.content?.products_list_1}
            noSectionClass={true}
            noWrapperRowCol={true}
            noCustomClass={true}
            classObj={{
              productStyle: "product-solid",
              productBoxClass: "product-box-bg",
            }}
            customSliderOption={sliderOptions}
            spaceClass={false}
          />
        </WrapperComponent>
      )}

      {/* Full Width Banner  Section*/}
      <WrapperComponent classes={{ fluidClass: "sale-banner" }}>
        <BannerData bannersData={data?.content?.coupons} style="full_width" height={138} width={1585} />
      </WrapperComponent>

      {/* Four Column Product Section*/}
      <WrapperComponent classes={{ sectionClass: "top-selling-section" }} customCol={true}>
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
        {data?.content?.slider_product_with_banner?.left_side_banners?.status && (
          <Col xl={3} lg={4} className="d-lg-block d-none">
            <ImageLink
              classes={{
                customClass: "ratio_156",
                customHoverClass: "banner-contain hover-effect",
              }}
              imgUrl={data?.content?.slider_product_with_banner?.left_side_banners?.banner_1?.image_url}
              ratioImage={false}
              width={650}
              height={500}
              elem={data?.content?.slider_product_with_banner?.left_side_banners?.banner_1}
            />
          </Col>
        )}
      </WrapperComponent>

      {/* Horizontal Product Section*/}
      {data?.content?.products_list_2?.status && (
        <WrapperComponent classes={{ sectionClass: "product-section-3" }}>
          <CustomHeading title={data?.content?.products_list_2?.title} noCustomClass={true} />
          <ProductData
            style="horizontal"
            slider={true}
            products={filteredProduct}
            dataAPI={data?.content?.products_list_2}
            noSectionClass={true}
            noWrapperRowCol={true}
            noCustomClass={true}
            classObj={{
              productStyle: "product-solid",
              productBoxClass: "product-box-bg",
            }}
            customSliderOption={osakaSliderOption}
            spaceClass={false}
          />
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

      {/* NewsLetter  Section*/}
      {data?.content?.news_letter?.status && <NewsLetter dataAPI={data?.content?.news_letter} />}

      {/* Sticky Cart Section*/}
      {themeOption?.general?.sticky_cart_enable && themeOption?.general?.cart_style !== "cart_sidebar" && <StickyCart />}
    </>
  );
};

export default MoscowDemo;
