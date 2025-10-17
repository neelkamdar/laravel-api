"use client";
import CustomHeading from "@/components/common/CustomHeading";
import NoDataFound from "@/components/common/NoDataFound";
import WrapperComponent from "@/components/common/WrapperComponent";
import BankOfferData from "@/components/themes/common/bankOfferData";
import BannerData from "@/components/themes/common/bannerData";
import BlogData from "@/components/themes/common/blogData";
import BrandData from "@/components/themes/common/brandData";
import CategoryStyle from "@/components/themes/common/categoryData/CategoryStyle";
import MadridBanner from "@/components/themes/common/homeBanner/MadridBanner";
import ImageLink from "@/components/themes/common/imageLink";
import ProductData from "@/components/themes/common/productData";
import SliderBanner from "@/components/themes/common/sliderBanner";
import TopSeller from "@/components/themes/common/topSeller";
import BlogIdsContext from "@/helper/blogIdsContext";
import BrandIdsContext from "@/helper/brandIdsContext";
import ProductIdsContext from "@/helper/productIdsContext";
import SellerContext from "@/helper/sellerContext";
import ThemeOptionContext from "@/helper/themeOptionsContext";
import Loader from "@/layout/loader";
import request from "@/utils/axiosUtils";
import { HomePageAPI } from "@/utils/axiosUtils/API";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import { categorySliderOption8, madridFeatureBlog, madridFullSlider } from "../../../data/SliderSettingsData";
import SpecialOffer from "./common/SpecialOffer";

const MadridTheme = () => {
  const router = useRouter();
  const [sliderOptions, setSliderOptions] = useState(6);
  const [enableDeal, setEnableDeal] = useState(true);
  const { themeOption } = useContext(ThemeOptionContext);
  const { setGetProductIds, isLoading: productLoader, filteredProduct } = useContext(ProductIdsContext);
  const { setGetBlogIds, blogIdsLoader, filteredBlog, getBlogIds } = useContext(BlogIdsContext);
  const { setGetBrandIds, brandIdsLoader } = useContext(BrandIdsContext);
  const { isLoading: sellerContextLoader } = useContext(SellerContext);
  const path = useSearchParams();
  const theme = path.get("theme");
  let grid = 4;

  const BlogOptions = { ...madridFeatureBlog, infinite: setGetBlogIds?.length > madridFeatureBlog.slidesToShow };

  const { data, isLoading, refetch } = useQuery({queryKey: ["madrid"], queryFn: () => request({ url: HomePageAPI, params: { slug: "madrid" } }, router), enabled: false, refetchOnWindowFocus: false, select: (res) => res?.data });
  useEffect(() => {
   refetch();
  }, [isLoading]);

  useEffect(() => {
    if (data?.content?.products_ids?.length > 0) {
      setGetProductIds((prev) => ({
        ...prev,
        ids: Array.from(new Set(data?.content?.products_ids))?.join(","), paginate: data?.content?.products_ids.length
      }));
    }
    if (data?.content?.brands?.brand_ids?.length > 0) {
      setGetBrandIds((prev) => ({ 
        ...prev,
        ids: Array.from(new Set(data?.content?.brands?.brand_ids))?.join(",") 
      }));
    }
    if (data?.content?.featured_blogs?.blog_ids?.length > 0) {
      setGetBlogIds((prev) => ({
        ...prev,
        ids: Array.from(new Set(data?.content?.featured_blogs?.blog_ids))?.join(","),
      }));
    }
  }, [isLoading, data]);

  useEffect(() => {
    if ((theme == "madrid") == false && themeOption?.product?.product_box_variant == "digital") {
      setSliderOptions(4)
    } else {
      setSliderOptions(6);
    }
  }, [themeOption?.product?.product_box_variant, theme]);

  useEffect(() => {
    if (!isLoading) {
      if (productLoader || (data?.content?.featured_blogs?.status && data?.content?.featured_blogs?.blog_ids?.length > 0 && blogIdsLoader) || (data?.content?.brands?.status && data?.content?.brands?.brand_ids?.length > 0 && brandIdsLoader) || (data?.content?.seller?.status && data?.content?.seller.store_ids?.length > 0 && sellerContextLoader)) {
        document.body.classList.add("skeleton-body");
      } else {
        document.body.classList.remove("skeleton-body");
      }
    }
  }, [isLoading, productLoader, blogIdsLoader, brandIdsLoader, sellerContextLoader]);

  if (isLoading) return <Loader />;
  return (
    <>
      {/* Home Banner Section*/}
      <MadridBanner dataAPI={data?.content?.home_banner?.main_banner} />

      {/* Solder Banner Section*/}
      {data?.content?.featured_banners?.status && data?.content?.featured_banners?.banners?.length > 0 && <SliderBanner bannersData={data?.content?.featured_banners?.banners} />}

      {/* Horizontal Category Section*/}
      {data?.content?.categories_image_list?.status && (
        <WrapperComponent classes={{ sectionClass: "category-section-3" }}>
          <CustomHeading title={data?.content?.categories_image_list?.title} subTitle={data?.content?.categories_image_list?.description} />
          <CategoryStyle theme="madrid" style="horizontal" categoryIds={data?.content?.categories_image_list?.category_ids} sliderOptions={categorySliderOption8(data?.content?.categories_image_list?.category_ids?.length)} sliderKey='categorySliderOption8' />
        </WrapperComponent>
      )}

      {/* Horizontal Product Section*/}
      {data?.content?.products_list_1?.status && (
        <WrapperComponent classes={{ sectionClass: "product-section-3" }}>
          <CustomHeading title={data?.content?.products_list_1?.title} subTitle={data?.content?.products_list_1?.description} noCustomClass={true} />
          <ProductData style="horizontal" slider={true} customSliderOption={madridFullSlider(sliderOptions, data?.content?.products_list_1.product_ids?.length)} products={filteredProduct} dataAPI={data?.content?.products_list_1} classObj={{ productStyle: "product-standard ", productBoxClass: "product-box-bg" }} spaceClass={false} />
        </WrapperComponent>
      )}

      {/* Bank Offer Section*/}
      {data?.content?.bank_wallet_offers?.status && <BankOfferData dataAPI={data?.content?.bank_wallet_offers} />}

      {/* Top Selling Section*/}
      {data?.content?.product_with_deals?.status && data?.content?.product_with_deals?.deal_of_days?.deals?.length && (
        <WrapperComponent classes={{ sectionClass: "product-section product-section-3" }} noRowCol={true}>
          <CustomHeading title={data?.content?.product_with_deals.title} />
          <Row className="g-sm-4 g-3">
            {data?.content?.product_with_deals?.deal_of_days?.status && enableDeal && (
              <Col xxl={4} lg={5} className="order-lg-2 d-xxl-block d-none">
                <SpecialOffer dataAPI={data?.content?.product_with_deals} ProductData={filteredProduct} />
              </Col>
            )}

            <Col xxl={data?.content?.product_with_deals?.deal_of_days?.status && enableDeal ? 8 : 12} lg={data?.content?.product_with_deals?.deal_of_days?.status && enableDeal ? 8 : 12} className="col-xxl-8 col-lg-12 order-lg-1">
              <ProductData
                style="horizontal"
                slider={false}
                products={filteredProduct}
                dataAPI={data?.content.product_with_deals.products_list}
                classObj={{
                  productStyle: "product-standard theme-plus",
                  productBoxClass: "product-box-bg",
                }}
                showItem={4}
                spaceClass={false}
              />
            </Col>
          </Row>
        </WrapperComponent>
      )}

      {/* Seller Section*/}
      {data?.content?.seller?.status && (
        <WrapperComponent>
          <CustomHeading title={data?.content?.seller?.title} subTitle={data?.content?.seller?.description} noCustomClass={true} />
          <div>
            <TopSeller dataAPI={data?.content?.seller.store_ids} />
          </div>
        </WrapperComponent>
      )}

      {/* Full Width Banner Section*/}
      {data?.content?.full_width_banner?.status && (
        <WrapperComponent classes={{ fluidClass: "sale-banner" }}>
          <BannerData bannersData={data?.content?.full_width_banner} style="full_width" height={136} width={1585} />
        </WrapperComponent>
      )}

      {/* Horizontal Product Section*/}
      {data?.content?.products_list_2?.status && (
        <WrapperComponent classes={{ sectionClass: "product-section-3" }}>
          <CustomHeading title={data?.content?.products_list_2?.title} subTitle={data?.content?.products_list_2?.description} noCustomClass={true} />
          <ProductData style="horizontal" slider={true} customSliderOption={madridFullSlider(sliderOptions, data?.content?.products_list_2?.product_ids?.length)} products={filteredProduct} dataAPI={data?.content?.products_list_2} classObj={{ productStyle: "product-standard theme-plus", productBoxClass: "product-box-bg" }} spaceClass={false} />
        </WrapperComponent>
      )}

      {/* Horizontal Product Section*/}
      {data?.content?.products_list_3?.status && (
        <WrapperComponent classes={{ sectionClass: "product-section-3" }}>
          <CustomHeading title={data?.content?.products_list_3?.title} subTitle={data?.content?.products_list_3?.description} noCustomClass={true} />
          <ProductData style="horizontal" slider={true} customSliderOption={madridFullSlider(sliderOptions, data?.content?.products_list_3?.product_ids?.length)} products={filteredProduct} dataAPI={data?.content?.products_list_3} classObj={{ productStyle: "product-standard theme-plus", productBoxClass: "product-box-bg" }} spaceClass={false} />
        </WrapperComponent>
      )}

      {/* Two Column Banner Section*/}
      <WrapperComponent classes={{ sectionClass: "banner-section" }} noRowCol={true}>
        <Row className="g-sm-4 g-3">
          <Col lg={6}>
            <ImageLink classes={{ customHoverClass: "banner-contain  hover-effect" }} imgUrl={data?.content?.two_column_banners?.banner_1?.image_url} ratioImage={false} link={data?.content?.two_column_banners?.banner_1} height={406} width={781} />
          </Col>
          <Col lg={6}>
            <ImageLink classes={{ customHoverClass: "banner-contain  hover-effect" }} imgUrl={data?.content?.two_column_banners?.banner_2?.image_url} ratioImage={false} link={data?.content?.two_column_banners?.banner_1} height={406} width={781} />
          </Col>
        </Row>
      </WrapperComponent>

      {/* Horizontal Product Section*/}
      {data?.content?.products_list_4?.status && (
        <WrapperComponent classes={{ sectionClass: "product-section-3" }}>
          <CustomHeading title={data?.content?.products_list_4?.title} subTitle={data?.content?.products_list_4?.description} noCustomClass={true} />
          <ProductData style="horizontal" slider={true} customSliderOption={madridFullSlider(sliderOptions, data?.content?.products_list_4?.product_ids?.length)} products={filteredProduct} dataAPI={data?.content?.products_list_4} classObj={{ productStyle: "product-standard theme-plus", productBoxClass: "product-box-bg" }} spaceClass={false} />
        </WrapperComponent>
      )}

      {/* Horizontal Product Section*/}
      {data?.content?.products_list_5?.status && (
        <WrapperComponent classes={{ sectionClass: "product-section-3" }}>
          <CustomHeading title={data?.content?.products_list_5?.title} subTitle={data?.content?.products_list_5?.description} noCustomClass={true} />
          <ProductData
            style="horizontal"
            slider={true}
            customSliderOption={madridFullSlider(sliderOptions, data?.content?.products_list_5?.product_ids?.length)}
            products={filteredProduct}
            dataAPI={data?.content?.products_list_5}
            classObj={{
              productStyle: "product-standard theme-plus",
              productBoxClass: "product-box-bg",
            }}
            spaceClass={false}
          />
        </WrapperComponent>
      )}

      {/* Delivery Banner Section*/}
      <WrapperComponent classes={{ sectionClass: "banner-section" }} noRowCol={true}>
        <Row className="g-sm-4 g-3">
          <Col lg={8}>
            <ImageLink imgUrl={data?.content?.delivery_banners?.banner_1?.image_url} ratioImage={false} link={data?.content?.delivery_banners?.banner_1} height={326} width={1049} classes={{ customHoverClass: "banner-contain h-100 hover-effect" }} />
          </Col>
          <Col lg={4}>
            <ImageLink imgUrl={data?.content?.delivery_banners?.banner_2?.image_url} ratioImage={false} link={data?.content?.delivery_banners?.banner_1} height={326} width={512} classes={{ customHoverClass: "banner-contain h-100 hover-effect" }} />
          </Col>
        </Row>
      </WrapperComponent>

      {/* Horizontal Product Section*/}
      {data?.content?.products_list_6?.status && (
        <WrapperComponent classes={{ sectionClass: "product-section-3" }}>
          <CustomHeading title={data?.content?.products_list_6?.title} subTitle={data?.content?.products_list_6?.description} noCustomClass={true} />
          <ProductData
            style="horizontal"
            slider={true}
            customSliderOption={madridFullSlider(sliderOptions, data?.content?.products_list_6?.product_ids?.length)}
            products={filteredProduct}
            dataAPI={data?.content?.products_list_6}
            classObj={{
              productStyle: "product-standard theme-plus",
              productBoxClass: "product-box-bg",
            }}
            spaceClass={false}
          />
        </WrapperComponent>
      )}

      {/* Horizontal Product Section*/}
      {data?.content?.products_list_7?.status && (
        <WrapperComponent classes={{ sectionClass: "product-section-3" }}>
          <CustomHeading title={data?.content?.products_list_7?.title} subTitle={data?.content?.products_list_7?.description} noCustomClass={true} />
          <ProductData
            style="horizontal"
            slider={true}
            customSliderOption={madridFullSlider(sliderOptions, data?.content?.products_list_7?.product_ids?.length)}
            products={filteredProduct}
            dataAPI={data?.content?.products_list_7}
            classObj={{
              productStyle: "product-standard theme-plus",
              productBoxClass: "product-box-bg",
            }}
            spaceClass={false}
          />
        </WrapperComponent>
      )}

      {/* Blog Section*/}
      {data?.content?.featured_blogs?.status && (
        <WrapperComponent classes={{ sectionClass: "blog-section section-b-space" }} noRowCol={true}>
          <CustomHeading title={data?.content?.featured_blogs?.title} />
          {data?.content?.featured_blogs?.blog_ids?.length > 0 ? (
            <BlogData
              dataAPI={data?.content?.featured_blogs}
              classes={{
                sliderClass: "slider-3-blog arrow-slider slick-height",
                sliderOption: BlogOptions,
                ratioClass: "ratio_65",
              }}
              sliderKey="madridFeatureBlog"
            />
          ) : (
            <NoDataFound data={{ customClass: "bg-light no-data-added", title: "no_blog_found" }} />
          )}
        </WrapperComponent>
      )}

      {/* Brand Section*/}
      {data?.content?.brands?.brand_ids && data?.content?.brands?.status && (
        <div className="brand-effect section-b-space ">
          <div className="container-fluid-lg">
            <BrandData dataAPI={data?.content?.brands?.brand_ids} height={113} width={70} removeClass />
          </div>
        </div>
      )}

      {/* Sticky Cart Section*/}
      {themeOption?.general?.sticky_cart_enable && themeOption?.general?.cart_style !== "cart_sidebar" && <StickyCart />}
    </>
  );
};

export default MadridTheme;
