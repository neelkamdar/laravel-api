"use client";
import { LeafSVG } from "@/components/common/CommonSVG";
import CustomHeading from "@/components/common/CustomHeading";
import WrapperComponent from "@/components/common/WrapperComponent";
import BannerData from "@/components/themes/common/bannerData";
import BlogData from "@/components/themes/common/blogData";
import BrandData from "@/components/themes/common/brandData";
import CategoryStyle from "@/components/themes/common/categoryData/CategoryStyle";
import DetailedBanner from "@/components/themes/common/detailedBanner";
import FourColProduct from "@/components/themes/common/fourColProduct";
import OsakaBanner from "@/components/themes/common/homeBanner/OsakaBanner";
import ImageLink from "@/components/themes/common/imageLink";
import NewsLetter from "@/components/themes/common/newsletter";
import ProductData from "@/components/themes/common/productData";
import TopSeller from "@/components/themes/common/topSeller";
import BlogIdsContext from "@/helper/blogIdsContext";
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
import {
  categorySliderOption9,
  featureBlogSliderOptions4,
  osakaProductSliderOptions6,
} from "../../../data/SliderSettingsData";

const OsakaTheme = () => {
  const router = useRouter();
  const { filteredProduct } = useContext(ProductIdsContext);
  const productOptions = {...osakaProductSliderOptions6}
  const [sliderOptions, setSliderOptions] = useState(productOptions);
  const { themeOption } = useContext(ThemeOptionContext);
  const { setGetProductIds, isLoading: productLoader } =useContext(ProductIdsContext);
  const { setGetBlogIds, blogIdsLoader } = useContext(BlogIdsContext);
  const { setGetBrandIds, brandIdsLoader } = useContext(BrandIdsContext);
  const {  isLoading:sellerContextLoader } = useContext(SellerContext);  
  const path = useSearchParams()
  const theme = path.get('theme')

  const BlogOptions = {...featureBlogSliderOptions4,infinite:setGetBlogIds?.length > featureBlogSliderOptions4.slidesToShow}

  const { data, isLoading, refetch } = useQuery({queryKey: ["osaka"], queryFn: () => request({ url: HomePageAPI, params: { slug: "osaka" } }, router), enabled: false, refetchOnWindowFocus: false, select: (res) => res?.data });
  useEffect(() => {
    refetch();
  }, [isLoading]);
  useEffect(() => {
    if (data?.content?.products_ids?.length > 0) {
      setGetProductIds({ids: Array.from(new Set(data?.content?.products_ids))?.join(","),paginate:data?.content?.products_ids.length});
    }
    if (data?.content?.brands?.brand_ids?.length > 0) {
      setGetBrandIds({ids: Array.from(new Set(data?.content?.brands?.brand_ids))?.join(","),});
    }
    if (data?.content?.featured_blogs?.blog_ids?.length > 0) {
      setGetBlogIds({ids: Array.from(new Set(data?.content?.featured_blogs?.blog_ids))?.join(","),});
    }
  }, [isLoading]);

  useEffect(() => {
    if ((theme == "osaka") == false && themeOption?.product?.product_box_variant == "digital") {
      setSliderOptions({...productOptions,slidesToShow: 4,infinite:(data?.content?.products_list_2.product_ids?.length > productOptions.slidesToShow || data?.content?.products_list_1.product_ids.length > productOptions.slidesToShow) })
    } else {
        setSliderOptions({...productOptions,slidesToShow: 6,infinite:(data?.content?.products_list_2.product_ids?.length > productOptions.slidesToShow || data?.content?.products_list_1.product_ids.length > productOptions.slidesToShow) })
        }
  }, [ themeOption?.product?.product_box_variant, theme]);

// }, [themeOption?.product?.product_box_variant, theme]);
useEffect(()=>{
  if (!isLoading) { 
    if (productLoader || ( data?.content?.brands?.status && data?.content?.brands?.brand_ids?.length > 0 && brandIdsLoader)|| ( data?.content?.featured_blogs?.status &&  data?.content?.featured_blogs?.blog_ids?.length > 0 && blogIdsLoader)  || (data?.content?.seller?.status &&  data?.content?.seller.store_ids?.length > 0 &&  sellerContextLoader) ) {
      document.body.classList.add("skeleton-body");
    }else {
      document.body.classList.remove("skeleton-body");
    }       
  }
},[isLoading ,productLoader ,blogIdsLoader,brandIdsLoader ,sellerContextLoader ])

  if (isLoading) return <Loader />;
  return (
    <div className="bg-effect">
      {/* Home Banner Section*/}

      <OsakaBanner dataAPI={data?.content?.home_banner} />

      {/* Horizontal Category  Section*/}
      {data?.content?.categories_icon_list?.status && (
        <WrapperComponent>
          <CustomHeading title={data?.content?.categories_icon_list?.title} svgUrl={<LeafSVG className="icon-width" />} subTitle={data?.content?.categories_icon_list?.description} noCustomClass={true} />
          <CategoryStyle theme="paris" style="horizontal" categoryIds={data?.content?.categories_icon_list?.category_ids} classes={{ sliderOption: categorySliderOption9(data?.content?.categories_icon_list?.category_ids?.length) }} sliderKey='categorySliderOption9' />
        </WrapperComponent>
      )}

      {/* Coupon Section*/}
      {data?.content?.coupons.status && (
        <WrapperComponent classes={{ fluidClass: "sale-banner" }}>
          <BannerData bannersData={data?.content?.coupons} style="full_width" height={138} width={1585} />
        </WrapperComponent>
      )}

      {/* Product Section*/}
      {data?.content?.products_list_1.status && (
        <WrapperComponent noRowCol={true}>
          <CustomHeading title={data?.content?.products_list_1?.title} svgUrl={<LeafSVG className="icon-width" />} subTitle={data?.content?.main_content?.section1_products?.description} noCustomClass={true} />
          <ProductData
            style="horizontal"
            slider={true}
            customSliderOption={sliderOptions}
            products={filteredProduct}
            dataAPI={data?.content?.products_list_1}
            classObj={{
              productStyle: "product-standard",
              productBoxClass: "product-box-bg",
            }}
            spaceClass={false}
          />
        </WrapperComponent>
      )}

      {/* Offer Banner Section*/}
      {data?.content?.offer_banner.status && (
        <WrapperComponent>
          <ImageLink classes={{ customHoverClass: "banner-contain b-left" }} imgUrl={data?.content?.offer_banner?.image_url} ratioImage={false} link={data?.content?.offer_banner} height={393} width={1585} />
        </WrapperComponent>
      )}

      {/* Top Seller Section*/}
      {data?.content?.seller?.status && (
        <WrapperComponent>
          <CustomHeading title={data?.content?.seller?.title} svgUrl={<LeafSVG className="icon-width" />} subTitle={data?.content?.seller?.description} />
          <div>
            <TopSeller dataAPI={data?.content?.seller.store_ids} />
          </div>
        </WrapperComponent>
      )}

      {/* Horizontal Product Section*/}
      {data?.content?.products_list_2.status && (
        <WrapperComponent noRowCol={true}>
          <CustomHeading title={data?.content?.products_list_2?.title} svgUrl={<LeafSVG className="icon-width" />} subTitle={data?.content?.products_list_2?.description} noCustomClass={true} />
          <ProductData
            style="horizontal"
            slider={true}
            products={filteredProduct}
            customSliderOption={sliderOptions}
            dataAPI={data?.content?.products_list_2}
            classObj={{
              productStyle: "product-standard",
              productBoxClass: "product-box-bg",
            }}
            spaceClass={false}
          />
        </WrapperComponent>
      )}

      {/* Details Slider Banner Section*/}
      {data?.content?.product_bundles?.status && (
        <WrapperComponent noRowCol={true}>
          <DetailedBanner dataAPI={data?.content?.product_bundles?.bundles} />
        </WrapperComponent>
      )}

      {/* Four Colum Products Section*/}
      {data?.content?.slider_products?.status && (
        <WrapperComponent classes={{ sectionClass: "top-selling-section border-box" }}>
          <FourColProduct
            dataAPI={data?.content?.slider_products}
            classes={{
              boxClass: "category-menu",
              colClass: { sm: 6, xl: 4, xxl: 3 },
            }}
          />
        </WrapperComponent>
      )}

      {/* Blog Section*/}
      {data?.content?.featured_blogs?.status && (
        <WrapperComponent noRowCol={true}>
          <CustomHeading title={data?.content?.featured_blogs?.title} subTitle={data?.content?.featured_blogs?.description} svgUrl={<LeafSVG className="icon-width" />} />
          {data?.content?.featured_blogs?.blog_ids?.length > 0 ? (
            <Row>
              <Col xs={12}>
                <BlogData
                  dataAPI={data?.content?.featured_blogs}
                  classes={{
                    sliderClass: "slider-5 ratio_65",
                    sliderOption: BlogOptions,
                    height: 150,
                    width: 317,
                  }}
                  sliderKey="featureBlogSliderOptions4"
                />
              </Col>
            </Row>
          ) : (
            <NoDataFound
              data={{
                customClass: "bg-light no-data-added",
                title: "no_blog_found",
              }}
            />
          )}
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
    </div>
  );
};

export default OsakaTheme;
