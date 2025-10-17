"use client";
import CustomHeading from "@/components/common/CustomHeading";
import NoDataFound from "@/components/common/NoDataFound";
import WrapperComponent from "@/components/common/WrapperComponent";
import BlogData from "@/components/themes/common/blogData";
import BrandData from "@/components/themes/common/brandData";
import CategoryStyle from "@/components/themes/common/categoryData/CategoryStyle";
import CategoryProductFilter from "@/components/themes/common/categoryProductFilter";
import FourColProduct from "@/components/themes/common/fourColProduct";
import RomeBanner from "@/components/themes/common/homeBanner/RomeBanner";
import ImageLink from "@/components/themes/common/imageLink";
import NewsLetter from "@/components/themes/common/newsletter";
import ProductData from "@/components/themes/common/productData";
import TopSeller from "@/components/themes/common/topSeller";
import BlogIdsContext from "@/helper/blogIdsContext";
import BrandIdsContext from "@/helper/brandIdsContext";
import ProductIdsContext from "@/helper/productIdsContext";
import SellerContext from "@/helper/sellerContext";
import ThemeOptionContext from "@/helper/themeOptionsContext";
import Loader from "@/layout/loader";
import StickyCart from "@/layout/stickyCart";
import request from "@/utils/axiosUtils";
import { HomePageAPI } from "@/utils/axiosUtils/API";
import { LiveImagePath } from "@/utils/constants";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import Slider from "react-slick";
import { Col, Row } from "reactstrap";
import { bestValueSliderOption, categorySliderOption8, productSliderOptions6, romeBlogSliderOption } from "../../../data/SliderSettingsData";

const RomeTheme = () => {
  const router = useRouter();
  const [sliderOptions, setSliderOptions] = useState(productSliderOptions6);
  const { themeOption } = useContext(ThemeOptionContext);
  const { setGetProductIds, isLoading: productLoader, filteredProduct } = useContext(ProductIdsContext);
  const { setGetBlogIds, blogIdsLoader } = useContext(BlogIdsContext);
  const { setGetBrandIds, brandIdsLoader } = useContext(BrandIdsContext);
  const { isLoading: sellerContextLoader } = useContext(SellerContext);
  const path = useSearchParams();
  const theme = path.get("theme");
  let showProductBox = 6;

  const BlogOptions = { ...romeBlogSliderOption, infinite: setGetBlogIds?.length > romeBlogSliderOption.slidesToShow };

  const { data, isLoading, refetch } = useQuery({queryKey: ["rome"], queryFn: () => request({ url: HomePageAPI, params: { slug: "rome" } }), enabled: false, refetchOnWindowFocus: false, select: (res) => res?.data });
  useEffect(() => {
   refetch();
  }, [isLoading]);

  const bestValue = { ...bestValueSliderOption, infinite: data?.content?.value_banners?.banners?.length > bestValueSliderOption.slidesToShow };

  useEffect(() => {
    if (data?.content?.products_ids?.length > 0) {
      setGetProductIds({ ids: Array.from(new Set(data?.content?.products_ids))?.join(","),paginate:data?.content?.products_ids.length });
    }
    if (data?.content?.brands?.brand_ids?.length > 0) {
      setGetBrandIds({ ids: Array.from(new Set(data?.content?.brands?.brand_ids))?.join(",") });
    }
    if (data?.content?.featured_blogs?.blog_ids?.length > 0) {
      setGetBlogIds({ ids: Array.from(new Set(data?.content?.main_content?.section9_featured_blogs?.blog_ids))?.join(",") });
    }
  }, [isLoading]);

  useEffect(() => {
    if (!isLoading && data?.content) {
      if (data?.content?.products_ids?.length > 0) {
        setGetProductIds({ ids: Array.from(new Set(data?.content?.products_ids)).join(","), paginate: data?.content?.products_ids.length });
      }
      if (data?.content?.brands?.brand_ids?.length > 0) {
        setGetBrandIds({ ids: Array.from(new Set(data?.content?.brands?.brand_ids)).join(",") });
      }
      const blogIds = data?.content?.featured_blogs?.blog_ids;
      if (blogIds && blogIds.length > 0) {
        setGetBlogIds({ ids: Array.from(new Set(blogIds)).join(",") });
      }
    }
  }, [data, isLoading]);
 
  useEffect(() => {
    if (theme !== "rome" && themeOption?.product?.product_box_variant == "digital") {
      setSliderOptions({ ...sliderOptions, slidesToShow: 4, infinite: data?.content?.products_list_1.product_ids?.length > sliderOptions.slidesToShow });
    } else {
      setSliderOptions({ ...sliderOptions, slidesToShow: 6, infinite: data?.content?.products_list_1.product_ids?.length > sliderOptions.slidesToShow });
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
    <div className="bg-effect">
      {/* Home Banner Section*/}

      <RomeBanner dataAPI={data?.content?.home_banner} />

      {/* Category Section*/}
      {data?.content?.categories_image_list?.status && (
        <WrapperComponent className="category-section-2" noRowCol={true}>
          <CustomHeading title={data?.content?.categories_image_list?.title} />
          <CategoryStyle theme="rome" style="horizontal" categoryIds={data?.content?.categories_image_list?.category_ids} classes={{ sliderOption: categorySliderOption8(data?.content?.categories_image_list?.category_ids?.length)}}sliderKey="categorySliderOption8" />
        </WrapperComponent>
      )}

      {/* Best Value Deal  Section*/}

      {data?.content?.value_banners?.status && data?.content?.value_banners?.banners?.length > 0 && (
        <WrapperComponent noRowCol={true}>
          <CustomHeading title={data?.content?.value_banners?.title} />
          <Row>
            <Col xs={12}>
              {/* <BannerData style="horizontal" bannersData={data?.content?.value_banners?.banners} height={406} width={781} ratioImage={true} customRatioClass="h-100 w-100"/> */}
              <div className="no-arrow">
                <Slider {...bestValue}>
                  {data?.content?.value_banners?.banners?.map(
                    (elem, i) =>
                      elem.status && (
                        <div className="three-slider arrow-slider ratio_58" key={i}>
                          <ImageLink classes={{ customHoverClass: "offer-banner hover-effect" }} customRatioClass="h-100  w-100" ratioImage={true} imgUrl={`${elem?.image_url}`} link={elem} height={406} width={781} />
                        </div>
                      )
                  )}
                </Slider>
              </div>
            </Col>
          </Row>
        </WrapperComponent>
      )}

      {/* Category Product Filter*/}
      {data?.content?.categories_products?.status && <CategoryProductFilter dataAPI={data?.content?.categories_products} products={filteredProduct} grid={showProductBox} />}

      {/*Top Seller Section*/}
      {data?.content?.seller?.status && (
        <WrapperComponent>
          <CustomHeading title={data?.content?.seller?.title} subTitle={data?.content?.seller?.description} noCustomClass={true} />
          <div>
            <TopSeller dataAPI={data?.content?.seller.store_ids} />
          </div>
        </WrapperComponent>
      )}

      {/*Two Column Banner Section*/}
      {data?.content?.two_column_banners?.status && (
        <WrapperComponent classes={{ sectionClass: "banner-section" }} noRowCol={true}>
          <Row className="gy-xl-0 gy-3">
            <Col xl={6}>
              <ImageLink classes={{ customHoverClass: "banner-contain hover-effect" }} imgUrl={data?.content?.two_column_banners?.banner_1?.image_url} link={data?.content?.two_column_banners?.banner_1} height={406} width={781} />
            </Col>
            <Col xl={6}>
              <ImageLink classes={{ customHoverClass: "banner-contain hover-effect" }} imgUrl={data?.content?.two_column_banners?.banner_2?.image_url} link={data?.content?.two_column_banners?.banner_2} height={406} width={781} />
            </Col>
          </Row>
        </WrapperComponent>
      )}

      {/*Four Column Product Section*/}
      {data?.content?.slider_products?.status && (
        <WrapperComponent>
          <FourColProduct dataAPI={data?.content?.slider_products} classes={{ colClass: { sm: 6, xl: 4, xxl: 3 } }} />
        </WrapperComponent>
      )}

      {/*Full Width Banner Section*/}
      {data?.content?.full_width_banner?.status && (
        <WrapperComponent>
          <ImageLink classes={{ customHoverClass: "banner-contain hover-effect b-left" }} imgUrl={data?.content?.full_width_banner?.image_url} ratioImage={false} link={data?.content?.main_content?.full_width_banner} height={427} width={1585} />
        </WrapperComponent>
      )}

      {/*Full Width Banner Section*/}
      {data?.content?.products_list_1?.status && (
        <WrapperComponent>
          <CustomHeading title={data?.content?.products_list_1?.title} subTitle={data?.content?.products_list_1?.description} noCustomClass={true} />
          <ProductData style="horizontal" slider={true} customSliderOption={sliderOptions} products={filteredProduct} dataAPI={data?.content?.products_list_1} classObj={{ productStyle: "product-standard", productBoxClass: "product-box-bg" }} spaceClass={false} />
        </WrapperComponent>
      )}

      {/*Blog Section*/}
      {data?.content?.featured_blogs?.status && (
        <WrapperComponent classes={{ sectionClass: "" }}>
          <CustomHeading title={data?.content?.featured_blogs?.title} />
          {data?.content?.featured_blogs?.blog_ids?.length > 0 ? (
            <BlogData
              dataAPI={data?.content?.featured_blogs}
              classes={{
                sliderClass: "slider-3 arrow-slider",
                sliderOption: BlogOptions,
                ratioClass: "ratio_65",
              }}
              sliderKey="romeBlogSliderOption"
            />
          ) : (
            <NoDataFound data={{ customClass: "bg-light no-data-added", title: "no_blog_found" }} />
          )}
        </WrapperComponent>
      )}

      {/*Brand Section*/}
      {data?.content?.brands?.brand_ids && data?.content?.brands?.status && (
        <div className="brand-effect section-b-space">
          <div className="container-fluid-lg">
            <BrandData dataAPI={data?.content?.brands?.brand_ids} height={113} width={70} />
          </div>
        </div>
      )}

      {/*News Letter Section*/}
      {data?.content?.news_letter?.status && <NewsLetter dataAPI={data?.content?.news_letter} style="classic" />}

      {/*Sticky Cart Section*/}
      {themeOption?.general?.sticky_cart_enable && themeOption?.general?.cart_style !== "cart_sidebar" && <StickyCart />}
    </div>
  );
};

export default RomeTheme;
